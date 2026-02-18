import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || "libsql://auditmytrial-emil17.aws-us-east-2.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_DATABASE_URL is not defined");
}

export const turso = createClient({
  url,
  authToken,
});
