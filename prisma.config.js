// prisma.config.js
import { defineConfig } from "prisma/config";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });

console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL ? "✅ موجود" : "❌ غير موجود",
);

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
