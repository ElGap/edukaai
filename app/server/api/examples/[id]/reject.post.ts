import { z } from 'zod'
import { getDb } from '../../../db'
import { examples } from '../../../db/schema'
import { eq } from 'drizzle-orm'

const paramsSchema = z.object({
  id: z.coerce.number()
})

export default defineEventHandler(async (event) => {
  try {
    const params = await getValidatedRouterParams(event, paramsSchema.parse)
    
    const db = getDb()
    
    // Check if example exists
    const existing = await db.select().from(examples).where(eq(examples.id, params.id)).limit(1)
    
    if (existing.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Example not found'
      })
    }
    
    const result = await db.update(examples)
      .set({
        status: 'rejected',
        updatedAt: new Date()
      })
      .where(eq(examples.id, params.id))
      .returning()
    
    return {
      success: true,
      message: 'Example rejected successfully',
      example: result[0]
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid example ID'
      })
    }
    
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }
    
    console.error('Error rejecting example:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to reject example'
    })
  }
})
