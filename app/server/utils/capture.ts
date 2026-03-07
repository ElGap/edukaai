/**
 * Capture logic integrated directly into web app
 * This avoids workspace dependency issues
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

// Types
export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    model?: string
    tokensIn?: number
    tokensOut?: number
    cost?: number
    toolsUsed?: string[]
  }
}

export interface ConversationSession {
  id: string
  title?: string
  messages: ConversationMessage[]
  startTime: Date
  endTime?: Date
  metadata?: {
    source: 'claude' | 'cursor' | 'opencode'
    projectPath?: string
    totalTokens?: number
  }
}

export interface ExtractedExample {
  id: string
  instruction: string
  input?: string
  output: string
  systemPrompt?: string
  category?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  qualityRating?: number
  notes?: string
  tags?: string[]
  source: 'claude' | 'cursor' | 'opencode' | 'chatgpt' | 'copilot'
  model?: string
  sessionId: string
  messageId: string
  timestamp: Date
  tokensIn?: number
  tokensOut?: number
  cost?: number
  toolsUsed?: string[]
  confidence: number
  needsReview: boolean
}

export interface ParseResult {
  examples: ExtractedExample[]
  stats: {
    totalSessions: number
    totalMessages: number
    extractedExamples: number
    needsReview: number
  }
  errors: string[]
}

// Utility functions
export function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

export function extractDateFromPath(path: string): Date | undefined {
  const patterns = [
    /(\d{4}-\d{2}-\d{2})/,
    /(\d{4}_\d{2}_\d{2})/,
    /(\d{4}\d{2}\d{2})/
  ]
  
  for (const pattern of patterns) {
    const match = path.match(pattern)
    if (match) {
      const date = new Date(match[1].replace(/_/g, '-'))
      if (!isNaN(date.getTime())) {
        return date
      }
    }
  }
  return undefined
}

export function isDateInRange(date: Date, from?: Date, to?: Date): boolean {
  if (from && date < from) return false
  if (to && date > to) return false
  return true
}

// Category detection
function detectCategory(instruction: string, output: string): string {
  const text = (instruction + ' ' + output).toLowerCase()
  
  if (text.includes('code') || text.includes('function') || text.includes('programming') || 
      text.includes('javascript') || text.includes('python') || text.includes('api')) {
    return 'coding'
  }
  
  if (text.includes('analyze') || text.includes('analysis') || text.includes('data') || 
      text.includes('report') || text.includes('statistics')) {
    return 'analysis'
  }
  
  if (text.includes('explain') || text.includes('how') || text.includes('what is') || 
      text.includes('tutorial') || text.includes('guide')) {
    return 'explanation'
  }
  
  if (text.includes('write') || text.includes('essay') || text.includes('story') || 
      text.includes('blog') || text.includes('article')) {
    return 'writing'
  }
  
  if (text.includes('math') || text.includes('calculate') || text.includes('equation')) {
    return 'math'
  }
  
  if (text.includes('science') || text.includes('biology') || text.includes('physics')) {
    return 'science'
  }
  
  return 'general'
}

// Difficulty detection
function detectDifficulty(instruction: string, output: string): 'beginner' | 'intermediate' | 'advanced' {
  const text = instruction + ' ' + output
  const words = text.split(/\s+/).length
  const codeBlocks = (text.match(/```/g) || []).length / 2
  
  if (words < 100 && codeBlocks === 0) return 'beginner'
  if (words > 500 || codeBlocks > 3) return 'advanced'
  return 'intermediate'
}

// Confidence calculation
function calculateConfidence(instruction: string, output: string): number {
  let score = 0.5
  
  if (instruction.length > 20 && instruction.length < 2000) score += 0.1
  if (output.length > 50 && output.length < 5000) score += 0.1
  
  if (instruction.includes('?') || instruction.toLowerCase().includes('how') || 
      instruction.toLowerCase().includes('what')) {
    score += 0.1
  }
  
  if (output.length > instruction.length * 0.5) score += 0.1
  
  if (instruction.length < 10) score -= 0.2
  if (output.length < 20) score -= 0.2
  
  return Math.max(0, Math.min(1, score))
}

// Extract examples from session
export function extractExamplesFromSession(
  session: ConversationSession,
  minConfidence: number = 0.7
): ExtractedExample[] {
  const examples: ExtractedExample[] = []
  const messages = session.messages
  
  for (let i = 0; i < messages.length - 1; i++) {
    const userMsg = messages[i]
    const assistantMsg = messages[i + 1]
    
    if (userMsg.role === 'user' && assistantMsg.role === 'assistant') {
      let systemPrompt: string | undefined
      for (let j = Math.max(0, i - 3); j < i; j++) {
        if (messages[j].role === 'system') {
          systemPrompt = messages[j].content
          break
        }
      }
      
      const category = detectCategory(userMsg.content, assistantMsg.content)
      const difficulty = detectDifficulty(userMsg.content, assistantMsg.content)
      const confidence = calculateConfidence(userMsg.content, assistantMsg.content)
      
      if (confidence >= minConfidence) {
        examples.push({
          id: `${session.id}_${i}`,
          instruction: userMsg.content,
          output: assistantMsg.content,
          systemPrompt,
          category,
          difficulty,
          qualityRating: 3,
          source: session.metadata?.source || 'manual',
          model: assistantMsg.metadata?.model,
          sessionId: session.id,
          messageId: userMsg.id,
          timestamp: userMsg.timestamp,
          tokensIn: userMsg.metadata?.tokensIn,
          tokensOut: assistantMsg.metadata?.tokensOut,
          cost: assistantMsg.metadata?.cost,
          toolsUsed: assistantMsg.metadata?.toolsUsed,
          confidence,
          needsReview: confidence < 0.85
        })
      }
    }
  }
  
  return examples
}

// Claude adapter
export async function parseClaudeLogs(
  filePath?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ParseResult> {
  const examples: ExtractedExample[] = []
  const errors: string[] = []
  
  const homeDir = homedir()
  const defaultPaths = [
    join(homeDir, '.claude/logs'),
    join(homeDir, '.claude/conversations'),
    join(homeDir, 'Library/Application Support/Claude/logs'),
    '/tmp/claude-logs'
  ]
  
  let filesToProcess: string[] = []
  
  if (filePath) {
    filesToProcess = [filePath]
  } else {
    // Find all JSON files in default paths
    for (const dirPath of defaultPaths) {
      if (existsSync(dirPath)) {
        try {
          const files = readdirSync(dirPath)
            .filter(f => f.endsWith('.json'))
            .map(f => join(dirPath, f))
          filesToProcess.push(...files)
        } catch {
          // Directory exists but can't read
        }
      }
    }
  }
  
  if (filesToProcess.length === 0) {
    errors.push('No Claude log files found. Checked: ' + defaultPaths.join(', '))
  }
  
  // Filter by date range
  if (dateFrom || dateTo) {
    filesToProcess = filesToProcess.filter(filePath => {
      const fileDate = extractDateFromPath(filePath)
      if (!fileDate) return true
      return isDateInRange(fileDate, dateFrom, dateTo)
    })
  }
  
  // Parse files
  let totalSessions = 0
  let totalMessages = 0
  
  for (const file of filesToProcess) {
    try {
      const content = readFileSync(file, 'utf-8')
      const conversation = safeJsonParse<any>(content)
      
      if (!conversation || !conversation.messages) {
        errors.push(`Invalid format in ${file}`)
        continue
      }
      
      totalSessions++
      
      const messages: ConversationMessage[] = conversation.messages.map((msg: any, idx: number) => ({
        id: `${conversation.id || 'unknown'}_${idx}`,
        role: msg.role || msg.type === 'user' ? 'user' : 
              msg.type === 'assistant' ? 'assistant' : 'assistant',
        content: msg.content,
        timestamp: new Date(msg.timestamp || Date.now()),
        metadata: msg.metadata || (msg.usage ? {
          tokensIn: msg.usage.input_tokens,
          tokensOut: msg.usage.output_tokens
        } : undefined)
      }))
      
      totalMessages += messages.length
      
      const session: ConversationSession = {
        id: conversation.id || `session_${Date.now()}`,
        title: conversation.title,
        messages,
        startTime: new Date(conversation.created_at || Date.now()),
        metadata: { source: 'claude', projectPath: conversation.project_path }
      }
      
      const sessionExamples = extractExamplesFromSession(session, 0.5)
      examples.push(...sessionExamples)
      
    } catch (error) {
      errors.push(`Error reading ${file}: ${error}`)
    }
  }
  
  return {
    examples,
    stats: {
      totalSessions,
      totalMessages,
      extractedExamples: examples.length,
      needsReview: examples.filter(e => e.needsReview).length
    },
    errors
  }
}

// Cursor adapter
export async function parseCursorLogs(
  filePath?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ParseResult> {
  const examples: ExtractedExample[] = []
  const errors: string[] = []
  
  const homeDir = homedir()
  const defaultPaths = [
    join(homeDir, '.cursor/chats'),
    join(homeDir, '.cursor/conversations'),
    join(homeDir, 'Library/Application Support/Cursor/User/globalStorage/cursor/chats'),
    join(homeDir, 'Library/Application Support/Cursor/chats')
  ]
  
  let filesToProcess: string[] = []
  
  if (filePath) {
    filesToProcess = [filePath]
  } else {
    for (const dirPath of defaultPaths) {
      if (existsSync(dirPath)) {
        try {
          const files = readdirSync(dirPath)
            .filter(f => f.endsWith('.json'))
            .map(f => join(dirPath, f))
          filesToProcess.push(...files)
        } catch {}
      }
    }
  }
  
  if (filesToProcess.length === 0) {
    errors.push('No Cursor log files found.')
  }
  
  // Filter by date
  if (dateFrom || dateTo) {
    filesToProcess = filesToProcess.filter(filePath => {
      const fileDate = extractDateFromPath(filePath)
      if (!fileDate) return true
      return isDateInRange(fileDate, dateFrom, dateTo)
    })
  }
  
  let totalSessions = 0
  let totalMessages = 0
  
  for (const file of filesToProcess) {
    try {
      const content = readFileSync(file, 'utf-8')
      const session = safeJsonParse<any>(content)
      
      if (!session) {
        errors.push(`Invalid format in ${file}`)
        continue
      }
      
      totalSessions++
      
      const messages: ConversationMessage[] = (session.messages || []).map((msg: any, idx: number) => ({
        id: `${session.id}_${idx}`,
        role: msg.role || 'assistant',
        content: msg.content,
        timestamp: new Date((msg.timestamp || session.created_at || Date.now()) * 1000),
        metadata: msg.usage ? {
          tokensIn: msg.usage.prompt_tokens,
          tokensOut: msg.usage.completion_tokens,
          model: msg.model || session.model
        } : undefined
      }))
      
      totalMessages += messages.length
      
      const convSession: ConversationSession = {
        id: session.id,
        title: session.title,
        messages,
        startTime: new Date((session.created_at || Date.now()) * 1000),
        metadata: { source: 'cursor', projectPath: session.workspace }
      }
      
      const sessionExamples = extractExamplesFromSession(convSession, 0.5)
      examples.push(...sessionExamples)
      
    } catch (error) {
      errors.push(`Error reading ${file}: ${error}`)
    }
  }
  
  return {
    examples,
    stats: {
      totalSessions,
      totalMessages,
      extractedExamples: examples.length,
      needsReview: examples.filter(e => e.needsReview).length
    },
    errors
  }
}

// OpenCode adapter (limited)
export async function parseOpenCodeLogs(
  filePath?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ParseResult> {
  const examples: ExtractedExample[] = []
  const errors: string[] = [
    '⚠️ OpenCode has limited log access.',
    'Only basic metadata can be imported. Full conversation content may not be available.',
    'Recommendation: Use Claude Code or Cursor for complete imports.'
  ]
  
  const homeDir = homedir()
  const defaultPaths = [
    join(homeDir, '.opencode/logs'),
    join(homeDir, '.opencode/sessions'),
    join(homeDir, 'Library/Application Support/OpenCode/logs')
  ]
  
  let filesToProcess: string[] = []
  
  if (filePath && existsSync(filePath)) {
    filesToProcess = [filePath]
  } else {
    for (const dirPath of defaultPaths) {
      if (existsSync(dirPath)) {
        try {
          const files = readdirSync(dirPath)
            .filter(f => f.endsWith('.json') || f.endsWith('.log'))
            .map(f => join(dirPath, f))
          filesToProcess.push(...files)
        } catch {}
      }
    }
  }
  
  // Filter by date
  if (dateFrom || dateTo) {
    filesToProcess = filesToProcess.filter(filePath => {
      const fileDate = extractDateFromPath(filePath)
      if (!fileDate) return true
      return isDateInRange(fileDate, dateFrom, dateTo)
    })
  }
  
  let totalSessions = 0
  let totalMessages = 0
  
  for (const file of filesToProcess) {
    try {
      const content = readFileSync(file, 'utf-8')
      let data = safeJsonParse<any>(content)
      
      // If not JSON, try log format
      if (!data) {
        const lines = content.split('\n')
        const messages: any[] = []
        for (const line of lines) {
          const match = line.match(/^\[(\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2})\]\s*\[(\w+)\]\s*(.+)$/)
          if (match) {
            messages.push({
              timestamp: match[1],
              role: match[2].toLowerCase(),
              content: match[3]
            })
          }
        }
        if (messages.length > 0) {
          data = { messages }
        }
      }
      
      if (!data || !data.messages) {
        continue
      }
      
      totalSessions++
      
      const messages: ConversationMessage[] = data.messages.map((msg: any, idx: number) => ({
        id: `msg_${idx}`,
        role: msg.role || 'assistant',
        content: msg.content || '',
        timestamp: new Date(msg.timestamp || Date.now())
      }))
      
      totalMessages += messages.length
      
      const session: ConversationSession = {
        id: data.id || `opencode_${Date.now()}`,
        messages,
        startTime: new Date(),
        metadata: { source: 'opencode' }
      }
      
      const sessionExamples = extractExamplesFromSession(session, 0.3) // Lower threshold for OpenCode
      
      // Mark all as needing review
      sessionExamples.forEach(ex => {
        ex.needsReview = true
        ex.notes = '[Imported from OpenCode - limited metadata. Please verify content.]'
      })
      
      examples.push(...sessionExamples)
      
    } catch (error) {
      errors.push(`Error reading ${file}: ${error}`)
    }
  }
  
  if (examples.length === 0) {
    errors.push('')
    errors.push('To import from OpenCode:')
    errors.push('1. Copy-paste conversations manually into the form')
    errors.push('2. Or use Claude Code/Cursor for automatic import')
    errors.push('3. Or create examples manually')
  }
  
  return {
    examples,
    stats: {
      totalSessions,
      totalMessages,
      extractedExamples: examples.length,
      needsReview: examples.length
    },
    errors
  }
}

// ChatGPT adapter
export async function parseChatGPTLogs(
  filePath?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ParseResult> {
  const examples: ExtractedExample[] = []
  const errors: string[] = []
  
  const homeDir = homedir()
  const defaultPaths = [
    join(homeDir, 'Downloads/chatgpt_conversations.json'),
    join(homeDir, 'Downloads/conversations.json'),
    join(homeDir, 'Documents/chatgpt_export.json'),
    join(homeDir, '.chatgpt/export.json')
  ]
  
  let filesToProcess: string[] = []
  
  if (filePath && existsSync(filePath)) {
    filesToProcess = [filePath]
  } else {
    for (const path of defaultPaths) {
      if (existsSync(path)) {
        filesToProcess.push(path)
      }
    }
  }
  
  if (filesToProcess.length === 0) {
    errors.push('No ChatGPT export files found.')
    errors.push('')
    errors.push('To export your ChatGPT conversations:')
    errors.push('1. Go to chat.openai.com → Settings → Data controls')
    errors.push('2. Click "Export data"')
    errors.push('3. Download the ZIP file and extract conversations.json')
    errors.push('4. Place it in your Downloads folder')
  }
  
  let totalSessions = 0
  let totalMessages = 0
  
  for (const file of filesToProcess) {
    try {
      const content = readFileSync(file, 'utf-8')
      const data = safeJsonParse<any>(content)
      
      if (!data) {
        errors.push(`Invalid JSON format in ${file}`)
        continue
      }
      
      // ChatGPT export format can be an array or have a conversations property
      const conversations = Array.isArray(data) ? data : data.conversations || []
      
      for (const conv of conversations) {
        if (!conv.mapping && !conv.messages) continue
        
        totalSessions++
        
        // Extract messages from ChatGPT format
        const messages: ConversationMessage[] = []
        
        if (conv.mapping) {
          // Newer ChatGPT format
          const nodeIds = Object.keys(conv.mapping)
          for (const nodeId of nodeIds) {
            const node = conv.mapping[nodeId]
            if (node.message) {
              const role = node.message.author?.role || 'assistant'
              messages.push({
                id: nodeId,
                role: role === 'user' ? 'user' : 'assistant',
                content: node.message.content?.parts?.join('') || node.message.content?.text || '',
                timestamp: new Date(node.message.create_time * 1000 || Date.now()),
                metadata: node.message.metadata
              })
            }
          }
        } else if (conv.messages) {
          // Alternative format
          for (const msg of conv.messages) {
            messages.push({
              id: msg.id || `msg_${messages.length}`,
              role: msg.role || 'assistant',
              content: typeof msg.content === 'string' ? msg.content : msg.content?.text || '',
              timestamp: new Date(msg.create_time * 1000 || Date.now())
            })
          }
        }
        
        totalMessages += messages.length
        
        // Sort by timestamp
        messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        
        // Filter by date
        if (dateFrom || dateTo) {
          const sessionDate = messages[0]?.timestamp || new Date()
          if (!isDateInRange(sessionDate, dateFrom, dateTo)) continue
        }
        
        const session: ConversationSession = {
          id: conv.id || conv.conversation_id || `chatgpt_${Date.now()}`,
          title: conv.title || 'Untitled Chat',
          messages,
          startTime: messages[0]?.timestamp || new Date(),
          metadata: { 
            source: 'chatgpt',
            projectPath: conv.model || 'unknown'
          }
        }
        
        const sessionExamples = extractExamplesFromSession(session, 0.5)
        examples.push(...sessionExamples)
      }
      
    } catch (error) {
      errors.push(`Error reading ${file}: ${error}`)
    }
  }
  
  return {
    examples,
    stats: {
      totalSessions,
      totalMessages,
      extractedExamples: examples.length,
      needsReview: examples.filter(e => e.needsReview).length
    },
    errors
  }
}

// GitHub Copilot adapter
export async function parseCopilotLogs(
  filePath?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ParseResult> {
  const examples: ExtractedExample[] = []
  const errors: string[] = []
  
  const homeDir = homedir()
  const defaultPaths = [
    join(homeDir, '.vscode/copilot/sessions.json'),
    join(homeDir, 'Library/Application Support/Code/User/globalStorage/github.copilot/chatSessions.json'),
    join(homeDir, '.config/Code/User/globalStorage/github.copilot/chatSessions.json'),
    join(homeDir, '.copilot/conversations.json')
  ]
  
  let filesToProcess: string[] = []
  
  if (filePath && existsSync(filePath)) {
    filesToProcess = [filePath]
  } else {
    for (const path of defaultPaths) {
      if (existsSync(path)) {
        filesToProcess.push(path)
      }
    }
  }
  
  if (filesToProcess.length === 0) {
    errors.push('No GitHub Copilot chat files found.')
    errors.push('')
    errors.push('GitHub Copilot stores chat history in VS Code.')
    errors.push('Copilot import is limited to available VS Code storage.')
    errors.push('For best results, copy-paste important Copilot conversations manually.')
  }
  
  let totalSessions = 0
  let totalMessages = 0
  
  for (const file of filesToProcess) {
    try {
      const content = readFileSync(file, 'utf-8')
      const data = safeJsonParse<any>(content)
      
      if (!data) {
        errors.push(`Invalid format in ${file}`)
        continue
      }
      
      // Copilot format varies, try different structures
      const sessions = data.sessions || data.conversations || data.chats || 
                       (Array.isArray(data) ? data : [data])
      
      for (const session of sessions) {
        if (!session.messages && !session.chat) continue
        
        totalSessions++
        
        const messages: ConversationMessage[] = []
        const rawMessages = session.messages || session.chat || []
        
        for (const msg of rawMessages) {
          const role = msg.role || msg.type || 'assistant'
          messages.push({
            id: msg.id || `msg_${messages.length}`,
            role: role === 'user' ? 'user' : 'assistant',
            content: msg.content || msg.text || msg.message || '',
            timestamp: new Date(msg.timestamp || msg.created_at || Date.now())
          })
        }
        
        totalMessages += messages.length
        
        // Filter by date
        if (dateFrom || dateTo) {
          const sessionDate = messages[0]?.timestamp || new Date()
          if (!isDateInRange(sessionDate, dateFrom, dateTo)) continue
        }
        
        const convSession: ConversationSession = {
          id: session.id || session.sessionId || `copilot_${Date.now()}`,
          title: session.title || 'Copilot Chat',
          messages,
          startTime: messages[0]?.timestamp || new Date(),
          metadata: { 
            source: 'copilot',
            projectPath: session.workspace || session.project
          }
        }
        
        // Copilot conversations are often coding-focused
        const sessionExamples = extractExamplesFromSession(convSession, 0.5)
        
        // Mark Copilot examples as coding category by default
        sessionExamples.forEach(ex => {
          if (!ex.category || ex.category === 'general') {
            ex.category = 'coding'
          }
          ex.notes = (ex.notes || '') + ' [Imported from GitHub Copilot]'
        })
        
        examples.push(...sessionExamples)
      }
      
    } catch (error) {
      errors.push(`Error reading ${file}: ${error}`)
    }
  }
  
  return {
    examples,
    stats: {
      totalSessions,
      totalMessages,
      extractedExamples: examples.length,
      needsReview: examples.filter(e => e.needsReview).length
    },
    errors
  }
}
