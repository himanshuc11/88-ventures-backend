import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
  schema: "./schema.ts",
  out: "./migrations",
  dbCredentials: {
    database: process.env.DB_NAME ?? "",
    host: process.env.DB_HOST ?? "",
    password: process.env.DB_PASSWORD ?? "",
    user: process.env.DB_USER ?? "",
    ssl: true,
  },
  driver: "pg",
  verbose: true,
  strict: true,
} satisfies Config;

export default config;
