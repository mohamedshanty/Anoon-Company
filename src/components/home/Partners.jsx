"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
import { useTranslation } from "react-i18next";
import Stars from "../ui/Stars";

export default function Partners() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const container = useRef(null);
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });

  useAnimation({
    ref: headerRef,
    type: "slide-up",
    stagger: 0.1,
  });

  const partners = [
    { name: "SHELLS", image: "/images/partner1.png" },
    { name: "SmartFinder", image: "/images/partner2.png" },
    { name: "Zoomerr", image: "/images/partner3.png" },
    { name: "ArtVenue", image: "/images/partner4.png" },
  ];

  // Adjust image size based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImageSize({ width: 100, height: 100 });
      } else if (width < 768) {
        setImageSize({ width: 120, height: 120 });
      } else if (width < 1024) {
        setImageSize({ width: 150, height: 150 });
      } else {
        setImageSize({ width: 180, height: 180 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize animation with responsive duration
  useEffect(() => {
    if (!scrollRef.current) return;

    // Adjust animation speed based on screen size
    const getDuration = () => {
      const width = window.innerWidth;
      if (width < 640) return 25; // Slower on mobile for better visibility
      if (width < 1024) return 20;
      return 18;
    };

    // Use raw value: RTL = scroll right (+50), LTR = scroll left (-50)
    const xPercent = isRTL ? 50 : -50;

    animationRef.current = gsap.to(scrollRef.current, {
      xPercent: xPercent,
      repeat: -1,
      duration: getDuration(),
      ease: "linear",
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isRTL]);

  // تحديث الحركة عند تغيير اللغة
  useEffect(() => {
    if (animationRef.current && scrollRef.current) {
      // إعادة تعيين الحركة مع الاتجاه الجديد
      animationRef.current.kill();

      const xPercent = isRTL ? 50 : -50;
      const duration = getDuration();

      animationRef.current = gsap.to(scrollRef.current, {
        xPercent: xPercent,
        repeat: -1,
        duration: duration,
        ease: "linear",
      });
    }
  }, [isRTL]);

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  // دالة مساعدة لحساب المدة
  const getDuration = () => {
    const width = window.innerWidth;
    if (width < 640) return 25;
    if (width < 1024) return 20;
    return 18;
  };

  return (
    <section
      id="partner"
      ref={container}
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      dir={dir}
    >
      <Stars count={30} />

      <div className="main-container">
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 px-4`}
        >
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
            {t("partners.title", "Our Partner")}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#6EC1FF] mb-4">
            {t("partners.subtitle", "Working Together to Make Progress")}
          </h3>
        </div>

        <div className="w-full flex justify-center px-4 sm:px-6">
          <div
            className="relative w-full max-w-4xl overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={scrollRef}
              className={`flex items-center w-[200%] mt-10 ${isRTL ? 'flex-row' : ''}`}
              style={{ willChange: "transform" }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex flex-col items-center transition-all duration-300 hover:scale-110 min-w-[120px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[200px]"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="mb-2 object-contain w-auto h-auto"
                    priority={idx < 4}
                  />
                  {/* إضافة اسم الشريك للـ ARIA (اختياري) */}
                  <span className="sr-only">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}