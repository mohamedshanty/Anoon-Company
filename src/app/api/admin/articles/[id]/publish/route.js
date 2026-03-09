import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { togglePublish } from "@/lib/articlesApi";

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { publish } = await req.json();
    const article = await togglePublish(id, publish);
    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
