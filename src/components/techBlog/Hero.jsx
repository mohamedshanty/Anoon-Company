"use client";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AIAgentImage from "../ui/AIAgentImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "../ui/Stars";

const TechBlogHero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const leftSide = useRef(null);
  const rightSide = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-left",
    start: "top 80%",
  });

  useScrollReveal({
    ref: rightSide,
    animation: "slide-right",
    start: "top 80%",
  });

  return (
    <section className="py-24 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Stars />
      <div className="main-container">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''
          }`}>

          {/* Left Side Content - النص */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? 'lg:text-right' : ''}`}
          >
            <h2 className="font-semibold mb-4 leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {isRTL ? (
                <>
                  {t("blog.hero.title_part1", "تعلم أكثر")}<br />
                  {t("blog.hero.title_part2", "كل يوم عن")}
                </>
              ) : (
                <>
                  {t("blog.hero.title_part1", "Learn More")}<br />
                  {t("blog.hero.title_part2", "Everyday About")}
                </>
              )}
            </h2>
            <h1 className="bg-linear-to-t from-[#3C6F99] to-[#64B9FF] bg-clip-text text-transparent tracking-[1px] font-black leading-tight italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {t("blog.hero.title_highlight", "Artificial Intelligence")}
            </h1>
          </div>

          {/* Right Side Content - الصورة */}
          <div
            ref={rightSide}
            className="w-full lg:w-1/2 flex justify-center lg:justify-center"
          >
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
              <AIAgentImage className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechBlogHero;