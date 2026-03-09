// lib/supabaseAdmin.js
// Server-only Supabase client with service role key
import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("❌ NEXT_PUBLIC_SUPABASE_URL is missing from environment.");
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "❌ SUPABASE_SERVICE_ROLE_KEY is missing.\n" +
      "Please add it to your .env.local file in: " +
      process.cwd() +
      "\n" +
      "Or run with: SUPABASE_SERVICE_ROLE_KEY=your_key npm run dev",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
