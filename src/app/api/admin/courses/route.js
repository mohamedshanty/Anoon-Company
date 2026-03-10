import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("program_id");

    let query = supabaseAdmin
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (programId) query = query.eq("program_id", programId);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ success: true, courses: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from("courses")
      .insert([body])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ success: true, course: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
