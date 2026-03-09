import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req, { params }) {
  const { id } = await params;
  const { increment } = await req.json();

  try {
    const { data: article } = await supabaseAdmin
      .from("articles")
      .select("likes")
      .eq("id", id)
      .maybeSingle();

    if (!article) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const newLikes = Math.max(0, (article.likes || 0) + (increment ? 1 : -1));
    await supabaseAdmin.from("articles").update({ likes: newLikes }).eq("id", id);

    return NextResponse.json({ success: true, likes: newLikes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}