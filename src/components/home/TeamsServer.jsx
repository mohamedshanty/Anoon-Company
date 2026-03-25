import SectionHeader from "../ui/SectionHeader";
import TeamsClient from "./TeamsClient";

const members = [
  {
    name: { ar: "علاء", en: "Alaa" },
    role: { ar: "المؤسس والمدير العام", en: "Founder" },
    image: "/images/teem/alla1.png",
  },
  {
    name: { ar: "عبد الله", en: "Abdullah" },
    role: { ar: "المدير التنفيذي", en: "CEO" },
    image: "/images/teem/abdalla1.png",
  },
  {
    name: { ar: "مجد", en: "Majd" },
    role: { ar: "مصمم جرافيك", en: "Graphic Designer" },
    image: "/images/teem/majd1.png",
  },
  {
    name: { ar: "أماني", en: "Amani" },
    role: { ar: "مديرة التسويق", en: "Marketing Manager" },
    image: "/images/teem/amani1.png",
  },
  {
    name: { ar: "غيداء", en: "Ghida" },
    role: { ar: "موظفة المبيعات", en: "Sales Officer" },
    image: "/images/teem/ghida1.png",
  },
  {
    name: { ar: "إيهاب", en: "Ehab" },
    role: {
      ar: "مدير العمليات والتخطيط الاستراتيجي",
      en: "Programs Manager",
    },
    image: "/images/teem/ihab1.png",
  },
  {
    name: { ar: "عبد المنعم", en: "Abdelmoniem" },
    role: { ar: "استشاري نمو تسويق", en: "Marketing Growth Consultant" },
    image: "/images/teem/abdelmoniem1.png",
  },
  {
    name: { ar: "ريم", en: "Reem" },
    role: { ar: "مديرة النقطة ", en: "Study Space Officer" },
    image: "/images/teem/reem2.png",
  },
  {
    name: { ar: "حازم", en: "Hazem" },
    role: { ar: "مدير المساحة والنمو", en: "Space & Growth Manager" },
    image: "/images/teem/hazem1.png",
  },
];

export default function TeamsServer({ t, locale }) {
  const currentLocale = locale || "ar";

  const localizedMembers = members.map((member) => ({
    name: member.name[currentLocale],
    role: member.role[currentLocale],
    image: member.image,
  }));

  return (
    <section id="teams" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="main-container relative z-10">
        <SectionHeader
          title={t.title || (currentLocale === "ar" ? "فريقنا" : "Our Teams")}
          subtitle={{
            highlightedWords: [
              {
                text:
                  t.subtitle_word1 ||
                  (currentLocale === "ar" ? "عندما" : "When"),
                color: "text-brand-sky",
              },
              {
                text:
                  t.subtitle_word2 ||
                  (currentLocale === "ar" ? "سقط" : "Everything"),
                color: "text-brand-orange",
              },
              {
                text:
                  t.subtitle_word3 ||
                  (currentLocale === "ar" ? "كل شيء،" : "Fell,"),
                color: "text-brand-sky",
              },
              {
                text:
                  t.subtitle_word4 || (currentLocale === "ar" ? "نحن" : "We"),
                color: "text-brand-orange",
              },
              {
                text:
                  t.subtitle_word5 ||
                  (currentLocale === "ar" ? "نهضنا" : "Stood"),
                color: "text-brand-sky",
              },
              {
                text:
                  t.subtitle_word6 ||
                  (currentLocale === "ar" ? "من جديد." : "Up."),
                color: "text-brand-orange",
              },
            ],
          }}
          maxWidth="4xl"
          align="center"
          starsCount={0}
          subtitleClassName="mt-4"
        />

        <TeamsClient members={localizedMembers} tRoles={{}} />
      </div>
    </section>
  );
}
