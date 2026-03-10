import { z } from "zod";
import { getDb } from "../../db";
import { samples } from "../../db/schema";
import { eq } from "drizzle-orm";

const paramsSchema = z.object({
  id: z.coerce.number(),
});

const updateSampleSchema = z.object({
  instruction: z.string().min(1).optional(),
  input: z.string().optional().nullable(),
  output: z.string().min(1).optional(),
  systemPrompt: z.string().optional().nullable(),
  category: z
    .enum(["general", "coding", "analysis", "explanation", "writing", "math", "science"])
    .optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  qualityRating: z.number().min(1).max(5).optional(),
  notes: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "review", "approved", "rejected"]).optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const params = await getValidatedRouterParams(event, paramsSchema.parse);
    const body = await readBody(event);
    const data = updateSampleSchema.parse(body);

    const db = getDb();

    // Check if sample exists
    const existing = await db.select().from(samples).where(eq(samples.id, params.id)).limit(1);

    if (existing.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Sample not found",
      });
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.instruction !== undefined) updateData.instruction = data.instruction;
    if (data.input !== undefined) updateData.input = data.input || null;
    if (data.output !== undefined) updateData.output = data.output;
    if (data.systemPrompt !== undefined) updateData.systemPrompt = data.systemPrompt || null;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
    if (data.qualityRating !== undefined) updateData.qualityRating = data.qualityRating;
    if (data.notes !== undefined) updateData.notes = data.notes || null;
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
    if (data.status !== undefined) updateData.status = data.status;

    const result = await db
      .update(samples)
      .set(updateData)
      .where(eq(samples.id, params.id))
      .returning();

    return {
      success: true,
      sample: result[0],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation error",
        data: error.errors,
      });
    }

    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }

    console.error("Error updating sample:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update sample",
    });
  }
});
