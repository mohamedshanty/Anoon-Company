// app/api/test-env/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // طباعة كل متغيرات البيئة (لأغراض التصحيح فقط)
  console.log("All env vars:", {
    NODE_ENV: process.env.NODE_ENV,
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    // لا تطبع القيم الفعلية لأسباب أمنية
  });

  return NextResponse.json({
    success: true,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
}
