import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;


    const res = await fetch(
      `${STRAPI_URL}/api/comments?filters[article][documentId][$eq]=${id}&sort=createdAt:desc`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      console.error("Fetch Custom Comments Failed:", res.status);
      return NextResponse.json({ success: true, data: [] });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data || [] });
  } catch (error) {
    console.error("GET Comments Error:", error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params; 
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;
    const body = await request.json();

    // تجهيز بيانات التعليق للجدول الجديد
    const payload = {
      data: {
        content: body.content,
        authorName: body.authorName || "Guest",
        authorEmail: body.authorEmail || "guest@example.com",
        article: { connect: [id] } // ربط التعليق بالمقال
      }
    };

    console.log("[Custom Comments] POSTing to /api/comments for article:", id);

    const res = await fetch(`${STRAPI_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[Custom Comments] Error:", errorData);
      return NextResponse.json({ 
        success: false, 
        error: errorData.error?.message || "فشلت عملية إضافة التعليق. تأكد من صلاحيات Public لجدول Comment في Strapi."
      }, { status: res.status });
    }

    const result = await res.json();

    // تحديث عداد التعليقات في المقال
    try {
      await fetch(`${STRAPI_URL}/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { comments_count: (body.currentCommentsCount || 0) + 1 },
        }),
      });
    } catch (e) {
      console.error("Counter update failed silently");
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("POST Route Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
