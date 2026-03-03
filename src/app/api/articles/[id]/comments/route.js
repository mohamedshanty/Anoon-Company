import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;

    // محاولة جلب التعليقات باستخدام الـ documentId
    const res = await fetch(
      `${STRAPI_URL}/api/comments/api::article.article:${id}`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      return NextResponse.json({ success: true, data: [] });
    }

    const data = await res.json();
    const comments = Array.isArray(data) ? data : (data.data || []);
    return NextResponse.json({ success: true, data: comments });
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

    // تجهيز البيانات الأساسية
    const authorData = {
      name: body.authorName || "Guest",
      email: body.authorEmail || "guest@example.com"
    };

    // المحاولة الأولى: الإرسال لمسار المقال المباشر (الأكثر استقراراً في بعض نسخ v5)
    const directUrl = `${STRAPI_URL}/api/comments/api::article.article:${id}`;
    
    // تجربة هيكلية المؤلف المتداخلة أولاً
    const payload1 = {
      content: body.content,
      author: authorData
    };

    console.log("Attempting POST to:", directUrl);

    let res = await fetch(directUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(payload1),
    });

    let responseData;
    const contentType = res.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      responseData = await res.json();
    } else {
      const text = await res.text();
      console.warn("Strapi returned non-JSON response:", text);
      responseData = { message: text };
    }

    // إذا فشل المحاولة الأولى (مثلاً 405 أو 400 بسبب الهيكلية)
    if (!res.ok) {
      console.warn("First attempt failed, trying alternative payload/endpoint...");

      // المحاولة الثانية: هيكلية المؤلف المسطحة (Flat author)
      const payload2 = {
        content: body.content,
        authorName: authorData.name,
        authorEmail: authorData.email,
        // بعض النسخ تحتاج الـ related حتى في المسار المباشر
        related: `api::article.article:${id}` 
      };

      const res2 = await fetch(directUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(payload2),
      });

      if (res2.ok) {
        res = res2;
        responseData = await res2.json();
      } else {
        // المحاولة الأخيرة: المسار العام /api/comments
        const generalUrl = `${STRAPI_URL}/api/comments`;
        const payload3 = {
          content: body.content,
          related: `api::article.article:${id}`,
          author: authorData
        };

        const res3 = await fetch(generalUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify(payload3),
        });

        if (res3.ok) {
          res = res3;
          responseData = await res3.json();
        } else {
          const finalErrorData = (await res3.json().catch(() => ({})));
          return NextResponse.json({ 
            success: false, 
            error: finalErrorData?.error?.message || responseData.message || "فشلت جميع محاولات الربط. تأكد من صلاحيات Public في الـ Comments Plugin."
          }, { status: res3.status || 400 });
        }
      }
    }

    // تحديث عداد التعليقات (اختياري، لن يؤثر فشله على التعليق)
    try {
      fetch(`${STRAPI_URL}/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { comments_count: (body.currentCommentsCount || 0) + 1 },
        }),
      }).catch(e => console.error("Counter update failed silently"));
    } catch (e) {}

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("POST Route Critical Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
