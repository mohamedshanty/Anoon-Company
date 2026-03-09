import { NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/articlesApi";

export async function GET() {
  try {
    const articles = await getPublishedArticles();

    // Build unique categories from articles
    const categoryMap = new Map();
    articles.forEach((a) => {
      if (a.category && !categoryMap.has(a.category)) {
        categoryMap.set(a.category, {
          id: a.category,
          name: a.category,
          name_ar: a.category_ar || a.category,
          slug: a.category.toLowerCase().replace(/\s+/g, "-"),
        });
      }
    });

    const categories = Array.from(categoryMap.values());

    // Normalize articles to match component expectations
    const normalized = articles.map((a) => ({
      ...a,
      // Legacy compat fields for existing components
      documentId: a.id,
      publishedAt: a.published_at,
      image: a.cover_image ? [{ url: a.cover_image, formats: {} }] : [],
      category: a.category
        ? { id: a.category, name: a.category, name_ar: a.category_ar, slug: a.category }
        : null,
      introduction: a.introdaction,
      introduction_ar: a.introdaction_ar,
      comments_count: 0,
    }));

    return NextResponse.json({ success: true, categories, articles: normalized });
  } catch (error) {
    console.error("Blog Data API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles from Supabase." },
      { status: 500 },
    );
  }
}