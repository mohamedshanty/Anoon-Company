import FullBlog from "@/components/techBlog/FullBlog";
import { notFound } from "next/navigation";

// دالة لجلب المقال بناءً على الـ slug
const getArticleBySlug = (slug) => {
  const articles = {
    1: {
      id: 1,
      title: "Learn more about ai",
      fullTitle: "The Rise of Block Chain Technology In The World",
      introduction:
        "Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.",
      content: [
        {
          subtitle: "Artificial Intelligence (AI)",
          text: "Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.",
        },
        {
          subtitle: "Predictive Analytics and Disease Prevention",
          text: "One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.",
        },
      ],
      category: "Environment",
      date: "October 10, 2023",
      author: "Jane Smith",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
    },
    2: {
      id: 2,
      title: "A Decisive Victory for Progressive Policies",
      fullTitle: "A Decisive Victory for Progressive Policies",
      introduction:
        "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
      content: [
        {
          subtitle: "Introduction",
          text: "Progressive policies have taken center stage in recent political developments, with world leaders committing to ambitious climate goals and sustainable development initiatives.",
        },
      ],
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
    },
    3: {
      id: 3,
      title: "A Decisive Victory for Progressive Policies",
      fullTitle: "A Decisive Victory for Progressive Policies",
      introduction:
        "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
      content: [
        {
          subtitle: "Introduction",
          text: "Progressive policies have taken center stage in recent political developments, with world leaders committing to ambitious climate goals and sustainable development initiatives.",
        },
      ],
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
    },
    4: {
      id: 4,
      title: "A Decisive Victory for Progressive Policies",
      fullTitle: "A Decisive Victory for Progressive Policies",
      introduction:
        "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
      content: [
        {
          subtitle: "Introduction",
          text: "Progressive policies have taken center stage in recent political developments, with world leaders committing to ambitious climate goals and sustainable development initiatives.",
        },
      ],
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
    },
  };

  return articles[slug] || null;
};

export default async function BlogPostPage({ params }) {
  // ⚠️ مهم جداً: استخدم await مع params لأنه Promise
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <FullBlog article={article} />;
}
