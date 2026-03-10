# Pluggable Storage System

EdukaAI now supports multiple storage backends through a pluggable architecture. By default, SQLite is used, but you can easily switch to PostgreSQL, MongoDB, or any custom backend by installing the appropriate npm package.

## Quick Start

### Default (SQLite) - Works Out of the Box

No configuration needed. SQLite is included by default:

```bash
npm install -g @elgap/edukaai
edukaai
```

Data is stored in `./data/edukaai.db`.

### Using PostgreSQL

1. Install the PostgreSQL storage package:

```bash
npm install -g @elgap/edukaai @elgap/edukaai-storage-postgres
```

2. Set environment variables:

```bash
export EDUKAAI_STORAGE_BACKEND=postgres
export EDUKAAI_DB_HOST=localhost
export EDUKAAI_DB_PORT=5432
export EDUKAAI_DB_NAME=edukaai
export EDUKAAI_DB_USER=edukaai
export EDUKAAI_DB_PASSWORD=yourpassword
```

3. Run EdukaAI:

```bash
edukaai
```

### Using MongoDB

1. Install the MongoDB storage package:

```bash
npm install -g @elgap/edukaai @elgap/edukaai-storage-mongodb
```

2. Set environment variables:

```bash
export EDUKAAI_STORAGE_BACKEND=mongodb
export EDUKAAI_MONGO_URI=mongodb://localhost:27017/edukaai
```

3. Run EdukaAI:

```bash
edukaai
```

## Environment Variables

### Storage Selection

| Variable                  | Description            | Default  |
| ------------------------- | ---------------------- | -------- |
| `EDUKAAI_STORAGE_BACKEND` | Storage backend to use | `sqlite` |

### SQLite Configuration

| Variable       | Description                  | Default             |
| -------------- | ---------------------------- | ------------------- |
| `DATABASE_URL` | Path to SQLite database file | `./data/edukaai.db` |

### PostgreSQL Configuration

| Variable              | Description          | Default     |
| --------------------- | -------------------- | ----------- |
| `EDUKAAI_DB_HOST`     | Database server host | `localhost` |
| `EDUKAAI_DB_PORT`     | Database server port | `5432`      |
| `EDUKAAI_DB_NAME`     | Database name        | `edukaai`   |
| `EDUKAAI_DB_USER`     | Database user        | `edukaai`   |
| `EDUKAAI_DB_PASSWORD` | Database password    | (empty)     |

### MongoDB Configuration

| Variable            | Description            | Default                             |
| ------------------- | ---------------------- | ----------------------------------- |
| `EDUKAAI_MONGO_URI` | MongoDB connection URI | `mongodb://localhost:27017/edukaai` |

## Available Storage Backends

### Official Packages

| Backend    | Package                           | Status         |
| ---------- | --------------------------------- | -------------- |
| SQLite     | Built-in                          | ✅ Available   |
| PostgreSQL | `@elgap/edukaai-storage-postgres` | 🚧 Coming Soon |
| MongoDB    | `@elgap/edukaai-storage-mongodb`  | 🚧 Coming Soon |

### Community Packages

Want to create a storage backend? See the **Creating Custom Backends** section below.

## Architecture

### Storage Interface

All storage backends implement the `StorageBackend` interface:

```typescript
interface StorageBackend {
  readonly name: string;

  // Lifecycle
  initialize(): Promise<void>;
  isHealthy(): Promise<boolean>;
  close(): Promise<void>;

  // Examples
  createExample(example: Omit<Example, "id">): Promise<Example>;
  getExample(id: number): Promise<Example | null>;
  getExamples(
    filters?: ExampleFilters,
  ): Promise<{ examples: Example[]; total: number }>;
  updateExample(id: number, updates: Partial<Example>): Promise<Example | null>;
  deleteExample(id: number): Promise<boolean>;

  // Datasets
  createDataset(dataset: Omit<Dataset, "id">): Promise<Dataset>;
  getDataset(id: number): Promise<Dataset | null>;
  getDatasets(filters?: DatasetFilters): Promise<Dataset[]>;
  activateDataset(id: number): Promise<Dataset | null>;

  // ... and more
}
```

### Storage Factory

Each storage package exports a factory:

```typescript
interface StorageBackendFactory {
  readonly name: string;
  create(config: Record<string, any>): StorageBackend;
  validateConfig(config: Record<string, any>): {
    valid: boolean;
    errors: string[];
  };
}
```

## Creating Custom Backends

Want to add support for MySQL, DynamoDB, or a custom API? It's easy!

### 1. Create a New Package

