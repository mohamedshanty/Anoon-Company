import { NextResponse } from "next/server";

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const API_TOKEN = process.env.STRAPI_API_TOKEN;

  try {
    // جلب التصنيفات والمقالات في طلبات متوازية لسرعة الأداء
    const [categoriesRes, articlesRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/categories?sort=createdAt:desc`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        next: { revalidate: 60 }
      }),
      fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        next: { revalidate: 60 }
      })
    ]);

    if (!categoriesRes.ok || !articlesRes.ok) {
      const catStatus = categoriesRes.status;
      const artStatus = articlesRes.status;
      console.error(`Strapi Error - Categories: ${catStatus}, Articles: ${artStatus}`);
      
      return NextResponse.json(
        { 
          success: false, 
          error: `خطأ من Strapi (Status: ${catStatus}/${artStatus}). تأكد من تشغيل السيرفر وصحة الـ Token.` 
        },
        { status: 500 }
      );
    }

    const categories = await categoriesRes.json();
    const articles = await articlesRes.json();

    return NextResponse.json({
      success: true,
      categories: categories.data,
      articles: articles.data
    });
  } catch (error) {
    console.error("Blog Data API Error:", error);
    return NextResponse.json(
      { success: false, error: "خادم Strapi غير متصل حالياً." },
      { status: 503 }
    );
  }
}
