import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    // في Next.js 15، params يجب أن ننتظره
    const { id } = await params;
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;
    const body = await request.json();
    const { increment = true } = body;

    console.log("Updating likes for article:", id, "increment:", increment);

    // جلب المقال الحالي أولاً
    const getRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!getRes.ok) {
      console.error("Error fetching article:", await getRes.text());
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    const article = await getRes.json();
    const currentLikes = article.data?.likes || 0;
    const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1);

    // تحديث عدد الإعجابات
    const updateRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          likes: newLikes
        }
      }),
    });

    if (!updateRes.ok) {
      console.error("Strapi update error:", await updateRes.text());
      return NextResponse.json(
        { success: false, error: "Failed to update likes" },
        { status: updateRes.status }
      );
    }

    const updatedArticle = await updateRes.json();

    return NextResponse.json({ 
      success: true, 
      likes: updatedArticle.data?.likes || newLikes 
    });
  } catch (error) {
    console.error("Error in likes API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}