import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_req, { params }) {
  const { id } = await params;
  try {
    const { data, error } = await supabaseAdmin
      .from("comments")
      .select("*")
      .eq("article_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();

    const { data, error } = await supabaseAdmin
      .from("comments")
      .insert({
        article_id: id,
        content: body.content,
        author_name: body.authorName || "Guest",
        author_email: body.authorEmail || "",
        created_at: new Date().toISOString(),
      })
      .select()
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
