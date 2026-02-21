"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "../ui/Stars";

export default function Partners() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useScrollReveal({
    ref: headerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.1,
  });

  const partners = [
    { name: "SHELLS", image: "/images/partner1.png" },
    { name: "SmartFinder", image: "/images/partner2.png" },
    { name: "Zoomerr", image: "/images/partner3.png" },
    { name: "ArtVenue", image: "/images/partner4.png" },
  ];

  // Initialize animation
  useEffect(() => {
    if (!scrollRef.current) return;

    animationRef.current = gsap.to(scrollRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 18,
      ease: "linear",
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

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

  return (
    <section
      id="partner"
      ref={container}
      className="py-24 relative overflow-hidden"
    >
      <Stars count={30} />

      <div className="main-container">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-white font-bold text-5xl md:text-6xl mb-2">
            Our Partner
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#6EC1FF] mb-4">
            Working Together to Make Progress
          </h3>
        </div>

        <div className="w-full flex justify-center">
          <div
            className="relative w-full max-w-4xl overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 to-transparent z-10 pointer-events-none"></div>

            <div
              ref={scrollRef}
              className="flex gap-24 items-center w-[200%]"
              style={{ willChange: "transform" }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={200}
                    height={200}
                    className="mb-2 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}