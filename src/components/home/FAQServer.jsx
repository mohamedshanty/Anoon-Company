import PatternBackground from "../ui/PatternBackground";
import FAQClient from "./FAQClient";

export default function FAQServer({ t, isRTL }) {
  const faqs = t.questions || [];

  return (
    <section
      id="faq"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction="diagonal"
          translateY="-translate-y-30"
          opacity="opacity-100"
        />
      </div>

      <div className="main-container">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 md:mb-16 lg:mb-20 ${isRTL ? "rtl" : ""}`}
          >
            <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-5">
              {t.title}
            </h2>
            <h3 className="font-semibold text-brand-sky text-base sm:text-lg md:text-xl lg:text-2xl">
              {t.subtitle}
            </h3>
          </div>

          <FAQClient faqs={faqs} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}
