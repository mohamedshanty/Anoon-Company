import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// --- تعديل تعليق ---
export async function PUT(request, { params }) {
  try {
    const { commentId } = await params;
    const body = await request.json();
    
    const res = await fetch(`${STRAPI_URL}/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { content: body.content }
      }),
    });

    if (!res.ok) throw new Error("Failed to update comment");
    
    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- حذف تعليق ---
export async function DELETE(request, { params }) {
  try {
    const { commentId } = await params;
    
    const res = await fetch(`${STRAPI_URL}/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete comment");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
