import FullBlog from "@/components/techBlog/FullBlog";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/articlesApi.server";
import { getPublishedArticles } from "@/lib/articlesApi.client";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | Anoon Blog" };
  }

  return {
    title: `${article.title} | Anoon Blog`,
    description: article.excerpt || article.introdaction || "",
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.cover_image ? [{ url: article.cover_image }] : [],
      type: "article",
      publishedTime: article.published_at,
    },
  };
}

export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles();
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            المقال غير موجود
          </h1>
          <p className="text-xl text-white/70">
            الرابط غير صحيح أو المقال غير منشور
          </p>
          <Link
            href="/techBlog"
            className="inline-block mt-8 px-6 py-3 bg-brand-sky text-white rounded-xl hover:bg-brand-sky/80 transition"
          >
            العودة للمدونة
          </Link>
        </div>
      </div>
    );
  }

  // Normalize article to match FullBlog component expectations
  const normalizedArticle = {
    ...article,
    documentId: article.id,
    publishedAt: article.published_at,
    introduction: article.introdaction,
    introduction_ar: article.introdaction_ar,
    image: article.cover_image
      ? [{ url: article.cover_image, formats: {} }]
      : [],
    category: article.category
      ? {
          id: article.category,
          name: article.category,
          name_ar: article.category_ar,
          slug: article.category,
        }
      : null,
    comments_count: 0,
  };

  // Get similar articles (same category)
  let similarArticles = [];
  try {
    const allArticles = await getPublishedArticles();
    similarArticles = allArticles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 3)
      .map((a) => ({
        ...a,
        documentId: a.id,
        publishedAt: a.published_at,
        image: a.cover_image ? [{ url: a.cover_image }] : [],
        category: { id: a.category, name: a.category, name_ar: a.category_ar },
      }));
  } catch {
    similarArticles = [];
  }

  return (
    <FullBlog article={normalizedArticle} similarArticles={similarArticles} />
  );
}
