"use client";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AIAgentImage from "../ui/AIAgentImage";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
import Stars from "../ui/Stars";

const TechBlogHero = () => {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const leftSide = useRef(null);
  const rightSide = useRef(null);

  // تعديل أنواع الـ animations بناءً على RTL
  useAnimation({
    ref: leftSide,
    type: isRTL ? "slide-right" : "slide-left", // في RTL، النص يتحرك من اليمين
    start: "top 80%",
  });

  useAnimation({
    ref: rightSide,
    type: isRTL ? "slide-left" : "slide-right", // في RTL، الصورة تتحرك من اليسار
    start: "top 80%",
  });

  return (
    <section className="py-24 relative overflow-hidden" dir={dir}>
      <Stars />
      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left Side Content - النص (في RTL يصبح على اليمين) */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? 'lg:text-right' : 'lg:text-left'
              }`}
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
            <h1 className={`bg-linear-to-t from-[#3C6F99] to-[#64B9FF] bg-clip-text text-transparent font-black leading-tight ${isRTL
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
                : 'italic tracking-[1px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
              }`}>
              {t("blog.hero.title_highlight", "Artificial Intelligence")}
            </h1>
          </div>

          {/* Right Side Content - الصورة (في RTL يصبح على اليسار) */}
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