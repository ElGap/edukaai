/**
 * EdukaAI Storage Interface
 *
 * This interface defines the contract that all storage backends must implement.
 * Storage backends can be provided via npm packages (e.g., @elgap/edukaai-storage-postgres)
 */

// Base entity types
export interface Example {
  id: number;
  datasetId: number;
  datasetName: string | null;
  instruction: string;
  input: string | null;
  output: string;
  systemPrompt: string | null;
  category: string;
  difficulty: string;
  qualityRating: number;
  notes: string | null;
  tags: string | null;
  source: string;
  model: string | null;
  sessionId: string | null;
  messageId: string | null;
  tokensIn: number | null;
  tokensOut: number | null;
  cost: number | null;
  toolsUsed: string | null;
  temperature: number | null;
  topP: number | null;
  topK: number | null;
  maxTokens: number | null;
  frequencyPenalty: number | null;
  presencePenalty: number | null;
  stopSequences: string | null;
  seed: number | null;
  context: string | null;
  metadata: string | null;
  status: "draft" | "review" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface Dataset {
  id: number;
  name: string;
  description: string | null;
  isActive: number;
  isArchived: number;
  defaultQuality: string;
  defaultCategory: string;
  defaultAutoApprove: number;
  sampleCount: number;
  approvedCount: number;
  lastImportAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImportSession {
  id: number;
  source: string;
  filePath: string | null;
  dateFrom: Date | null;
  dateTo: Date | null;
  totalEntries: number;
  importedCount: number;
  skippedCount: number;
  createdAt: Date;
}

export interface Milestone {
  id: number;
  name: string;
  description: string | null;
  targetCount: number;
  achievedAt: Date | null;
  createdAt: Date;
}

export interface Setting {
  id: number;
  key: string;
  value: string | null;
  updatedAt: Date;
}

// Query filters
export interface SampleFilters {
  datasetId?: number;
  status?: string;
  source?: string;
  category?: string;
  search?: string;
  sort?: "newest" | "oldest" | "quality";
  limit?: number;
  offset?: number;
}

export interface DatasetFilters {
  isArchived?: boolean;
  isActive?: boolean;
}

// Storage query builder interface
export interface QueryBuilder<T> {
  where(conditions: Partial<T>): QueryBuilder<T>;
  orderBy(field: keyof T, direction: "asc" | "desc"): QueryBuilder<T>;
  limit(count: number): QueryBuilder<T>;
  offset(count: number): QueryBuilder<T>;
  execute(): Promise<T[]>;
  count(): Promise<number>;
}

// Stats result
export interface Stats {
  total: number;
  approved: number;
  draft: number;
  rejected: number;
  sources: Record<string, number>;
  categories: Record<string, number>;
  difficulties: Record<string, number>;
}

/**
 * Main Storage Interface
 * All storage backends must implement this interface
 */
export interface StorageBackend {
  /** Unique identifier for this storage backend */
  readonly name: string;

  /** Initialize the storage (create tables, indexes, etc.) */
  initialize(): Promise<void>;

  /** Check if storage is connected and ready */
  isHealthy(): Promise<boolean>;

  /** Close storage connections */
  close(): Promise<void>;

  // ==================== EXAMPLES ====================

  /** Create a new example */
  createExample(
    example: Omit<Example, "id" | "createdAt" | "updatedAt">,
  ): Promise<Example>;

  /** Get example by ID */
  getExample(id: number): Promise<Example | null>;

  /** Get examples with filters */
  getExamples(
    filters?: SampleFilters,
  ): Promise<{ examples: Example[]; total: number }>;

  /** Update an example */
  updateExample(id: number, updates: Partial<Example>): Promise<Example | null>;

  /** Delete an example */
  deleteExample(id: number): Promise<boolean>;

  /** Bulk update examples */
  bulkUpdateExamples(ids: number[], updates: Partial<Example>): Promise<number>;

  /** Approve an example */
  approveExample(id: number): Promise<Example | null>;

  /** Reject an example */
  rejectExample(id: number): Promise<Example | null>;

  // ==================== DATASETS ====================

  /** Create a new dataset */
  createDataset(
    dataset: Omit<Dataset, "id" | "createdAt" | "updatedAt">,
  ): Promise<Dataset>;

  /** Get dataset by ID */
  getDataset(id: number): Promise<Dataset | null>;

  /** Get all datasets */
  getDatasets(filters?: DatasetFilters): Promise<Dataset[]>;

  /** Get active dataset */
  getActiveDataset(): Promise<Dataset | null>;

  /** Update a dataset */
  updateDataset(id: number, updates: Partial<Dataset>): Promise<Dataset | null>;

  /** Delete/archive a dataset */
  deleteDataset(id: number): Promise<boolean>;

  /** Activate a dataset (deactivates all others) */
  activateDataset(id: number): Promise<Dataset | null>;

  /** Move examples from one dataset to another */
  moveExamplesToDataset(
    sampleIds: number[],
    targetDatasetId: number,
  ): Promise<number>;

  /** Update dataset statistics */
  updateDatasetStats(datasetId: number): Promise<void>;

  // ==================== SETTINGS ====================

  /** Get setting by key */
  getSetting(key: string): Promise<Setting | null>;

  /** Set/update setting */
  setSetting(key: string, value: string): Promise<Setting>;

  /** Delete setting */
  deleteSetting(key: string): Promise<boolean>;

  // ==================== IMPORT SESSIONS ====================

  /** Create import session */
  createImportSession(
    session: Omit<ImportSession, "id" | "createdAt">,
  ): Promise<ImportSession>;

  /** Get import session by ID */
  getImportSession(id: number): Promise<ImportSession | null>;

  /** Get all import sessions */
  getImportSessions(): Promise<ImportSession[]>;

  /** Update import session */
  updateImportSession(
    id: number,
    updates: Partial<ImportSession>,
  ): Promise<ImportSession | null>;

  // ==================== MILESTONES ====================

  /** Create milestone */
  createMilestone(
    milestone: Omit<Milestone, "id" | "createdAt">,
  ): Promise<Milestone>;

  /** Get all milestones */
  getMilestones(): Promise<Milestone[]>;

  /** Mark milestone as achieved */
  achieveMilestone(id: number): Promise<Milestone | null>;

  // ==================== STATISTICS ====================

  /** Get overall statistics */
  getStats(): Promise<Stats>;

  /** Get dataset-specific statistics */
  getDatasetStats(datasetId: number): Promise<Stats>;
}

/**
 * Storage Backend Factory Interface
 * Each storage package exports a factory that creates the backend
 */
export interface StorageBackendFactory {
  /** Backend name/identifier */
  readonly name: string;

  /** Create storage backend instance */
  create(config: Record<string, any>): StorageBackend;

  /** Validate configuration */
  validateConfig(config: Record<string, any>): {
    valid: boolean;
    errors: string[];
  };
}

/**
 * Storage Configuration
 */
export interface StorageConfig {
  /** Backend name (e.g., 'sqlite', 'postgres', 'mongodb') */
  backend: string;

  /** Backend-specific configuration */
  config: Record<string, any>;
}
