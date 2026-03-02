import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // حذف البيانات الموجودة
  await prisma.article.deleteMany();

  // إضافة بيانات تجريبية
  await prisma.article.createMany({
    data: [
      {
        title: "The Future of AI in Healthcare",
        content: "Artificial Intelligence is revolutionizing healthcare...",
        category: "AI",
        image: "/images/ai-healthcare.jpg",
        author: "Dr. Emily Walker",
        readingTime: "8 min read",
      },
      {
        title: "Understanding Neural Networks",
        content: "Neural networks are computing systems...",
        category: "Tech",
        image: "/images/neural-networks.jpg",
        author: "John Smith",
        readingTime: "12 min read",
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
