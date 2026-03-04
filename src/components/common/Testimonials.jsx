"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            rotate: index % 2 === 0 ? -2 : 2,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      id: "alla",
      name: t("testimonials.alla.name", "Alla Abu Hamaza"),
      role: t("testimonials.alla.role", "Front End Development"),
      image: "/images/alaa.png",
      quote: t(
        "testimonials.alla.quote",
        "Thank You Tamkeen I didn't just make money i was able to achieve my dreams, i know that i have the skill but you give me the tools and platform and the network i need it was a lovely journey, yes it was tough but we made it through together",
      ),
    },
    {
      id: "yazan",
      name: t("testimonials.yazan.name", "Yazan Deher"),
      role: t("testimonials.yazan.role", "UI UX Designer"),
      image: "/images/yazan.png",
      quote: t(
        "testimonials.yazan.quote",
        "I Believe That i was my destiny, i am amazing UX Designer yet i learned a lot of empathy from the staff i needed a place to feel where i belong and i found it here, Now i am in a better place, happy where i am and still rising and i will never give up",
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 mt-8 sm:mt-12 md:mt-16 lg:mt-24 mb-12 sm:mb-16 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="
          bg-white rounded-xl sm:rounded-2xl
          px-4 sm:px-6 md:px-8 lg:px-10
          py-6 sm:py-8 md:py-10
          relative
          overflow-hidden
          transform
          -skew-x-3 sm:-skew-x-6 md:-skew-x-8
        "
          >
            <div className="skew-x-3 sm:skew-x-6 md:skew-x-8">
              {/* Header */}
              <div className="flex sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div
                  className={`text-center sm:text-start ${
                    isRTL ? "sm:text-right" : ""
                  }`}
                >
                  <h4 className="font-bold text-black text-lg sm:text-xl md:text-2xl">
                    {testimonial.name}
                  </h4>
                  <p className="text-brand-sky text-sm sm:text-base md:text-lg font-bold italic">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative px-2 sm:px-4 md:px-6">
                {/* Top quote */}
                <div
                  className={`absolute ${
                    isRTL ? "right-0" : "left-0"
                  } -top-5 sm:-top-7`}
                >
                  <Image
                    src="/images/quote1.png"
                    alt="quote"
                    width={60}
                    height={60}
                    className="w-8 sm:w-12 md:w-14 opacity-80"
                    loading="lazy"
                  />
                </div>

                <p
                  className={`text-gray-600 text-sm sm:text-base leading-relaxed italic px-3 sm:px-4 py-4 sm:py-6 -skew-x-3 sm:-skew-x-6 md:-skew-x-8 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {testimonial.quote}
                </p>

                {/* Bottom quote */}
                <div
                  className={`absolute ${
                    isRTL ? "left-0" : "right-0"
                  } -bottom-5 sm:-bottom-7`}
                >
                  <Image
                    src="/images/quote.png"
                    alt="quote"
                    width={60}
                    height={60}
                    className="w-8 sm:w-12 md:w-14 rotate-180 opacity-80"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
