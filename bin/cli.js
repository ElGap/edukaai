#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Get the package root directory
const packageRoot = path.join(__dirname, "..");

// Get data directory
const dataDir =
  process.env.EDUKAAI_DATA_DIR || path.join(os.homedir(), ".edukaai");
const dbPath = process.env.DATABASE_URL || path.join(dataDir, "data.db");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`📁 Created data directory: ${dataDir}`);
}

// Check if we're in development or production
const isDev =
  process.env.NODE_ENV === "development" ||
  !fs.existsSync(path.join(packageRoot, ".output"));

console.log("🎓 edukaAI Starting...");
console.log(`📊 Database: ${dbPath}`);
console.log(`📂 Package root: ${packageRoot}`);
console.log("⏳ Initializing server...\n");

if (isDev) {
  // Development mode - use nuxt dev
  const nuxt = spawn("npx", ["nuxt", "dev"], {
    stdio: "inherit",
    cwd: packageRoot,
    env: {
      ...process.env,
      DATABASE_URL: dbPath,
      NUXT_PORT: process.env.EDUKAAI_PORT || "3000",
      NUXT_HOST: process.env.EDUKAAI_HOST || "localhost",
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
      NUXT_PORT: process.env.EDUKAAI_PORT || "3000",
      NUXT_HOST: process.env.EDUKAAI_HOST || "localhost",
      NODE_ENV: "production",
    },
  });

  server.on("close", (code) => {
    process.exit(code);
  });
}
