/**
 * SQLite Storage Backend
 *
 * Default storage implementation using better-sqlite3.
 * This is the built-in backend that works out of the box.
 */

import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../db/schema";
import { eq, and, desc, asc, like, or, SQL } from "drizzle-orm";
import type {
  StorageBackend,
  Example,
  Dataset,
  ImportSession,
  Milestone,
  Setting,
  SampleFilters,
  DatasetFilters,
  Stats,
} from "../types";

export interface SQLiteStorageConfig {
  /** Database file path */
  databaseUrl: string;
}

export class SQLiteStorage implements StorageBackend {
  readonly name = "sqlite";
  private db: ReturnType<typeof drizzle>;
  private sqlite: Database.Database;

  constructor(config: SQLiteStorageConfig) {
    // Ensure data directory exists
    const dbDir = path.dirname(config.databaseUrl);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Initialize SQLite connection
    this.sqlite = new Database(config.databaseUrl);
    this.sqlite.pragma("journal_mode = WAL");

    // Initialize Drizzle ORM
    this.db = drizzle(this.sqlite, { schema });
  }

  async initialize(): Promise<void> {
    // Create tables if they don't exist
    this.sqlite.exec(`
      CREATE TABLE IF NOT EXISTS datasets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        is_active INTEGER DEFAULT 0,
        is_archived INTEGER DEFAULT 0,
        default_quality TEXT DEFAULT 'medium',
        default_category TEXT DEFAULT 'general',
        default_auto_approve INTEGER DEFAULT 0,
        sample_count INTEGER DEFAULT 0,
        approved_count INTEGER DEFAULT 0,
        last_import_at INTEGER,
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      );

      CREATE TABLE IF NOT EXISTS examples (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dataset_id INTEGER REFERENCES datasets(id),
        dataset_name TEXT,
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
        temperature REAL,
        top_p REAL,
        top_k INTEGER,
        max_tokens INTEGER,
        frequency_penalty REAL,
        presence_penalty REAL,
        stop_sequences TEXT,
        seed INTEGER,
        context TEXT,
        metadata TEXT,
        status TEXT DEFAULT 'draft',
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
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

      -- Create default dataset if none exists
      INSERT OR IGNORE INTO datasets (id, name, description, is_active, default_quality, default_category)
      VALUES (1, 'General', 'Default dataset for all examples', 1, 'medium', 'general');
    `);
  }

