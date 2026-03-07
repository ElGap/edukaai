import type { Config } from "drizzle-kit";

export default {
  schema: "./app/server/db/schema.ts",
  out: "./app/server/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "./data/edukaai.db",
  },
  verbose: true,
  strict: true,
} satisfies Config;
