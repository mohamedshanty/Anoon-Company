"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import Stars from "../ui/Stars";

export default function OurServices() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const leftSide = useRef(null);
  const rightSide = useRef(null);
  const buttonRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-left",
  });

  useScrollReveal({
    ref: rightSide,
    animation: "slide-right",
  });

  useScrollReveal({
    ref: buttonRef,
    animation: "slide-up",
  });

  return (
    <section className="py-24 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <PatternBackground direction="default" translateY="-translate-y-30" />

      {/* main-container يحتوي على الصورة والنص معاً */}
      <div className="main-container">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left Content - Image Side */}
          <div
            ref={leftSide}
            className="w-full lg:w-1/2 flex justify-center lg:justify-center"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
              {/* AI Brain Image */}
              <div className="relative w-full h-full z-10">
                <Image
                  src="/images/ourServices.png"
                  alt={t("tech_agency.our_services.image_alt", "Our Services")}
                  fill
                  className="object-contain drop-shadow-[0_0_45px_rgba(96,180,255,0.55)]"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
                />
              </div>
            </div>
          </div>

          {/* Right Content - Text Side */}
          <div
            ref={rightSide}
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8"
          >
            <div className={`space-y-4 lg:space-y-6 ${isRTL ? 'text-right' : ''}`}>
              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                <span className="text-brand-white">{t("tech_agency.our_services.title_prefix", "Our")}</span>{" "}
                <span className="text-brand-orange">{t("tech_agency.our_services.title_highlight", "Services")}</span>
                <br />
                <span className="text-brand-sky">{t("tech_agency.our_services.subtitle", "AI Agents Development")}</span>
              </h3>

              {/* Description */}
              <p className={`text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl ${isRTL ? 'text-right' : ''}`}>
                {t("tech_agency.our_services.description", "As business complexity grows, developing AI agents has become essential for building scalable and efficient operations. Investing in AI agent development enables organizations to automate tasks, optimize decision-making, and create sustainable competitive advantages.")}
              </p>
            </div>

            {/* Button */}
            <div ref={buttonRef} className="pt-4">
              <Button
                variant="outline"
                color="sky"
                className="text-lg px-8 py-4"
              >
                {t("tech_agency.our_services.button", "Book A Meeting")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}