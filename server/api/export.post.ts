import { z } from "zod";
import { getDb } from "../db";
import { samples, datasets } from "../db/schema";
import { eq, gte, inArray } from "drizzle-orm";

const exportSchema = z.object({
  format: z.enum(["alpaca", "sharegpt", "jsonl", "json", "csv", "mlx", "unsloth", "trl"]),
  status: z.enum(["all", "approved", "draft", "review"]).default("all"),
  split: z.enum(["none", "90-10", "80-20", "70-30"]).default("none"),
  minQuality: z.number().min(1).max(5).optional(),
  categories: z.array(z.string()).optional(),
  includeMetadata: z.boolean().default(true),
  sampleIds: z.array(z.number()).optional(),
});

// Format converters
function toAlpacaFormat(sample: any) {
  return {
    instruction: sample.instruction,
    input: sample.input || "",
    output: sample.output,
    system: sample.systemPrompt || undefined,
  };
}

function toMLXFormat(sample: any) {
  // MLX-LM requires chat format for local files
  // Format: {"messages": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
  const messages = [
    { role: "user", content: sample.instruction },
    { role: "assistant", content: sample.output },
  ];

  // Add system message if present
  if (sample.systemPrompt) {
    messages.unshift({ role: "system", content: sample.systemPrompt });
  }

  // Add context as part of user message if present
  if (sample.input) {
    messages[0].content = `${sample.instruction}\n\nContext: ${sample.input}`;
  }

  return { messages };
}

function toUnslothFormat(sample: any) {
  // Unsloth expects HuggingFace datasets format with "text" field
  // Format: {"text": "### Human: ...\n\n### Assistant: ..."}
  let text = "";

  // Add system prompt if present
  if (sample.systemPrompt) {
    text += `### System:\n${sample.systemPrompt}\n\n`;
  }

  // Add instruction (and input/context if present)
  if (sample.input) {
    text += `### Human: ${sample.instruction}\n\nContext: ${sample.input}\n\n`;
  } else {
    text += `### Human: ${sample.instruction}\n\n`;
  }

  // Add output
  text += `### Assistant: ${sample.output}`;

  return { text };
}

function toTRLFormat(sample: any) {
  // TRL expects prompt/completion pairs for SFTTrainer
  // Format: {"prompt": "...", "completion": "..."}
  let prompt = sample.instruction;

  // Add system prompt if present
  if (sample.systemPrompt) {
    prompt = `${sample.systemPrompt}\n\n${prompt}`;
  }

  // Add input/context if present
  if (sample.input) {
    prompt = `${prompt}\n\nContext: ${sample.input}`;
  }

  return {
    prompt: prompt,
    completion: sample.output,
  };
}

function toShareGPTFormat(sample: any) {
  const conversations = [
    { from: "human", value: sample.instruction },
    { from: "gpt", value: sample.output },
  ];

  if (sample.systemPrompt) {
    conversations.unshift({ from: "system", value: sample.systemPrompt });
  }

  if (sample.input) {
    conversations[0].value = `${sample.instruction}\n\nContext: ${sample.input}`;
  }

  return { conversations };
}

