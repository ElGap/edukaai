import { getDb } from "../../../db";
import { datasets, samples } from "../../../db/schema";
import { eq } from "drizzle-orm";

/**
 * DELETE /api/datasets/[id]
 * Delete a dataset permanently - also deletes all associated samples
 */
export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid dataset ID",
      });
    }

    const db = getDb();

    // Check if dataset exists
    const dataset = await db.query.datasets.findFirst({
      where: (datasets, { eq }) => eq(datasets.id, id),
    });

    if (!dataset) {
      throw createError({
        statusCode: 404,
        statusMessage: "Dataset not found",
      });
    }

    // Cannot delete the last dataset
    const allDatasets = await db.query.datasets.findMany();

    if (allDatasets.length <= 1) {
      throw createError({
        statusCode: 400,
        statusMessage: "Cannot delete the last dataset. Create a new one first.",
      });
    }

    // If this was the active dataset, we need to activate another one
    if (dataset.isActive === 1) {
      // Find another dataset to activate
      const otherDataset = allDatasets.find((d: any) => d.id !== id);
      if (otherDataset) {
        await db
          .update(datasets)
          .set({ isActive: 1, updatedAt: new Date() })
          .where(eq(datasets.id, otherDataset.id as number));
      }
    }

    // Delete all samples in this dataset
    await db.delete(samples).where(eq(samples.datasetId, id));

    // Delete the dataset permanently
    await db.delete(datasets).where(eq(datasets.id, id));

    return {
      success: true,
      message: `Dataset "${dataset.name}" and all ${dataset.sampleCount || 0} samples have been permanently deleted.`,
    };
  } catch (error) {
    console.error("Error deleting dataset:", error);
    throw error;
  }
});
