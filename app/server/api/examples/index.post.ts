import { z } from 'zod'
import { getDb } from '../../db'
import { examples } from '../../db/schema'

const createExampleSchema = z.object({
  // Core Fields (Required)
  instruction: z.string().min(1, 'Instruction is required'),
  input: z.string().optional(),
  output: z.string().min(1, 'Output is required'),
  
  // Metadata Fields
  systemPrompt: z.string().optional(),
  category: z.enum(['general', 'coding', 'analysis', 'explanation', 'writing', 'math', 'science']).default('general'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  qualityRating: z.number().min(1).max(5).default(3),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  
  // Source Tracking
  source: z.enum(['manual', 'claude', 'cursor', 'opencode']).default('manual'),
  model: z.string().optional(),
  sessionId: z.string().optional(),
  messageId: z.string().optional(),
  
  // Technical
  tokensIn: z.number().optional(),
  tokensOut: z.number().optional(),
  cost: z.number().optional(),
  toolsUsed: z.array(z.string()).optional(),
  
  // Review Status
  status: z.enum(['draft', 'review', 'approved', 'rejected']).default('draft')
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createExampleSchema.parse(body)
    
    const db = getDb()
    
    const result = await db.insert(examples).values({
      instruction: data.instruction,
      input: data.input || null,
      output: data.output,
      systemPrompt: data.systemPrompt || null,
      category: data.category,
      difficulty: data.difficulty,
      qualityRating: data.qualityRating,
      notes: data.notes || null,
      tags: JSON.stringify(data.tags),
      source: data.source,
      model: data.model || null,
      sessionId: data.sessionId || null,
      messageId: data.messageId || null,
      tokensIn: data.tokensIn || null,
      tokensOut: data.tokensOut || null,
      cost: data.cost || null,
      toolsUsed: data.toolsUsed ? JSON.stringify(data.toolsUsed) : null,
      status: data.status,
      updatedAt: new Date()
    }).returning()
    
    return {
      success: true,
      example: result[0]
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.errors
      })
    }
    
    console.error('Error creating example:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create example'
    })
  }
})
