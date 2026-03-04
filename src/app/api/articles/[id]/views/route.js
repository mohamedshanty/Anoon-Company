// تحديث route.js للمشاهدات
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;

    console.log("Updating views for article with ID:", id);

    // جلب المقال الحالي باستخدام المعرف
    const getRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!getRes.ok) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    const resData = await getRes.json();
    const article = resData.data;
    const currentViews = article?.views || 0;
    const newViews = currentViews + 1;

    // تحديث المقال - في Strapi v5 نستخدم نفس الـ documentId للتحديث
    const updateRes = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { views: newViews }
      }),
    });

    if (!updateRes.ok) throw new Error("Update failed");

    return NextResponse.json({ 
      success: true, 
      views: newViews 
    });
  } catch (error) {
    console.error("Error in views API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}