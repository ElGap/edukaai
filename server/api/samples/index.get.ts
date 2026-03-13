import { z } from "zod";
import { getDb } from "../../db";
import { samples } from "../../db/schema";
import { desc, asc, like, and, eq, or } from "drizzle-orm";

const querySchema = z.object({
  datasetId: z.coerce.number().optional(),
  status: z.enum(["draft", "review", "approved", "rejected"]).optional(),
  source: z.enum(["manual", "json"]).optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "oldest", "quality"]).default("newest"),
  search: z.string().optional(),
  limit: z.coerce.number().default(50),
  offset: z.coerce.number().default(0),
});

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const params = querySchema.parse(query);

    const db = getDb();

    // Build where conditions
    const conditions = [];

    if (params.datasetId) {
      conditions.push(eq(samples.datasetId, params.datasetId));
    }

    if (params.status) {
      conditions.push(eq(samples.status, params.status));
    }

    if (params.source) {
      conditions.push(eq(samples.source, params.source));
    }

    if (params.category) {
      conditions.push(eq(samples.category, params.category));
    }

    if (params.search) {
      const searchPattern = `%${params.search}%`;
      conditions.push(
        or(like(samples.instruction, searchPattern), like(samples.output, searchPattern))
      );
    }

    // Build query
    let dbQuery: any = db.select().from(samples);

    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions));
    }

    // Apply sorting
    if (params.sort === "newest") {
      dbQuery = dbQuery.orderBy(desc(samples.createdAt));
    } else if (params.sort === "oldest") {
      dbQuery = dbQuery.orderBy(asc(samples.createdAt));
    } else if (params.sort === "quality") {
      dbQuery = dbQuery.orderBy(desc(samples.qualityRating));
    }

    // Apply pagination
    dbQuery = dbQuery.limit(params.limit).offset(params.offset);

    // Execute query
    const results = await dbQuery;

    // Convert timestamps from seconds to milliseconds for proper JavaScript Date handling
    const convertedResults = results.map((sample: any) => {
      if (
        sample.createdAt &&
        typeof sample.createdAt === "number" &&
        sample.createdAt < 10000000000
      ) {
        sample.createdAt = sample.createdAt * 1000;
      }
      if (
        sample.updatedAt &&
        typeof sample.updatedAt === "number" &&
        sample.updatedAt < 10000000000
      ) {
        sample.updatedAt = sample.updatedAt * 1000;
      }
      // Parse tags from JSON string to array
      if (sample.tags && typeof sample.tags === "string") {
        try {
          sample.tags = JSON.parse(sample.tags);
        } catch (e) {
          sample.tags = [];
        }
      } else if (!sample.tags) {
        sample.tags = [];
      }
      return sample;
    });

    // Get total count for pagination
    let countQuery: any = db.select({ count: samples.id }).from(samples);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const totalResult = await countQuery;
    const total = totalResult.length;

    return {
      samples: convertedResults,
      pagination: {
        total,
        limit: params.limit,
        offset: params.offset,
        hasMore: total > params.offset + params.limit,
      },
    };
  } catch (error) {
    console.error("Error fetching samples:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch samples",
    });
  }
});
