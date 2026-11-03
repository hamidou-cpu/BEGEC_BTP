import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// In serverless / Supabase, switch from Session Mode (port 5432, max 15 clients)
// to Transaction Mode (port 6543) to prevent (EMAXCONNSESSION) errors
let connectionString = process.env.DATABASE_URL;
if (connectionString.includes("pooler.supabase.com:5432")) {
  connectionString = connectionString.replace(":5432", ":6543");
}

const useSsl =
  process.env.NODE_ENV === "production" ||
  Boolean(connectionString.includes("supabase.com") || process.env.VERCEL);

export const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  max: process.env.VERCEL ? 1 : 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema });
