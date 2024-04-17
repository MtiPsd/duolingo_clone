import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// TODO: Fix .env problem
const sql = neon(
  "postgresql://lingo_owner:bIZjF9cXWN7u@ep-purple-river-a59ctfmz.us-east-2.aws.neon.tech/lingo?sslmode=require",
);
const db = drizzle(sql, { schema });

export default db;
