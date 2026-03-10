import { getDb } from '../../db'
import { samples, datasets, userSettings } from '../../db/schema'
import { eq, and, isNull } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    // Get total count
    const totalResult = await db.select().from(samples)
    const total = totalResult.length
    
    // Get approved count
    const approvedResult = await db.select().from(samples).where(eq(samples.status, 'approved'))
    const approved = approvedResult.length
    
    // Get draft count
    const draftResult = await db.select().from(samples).where(eq(samples.status, 'draft'))
    const draft = draftResult.length
    
    // Get by source breakdown
    const sources: Record<string, number> = {}
    for (const sample of totalResult) {
      const source = sample.source || 'unknown'
      sources[source] = (sources[source] || 0) + 1
    }
    
    // Get by category breakdown
    const categories: Record<string, number> = {}
    for (const sample of totalResult) {
      const category = sample.category || 'unknown'
      categories[category] = (categories[category] || 0) + 1
    }
    
    // Get by difficulty breakdown
    const difficulties: Record<string, number> = {}
    for (const sample of totalResult) {
      const difficulty = sample.difficulty || 'unknown'
      difficulties[difficulty] = (difficulties[difficulty] || 0) + 1
    }
    
    // Get user settings (global default)
    const userSettingsResult = await db.select().from(userSettings).where(eq(userSettings.id, 1))
    const globalDefaultGoal = userSettingsResult[0]?.defaultGoalSamples || 100
    
    // Get active dataset and its goal
    const activeDatasetResult = await db.select().from(datasets).where(eq(datasets.isActive, 1))
    const activeDataset = activeDatasetResult[0]
    const activeDatasetGoal = activeDataset?.goalSamples || globalDefaultGoal
    
    return {
      total,
      approved,
      draft,
      rejected: total - approved - draft,
      sources,
      categories,
      difficulties,
      progress: {
        current: total,
        target: activeDatasetGoal,
        percentage: Math.round((total / activeDatasetGoal) * 100)
      },
      globalDefaultGoal,
      activeDatasetGoal,
      activeDatasetName: activeDataset?.name || null
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch statistics'
    })
  }
})