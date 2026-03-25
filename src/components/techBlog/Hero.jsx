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

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  useAnimation({ ref: badgeRef, type: "fade", start: "top 85%" });
  useAnimation({
    ref: titleRef,
    type: isRTL ? "slide-right" : "slide-left",
    start: "top 80%",
  });
  useAnimation({ ref: subtitleRef, type: "fade", start: "top 80%" });
  useAnimation({ ref: statsRef, type: "fade", start: "top 80%" });
  useAnimation({
    ref: imageRef,
    type: isRTL ? "slide-left" : "slide-right",
    start: "top 80%",
  });

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" dir={dir}>
      <Stars />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-brand-orange/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side — Text */}
          <div
            className={`w-full lg:w-1/2 ${isRTL ? "lg:text-right" : "lg:text-left"}`}
          >
            {/* Badge — own ref */}
            <div ref={badgeRef}>
              <div
                className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-brand-sky/20 bg-brand-sky/5 backdrop-blur-sm ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="w-2 h-2 rounded-full bg-brand-sky animate-pulse" />
                <span className="text-brand-sky text-xs font-semibold tracking-widest uppercase">
                  {t("blog.hero.badge", "Tech Blog")}
                </span>
              </div>
            </div>

            {/* Title — own ref */}
            <div ref={titleRef}>
              <h2 className="font-semibold mb-2 leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90">
                {isRTL ? (
                  <>
                    {t("blog.hero.title_part1", "تعلم أكثر")}
                    <br />
                    {t("blog.hero.title_part2", "كل يوم عن")}
                  </>
                ) : (
                  <>
                    {t("blog.hero.title_part1", "Learn More")}
                    <br />
                    {t("blog.hero.title_part2", "Everyday About")}
                  </>
                )}
              </h2>
              <h1
                className={`bg-linear-to-br from-[#64B9FF] via-[#3C6F99] to-[#64B9FF] bg-clip-text text-transparent font-black leading-tight mb-6 ${
                  isRTL
                    ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                    : "italic tracking-[1px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl"
                }`}
              >
                {t("blog.hero.title_highlight", "Artificial Intelligence")}
              </h1>
            </div>

            {/* Subtitle — own ref */}
            <div ref={subtitleRef}>
              <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-8">
                {t(
                  "blog.hero.subtitle",
                  "Stay ahead with expert insights, deep dives, and the latest breakthroughs in AI and technology.",
                )}
              </p>
            </div>
          </div>

          {/* Right Side — Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-1/2 flex justify-center lg:justify-center relative"
          >
            {/* Decorative rotating rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-brand-sky/15"
                style={{ animation: "spin 30s linear infinite" }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] rounded-full border border-brand-sky/8"
                style={{ animation: "spin 20s linear infinite reverse" }}
              />
            </div>

            <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[390px] md:h-[390px] lg:w-[430px] lg:h-[430px] xl:w-[480px] xl:h-[480px]">
              <div className="absolute inset-0 rounded-full bg-brand-sky/15 blur-3xl scale-75" />
              <AIAgentImage className="w-full h-full relative z-10" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default TechBlogHero;
