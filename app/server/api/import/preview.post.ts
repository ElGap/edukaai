import { z } from 'zod'
import { parseClaudeLogs, parseCursorLogs, parseOpenCodeLogs, parseChatGPTLogs, parseCopilotLogs } from '../../utils/capture'

const previewSchema = z.object({
  source: z.enum(['claude', 'cursor', 'opencode', 'chatgpt', 'copilot']),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  filePath: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = previewSchema.parse(body)
    
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
    
    // Format examples for frontend
    const formattedExamples = result.examples.map(ex => ({
      id: ex.id,
      instruction: ex.instruction.slice(0, 200) + (ex.instruction.length > 200 ? '...' : ''),
      input: ex.input,
      output: ex.output?.slice(0, 300) + (ex.output?.length > 300 ? '...' : ''),
      category: ex.category,
      difficulty: ex.difficulty,
      qualityRating: ex.qualityRating,
      confidence: ex.confidence,
      needsReview: ex.needsReview,
      source: ex.source,
      model: ex.model,
      tokensIn: ex.tokensIn,
      tokensOut: ex.tokensOut,
      sessionId: ex.sessionId,
      messageId: ex.messageId
    }))
    
    return {
      examples: formattedExamples,
      stats: result.stats,
      errors: result.errors
    }
    
  } catch (error) {
    console.error('Error in import preview:', error)
    
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.errors
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to preview import'
    })
  }
})
