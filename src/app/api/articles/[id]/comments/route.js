import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_req, { params }) {
  const { id } = await params;
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing article id" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("comments")
      .select("id, article_id, author_name, author_email, content, created_at")
      .eq("article_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Unexpected server error" },
      { status: 500 },
    );
  }
}

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing article id" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const content = body?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("comments")
      .insert({
        article_id: id,
        content,
        author_name: body.authorName?.trim() || "Guest",
        author_email: body.authorEmail?.trim() || "",
        created_at: new Date().toISOString(),
      })
      .select("id, article_id, author_name, author_email, content, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("POST Comments Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