function toCSVFormat(sample: any) {
  const escapeCSV = (str: string) => {
    if (!str) return "";
    str = str.replace(/"/g, '""');
    if (str.includes(",") || str.includes("\n") || str.includes('"')) {
      str = `"${str}"`;
    }
    return str;
  };

  return [
    escapeCSV(sample.instruction),
    escapeCSV(sample.input || ""),
    escapeCSV(sample.output),
    escapeCSV(sample.systemPrompt || ""),
    sample.category || "general",
    sample.difficulty || "intermediate",
    sample.qualityRating || 3,
    sample.status || "draft",
    sample.source || "manual",
    sample.model || "",
    sample.createdAt ? new Date(sample.createdAt).toISOString() : "",
  ].join(",");
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const params = exportSchema.parse(body);

    const db = getDb();

    // Get active dataset name
    const activeDataset = await db.query.datasets.findFirst({
      where: eq(datasets.isActive, 1),
    });
    const datasetName = activeDataset?.name || "dataset";

    // Build query
    let query: any = db.select().from(samples);

    // Filter by specific sample IDs if provided (for version exports)
    if (params.sampleIds && params.sampleIds.length > 0) {
      query = query.where(inArray(samples.id, params.sampleIds));
    }

    // Filter by status
    if (params.status !== "all") {
      query = query.where(eq(samples.status, params.status));
    }

    // Filter by minimum quality
    if (params.minQuality) {
      query = query.where(gte(samples.qualityRating, params.minQuality));
    }

    // Filter by categories
    if (params.categories && params.categories.length > 0) {
      // SQLite doesn't support array contains directly, filter in JS
    }

    const allSamples = await query;

    // Apply category filter in JS if needed
    let filteredSamples = allSamples;
    if (params.categories && params.categories.length > 0) {
      filteredSamples = allSamples.filter((ex) =>
        params.categories!.includes(ex.category || "general")
      );
    }

    if (filteredSamples.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No samples match the selected filters",
      });
    }

    // Prepare data based on format
    let exportData: any;
    let contentType: string;
    let fileExtension: string;

    switch (params.format) {
      case "alpaca":
        exportData = filteredSamples.map(toAlpacaFormat);
        contentType = "application/json";
        fileExtension = "json";
        break;

      case "sharegpt":
        exportData = filteredSamples.map(toShareGPTFormat);
        contentType = "application/json";
        fileExtension = "json";
        break;

      case "jsonl":
        exportData = filteredSamples.map((ex) => JSON.stringify(toAlpacaFormat(ex))).join("\n");
        contentType = "application/jsonl";
        fileExtension = "jsonl";
        break;

      case "mlx":
        exportData = filteredSamples.map((ex) => JSON.stringify(toMLXFormat(ex))).join("\n");
        contentType = "application/jsonl";
        fileExtension = "jsonl";
        break;

      case "unsloth":
        exportData = filteredSamples.map((ex) => JSON.stringify(toUnslothFormat(ex))).join("\n");
        contentType = "application/jsonl";
        fileExtension = "jsonl";
        break;

      case "trl":
        exportData = filteredSamples.map((ex) => JSON.stringify(toTRLFormat(ex))).join("\n");
        contentType = "application/jsonl";
        fileExtension = "jsonl";
        break;

      case "json":
        exportData = {
          dataset: filteredSamples.map((ex) => ({
            ...toAlpacaFormat(ex),
            metadata: params.includeMetadata
              ? {
                  category: ex.category,
                  difficulty: ex.difficulty,
                  qualityRating: ex.qualityRating,
                  status: ex.status,
                  source: ex.source,
                  model: ex.model,
                  tags: ex.tags ? JSON.parse(ex.tags) : [],
                  createdAt: ex.createdAt,
                  notes: ex.notes,
                }
              : undefined,
          })),
          stats: {
            total: filteredSamples.length,
            categories: {} as Record<string, number>,
            avgQuality:
              filteredSamples.reduce((sum, ex) => sum + (ex.qualityRating || 3), 0) /
              filteredSamples.length,
          },
        };

        // Count categories
        filteredSamples.forEach((ex) => {
          const cat = ex.category || "general";
          exportData.stats.categories[cat] = (exportData.stats.categories[cat] || 0) + 1;
        });

        contentType = "application/json";
        fileExtension = "json";
        break;

      case "csv":
        const headers = [
          "instruction",
          "input",
          "output",
          "system",
          "category",
          "difficulty",
          "quality",
          "status",
          "source",
          "model",
          "created_at",
        ];
        const rows = filteredSamples.map(toCSVFormat);
        exportData = [headers.join(","), ...rows].join("\n");
        contentType = "text/csv";
        fileExtension = "csv";
        break;
    }

    // Generate meaningful filename
    const safeDatasetName = datasetName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .substring(0, 30);
    const timestamp = new Date().toISOString().split("T")[0];
    const count = filteredSamples.length;

    const baseFilename = `${safeDatasetName}_${count}ex_${timestamp}_${params.format}`;

    // Handle train/validation split
    let trainData = exportData;
    let valData: any = null;

    if (params.split !== "none" && params.format !== "csv") {
      const [trainRatio, _valRatio] = params.split.split("-").map(Number);
      const total = filteredSamples.length;
      const trainCount = Math.floor(total * (trainRatio / 100));

      // Shuffle for random split
      const shuffled = [...filteredSamples].sort(() => Math.random() - 0.5);
      const trainSamples = shuffled.slice(0, trainCount);
      const valSamples = shuffled.slice(trainCount);

      if (params.format === "jsonl") {
        trainData = trainSamples.map((ex) => JSON.stringify(toAlpacaFormat(ex))).join("\n");
        valData = valSamples.map((ex) => JSON.stringify(toAlpacaFormat(ex))).join("\n");
      } else if (params.format === "mlx") {
        trainData = trainSamples.map((ex) => JSON.stringify(toMLXFormat(ex))).join("\n");
        valData = valSamples.map((ex) => JSON.stringify(toMLXFormat(ex))).join("\n");
      } else if (params.format === "unsloth") {
        trainData = trainSamples.map((ex) => JSON.stringify(toUnslothFormat(ex))).join("\n");
        valData = valSamples.map((ex) => JSON.stringify(toUnslothFormat(ex))).join("\n");
      } else {
        trainData = trainSamples.map(toAlpacaFormat);
        valData = valSamples.map(toAlpacaFormat);
      }

      // Return both splits with meaningful filenames
      return {
        success: true,
        format: params.format,
        splits: {
          train: {
            data: trainData,
            count: trainSamples.length,
            filename: `${baseFilename}_train.${fileExtension}`,
          },
          validation: {
            data: valData,
            count: valSamples.length,
            filename: `${baseFilename}_val.${fileExtension}`,
          },
        },
        total: filteredSamples.length,
        contentType,
      };
    }

    // Return single file with meaningful filename
    return {
      success: true,
      format: params.format,
      data: exportData,
      count: filteredSamples.length,
      filename: `${baseFilename}.${fileExtension}`,
      contentType,
    };
  } catch (error) {
    console.error("Error exporting dataset:", error);

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation error",
        data: error.issues,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to export dataset",
    });
  }
});
