"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
import PatternBackground from "../ui/PatternBackground";
import Link from "next/link";
import { Bot, Zap, BarChart3, Target } from "lucide-react";

export default function OurServices() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const leftSide = useRef(null);
  const rightSide = useRef(null);

  useAnimation({
    ref: leftSide,
    type: "slide-left",
  });

  useAnimation({
    ref: rightSide,
    type: "slide-right",
  });

  const getIcon = (index) => {
    switch (index) {
      case 0: return <Bot className="text-brand-sky w-5 h-5 shrink-0" />;
      case 1: return <Zap className="text-brand-orange w-5 h-5 shrink-0" />;
      case 2: return <BarChart3 className="text-brand-green w-5 h-5 shrink-0" />;
      case 3: return <Target className="text-brand-orange w-5 h-5 shrink-0" />;
      default: return <Bot className="text-brand-sky w-5 h-5 shrink-0" />;
    }
  };

  const services = t("tech_agency.our_services.services", { returnObjects: true }) || [];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-brand-dark-blue/20" dir={dir}>
      <PatternBackground direction="default" translateY="-translate-y-30" />

      <div className="main-container relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left Content - Hero Illustration */}
          <div
            ref={leftSide}
            className="w-full lg:w-[45%] flex justify-center"
          >
            <div className="relative w-full max-w-[450px] aspect-square">
                <Image
                  src="/images/ourServices.png"
                  alt={t("tech_agency.our_services.image_alt", "Our Services Illustration")}
                  fill
                  className="object-contain"
                  priority
                />
            </div>
          </div>

          {/* Right Content - Core Text & Grid */}
          <div
            ref={rightSide}
            className="w-full lg:w-[55%] space-y-6 md:space-y-8"
          >
            <div className={`space-y-3 md:space-y-4 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                <span className="text-brand-white">{t("tech_agency.our_services.title_prefix", "What")}</span>{" "}
                <span className="text-brand-orange ml-2">{t("tech_agency.our_services.title_highlight", "We Build")}</span>
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-sky/90 uppercase tracking-wide">
                {t("tech_agency.our_services.subtitle", "AI Solutions We’ve Delivered")}
              </h3>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8 pt-2">
              {Array.isArray(services) && services.map((service, idx) => (
                <div key={idx} className="space-y-2 group">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                        {getIcon(idx)}
                      </div>
                      <h4 className="font-bold text-base md:text-lg text-white group-hover:text-brand-sky transition-colors">
                        {service.title}
                      </h4>
                   </div>
                   <p className="text-white/60 text-xs md:text-sm leading-relaxed pl-[44px]">
                     {service.desc}
                   </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6 block">
              <Link href="https://calendly.com/anoon-hub" target="_blank">
                <Button
                  variant="premium"
                  color="sky"
                  className="text-lg px-8 py-4"
                >
                  {t("tech_agency.our_services.button", "Book A Free Consultation")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
