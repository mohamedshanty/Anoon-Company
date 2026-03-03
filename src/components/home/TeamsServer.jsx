import SectionHeader from "../ui/SectionHeader";
import TeamsClient from "./TeamsClient";
import Reveal from "../ui/Reveal";

const members = [
  {
    name: { ar: "علاء", en: "Alaa" },
    role: { ar: "المدير العام", en: "CIO" },
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
    role: { ar: "مديرة منصات التواصل الاجتماعي", en: "Social Media Manager" },
    image: "/images/teem/ghida1.png",
  },
  {
    name: { ar: "إيهاب", en: "Ihab" },
    role: {
      ar: "مدير العمليات والتخطيط الاستراتيجي",
      en: "Operations & Strategic Planning Manager",
    },
    image: "/images/teem/ihab1.png",
  },
  {
    name: { ar: "عبد المنعم", en: "Abdelmoniem" },
    role: { ar: "مطور", en: "Developer" },
    image: "/images/teem/abdelmoniem1.png",
  },
  {
    name: { ar: "ريم", en: "Reem" },
    role: { ar: "مسؤولة مساحة دراسية", en: "Study Space Officer" },
    image: "/images/teem/reem2.png",
  },
  {
    name: { ar: "حازم", en: "Hazem" },
    role: { ar: "مدير المساحة والنمو", en: "Space & Growth Manager" },
    image: "/images/teem/hazem1.png",
  },
];

export default function TeamsServer({ t, locale }) {
  // تحديد اللغة الحالية (افتراضي: العربية)
  const currentLocale = locale || "ar";

  // تجهيز البيانات حسب اللغة الحالية
  const localizedMembers = members.map((member) => ({
    name: member.name[currentLocale],
    role: member.role[currentLocale],
    image: member.image,
  }));

  return (
    <section id="teams" className="py-24 relative overflow-hidden">
      <div className="main-container relative z-10">
        <Reveal type="slide-up">
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
        </Reveal>

        <Reveal type="fade" delay={0.4}>
          <TeamsClient members={localizedMembers} tRoles={{}} />
        </Reveal>
      </div>
    </section>
  );
}
