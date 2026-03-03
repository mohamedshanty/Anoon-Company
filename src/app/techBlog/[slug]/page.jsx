import FullBlog from "@/components/techBlog/FullBlog";
import Link from "next/link";

async function getArticleBySlug(slug) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const API_TOKEN = process.env.STRAPI_API_TOKEN;

  const fullUrl = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=image&populate[1]=category&publicationState=live`;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error("خطأ في جلب المقال:", error);
    return null;
  }
}

async function getSimilarArticles(categoryId, currentArticleId, currentLang = 'en') {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const API_TOKEN = process.env.STRAPI_API_TOKEN;

  const fullUrl = `${STRAPI_URL}/api/articles?filters[category][id][$eq]=${categoryId}&filters[id][$ne]=${currentArticleId}&populate=image,category&sort=publishedAt:desc&pagination[limit]=3`;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("خطأ في جلب مقالات مشابهة:", error);
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

  const categoryId = article.category?.id;
  const similarArticles = categoryId
    ? await getSimilarArticles(categoryId, article.id)
    : [];

  return <FullBlog article={article} similarArticles={similarArticles} />;
}