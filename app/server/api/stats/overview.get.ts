import { getDb } from '../../db'
import { examples } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    // Get total count
    const totalResult = await db.select().from(examples)
    const total = totalResult.length
    
    // Get approved count
    const approvedResult = await db.select().from(examples).where(eq(examples.status, 'approved'))
    const approved = approvedResult.length
    
    // Get draft count
    const draftResult = await db.select().from(examples).where(eq(examples.status, 'draft'))
    const draft = draftResult.length
    
    // Get by source breakdown
    const sources: Record<string, number> = {}
    for (const example of totalResult) {
      sources[example.source] = (sources[example.source] || 0) + 1
    }
    
    // Get by category breakdown
    const categories: Record<string, number> = {}
    for (const example of totalResult) {
      categories[example.category] = (categories[example.category] || 0) + 1
    }
    
    // Get by difficulty breakdown
    const difficulties: Record<string, number> = {}
    for (const example of totalResult) {
      difficulties[example.difficulty] = (difficulties[example.difficulty] || 0) + 1
    }
    
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
        target: 1000,
        percentage: Math.round((total / 1000) * 100)
      }
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch statistics'
    })
  }
})
