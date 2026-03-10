#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");
const readline = require("readline");

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

const dataDir =
  process.env.EDUKAAI_DATA_DIR || path.join(os.homedir(), ".edukaai");
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
  edukaai reset               Reset database (keeps only General dataset)
  edukaai reset --force       Reset without confirmation
  edukaai clean               Alias for reset
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
  console.log("This will delete ALL examples and datasets except 'General'.");
  console.log(
    "The 'General' dataset will be reset to empty and set as active.\n",
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

  console.log("\n🧹 Cleaning database...\n");

  try {
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    // Get counts before deletion
    const exampleCount = db
      .prepare("SELECT COUNT(*) as count FROM examples")
      .get().count;
    const datasetCount = db
      .prepare("SELECT COUNT(*) as count FROM datasets")
      .get().count;

    console.log(`📊 Current state:`);
    console.log(`   Examples: ${exampleCount}`);
    console.log(`   Datasets: ${datasetCount}\n`);

    // Delete all examples
    const deleteExamples = db.prepare("DELETE FROM examples");
    const deletedExamples = deleteExamples.run().changes;

    // Delete all datasets except "General"
    const deleteDatasets = db.prepare(
      "DELETE FROM datasets WHERE name != 'General'",
    );
    const deletedDatasets = deleteDatasets.run().changes;

    // Reset General dataset stats
    db.prepare(
      `
      UPDATE datasets 
      SET example_count = 0, 
          approved_count = 0, 
          is_active = 1,
          last_import_at = NULL,
          updated_at = (strftime('%s', 'now') * 1000)
      WHERE name = 'General'
    `,
    ).run();

    // Ensure General dataset exists
    const generalExists = db
      .prepare("SELECT id FROM datasets WHERE name = 'General'")
      .get();
    if (!generalExists) {
      db.prepare(
        `
        INSERT INTO datasets (name, description, is_active, is_archived, default_quality, default_category, example_count, approved_count)
        VALUES ('General', 'Default dataset for all examples', 1, 0, 'medium', 'general', 0, 0)
      `,
      ).run();
    }

    // Reset other tables
    db.prepare("DELETE FROM import_sessions").run();
    db.prepare("DELETE FROM dataset_versions").run();
    db.prepare("DELETE FROM milestones").run();

    db.close();

    console.log("✅ Database reset complete!");
    console.log(`   Deleted ${deletedExamples} examples`);
    console.log(`   Deleted ${deletedDatasets} custom datasets`);
    console.log(`   'General' dataset reset to empty and set as active\n`);

    console.log("💡 Tip: Start the server with 'edukaai' to begin fresh.");
  } catch (error) {
    console.error(`\n❌ Error resetting database: ${error.message}`);
    process.exit(1);
  }
}

function getNetworkInterfaces() {
  const os = require("os");
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
    process.env.NODE_ENV === "development" ||
    !fs.existsSync(path.join(packageRoot, ".output"));

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
      console.error(
        "❌ Error: Built output not found. Please run: npm run build",
      );
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
