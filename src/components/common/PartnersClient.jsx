"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";

export default function PartnersClient({ partners, isRTL }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setImageSize({ width: 100, height: 100 });
      else if (width < 768) setImageSize({ width: 120, height: 120 });
      else if (width < 1024) setImageSize({ width: 150, height: 150 });
      else setImageSize({ width: 180, height: 180 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    const getDuration = () => {
      const width = window.innerWidth;
      if (width < 640) return 15;
      if (width < 1024) return 12;
      return 10;
    };

    const xPercent = isRTL ? 50 : -50;

    animationRef.current = gsap.to(scrollRef.current, {
      xPercent: xPercent,
      repeat: -1,
      duration: getDuration(),
      ease: "none",
    });

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, [isRTL]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(animationRef.current, { timeScale: 0.2, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6">
      <div
        className="relative w-full max-w-5xl overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient Masks for Premium Look */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className={`flex items-center w-[200%] mt-10 py-4 ${isRTL ? "flex-row-reverse" : ""}`}
          style={{ WILL_CHANGE: "transform" }}
        >
          {[...partners, ...partners].map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex flex-col items-center transition-all duration-500 hover:scale-110 min-w-[140px] sm:min-w-[180px] md:min-w-[220px] lg:min-w-[250px] px-4"
            >
              <div className="relative group/card">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={imageSize.width}
                  height={imageSize.height}
                  className="mb-2 object-contain w-auto h-12 md:h-16 lg:h-20 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <span className="sr-only">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
