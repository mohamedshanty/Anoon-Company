// تحديث route.js للمشاهدات
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;

    console.log("Updating views for article with ID:", id);

    // جلب المقال الحالي
    const getRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
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

    const articleData = await getRes.json();
    const currentViews = articleData.data?.views || 0;
    const newViews = currentViews + 1;

    // تحديث المقال
    const updateRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          views: newViews
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

    const updatedData = await updateRes.json();

    return NextResponse.json({ 
      success: true, 
      views: updatedData.data?.views || newViews 
    });
  } catch (error) {
    console.error("Error in views API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}