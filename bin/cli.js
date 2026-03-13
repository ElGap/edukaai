#!/usr/bin/env node

import { spawn } from "child_process";
import path from "path";
import os from "os";
import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the package root directory
const packageRoot = path.join(__dirname, "..");

// Load .env file if it exists
const envFilePath = path.join(packageRoot, ".env");
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  });
}

// Set default port to 3030 if not specified
const DEFAULT_PORT = "3030";
if (!process.env.EDUKAAI_PORT) {
  process.env.EDUKAAI_PORT = DEFAULT_PORT;
}

const dataDir = process.env.EDUKAAI_DATA_DIR || path.join(os.homedir(), ".edukaai");
const dbPath = process.env.DATABASE_URL || path.join(dataDir, "data.db");

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`📁 Created data directory: ${dataDir}`);
}

// Handle CLI commands
async function main() {
  switch (command) {
    case "reset":
    case "clean":
      await handleReset(args.slice(1));
      break;
    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;
    default:
      // No command - start the server (default behavior)
      startServer();
  }
}

function showHelp() {
  console.log(`
🎓 edukaAI CLI

Usage: edukaai [command] [options]

Commands:
  edukaai                    Start the edukaAI server (default)
  edukaai reset              Reset database completely (creates fresh General dataset)
  edukaai reset --force      Reset without confirmation
  edukaai clean              Alias for reset
  edukaai help               Show this help message

Environment Variables:
  EDUKAAI_PORT=3030         Server port (default: 3030)
  EDUKAAI_HOST=localhost    Server host (default: localhost)
  EDUKAAI_DATA_DIR=~/.edukaai  Data directory

Examples:
  # Start server with default settings
  edukaai

  # Reset database (confirmation required)
  edukaai reset

  # Force reset without confirmation
  edukaai reset --force

For more information, visit: https://github.com/elgap/edukaai
`);
}

