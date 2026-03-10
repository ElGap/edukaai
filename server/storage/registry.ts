/**
 * Storage Backend Registry
 *
 * Manages available storage backends and creates instances.
 * Supports dynamic loading of storage backends from npm packages.
 */

import type { StorageBackend, StorageBackendFactory } from "./types";

// Registry of available storage factories
const storageFactories = new Map<string, StorageBackendFactory>();

// Currently active storage backend instance
let activeStorage: StorageBackend | null = null;

/**
 * Register a storage backend factory
 * @param factory - The factory to register
 */
export function registerStorageFactory(factory: StorageBackendFactory): void {
  if (storageFactories.has(factory.name)) {
    console.warn(
      `[Storage] Backend "${factory.name}" is already registered. Overwriting.`,
    );
  }
  storageFactories.set(factory.name, factory);
  console.log(`[Storage] Registered backend: ${factory.name}`);
}

/**
 * Unregister a storage backend factory
 * @param name - Backend name to unregister
 */
export function unregisterStorageFactory(name: string): void {
  if (storageFactories.has(name)) {
    storageFactories.delete(name);
    console.log(`[Storage] Unregistered backend: ${name}`);
  }
}

/**
 * Get all registered storage backend names
 */
export function getAvailableBackends(): string[] {
  return Array.from(storageFactories.keys());
}

/**
 * Check if a storage backend is registered
 */
export function isBackendRegistered(name: string): boolean {
  return storageFactories.has(name);
}

/**
 * Validate configuration for a storage backend
 */
export function validateStorageConfig(
  backend: string,
  config: Record<string, any>,
): { valid: boolean; errors: string[] } {
  const factory = storageFactories.get(backend);
  if (!factory) {
    return {
      valid: false,
      errors: [
        `Storage backend "${backend}" not found. Available: ${getAvailableBackends().join(", ")}`,
      ],
    };
  }
  return factory.validateConfig(config);
}

/**
 * Create a storage backend instance
 * @param backend - Backend name (e.g., 'sqlite', 'postgres')
 * @param config - Backend-specific configuration
 * @returns StorageBackend instance
 */
export function createStorage(
  backend: string,
  config: Record<string, any>,
): StorageBackend {
  const factory = storageFactories.get(backend);
  if (!factory) {
    const available = getAvailableBackends();
    throw new Error(
      `Storage backend "${backend}" not found. ` +
        `Available backends: ${available.length > 0 ? available.join(", ") : "none"}. ` +
        `To use ${backend}, install the appropriate package (e.g., @elgap/edukaai-storage-${backend})`,
    );
  }

  const validation = factory.validateConfig(config);
  if (!validation.valid) {
    throw new Error(
      `Invalid configuration for storage backend "${backend}":\n` +
        validation.errors.map((e) => `  - ${e}`).join("\n"),
    );
  }

  return factory.create(config);
}

/**
 * Set the active storage backend
 * This is the storage instance used throughout the application
 */
export async function setActiveStorage(storage: StorageBackend): Promise<void> {
  // Close existing storage if any
  if (activeStorage) {
    try {
      await activeStorage.close();
    } catch (error) {
      console.error("[Storage] Error closing previous storage:", error);
    }
  }

  // Initialize new storage
  await storage.initialize();

  // Verify health
  const healthy = await storage.isHealthy();
  if (!healthy) {
    throw new Error(
      `Storage backend "${storage.name}" failed health check after initialization`,
    );
  }

  activeStorage = storage;
  console.log(`[Storage] Active storage set to: ${storage.name}`);
}

/**
 * Get the active storage backend
 * @throws Error if no storage has been initialized
 */
export function getActiveStorage(): StorageBackend {
  if (!activeStorage) {
    throw new Error(
      "No storage backend has been initialized. " +
        "Call setActiveStorage() or use initializeStorage() before accessing storage.",
    );
  }
  return activeStorage;
}

/**
 * Check if a storage backend is active
 */
export function hasActiveStorage(): boolean {
  return activeStorage !== null;
}

/**
 * Get the name of the active storage backend
 */
export function getActiveStorageName(): string | null {
  return activeStorage?.name ?? null;
}

/**
 * Close and cleanup active storage
 */
export async function closeActiveStorage(): Promise<void> {
  if (activeStorage) {
    await activeStorage.close();
    console.log(`[Storage] Closed storage: ${activeStorage.name}`);
    activeStorage = null;
  }
}

/**
 * Auto-discover and load storage backends from installed packages
 * This searches for packages matching @elgap/edukaai-storage-* pattern
 */
export async function autoDiscoverStorageBackends(): Promise<void> {
  const backendPatterns = ["@elgap/edukaai-storage-", "edukaai-storage-"];

  // Get all dependencies from package.json
  try {
    const packageJson = await import("../../package.json");
    const allDeps: Record<string, string> = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    for (const [name] of Object.entries(allDeps)) {
      for (const pattern of backendPatterns) {
        if (name.includes(pattern)) {
          try {
            const module = await import(name);
            if (module.default && typeof module.default.create === "function") {
              registerStorageFactory(module.default);
            } else if (module.create && typeof module.create === "function") {
              registerStorageFactory(module as StorageBackendFactory);
            }
          } catch (error) {
            console.warn(
              `[Storage] Failed to load backend from ${name}:`,
              error,
            );
          }
          break;
        }
      }
    }
  } catch (error) {
    console.warn("[Storage] Failed to auto-discover backends:", error);
  }
}

/**
 * Initialize storage from environment configuration
 */
export async function initializeStorageFromConfig(): Promise<StorageBackend> {
  // Default to sqlite if not specified
  const backend = process.env.EDUKAAI_STORAGE_BACKEND || "sqlite";

  // Get backend-specific config from environment
  const config: Record<string, any> = {};

  // SQLite configuration
  if (backend === "sqlite") {
    config.databaseUrl = process.env.DATABASE_URL || "./data/edukaai.db";
  }

  // PostgreSQL configuration (example)
  if (backend === "postgres" || backend === "postgresql") {
    config.host = process.env.EDUKAAI_DB_HOST || "localhost";
    config.port = parseInt(process.env.EDUKAAI_DB_PORT || "5432");
    config.database = process.env.EDUKAAI_DB_NAME || "edukaai";
    config.user = process.env.EDUKAAI_DB_USER || "edukaai";
    config.password = process.env.EDUKAAI_DB_PASSWORD || "";
  }

  // MongoDB configuration (example)
  if (backend === "mongodb" || backend === "mongo") {
    config.uri =
      process.env.EDUKAAI_MONGO_URI || "mongodb://localhost:27017/edukaai";
  }

  // Create and set as active
  const storage = createStorage(backend, config);
  await setActiveStorage(storage);

  return storage;
}
