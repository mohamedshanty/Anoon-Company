"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { useRTL } from "@/hooks/useRTL";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function TeamsClient({ members, tRoles }) {
    const { isRTL, dir, rotate } = useRTL();
    const [swiperKey, setSwiperKey] = useState(0);

    // Re-initialize swiper when direction changes
    useEffect(() => {
        setSwiperKey((prev) => prev + 1);
    }, [dir]);

    const getTranslatedRole = (role) => {
        return tRoles[role] || role;
    };

    return (
        <div className={`slider-container ${isRTL ? "rtl-slider" : ""}`}>
            <Swiper
                key={swiperKey}
                modules={[Navigation, EffectCoverflow]}
                slidesPerView={"auto"}
                centeredSlides={true}
                loop={true}
                speed={800}
                effect={"coverflow"}
                grabCursor={true}
                dir={dir}
                coverflowEffect={{
                    rotate: rotate(15),
                    stretch: 0,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows: true,
                }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    968: { slidesPerView: 3, spaceBetween: 40 },
                    1200: { slidesPerView: 4, spaceBetween: 40 },
                }}
                className="teams-swiper"
            >
                {members.map((member, index) => (
                    <SwiperSlide key={`${member.name}-${index}`}>
                        <div className={`team-card team-card-${index} flex flex-col items-center justify-center group`}>
                            <div className="relative w-[280px] h-[380px] overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={300}
                                    height={400}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 lg:group-hover:opacity-100 transition-all duration-500 hidden lg:flex items-end justify-center pb-8">
                                    <div className="text-center transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                                        <h4 className="text-white font-bold text-xl capitalize mb-1">
                                            {member.name}
                                        </h4>
                                        <p className="text-gray-300 text-sm font-medium">
                                            {getTranslatedRole(member.role)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center lg:hidden w-full">
                                <h4 className="text-white font-bold text-xl capitalize mb-1">
                                    {member.name}
                                </h4>
                                <p className="text-brand-sky text-sm font-semibold uppercase tracking-wider">
                                    {getTranslatedRole(member.role)}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={`navigation-wrapper ${isRTL ? "rtl-navigation" : ""}`}>
                <button className="swiper-button-prev" aria-label="Previous slide">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="swiper-button-next" aria-label="Next slide">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="swiper-pagination"></div>

            <style jsx>{`
        .slider-container { position: relative; width: 100%; margin: 0 auto; padding: 40px 60px; }
        .rtl-slider { direction: rtl; }
        :global(.teams-swiper) { overflow: visible !important; padding: 40px 0 60px 0; width: 100%; }
        :global(.teams-swiper .swiper-wrapper) { align-items: center; padding: 20px 0; }
        :global(.teams-swiper .swiper-slide) { 
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
          display: flex; justify-content: center; align-items: center; 
          opacity: 0.6; filter: blur(2px); transform: scale(0.85); 
        }
        :global(.teams-swiper .swiper-slide-active) { opacity: 1; filter: blur(0); transform: scale(1.15); z-index: 10; }
        :global(.teams-swiper .swiper-slide-active .relative) { box-shadow: 0 30px 50px -10px rgba(0, 191, 255, 0.4); }
        :global(.team-card) { width: 280px; height: auto; min-height: 380px; position: relative; cursor: pointer; }
        .navigation-wrapper { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); display: flex; justify-content: space-between; pointer-events: none; z-index: 20; padding: 0 10px; }
        :global(.swiper-button-prev), :global(.swiper-button-next) { 
          position: relative !important; width: 50px !important; height: 50px !important; 
          background: rgba(255, 255, 255, 0.15) !important; backdrop-filter: blur(10px) !important; 
          border-radius: 50% !important; color: white !important; display: flex !important; 
          align-items: center !important; justify-content: center !important; 
          pointer-events: auto !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; 
        }
        :global(.swiper-button-prev:after), :global(.swiper-button-next:after) { display: none !important; }
        :global(.swiper-pagination) { bottom: 0 !important; }
        :global(.swiper-pagination-bullet) { width: 10px !important; height: 10px !important; background: rgba(255, 255, 255, 0.3) !important; margin: 0 5px !important; }
        :global(.swiper-pagination-bullet-active) { width: 30px !important; background: #00bfff !important; border-radius: 5px !important; }
      `}</style>
        </div>
    );
}
