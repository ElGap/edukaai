import { z } from 'zod'
import { getDb } from '../../db'
import { examples } from '../../db/schema'
import { desc, asc, like, and, eq, or } from 'drizzle-orm'

const querySchema = z.object({
  status: z.enum(['draft', 'review', 'approved', 'rejected']).optional(),
  source: z.enum(['manual', 'claude', 'cursor', 'opencode']).optional(),
  category: z.string().optional(),
  sort: z.enum(['newest', 'oldest', 'quality']).default('newest'),
  search: z.string().optional(),
  limit: z.coerce.number().default(50),
  offset: z.coerce.number().default(0)
})

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const params = querySchema.parse(query)
    
    const db = getDb()
    
    // Build where conditions
    const conditions = []
    
    if (params.status) {
      conditions.push(eq(examples.status, params.status))
    }
    
    if (params.source) {
      conditions.push(eq(examples.source, params.source))
    }
    
    if (params.category) {
      conditions.push(eq(examples.category, params.category))
    }
    
    if (params.search) {
      const searchPattern = `%${params.search}%`
      conditions.push(
        or(
          like(examples.instruction, searchPattern),
          like(examples.output, searchPattern)
        )
      )
    }
    
    // Build query
    let dbQuery = db.select().from(examples)
    
    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions))
    }
    
    // Apply sorting
    if (params.sort === 'newest') {
      dbQuery = dbQuery.orderBy(desc(examples.createdAt))
    } else if (params.sort === 'oldest') {
      dbQuery = dbQuery.orderBy(asc(examples.createdAt))
    } else if (params.sort === 'quality') {
      dbQuery = dbQuery.orderBy(desc(examples.qualityRating))
    }
    
    // Apply pagination
    dbQuery = dbQuery.limit(params.limit).offset(params.offset)
    
    // Execute query
    const results = await dbQuery
    
    // Get total count for pagination
    let countQuery = db.select({ count: examples.id }).from(examples)
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions))
    }
    const totalResult = await countQuery
    const total = totalResult.length
    
    return {
      examples: results,
      pagination: {
        total,
        limit: params.limit,
        offset: params.offset,
        hasMore: total > params.offset + params.limit
      }
    }
  } catch (error) {
    console.error('Error fetching examples:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch examples'
    })
  }
})
