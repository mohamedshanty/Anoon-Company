import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(_req, { params }) {
  const { id } = await params;

  try {
    const { data, error } = await supabaseAdmin.rpc("increment_shares", {
      article_id: id,
    });

    if (error) {
      const { data: article } = await supabaseAdmin
        .from("articles")
        .select("shares")
        .eq("id", id)
        .maybeSingle();

      if (!article) {
        return NextResponse.json(
          { success: false, error: "Not found" },
          { status: 404 },
        );
      }

      const newShares = (article.shares || 0) + 1;
      await supabaseAdmin
        .from("articles")
        .update({ shares: newShares })
        .eq("id", id);

      return NextResponse.json({ success: true, shares: newShares });
    }

    return NextResponse.json({ success: true, shares: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