```bash
mkdir edukaai-storage-mysql
cd edukaai-storage-mysql
npm init
```

### 2. Implement the Storage Interface

```typescript
// src/index.ts
import type {
  StorageBackend,
  StorageBackendFactory,
  Example,
  Dataset,
  // ... other types
} from "@elgap/edukaai/storage";

export class MySQLStorage implements StorageBackend {
  readonly name = "mysql";
  private connection: any;

  constructor(config: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  }) {
    // Initialize MySQL connection
  }

  async initialize(): Promise<void> {
    // Create tables
  }

  async isHealthy(): Promise<boolean> {
    // Health check
    return true;
  }

  async close(): Promise<void> {
    // Close connection
  }

  async createExample(example: Omit<Example, "id">): Promise<Example> {
    // Insert and return with ID
  }

  // ... implement all other methods
}

// Export the factory
export const mysqlStorageFactory: StorageBackendFactory = {
  name: "mysql",

  create(config) {
    return new MySQLStorage(config);
  },

  validateConfig(config) {
    const errors: string[] = [];
    if (!config.host) errors.push("host is required");
    if (!config.database) errors.push("database is required");
    return { valid: errors.length === 0, errors };
  },
};

export default mysqlStorageFactory;
```

### 3. Package.json Configuration

```json
{
  "name": "edukaai-storage-mysql",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@elgap/edukaai": "^0.1.0"
  },
  "dependencies": {
    "mysql2": "^3.0.0"
  }
}
```

### 4. Register Your Backend

Users can register your backend:

```typescript
import { registerStorageFactory } from "@elgap/edukaai/storage";
import { mysqlStorageFactory } from "edukaai-storage-mysql";

registerStorageFactory(mysqlStorageFactory);
```

Or if the package follows naming conventions, it will be auto-discovered!

### Auto-Discovery

Packages matching these patterns are auto-discovered:

- `@elgap/edukaai-storage-*`
- `edukaai-storage-*`

Just install the package and EdukaAI will find it automatically.

## Migration Between Backends

To migrate data from one backend to another:

```typescript
// migration.ts
import {
  createStorage,
  getActiveStorage,
  setActiveStorage,
} from "@elgap/edukaai/storage";

// Connect to source (SQLite)
const sqlite = createStorage("sqlite", {
  databaseUrl: "./data/edukaai.db",
});
await setActiveStorage(sqlite);

// Export all data
const { examples } = await sqlite.getExamples({ limit: 10000 });
const datasets = await sqlite.getDatasets();

// Connect to target (PostgreSQL)
const postgres = createStorage("postgres", {
  host: "localhost",
  database: "edukaai",
  user: "edukaai",
  password: "password",
});

await postgres.initialize();

// Import data
for (const dataset of datasets) {
  await postgres.createDataset(dataset);
}

for (const example of examples) {
  await postgres.createExample(example);
}

console.log(
  `Migrated ${examples.length} examples and ${datasets.length} datasets`,
);
```

## For Developers

### Using Storage API Directly

```typescript
import { getStorage } from "~/server/storage";

// In your API route
export default defineEventHandler(async (event) => {
  const storage = getStorage();

  // Create example
  const example = await storage.createExample({
    datasetId: 1,
    instruction: "What is 2+2?",
    output: "4",
    category: "math",
    source: "manual",
    status: "draft",
  });

  // Query examples
  const { examples, total } = await storage.getExamples({
    datasetId: 1,
    status: "approved",
    limit: 10,
  });

  return { examples, total };
});
```

### Backward Compatibility

Existing code using `getDb()` still works:

```typescript
import { getDb } from "~/server/db";

// This still works - now uses pluggable storage internally
const db = await getDb();
const examples = await db.query.examples.findMany();
```

The `getDb()` function is now a compatibility layer that uses the pluggable storage system internally.

## Troubleshooting

### "Storage backend not found"

Make sure you've installed the storage package:

```bash
npm install -g @elgap/edukaai-storage-postgres
```

### "Invalid configuration"

Check that all required environment variables are set:

```bash
# For PostgreSQL
export EDUKAAI_DB_HOST=localhost
export EDUKAAI_DB_NAME=edukaai
export EDUKAAI_DB_USER=edukaai
```

### Auto-discovery not working

If your storage package isn't being auto-discovered:

1. Check the package name matches the pattern `@elgap/edukaai-storage-*` or `edukaai-storage-*`
2. Ensure the package exports a default factory with `create` and `validateConfig` methods
3. Try manually registering the factory

## Contributing

Want to add a new official storage backend? See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](../LICENSE) file
