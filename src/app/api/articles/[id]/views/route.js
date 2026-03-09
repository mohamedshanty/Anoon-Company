import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(_req, { params }) {
  const { id } = await params;
  try {
    const { data, error } = await supabaseAdmin.rpc("increment_views", {
      article_id: id,
    });

    if (error) {
      const { data: article } = await supabaseAdmin
        .from("articles")
        .select("views")
        .eq("id", id)
        .maybeSingle();

      if (!article) {
        return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
      }

      const newViews = (article.views || 0) + 1;
      await supabaseAdmin.from("articles").update({ views: newViews }).eq("id", id);
      return NextResponse.json({ success: true, views: newViews });
    }

    return NextResponse.json({ success: true, views: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}