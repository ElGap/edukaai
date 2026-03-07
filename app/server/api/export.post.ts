import { z } from 'zod'
import { getDb } from '../db'
import { examples } from '../db/schema'
import { eq, and, gte } from 'drizzle-orm'

const exportSchema = z.object({
  format: z.enum(['alpaca', 'sharegpt', 'jsonl', 'json', 'csv']),
  status: z.enum(['all', 'approved', 'draft', 'review']).default('all'),
  split: z.enum(['none', '90-10', '80-20', '70-30']).default('none'),
  minQuality: z.number().min(1).max(5).optional(),
  categories: z.array(z.string()).optional(),
  includeMetadata: z.boolean().default(true)
})

// Format converters
function toAlpacaFormat(example: any) {
  return {
    instruction: example.instruction,
    input: example.input || '',
    output: example.output,
    system: example.systemPrompt || undefined
  }
}

function toShareGPTFormat(example: any) {
  const conversations = [
    { from: 'human', value: example.instruction },
    { from: 'gpt', value: example.output }
  ]
  
  if (example.systemPrompt) {
    conversations.unshift({ from: 'system', value: example.systemPrompt })
  }
  
  if (example.input) {
    conversations[0].value = `${example.instruction}\n\nContext: ${example.input}`
  }
  
  return { conversations }
}

function toCSVFormat(example: any) {
  const escapeCSV = (str: string) => {
    if (!str) return ''
    str = str.replace(/"/g, '""')
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      str = `"${str}"`
    }
    return str
  }
  
  return [
    escapeCSV(example.instruction),
    escapeCSV(example.input || ''),
    escapeCSV(example.output),
    escapeCSV(example.systemPrompt || ''),
    example.category || 'general',
    example.difficulty || 'intermediate',
    example.qualityRating || 3,
    example.status || 'draft',
    example.source || 'manual',
    example.model || '',
    example.createdAt ? new Date(example.createdAt).toISOString() : ''
  ].join(',')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const params = exportSchema.parse(body)
    
    const db = getDb()
    
    // Build query
    let query = db.select().from(examples)
    
    // Filter by status
    if (params.status !== 'all') {
      query = query.where(eq(examples.status, params.status))
    }
    
    // Filter by minimum quality
    if (params.minQuality) {
      query = query.where(gte(examples.qualityRating, params.minQuality))
    }
    
    // Filter by categories
    if (params.categories && params.categories.length > 0) {
      // SQLite doesn't support array contains directly, filter in JS
    }
    
    const allExamples = await query
    
    // Apply category filter in JS if needed
    let filteredExamples = allExamples
    if (params.categories && params.categories.length > 0) {
      filteredExamples = allExamples.filter(ex => 
        params.categories!.includes(ex.category || 'general')
      )
    }
    
    if (filteredExamples.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No examples match the selected filters'
      })
    }
    
    // Prepare data based on format
    let exportData: any
    let contentType: string
    let fileExtension: string
    
    switch (params.format) {
      case 'alpaca':
        exportData = filteredExamples.map(toAlpacaFormat)
        contentType = 'application/json'
        fileExtension = 'json'
        break
        
      case 'sharegpt':
        exportData = filteredExamples.map(toShareGPTFormat)
        contentType = 'application/json'
        fileExtension = 'json'
        break
        
      case 'jsonl':
        exportData = filteredExamples.map(ex => JSON.stringify(toAlpacaFormat(ex))).join('\n')
        contentType = 'application/jsonl'
        fileExtension = 'jsonl'
        break
        
      case 'json':
        exportData = {
          dataset: filteredExamples.map(ex => ({
            ...toAlpacaFormat(ex),
            metadata: params.includeMetadata ? {
              category: ex.category,
              difficulty: ex.difficulty,
              qualityRating: ex.qualityRating,
              status: ex.status,
              source: ex.source,
              model: ex.model,
              tags: ex.tags ? JSON.parse(ex.tags) : [],
              createdAt: ex.createdAt,
              notes: ex.notes
            } : undefined
          })),
          stats: {
            total: filteredExamples.length,
            categories: {} as Record<string, number>,
            avgQuality: filteredExamples.reduce((sum, ex) => sum + (ex.qualityRating || 3), 0) / filteredExamples.length
          }
        }
        
        // Count categories
        filteredExamples.forEach(ex => {
          const cat = ex.category || 'general'
          exportData.stats.categories[cat] = (exportData.stats.categories[cat] || 0) + 1
        })
        
        contentType = 'application/json'
        fileExtension = 'json'
        break
        
      case 'csv':
        const headers = ['instruction', 'input', 'output', 'system', 'category', 'difficulty', 'quality', 'status', 'source', 'model', 'created_at']
        const rows = filteredExamples.map(toCSVFormat)
        exportData = [headers.join(','), ...rows].join('\n')
        contentType = 'text/csv'
        fileExtension = 'csv'
        break
    }
    
    // Handle train/validation split
    let trainData = exportData
    let valData: any = null
    
    if (params.split !== 'none' && params.format !== 'csv') {
      const [trainRatio, valRatio] = params.split.split('-').map(Number)
      const total = filteredExamples.length
      const trainCount = Math.floor(total * (trainRatio / 100))
      
      // Shuffle for random split
      const shuffled = [...filteredExamples].sort(() => Math.random() - 0.5)
      const trainExamples = shuffled.slice(0, trainCount)
      const valExamples = shuffled.slice(trainCount)
      
      if (params.format === 'jsonl') {
        trainData = trainExamples.map(ex => JSON.stringify(toAlpacaFormat(ex))).join('\n')
        valData = valExamples.map(ex => JSON.stringify(toAlpacaFormat(ex))).join('\n')
      } else {
        trainData = trainExamples.map(toAlpacaFormat)
        valData = valExamples.map(toAlpacaFormat)
      }
      
      // Return both splits
      return {
        success: true,
        format: params.format,
        splits: {
          train: {
            data: trainData,
            count: trainExamples.length,
            filename: `train_${params.format}.${fileExtension}`
          },
          validation: {
            data: valData,
            count: valExamples.length,
            filename: `validation_${params.format}.${fileExtension}`
          }
        },
        total: filteredExamples.length,
        contentType
      }
    }
    
    // Return single file
    return {
      success: true,
      format: params.format,
      data: exportData,
      count: filteredExamples.length,
      filename: `dataset_${params.format}.${fileExtension}`,
      contentType
    }
    
  } catch (error) {
    console.error('Error exporting dataset:', error)
    
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.errors
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to export dataset'
    })
  }
})
