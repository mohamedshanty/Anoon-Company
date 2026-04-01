// components/partners/PartnersSection.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Stars from "../ui/Stars";
import PartnerCard from "../ui/PartnerCard";

export default function PartnersSection({
  variant = "medium",
  detailLevel = "detailed",
}) {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  // Use IntersectionObserver instead of GSAP for entrance animations
  useEffect(() => {
    const titleEl = titleRef.current;
    const cardEl = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleEl && entry.isIntersecting) {
            setTitleVisible(true);
          }
          if (entry.target === cardEl && entry.isIntersecting) {
            setCardVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleEl) observer.observe(titleEl);
    if (cardEl) observer.observe(cardEl);

    return () => observer.disconnect();
  }, []);

  const partner = {
    id: "scot-aid",
    name: "Scot Aid",
    logo: "/images/partner.png",
    description: t(
      "partner.description_en",
      "A registered Scottish charity providing humanitarian aid worldwide."
    ),
    supportMessage: t(
      "partner.supports_anoon",
      "Scot Aid proudly supports Anoon's mission to empower youth in Gaza through technology education and sustainable development programs."
    ),
    website: "https://scotaid.org.uk",
    registrationNumber: "SC050319",
    location: t("partner.location_scotland", "Edinburgh, Scotland"),
    charityType: t(
      "partner.charity_type",
      "Scottish Charitable Incorporated Organisation"
    ),
  };

  return (
    <section
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
        <div
          ref={titleRef}
          className="text-center mb-10"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateY(50px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
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
              ${variant === "full" ? "w-full" : ""}
              ${variant === "large" ? "w-full lg:w-5/6" : ""}
              ${variant === "medium" ? "w-full md:w-3/4 lg:w-2/3 xl:w-1/2" : ""}
              ${variant === "small" ? "w-full md:w-1/2 lg:w-2/5" : ""}
            `}
            style={{
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "none" : "translateY(60px) scale(0.95)",
              transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <PartnerCard {...partner} isRTL={isRTL} variant={detailLevel} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">
            {t(
              "partner.more_info",
              "Registered with OSCR • Scottish Charity No: SC050319"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
