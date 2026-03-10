/**
 * EdukaAI Storage System
 *
 * Pluggable storage architecture supporting multiple backends.
 *
 * Usage:
 * ```typescript
 * import {
 *   initializeStorage,
 *   getStorage,
 *   registerStorageFactory
 * } from '~/server/storage';
 *
 * // Use default SQLite
 * await initializeStorage();
 *
 * // Or use a different backend
 * await initializeStorage({
 *   backend: 'postgres',
 *   config: { host: 'localhost', database: 'edukaai' }
 * });
 *
 * // Get storage instance
 * const storage = getStorage();
 * const examples = await storage.getExamples();
 * ```
 */

// Export types
export type {
  StorageBackend,
  StorageBackendFactory,
  StorageConfig,
  Example,
  Dataset,
  ImportSession,
  Milestone,
  Setting,
  SampleFilters,
  DatasetFilters,
  Stats,
  QueryBuilder,
} from "./types";

// Export registry functions
export {
  registerStorageFactory,
  unregisterStorageFactory,
  getAvailableBackends,
  isBackendRegistered,
  validateStorageConfig,
  createStorage,
  setActiveStorage,
  getActiveStorage,
  hasActiveStorage,
  getActiveStorageName,
  closeActiveStorage,
  autoDiscoverStorageBackends,
  initializeStorageFromConfig,
} from "./registry";

// Export SQLite backend
export { SQLiteStorage, sqliteStorageFactory } from "./backends/sqlite";

// Re-export convenient functions
import { initializeStorageFromConfig, getActiveStorage } from "./registry";

/**
 * Initialize storage from environment or config
 * Alias for initializeStorageFromConfig
 */
export const initializeStorage = initializeStorageFromConfig;

/**
 * Get the current storage instance
 * Alias for getActiveStorage
 */
export const getStorage = getActiveStorage;
