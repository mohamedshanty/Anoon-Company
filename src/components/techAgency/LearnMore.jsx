"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
import PatternBackground from "../ui/PatternBackground";
import Link from "next/link";

export default function LearnMore() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const leftSide = useRef(null);
  const rightSide = useRef(null);
  const buttonRef = useRef(null);

  useAnimation({
    ref: leftSide,
    type: "slide-left",
  });

  useAnimation({
    ref: rightSide,
    type: "slide-right",
  });

  useAnimation({
    ref: buttonRef,
    type: "slide-up",
  });

  return (
    <section className="py-24 relative overflow-hidden" dir={dir}>
      <div className={`flex flex-col lg:flex-row items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        <div
          ref={leftSide}
          className={`w-full lg:w-1/2 flex ${isRTL ? 'justify-end lg:justify-end' : 'justify-start lg:justify-start'}`}
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
            <div className="relative w-full h-full z-10">
              <Image
                src="/images/knowladge-book.png"
                alt={t("tech_agency.learn_more.image_alt", "Knowledge Book")}
                fill
                className={`object-contain drop-shadow-[0_0_45px_rgba(96,180,255,0.55)] ${isRTL ? 'object-right' : 'object-left'}`}
                sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
              />
            </div>
          </div>
        </div>

        <div
          ref={rightSide}
          className="w-full lg:w-1/2"
        >
          <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 lg:max-w-7xl ${isRTL ? 'lg:pr-0' : 'lg:pl-0'}`}>
            <div className={`space-y-6 lg:space-y-8 ${isRTL ? 'text-right' : ''}`}>
              <div className="space-y-4 lg:space-y-6">
                <h3 className=" font-semibold leading-tight">
                  <span className="text-brand-white">
                    {t("tech_agency.learn_more.title_part1", "Learn More About")}
                  </span>
                  <br />
                  <span className="text-brand-sky">
                    {t("tech_agency.learn_more.title_highlight", "Artificial Intelligent")}
                  </span>
                </h3>

                <p className={`text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-[600px] ${isRTL ? 'text-right' : ''}`}>
                  {t("tech_agency.learn_more.description", "Want to understand how AI is shaping the future of business? Our AI Development Blog breaks down the latest trends, tools, and real-world strategies behind building powerful AI systems and intelligent agents. Whether you're a founder, developer, or tech enthusiast, discover practical insights that help you stay ahead in the AI revolution. Read, learn, and build smarter with AI.")}
                </p>
              </div>

              <div ref={buttonRef} className="pt-4">
                <Link href="/techBlog">
                  <Button
                    variant="premium"
                    color="sky"
                    className="text-lg px-8 py-4"
                  >
                    {t("tech_agency.learn_more.button", "Read Now")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}