  async isHealthy(): Promise<boolean> {
    try {
      this.sqlite.prepare("SELECT 1").get();
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    this.sqlite.close();
  }

  // ==================== EXAMPLES ====================

  async createExample(
    example: Omit<Example, "id" | "createdAt" | "updatedAt">,
  ): Promise<Example> {
    const result = await this.db
      .insert(schema.examples)
      .values({
        ...example,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return this.mapExampleFromDB(result[0]);
  }

  async getExample(id: number): Promise<Example | null> {
    const result = await this.db.query.examples.findFirst({
      where: eq(schema.examples.id, id),
    });
    return result ? this.mapExampleFromDB(result) : null;
  }

  async getExamples(
    filters: ExampleFilters = {},
  ): Promise<{ examples: Example[]; total: number }> {
    const conditions: SQL[] = [];

    if (filters.datasetId) {
      conditions.push(eq(schema.examples.datasetId, filters.datasetId));
    }
    if (filters.status) {
      conditions.push(eq(schema.examples.status, filters.status));
    }
    if (filters.source) {
      conditions.push(eq(schema.examples.source, filters.source));
    }
    if (filters.category) {
      conditions.push(eq(schema.examples.category, filters.category));
    }
    if (filters.search) {
      const pattern = `%${filters.search}%`;
      conditions.push(
        or(
          like(schema.examples.instruction, pattern),
          like(schema.examples.output, pattern),
        ),
      );
    }

    // Build base query
    let query = this.db.select().from(schema.examples);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    if (filters.sort === "newest") {
      query = query.orderBy(desc(schema.examples.createdAt));
    } else if (filters.sort === "oldest") {
      query = query.orderBy(asc(schema.examples.createdAt));
    } else if (filters.sort === "quality") {
      query = query.orderBy(desc(schema.examples.qualityRating));
    }

    // Apply pagination
    const limit = filters.limit ?? 50;
    const offset = filters.offset ?? 0;
    query = query.limit(limit).offset(offset);

    const examples = await query;

    // Get total count
    let countQuery = this.db
      .select({ count: schema.examples.id })
      .from(schema.examples);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const countResult = await countQuery;
    const total = countResult.length;

    return {
      examples: examples.map((e) => this.mapExampleFromDB(e)),
      total,
    };
  }

  async updateExample(
    id: number,
    updates: Partial<Example>,
  ): Promise<Example | null> {
    const result = await this.db
      .update(schema.examples)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(schema.examples.id, id))
      .returning();

    return result.length > 0 ? this.mapExampleFromDB(result[0]) : null;
  }

  async deleteExample(id: number): Promise<boolean> {
    const result = await this.db
      .delete(schema.examples)
      .where(eq(schema.examples.id, id))
      .returning();
    return result.length > 0;
  }

  async bulkUpdateExamples(
    ids: number[],
    updates: Partial<Example>,
  ): Promise<number> {
    const result = await this.db
      .update(schema.examples)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(or(...ids.map((id) => eq(schema.examples.id, id))))
      .returning();
    return result.length;
  }

  async approveExample(id: number): Promise<Example | null> {
    return this.updateExample(id, { status: "approved" });
  }

  async rejectExample(id: number): Promise<Example | null> {
    return this.updateExample(id, { status: "rejected" });
  }

  // ==================== DATASETS ====================

  async createDataset(
    dataset: Omit<Dataset, "id" | "createdAt" | "updatedAt">,
  ): Promise<Dataset> {
    const result = await this.db
      .insert(schema.datasets)
      .values({
        ...dataset,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return this.mapDatasetFromDB(result[0]);
  }

  async getDataset(id: number): Promise<Dataset | null> {
    const result = await this.db.query.datasets.findFirst({
      where: eq(schema.datasets.id, id),
    });
    return result ? this.mapDatasetFromDB(result) : null;
  }

  async getDatasets(filters: DatasetFilters = {}): Promise<Dataset[]> {
    let query = this.db.select().from(schema.datasets);

    const conditions: SQL[] = [];
    if (filters.isArchived !== undefined) {
      conditions.push(
        eq(schema.datasets.isArchived, filters.isArchived ? 1 : 0),
      );
    }
    if (filters.isActive !== undefined) {
      conditions.push(eq(schema.datasets.isActive, filters.isActive ? 1 : 0));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const datasets = await query.orderBy(desc(schema.datasets.createdAt));
    return datasets.map((d) => this.mapDatasetFromDB(d));
  }

  async getActiveDataset(): Promise<Dataset | null> {
    const result = await this.db.query.datasets.findFirst({
      where: eq(schema.datasets.isActive, 1),
    });
    return result ? this.mapDatasetFromDB(result) : null;
  }

  async updateDataset(
    id: number,
    updates: Partial<Dataset>,
  ): Promise<Dataset | null> {
    const result = await this.db
      .update(schema.datasets)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(schema.datasets.id, id))
      .returning();

    return result.length > 0 ? this.mapDatasetFromDB(result[0]) : null;
  }

  async deleteDataset(id: number): Promise<boolean> {
    // Move examples to General dataset first
    const generalDataset = await this.db.query.datasets.findFirst({
      where: eq(schema.datasets.name, "General"),
    });

    if (generalDataset) {
      await this.db
        .update(schema.examples)
        .set({
          datasetId: generalDataset.id,
          datasetName: generalDataset.name,
        })
        .where(eq(schema.examples.datasetId, id));
    }

    // Deactivate if active
    const dataset = await this.getDataset(id);
    if (dataset?.isActive) {
      await this.db
        .update(schema.datasets)
        .set({ isActive: 0 })
        .where(eq(schema.datasets.id, id));
    }

    // Archive the dataset
    const result = await this.db
      .update(schema.datasets)
      .set({
        isArchived: 1,
        isActive: 0,
        sampleCount: 0,
        approvedCount: 0,
        updatedAt: new Date(),
      })
      .where(eq(schema.datasets.id, id))
      .returning();

    return result.length > 0;
  }

  async activateDataset(id: number): Promise<Dataset | null> {
    // Deactivate all datasets first
    await this.db.update(schema.datasets).set({ isActive: 0 });

    // Activate the target dataset
    const result = await this.db
      .update(schema.datasets)
      .set({
        isActive: 1,
        updatedAt: new Date(),
      })
      .where(eq(schema.datasets.id, id))
      .returning();

    return result.length > 0 ? this.mapDatasetFromDB(result[0]) : null;
  }

  async moveExamplesToDataset(
    sampleIds: number[],
    targetDatasetId: number,
  ): Promise<number> {
    const targetDataset = await this.getDataset(targetDatasetId);
    if (!targetDataset) return 0;

    const result = await this.db
      .update(schema.examples)
      .set({
        datasetId: targetDatasetId,
        datasetName: targetDataset.name,
      })
      .where(or(...sampleIds.map((id) => eq(schema.samples.id, id))))
      .returning();

    return result.length;
  }

  async updateDatasetStats(datasetId: number): Promise<void> {
    const allExamples = await this.db.query.examples.findMany({
      where: eq(schema.examples.datasetId, datasetId),
    });

      await this.db
      .update(schema.datasets)
      .set({
        sampleCount: allExamples.length,
        approvedCount: allExamples.filter((e) => e.status === "approved")
          .length,
      })
      .where(eq(schema.datasets.id, datasetId));
  }

  // ==================== SETTINGS ====================

  async getSetting(key: string): Promise<Setting | null> {
    const result = await this.db.query.settings.findFirst({
      where: eq(schema.settings.key, key),
    });
    return result || null;
  }

  async setSetting(key: string, value: string): Promise<Setting> {
    const result = await this.db
      .insert(schema.settings)
      .values({
        key,
        value,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.settings.key,
        set: {
          value,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  }

  async deleteSetting(key: string): Promise<boolean> {
    const result = await this.db
      .delete(schema.settings)
      .where(eq(schema.settings.key, key))
      .returning();
    return result.length > 0;
  }

  // ==================== IMPORT SESSIONS ====================

  async createImportSession(
    session: Omit<ImportSession, "id" | "createdAt">,
  ): Promise<ImportSession> {
    const result = await this.db
      .insert(schema.importSessions)
      .values({
        ...session,
        createdAt: new Date(),
      })
      .returning();

    return this.mapImportSessionFromDB(result[0]);
  }

  async getImportSession(id: number): Promise<ImportSession | null> {
    const result = await this.db.query.importSessions.findFirst({
      where: eq(schema.importSessions.id, id),
    });
    return result ? this.mapImportSessionFromDB(result) : null;
  }

  async getImportSessions(): Promise<ImportSession[]> {
    const sessions = await this.db.query.importSessions.findMany({
      orderBy: desc(schema.importSessions.createdAt),
    });
    return sessions.map((s) => this.mapImportSessionFromDB(s));
  }

  async updateImportSession(
    id: number,
    updates: Partial<ImportSession>,
  ): Promise<ImportSession | null> {
    const result = await this.db
      .update(schema.importSessions)
      .set(updates)
      .where(eq(schema.importSessions.id, id))
      .returning();

    return result.length > 0 ? this.mapImportSessionFromDB(result[0]) : null;
  }

  // ==================== MILESTONES ====================

  async createMilestone(
    milestone: Omit<Milestone, "id" | "createdAt">,
  ): Promise<Milestone> {
    const result = await this.db
      .insert(schema.milestones)
      .values({
        ...milestone,
        createdAt: new Date(),
      })
      .returning();

    return this.mapMilestoneFromDB(result[0]);
  }

  async getMilestones(): Promise<Milestone[]> {
    const milestones = await this.db.query.milestones.findMany({
      orderBy: desc(schema.milestones.createdAt),
    });
    return milestones.map((m) => this.mapMilestoneFromDB(m));
  }

  async achieveMilestone(id: number): Promise<Milestone | null> {
    const result = await this.db
      .update(schema.milestones)
      .set({
        achievedAt: new Date(),
      })
      .where(eq(schema.milestones.id, id))
      .returning();

    return result.length > 0 ? this.mapMilestoneFromDB(result[0]) : null;
  }

  // ==================== STATISTICS ====================

  async getStats(): Promise<Stats> {
    const allExamples = await this.db.query.examples.findMany();

    return this.calculateStats(allExamples);
  }

  async getDatasetStats(datasetId: number): Promise<Stats> {
    const examples = await this.db.query.examples.findMany({
      where: eq(schema.examples.datasetId, datasetId),
    });

    return this.calculateStats(examples);
  }

  // ==================== HELPERS ====================

  private calculateStats(examples: any[]): Stats {
    const stats: Stats = {
      total: examples.length,
      approved: 0,
      draft: 0,
      rejected: 0,
      sources: {},
      categories: {},
      difficulties: {},
    };

    for (const ex of examples) {
      // Status counts
      if (ex.status === "approved") stats.approved++;
      else if (ex.status === "draft") stats.draft++;
      else if (ex.status === "rejected") stats.rejected++;

      // Source counts
      if (ex.source) {
        stats.sources[ex.source] = (stats.sources[ex.source] || 0) + 1;
      }

      // Category counts
      if (ex.category) {
        stats.categories[ex.category] =
          (stats.categories[ex.category] || 0) + 1;
      }

      // Difficulty counts
      if (ex.difficulty) {
        stats.difficulties[ex.difficulty] =
          (stats.difficulties[ex.difficulty] || 0) + 1;
      }
    }

    return stats;
  }

  private mapExampleFromDB(row: any): Example {
    return {
      id: row.id,
      datasetId: row.datasetId,
      datasetName: row.datasetName,
      instruction: row.instruction,
      input: row.input,
      output: row.output,
      systemPrompt: row.systemPrompt,
      category: row.category,
      difficulty: row.difficulty,
      qualityRating: row.qualityRating,
      notes: row.notes,
      tags: row.tags,
      source: row.source,
      model: row.model,
      sessionId: row.sessionId,
      messageId: row.messageId,
      tokensIn: row.tokensIn,
      tokensOut: row.tokensOut,
      cost: row.cost,
      toolsUsed: row.toolsUsed,
      temperature: row.temperature,
      topP: row.topP,
      topK: row.topK,
      maxTokens: row.maxTokens,
      frequencyPenalty: row.frequencyPenalty,
      presencePenalty: row.presencePenalty,
      stopSequences: row.stopSequences,
      seed: row.seed,
      context: row.context,
      metadata: row.metadata,
      status: row.status,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }

  private mapDatasetFromDB(row: any): Dataset {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      isActive: row.isActive,
      isArchived: row.isArchived,
      defaultQuality: row.defaultQuality,
      defaultCategory: row.defaultCategory,
      defaultAutoApprove: row.defaultAutoApprove,
      sampleCount: row.sampleCount,
      approvedCount: row.approvedCount,
      lastImportAt: row.lastImportAt ? new Date(row.lastImportAt) : null,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }

  private mapImportSessionFromDB(row: any): ImportSession {
    return {
      id: row.id,
      source: row.source,
      filePath: row.filePath,
      dateFrom: row.dateFrom ? new Date(row.dateFrom) : null,
      dateTo: row.dateTo ? new Date(row.dateTo) : null,
      totalEntries: row.totalEntries,
      importedCount: row.importedCount,
      skippedCount: row.skippedCount,
      createdAt: new Date(row.createdAt),
    };
  }

  private mapMilestoneFromDB(row: any): Milestone {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      targetCount: row.targetCount,
      achievedAt: row.achievedAt ? new Date(row.achievedAt) : null,
      createdAt: new Date(row.createdAt),
    };
  }
}

// Storage backend factory
export const sqliteStorageFactory = {
  name: "sqlite",

  create(config: Record<string, any>): StorageBackend {
    return new SQLiteStorage({
      databaseUrl: config.databaseUrl || "./data/edukaai.db",
    });
  },

  validateConfig(config: Record<string, any>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (config.databaseUrl && typeof config.databaseUrl !== "string") {
      errors.push("databaseUrl must be a string");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

export default sqliteStorageFactory;
