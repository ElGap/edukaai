import { z } from 'zod'
import { getDb } from '../../db'
import { samples, datasets } from '../../db/schema'
import { eq } from 'drizzle-orm'

const jsonImportSchema = z.object({
  samples: z.array(z.object({
    instruction: z.string().min(1),
    input: z.string().optional().nullable(),
    output: z.string().min(1),
    systemPrompt: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    difficulty: z.string().optional().nullable(),
    qualityRating: z.number().min(1).max(5).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
    notes: z.string().optional().nullable()
  })),
  format: z.enum(['alpaca', 'sharegpt', 'raw']).default('raw')
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = jsonImportSchema.parse(body)
    
    const db = getDb()
    
    // Get active dataset
    const activeDataset = await db.query.datasets.findFirst({
      where: eq(datasets.isActive, 1)
    })
    
    if (!activeDataset) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No active dataset. Please create and activate a dataset first.'
      })
    }
    
    let imported = 0
    let failed = 0
    const errors: string[] = []
    
    // Import each sample
    for (const ex of data.samples) {
      try {
        await db.insert(samples).values({
          datasetId: activeDataset.id,
          datasetName: activeDataset.name,
          instruction: ex.instruction,
          input: ex.input || null,
          output: ex.output,
          systemPrompt: ex.systemPrompt || null,
          category: ex.category || 'general',
          difficulty: ex.difficulty || 'intermediate',
          qualityRating: ex.qualityRating || 3,
          notes: ex.notes || null,
          tags: JSON.stringify(ex.tags || []),
          source: 'json',
          status: 'approved',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        
        imported++
      } catch (error) {
        failed++
        errors.push(`Failed to import: ${error}`)
      }
    }
    
    return {
      success: true,
      imported,
      failed,
      message: `Successfully imported ${imported} samples${failed > 0 ? `, ${failed} failed` : ''}`
    }
    
  } catch (error) {
    console.error('Error importing JSON:', error)
    
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(issue => {
        const path = issue.path.join('.')
        return `${path}: ${issue.message}`
      }).join('; ')
      
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid JSON format: ${issues}`,
        data: error.issues
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to import JSON'
    })
  }
})