async function handleReset(args) {
  const force = args.includes("--force") || args.includes("-f");

  console.log("⚠️  Database Reset");
  console.log("==================\n");
  console.log("This will delete ALL data including:");
  console.log("  - All training samples");
  console.log("  - All datasets");
  console.log("  - All import history");
  console.log(
    "\nA new default dataset will be created with name 'General' and default settings.\n"
  );

  if (!force) {
    console.log("Are you sure you want to continue? (yes/no)");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise((resolve) => {
      rl.question("Type 'yes' to proceed: ", (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase());
      });
    });

    if (answer !== "yes") {
      console.log("\n❌ Reset cancelled.");
      process.exit(0);
    }
  }

  console.log("\n🧹 Resetting database...\n");

  try {
    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);

    // Check if tables exist
    const tablesResult = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('samples', 'datasets', 'user_settings')"
      )
      .all();
    const existingTables = tablesResult.map((t) => t.name);

    // If no tables exist, create schema from migration
    if (existingTables.length === 0) {
      console.log("📭 Database is empty. Creating schema from migration...\n");

      // Read and apply the migration SQL
      const migrationPath = path.join(
        packageRoot,
        "server/db/migrations/0000_glorious_betty_brant.sql"
      );
      if (fs.existsSync(migrationPath)) {
        const migrationSql = fs.readFileSync(migrationPath, "utf-8");
        // Split by statement-breakpoint and execute each statement
        const statements = migrationSql
          .split("--> statement-breakpoint")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const statement of statements) {
          try {
            db.prepare(statement).run();
          } catch (e) {
            // Ignore errors for existing tables or indexes
            if (!e.message.includes("already exists")) {
              console.log(`   ⚠️ Migration step skipped: ${e.message}`);
            }
          }
        }
        console.log("   ✓ Schema created\n");
      } else {
        console.log("⚠️  Migration file not found. Please ensure migrations are generated.");
        console.log("   Run: npm run db:generate");
        process.exit(1);
      }
    }

    // Check if goal_name column exists (for older databases)
    const columnsResult = db.prepare("PRAGMA table_info(datasets)").all();
    const hasGoalName = columnsResult.some((col) => col.name === "goal_name");

    // Add goal_name column if missing (schema migration for existing tables)
    if (existingTables.includes("datasets") && !hasGoalName) {
      console.log("📦 Updating database schema...");
      try {
        db.prepare(
          "ALTER TABLE datasets ADD COLUMN goal_name text DEFAULT 'First Fine-Tuning'"
        ).run();
        console.log("   ✓ Added goal_name column\n");
      } catch (_e) {
        console.log("   ⚠️ Could not add goal_name column (may already exist)\n");
      }
    }

    // Get counts before deletion
    let sampleCount = 0;
    let datasetCount = 0;

    if (existingTables.includes("samples")) {
      const sampleCountResult = db.prepare("SELECT COUNT(*) as count FROM samples").get();
      sampleCount = sampleCountResult ? sampleCountResult.count : 0;
    }

    if (existingTables.includes("datasets")) {
      const datasetCountResult = db.prepare("SELECT COUNT(*) as count FROM datasets").get();
      datasetCount = datasetCountResult ? datasetCountResult.count : 0;
    }

    console.log(`📊 Current state:`);
    console.log(`   Samples: ${sampleCount}`);
    console.log(`   Datasets: ${datasetCount}\n`);

    // Delete all samples
    let deletedSamples = 0;
    if (existingTables.includes("samples")) {
      const deleteSamples = db.prepare("DELETE FROM samples");
      deletedSamples = deleteSamples.run().changes;
    }

    // Delete all datasets
    let deletedDatasets = 0;
    if (existingTables.includes("datasets")) {
      const deleteDatasets = db.prepare("DELETE FROM datasets");
      deletedDatasets = deleteDatasets.run().changes;

      // Reset auto-increment counter so IDs start from 1
      try {
        db.prepare("DELETE FROM sqlite_sequence WHERE name='datasets'").run();
      } catch (_e) {
        // sqlite_sequence might not exist or table wasn't using auto-increment
      }
    }

    // Create default dataset with correct schema (now with goal_name for sure)
    const insertSql = `
      INSERT INTO datasets (
        name, description, is_active, is_archived, default_quality, default_category, 
        default_auto_approve, goal_samples, goal_name, sample_count, approved_count,
        created_at, updated_at
      )
      VALUES (
        'General', 'Default dataset for training samples', 1, 0, 'medium', 'general', 
        0, 100, 'First Fine-Tuning', 0, 0,
        (strftime('%s', 'now') * 1000),
        (strftime('%s', 'now') * 1000)
      )
    `;

    const defaultDatasetResult = db.prepare(insertSql).run();

    // Reset user settings to defaults (if table exists)
    if (existingTables.includes("user_settings")) {
      try {
        db.prepare(
          `
          INSERT OR REPLACE INTO user_settings (id, default_goal_samples, default_auto_approve, theme)
          VALUES (1, 100, 0, 'system')
        `
        ).run();
      } catch (_e) {
        // Table might have different schema, that's ok
      }
    }

    db.close();

    console.log("✅ Database reset complete!");
    console.log(`   Deleted ${deletedSamples} samples`);
    console.log(`   Deleted ${deletedDatasets} datasets`);
    console.log(`   Created new 'General' dataset (ID: ${defaultDatasetResult.lastInsertRowid})`);
    console.log(`   Goal: First Fine-Tuning (100 samples)`);
    console.log(`   Dataset set as active\n`);

    console.log("💡 Tip: Start the server with 'edukaai' to begin fresh.");
  } catch (error) {
    console.error(`\n❌ Error resetting database: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }

  return addresses;
}

function startServer() {
  // Check if we're in development or production
  const isDev =
    process.env.NODE_ENV === "development" || !fs.existsSync(path.join(packageRoot, ".output"));

  const port = process.env.EDUKAAI_PORT || "3030";
  const host = process.env.EDUKAAI_HOST || "localhost";
  const networkIps = getNetworkInterfaces();

  console.log("🎓 edukaAI Starting...");
  console.log(`📊 Database: ${dbPath}`);
  console.log(`📂 Package root: ${packageRoot}`);
  console.log(`🌐 Port: ${port}`);

  // Show IP addresses
  if (host === "0.0.0.0" || host === "::") {
    console.log(`🌍 Listening on all interfaces:`);
    console.log(`   • Local: http://localhost:${port}`);
    console.log(`   • Local: http://127.0.0.1:${port}`);
    networkIps.forEach((ip) => {
      console.log(`   • Network: http://${ip}:${port}`);
    });
  } else {
    console.log(`🌐 Host: ${host}`);
    console.log(`🔗 Local URL: http://${host}:${port}`);
  }

  console.log("⏳ Initializing server...\n");

  if (isDev) {
    // Development mode - use nuxt dev with explicit port flag
    const nuxt = spawn("npx", ["nuxt", "dev", "--port", port], {
      stdio: "inherit",
      cwd: packageRoot,
      env: {
        ...process.env,
        DATABASE_URL: dbPath,
        NUXT_HOST: host,
      },
    });

    nuxt.on("close", (code) => {
      process.exit(code);
    });
  } else {
    // Production mode - use built output
    const outputPath = path.join(packageRoot, ".output/server/index.mjs");

    if (!fs.existsSync(outputPath)) {
      console.error("❌ Error: Built output not found. Please run: npm run build");
      console.error("   Or use development mode: NODE_ENV=development edukaai");
      process.exit(1);
    }

    const server = spawn("node", [outputPath], {
      stdio: "inherit",
      cwd: packageRoot,
      env: {
        ...process.env,
        DATABASE_URL: dbPath,
        PORT: port,
        HOST: host,
        NODE_ENV: "production",
      },
    });

    server.on("close", (code) => {
      process.exit(code);
    });
  }
}

// Run main
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
