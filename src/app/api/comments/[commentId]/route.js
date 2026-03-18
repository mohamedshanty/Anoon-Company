import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(request, { params }) {
  try {
    const { commentId } = await params;
    const body = await request.json();
    const content = body?.content?.trim();

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "Missing comment id" },
        { status: 400 },
      );
    }

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("comments")
      .update({ content })
      .eq("id", commentId)
      .select("id, article_id, author_name, author_email, content, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Unexpected server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { commentId } = await params;

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "Missing comment id" },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: { id: commentId } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Unexpected server error" },
      { status: 500 },
    );
  }
}
