"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Define the members data
const members = [
  {
    name: "John Doe",
    role: "CEO",
    image: "/images/hazem.png", // Update with actual paths
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/images/amani.png",
  },
  {
    name: "Mike Johnson",
    role: "Lead Developer",
    image: "/images/Alla.png",
  },
  {
    name: "Sarah Williams",
    role: "Designer",
    image: "/images/Abdllah.png",
  },
  {
    name: "Tom Brown",
    role: "Marketing",
    image: "/images/ghida.png",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    image: "/images/team/emily-davis.png",
  },
  {
    name: "Chris Wilson",
    role: "Developer",
    image: "/images/team/chris-wilson.png",
  },
];

export default function Teams() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  // Fix the useScrollReveal hook call
  useScrollReveal({
    ref: headerRef, // instead of 'target'
    threshold: 0.1,
    staggerChildren: 0.2,
  });

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    gsap.to(cardRefs.current[index], {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(cardRefs.current[index].querySelector(".member-name"), {
      color: "#6EC1FF",
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    gsap.to(cardRefs.current[index], {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(cardRefs.current[index].querySelector(".member-name"), {
      color: "#FFFFFF",
      duration: 0.3,
    });
  };

  useEffect(() => {
    const floatAnimation = () => {
      cardRefs.current.forEach((card, index) => {
        if (hoveredIndex !== index) {
          gsap.to(card, {
            y: -3,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });
    };
    floatAnimation();
    return () => {
      cardRefs.current.forEach((card) => {
        gsap.killTweensOf(card);
      });
    };
  }, [hoveredIndex]);

  return (
    <section id="teams" className="py-24 relative overflow-hidden">
      <div className="main-container relative z-10">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-white font-semibold mb-5 drop-shadow-lg relative inline-block">
            Our Teams
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent "></span>
          </h3>
          <h4 className="font-bold text-brand-sky mb-4 drop-shadow-md">
            When everything fell, we stood up.
          </h4>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 z-20 bg-white/20 hover:bg-white/40 text-3xl rounded-full w-12 h-12 flex items-center justify-center transition-colors"
            onClick={() =>
              setStartIndex(
                (prev) => (prev - 1 + members.length) % members.length,
              )
            }
            aria-label="Previous"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            &#8592;
          </button>

          <div
            ref={gridRef}
            className="grid grid-cols-5 gap-8 justify-items-center items-start"
            style={{ width: "100%", maxWidth: 1200 }}
          >
            {members
              .slice(startIndex, startIndex + 5)
              .concat(
                startIndex + 5 > members.length
                  ? members.slice(0, (startIndex + 5) % members.length)
                  : [],
              )
              .map((member, idx) => (
                <div
                  key={`${startIndex}-${idx}`}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="flex flex-col items-center group w-full"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={500} // optional max width
                        height={300} // optional
                        className="w-full h-auto object-cover"
                        priority={idx < 2}
                      />
                    </div>
                  </div>
                  {/* <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-lg member-name transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-[#6EC1FF] font-extrabold text-lg tracking-wide uppercase drop-shadow-md relative">
                      {member.role}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#6EC1FF] rounded-full group-hover:w-12 transition-all duration-300"></span>
                    </p>
                  </div> */}
                </div>
              ))}
          </div>

          <button
            className="absolute right-0 z-20 bg-white/20 hover:bg-white/40 text-3xl rounded-full w-12 h-12 flex items-center justify-center transition-colors"
            onClick={() => setStartIndex((prev) => (prev + 1) % members.length)}
            aria-label="Next"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            &#8594;
          </button>
        </div>

        {/* Decorative bottom line */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#6EC1FF] to-transparent rounded-full"></div>
          <div className="w-2 h-2 bg-[#6EC1FF] rounded-full animate-pulse"></div>
          <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#6EC1FF] to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
