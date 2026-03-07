import { z } from 'zod'
import { getDb } from '../../db'
import { examples } from '../../db/schema'
import { parseClaudeLogs, parseCursorLogs, parseOpenCodeLogs, parseChatGPTLogs, parseCopilotLogs } from '../../utils/capture'

const importSchema = z.object({
  source: z.enum(['claude', 'cursor', 'opencode', 'chatgpt', 'copilot']),
  exampleIds: z.array(z.string()),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  filePath: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = importSchema.parse(body)
    
    if (data.exampleIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No examples selected for import'
      })
    }
    
    // Parse based on source
    let result
    switch (data.source) {
      case 'claude':
        result = await parseClaudeLogs(
          data.filePath,
          data.dateFrom ? new Date(data.dateFrom) : undefined,
          data.dateTo ? new Date(data.dateTo) : undefined
        )
        break
      case 'cursor':
        result = await parseCursorLogs(
          data.filePath,
          data.dateFrom ? new Date(data.dateFrom) : undefined,
          data.dateTo ? new Date(data.dateTo) : undefined
        )
        break
      case 'chatgpt':
        result = await parseChatGPTLogs(
          data.filePath,
          data.dateFrom ? new Date(data.dateFrom) : undefined,
          data.dateTo ? new Date(data.dateTo) : undefined
        )
        break
      case 'copilot':
        result = await parseCopilotLogs(
          data.filePath,
          data.dateFrom ? new Date(data.dateFrom) : undefined,
          data.dateTo ? new Date(data.dateTo) : undefined
        )
        break
      default:
        result = await parseOpenCodeLogs(
          data.filePath,
          data.dateFrom ? new Date(data.dateFrom) : undefined,
          data.dateTo ? new Date(data.dateTo) : undefined
        )
    }
    
    // Filter to selected examples
    const selectedExamples = result.examples.filter(ex => 
      data.exampleIds.includes(ex.id)
    )
    
    const db = getDb()
    let imported = 0
    let failed = 0
    const errors: string[] = []
    
    // Import each example
    for (const ex of selectedExamples) {
      try {
        await db.insert(examples).values({
          instruction: ex.instruction,
          input: ex.input || null,
          output: ex.output,
          systemPrompt: ex.systemPrompt || null,
          category: ex.category || 'general',
          difficulty: ex.difficulty || 'intermediate',
          qualityRating: ex.qualityRating || 3,
          notes: ex.notes || (ex.needsReview ? 'Imported from AI assistant - needs review' : null),
          tags: JSON.stringify(ex.tags || []),
          source: data.source,
          model: ex.model || null,
          sessionId: ex.sessionId,
          messageId: ex.messageId,
          tokensIn: ex.tokensIn || null,
          tokensOut: ex.tokensOut || null,
          cost: ex.cost || null,
          toolsUsed: ex.toolsUsed ? JSON.stringify(ex.toolsUsed) : null,
          status: ex.needsReview ? 'draft' : 'approved',
          updatedAt: new Date()
        })
        
        imported++
      } catch (error) {
        failed++
        errors.push(`Failed to import example ${ex.id}: ${error}`)
      }
    }
    
    return {
      success: true,
      imported,
      failed,
      errors: errors.slice(0, 5),
      message: `Successfully imported ${imported} examples from ${data.source}`
    }
    
  } catch (error) {
    console.error('Error importing examples:', error)
    
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.errors
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to import examples'
    })
  }
})
