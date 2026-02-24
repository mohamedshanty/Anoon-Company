"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import Stars from "../ui/Stars";
import AIAgentImage from "../ui/AIAgentImage";

export default function IntelligentSolution() {
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
      <Stars />

      {/* main-container يحتوي على الصورة والنص معاً */}
      <div className="main-container">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left Content - Image Side */}
          <div
            ref={leftSide}
            className="w-full lg:w-1/2 flex justify-center lg:justify-center"
          >
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
              <AIAgentImage className="w-full h-full" />
            </div>
          </div>

          {/* Right Content - Text Side */}
          <div
            ref={rightSide}
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8"
          >
            <div className={`space-y-4 lg:space-y-6 ${isRTL ? 'text-right' : ''}`}>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                <span className="text-white">
                  {t("tech_agency.intelligent_solution.title_part1", "Complex Problem Requires")}
                </span>
                <br />
                <span className="text-brand-sky">
                  {t("tech_agency.intelligent_solution.title_highlight", "Intelligent Solution")}
                </span>
              </h3>

              <p className={`text-lg md:text-xl text-brand-white/90 font-light leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                {t("tech_agency.intelligent_solution.description", "As technology advances, workloads are increasing and manual processes are no longer efficient. Integrating AI agents into the workplace is the most effective way to save time, reduce costs, and improve productivity.")}
              </p>
            </div>

            {/* Button */}
            <div ref={buttonRef} className="pt-0">
              <Button
                variant="outline"
                color="sky"
                className="text-lg px-8 py-4"
              >
                {t("tech_agency.intelligent_solution.button", "Book A Free Consulting")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}