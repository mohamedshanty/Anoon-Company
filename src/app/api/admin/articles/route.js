// app/api/admin/articles/route.js
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  getAllArticlesAdmin,
  createArticle,
  generateSlug,
} from "@/lib/articlesApi";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const articles = await getAllArticlesAdmin();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error("GET articles error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title);
    }

    try {
      const article = await createArticle(body);
      return NextResponse.json({ success: true, article }, { status: 201 });
    } catch (innerError) {
      console.error("Article creation error details:", {
        message: innerError.message,
        code: innerError.code,
        details: innerError.details,
        hint: innerError.hint,
      });
      return NextResponse.json(
        {
          success: false,
          error: innerError.message,
          code: innerError.code,
          details: innerError.details,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || error.toString() },
      { status: 500 },
    );
  }
}
