// components/partners/PartnersSection.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Stars from "../ui/Stars";
import { gsap } from "@/lib/gsap-setup";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PartnerCard from "../ui/PartnerCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PartnersSection({
  variant = "medium",
  detailLevel = "detailed",
}) {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [isMounted]);

  const partner = {
    id: "scot-aid",
    name: "Scot Aid",
    logo: "/images/partner.png",
    description: t(
      "partner.description_en",
      "A registered Scottish charity providing humanitarian aid worldwide.",
    ),
    supportMessage: t(
      "partner.supports_anoon",
      "Scot Aid proudly supports Anoon's mission to empower youth in Gaza through technology education and sustainable development programs.",
    ),
    website: "https://scotaid.org.uk",
    registrationNumber: "SC050319",
    location: t("partner.location_scotland", "Edinburgh, Scotland"),
    charityType: t(
      "partner.charity_type",
      "Scottish Charitable Incorporated Organisation",
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="partner"
      className="relative py-16 md:py-20 overflow-hidden"
      dir={dir}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-sky/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-orange/5 rounded-full blur-[100px]" />
        <Stars count={30} zIndex={-5} opacity={0.6} />
      </div>

      <div className="main-container">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-brand-orange">
              {t("partners.title", "Our")}
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {t("partners.subtitle", "Working Together to Make Progress")}
          </p>
        </div>

        {/* Single Partner Card - Centered */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className={`
              transition-all duration-500
              ${variant === "full" ? "w-full" : ""}
              ${variant === "large" ? "w-full lg:w-5/6" : ""}
              ${variant === "medium" ? "w-full md:w-3/4 lg:w-2/3 xl:w-1/2" : ""}
              ${variant === "small" ? "w-full md:w-1/2 lg:w-2/5" : ""}
            `}
          >
            <PartnerCard {...partner} isRTL={isRTL} variant={detailLevel} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">
            {t(
              "partner.more_info",
              "Registered with OSCR • Scottish Charity No: SC050319",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
