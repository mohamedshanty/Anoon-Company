"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";
import { useScrollReveal } from "@/hooks/useScrollReveal";
// استيراد Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

// استيراد أنماط Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

// ===== DATA =====
const members = [
  { name: "amani", role: "CTO", image: "/images/teem/amani.png" },
  { name: "hazem", role: "CEO", image: "/images/teem/hazem.png" },
  { name: "Alla", role: "Lead Developer", image: "/images/teem/Alla.png" },
  { name: "Abdllah", role: "Designer", image: "/images/teem/abdalla.png" },
  { name: "ghida", role: "Marketing", image: "/images/teem/ghida.png" },
  {
    name: "Ihab",
    role: "Product Manager",
    image: "/images/teem/ihab.png",
  },
  {
    name: "Reem",
    role: "Developer",
    image: "/images/teem/reem.png",
  },
  {
    name: "Abd El-Moniem",
    role: "Developer",
    image: "/images/teem/abdelmoniem.png",
  },
];

export default function Teams() {
  const headerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [swiper, setSwiper] = useState(null);

  // ===== SCROLL REVEAL =====
  useScrollReveal({
    ref: headerRef,
    threshold: 0.1,
    staggerChildren: 0.2,
  });

  // ===== HOVER ANIMATION =====
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (index === swiper?.activeIndex) {
      gsap.to(`.team-card-${index}`, {
        scale: 1.25,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    if (index === swiper?.activeIndex) {
      gsap.to(`.team-card-${index}`, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <section id="teams" className="py-24 relative overflow-hidden">
      <div className="main-container relative z-10">
        {/* ===== HEADER ===== */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-white font-bold text-4xl mb-5">Our Teams</h1>
          <p className="text-white text-lg font-light">
            When everything fell, we stood up.
          </p>
        </div>

        {/* ===== CENTERED SWIPER SLIDER ===== */}
        <div className="slider-container">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            slidesPerView={"auto"}
            centeredSlides={true}
            loop={true}
            speed={800}
            effect={"coverflow"}
            grabCursor={true}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 2.5,
              slideShadows: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            onSwiper={setSwiper}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              968: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="teams-swiper"
          >
            {members.map((member, index) => (
              <SwiperSlide key={`${member.name}-${index}`}>
                <div
                  className={`team-card team-card-${index} flex flex-col items-center justify-center group`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="relative w-[280px] h-[380px] overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/images/teem/placeholder.png";
                      }}
                    />

                    {/* Overlay with info - يظهر عند hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h5 className="text-white font-bold text-xl capitalize mb-1">
                          {member.name}
                        </h5>
                        <p className="text-gray-300 text-sm font-medium">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="navigation-wrapper">
            <button className="swiper-button-prev">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="swiper-button-next">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Pagination */}
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 60px;
        }

        :global(.teams-swiper) {
          overflow: visible !important;
          padding: 40px 0 60px 0;
          width: 100%;
        }

        :global(.teams-swiper .swiper-wrapper) {
          align-items: center;
          padding: 20px 0;
        }

        :global(.teams-swiper .swiper-slide) {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.6;
          filter: blur(2px);
          transform: scale(0.85);
        }

        :global(.teams-swiper .swiper-slide-active) {
          opacity: 1;
          filter: blur(0);
          transform: scale(1.15);
          z-index: 10;
        }

        :global(.teams-swiper .swiper-slide-active .relative) {
          box-shadow: 0 30px 50px -10px rgba(0, 191, 255, 0.4);
        }

        :global(.teams-swiper .swiper-slide-prev),
        :global(.teams-swiper .swiper-slide-next) {
          opacity: 0.8;
          filter: blur(1px);
          transform: scale(1);
        }

        :global(.teams-swiper .swiper-slide-prev .relative),
        :global(.teams-swiper .swiper-slide-next .relative) {
          box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.3);
        }

        :global(.team-card) {
          width: 280px;
          height: 380px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        :global(.team-card:hover .relative) {
          box-shadow: 0 40px 60px -10px rgba(0, 191, 255, 0.6);
        }

        /* Navigation Wrapper */
        .navigation-wrapper {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 20;
          padding: 0 10px;
        }

        /* أزرار التنقل */
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          position: relative !important;
          width: 50px !important;
          height: 50px !important;
          background: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 50% !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
          pointer-events: auto !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          margin: 0 !important;
        }

        :global(.swiper-button-prev:hover),
        :global(.swiper-button-next:hover) {
          background: rgba(0, 191, 255, 0.3) !important;
          transform: scale(1.1) !important;
          border-color: rgba(0, 191, 255, 0.5) !important;
        }

        :global(.swiper-button-prev:after),
        :global(.swiper-button-next:after) {
          display: none !important;
        }

        /* Pagination */
        :global(.swiper-pagination) {
          bottom: 0 !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-pagination-bullet-active) {
          width: 30px !important;
          background: #00bfff !important;
          border-radius: 5px !important;
        }

        :global(.swiper-button-disabled) {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }

        /* تحسينات للشاشات المختلفة */
        @media (max-width: 1200px) {
          .slider-container {
            padding: 30px 50px;
          }

          :global(.team-card) {
            width: 240px;
            height: 340px;
          }
        }

        @media (max-width: 968px) {
          .slider-container {
            padding: 20px 40px;
          }

          :global(.team-card) {
            width: 220px;
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .slider-container {
            padding: 20px 30px;
          }

          :global(.team-card) {
            width: 200px;
            height: 280px;
          }

          :global(.swiper-button-prev),
          :global(.swiper-button-next) {
            width: 40px !important;
            height: 40px !important;
          }
        }

        @media (max-width: 640px) {
          .slider-container {
            padding: 20px;
          }

          :global(.team-card) {
            width: 260px;
            height: 360px;
          }

          :global(.teams-swiper .swiper-slide-active) {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
