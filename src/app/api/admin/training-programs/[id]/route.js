import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from("training_programs")
      .update(body)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ success: true, program: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  try {
    const { error } = await supabaseAdmin
      .from("training_programs")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
