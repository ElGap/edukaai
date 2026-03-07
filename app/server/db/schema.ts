import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

// Training Examples Table
export const examples = sqliteTable('examples', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  
  // Core Fields (Required)
  instruction: text('instruction').notNull(),
  input: text('input'),  // Optional context
  output: text('output').notNull(),
  
  // Metadata Fields
  systemPrompt: text('system_prompt'),  // System prompt used
  category: text('category').default('general'),  // coding, analysis, explanation, etc.
  difficulty: text('difficulty').default('intermediate'),  // beginner, intermediate, advanced
  qualityRating: integer('quality_rating').default(3),  // 1-5 stars
  notes: text('notes'),  // User notes about example
  tags: text('tags'),  // JSON array of tags
  
  // Source Tracking
  source: text('source').default('manual'),  // manual, claude, cursor, opencode
  model: text('model'),  // Model used (for auto-captured)
  sessionId: text('session_id'),  // Original session ID
  messageId: text('message_id'),  // Original message ID
  
  // Technical (Auto-captured when available)
  tokensIn: integer('tokens_in'),  // Input tokens
  tokensOut: integer('tokens_out'),  // Output tokens
  cost: real('cost'),  // Cost in USD
  toolsUsed: text('tools_used'),  // JSON array of tool names
  
  // Review Status
  status: text('status').default('draft'),  // draft, review, approved, rejected
  
  // Timestamps
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Import Sessions Table
export const importSessions = sqliteTable('import_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  source: text('source').notNull(),  // claude, cursor, opencode
  filePath: text('file_path'),  // Path to imported file
  dateFrom: integer('date_from', { mode: 'timestamp' }),
  dateTo: integer('date_to', { mode: 'timestamp' }),
  totalEntries: integer('total_entries').default(0),
  importedCount: integer('imported_count').default(0),
  skippedCount: integer('skipped_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Milestones Table
export const milestones = sqliteTable('milestones', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  targetCount: integer('target_count').notNull(),
  achievedAt: integer('achieved_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// User Settings Table
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').unique().notNull(),
  value: text('value'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export type Example = typeof examples.$inferSelect
export type NewExample = typeof examples.$inferInsert
export type ImportSession = typeof importSessions.$inferSelect
export type Milestone = typeof milestones.$inferSelect
export type Setting = typeof settings.$inferSelect
