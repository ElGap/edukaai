import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'

let db: ReturnType<typeof drizzle> | null = null
let initialized = false

function initDatabase(sqlite: Database.Database) {
  if (initialized) return
  
  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS examples (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      instruction TEXT NOT NULL,
      input TEXT,
      output TEXT NOT NULL,
      system_prompt TEXT,
      category TEXT DEFAULT 'general',
      difficulty TEXT DEFAULT 'intermediate',
      quality_rating INTEGER DEFAULT 3,
      notes TEXT,
      tags TEXT,
      source TEXT DEFAULT 'manual',
      model TEXT,
      session_id TEXT,
      message_id TEXT,
      tokens_in INTEGER,
      tokens_out INTEGER,
      cost REAL,
      tools_used TEXT,
      status TEXT DEFAULT 'draft',
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS import_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      file_path TEXT,
      date_from INTEGER,
      date_to INTEGER,
      total_entries INTEGER DEFAULT 0,
      imported_count INTEGER DEFAULT 0,
      skipped_count INTEGER DEFAULT 0,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      target_count INTEGER NOT NULL,
      achieved_at INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    );
  `)
  
  initialized = true
}

export function getDb(databaseUrl?: string) {
  if (!db) {
    const url = databaseUrl || process.env.DATABASE_URL || './data/edukaai.db'
    const sqlite = new Database(url)
    initDatabase(sqlite)
    db = drizzle(sqlite, { schema })
  }
  return db
}

export type Database = ReturnType<typeof getDb>
