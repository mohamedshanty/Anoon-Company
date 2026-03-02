import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params; // هذا هو الـ id من الرابط (مثلاً: rhearj257gz3796yglnajehv)
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;

    console.log("Updating views for article with documentId:", id);

    // في Strapi v5، نستخدم documentId وليس id
    const getRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!getRes.ok) {
      const errorText = await getRes.text();
      console.error("Error fetching article:", errorText);
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    const article = await getRes.json();
    const currentViews = article.data?.views || 0;

    const updateRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          views: currentViews + 1
        }
      }),
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      console.error("Strapi update error:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to update views" },
        { status: updateRes.status }
      );
    }

    const updatedArticle = await updateRes.json();

    return NextResponse.json({ 
      success: true, 
      views: updatedArticle.data?.views || currentViews + 1 
    });
  } catch (error) {
    console.error("Error in views API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}