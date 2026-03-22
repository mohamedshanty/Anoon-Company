"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Keyboard,
  Pagination,
} from "swiper/modules";
import { useRTL } from "@/hooks/useRTL";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function TeamsClient({ members, tRoles }) {
  const { isRTL, dir, rotate } = useRTL();
  const [swiperKey, setSwiperKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef(null);
  const navigationSelectors = isRTL
    ? { prevEl: ".nav-btn-next", nextEl: ".nav-btn-prev" }
    : { prevEl: ".nav-btn-prev", nextEl: ".nav-btn-next" };

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [dir]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isMounted, swiperKey]);

  const getTranslatedRole = (role) => tRoles[role] || role;

  if (!isMounted) {
    return (
      <div className="slider-container" style={{ minHeight: 520 }}>
        <div className="flex items-center justify-center gap-6 py-16 overflow-hidden">
          {members.slice(0, 5).map((member, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                width: i === 2 ? 260 : i === 1 || i === 3 ? 220 : 180,
                opacity: i === 2 ? 1 : i === 1 || i === 3 ? 0.75 : 0.4,
                transform: `scale(${i === 2 ? 1.12 : i === 1 || i === 3 ? 0.93 : 0.82})`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: i === 2 ? 360 : i === 1 || i === 3 ? 320 : 280,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={260}
                  height={360}
                  className="w-full h-full object-cover"
                  priority={i === 2}
                />
              </div>
            </div>
          ))}
        </div>
        {members[0] && (
          <div className="active-label" style={{ display: "flex" }}>
            <span className="active-label-name">{members[0].name}</span>
            <span className="active-label-dot">·</span>
            <span className="active-label-role">
              {getTranslatedRole(members[0].role)}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`slider-container ${isRTL ? "rtl-slider" : ""}`}>
      <div className="glow-backdrop" aria-hidden="true" />

      {/*
        ✅ السبب: لما كانت الأزرار بعد <Swiper>، كان Swiper يتهيأ وهي لسا مش موجودة في الـ DOM
        ✅ الحل: نحط الأزرار قبل <Swiper> + نستخدم CSS class selectors بدل refs
        بكذا Swiper يلاقيها موجودة دايماً حتى بعد الـ refresh
      */}
      <button
        className="nav-btn nav-btn-prev"
        aria-label={isRTL ? "الشريحة السابقة" : "Previous slide"}
      >
        <svg
          width="20"
          height="20"
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

      <button
        className="nav-btn nav-btn-next"
        aria-label={isRTL ? "الشريحة التالية" : "Next slide"}
      >
        <svg
          width="20"
          height="20"
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

      <Swiper
        key={swiperKey}
        modules={[Navigation, EffectCoverflow, Keyboard, Pagination]}
        centeredSlides={true}
        loop={true}
        speed={700}
        effect="coverflow"
        grabCursor={true}
        dir={dir}
        coverflowEffect={{
          rotate: rotate(12),
          stretch: 0,
          depth: 180,
          modifier: 2.2,
          slideShadows: true,
        }}
        navigation={navigationSelectors}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
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
            <div className="team-card group">
              <div className="card-image-wrapper">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={400}
                  className="card-image"
                  priority={index === 0}
                />
                <div className="card-overlay">
                  <div className="card-overlay-text">
                    <h4 className="card-name">{member.name}</h4>
                    <p className="card-role">
                      {getTranslatedRole(member.role)}
                    </p>
                  </div>
                </div>
                <div className="active-ring" />
              </div>
              <div className="card-mobile-info">
                <h4 className="card-name-mobile">{member.name}</h4>
                <p className="card-role-mobile">
                  {getTranslatedRole(member.role)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {members[activeIndex] && (
        <div className="active-label" aria-live="polite">
          <span className="active-label-name">{members[activeIndex].name}</span>
          <span className="active-label-dot">·</span>
          <span className="active-label-role">
            {getTranslatedRole(members[activeIndex].role)}
          </span>
        </div>
      )}

      <div className="swiper-pagination" />

      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: 60px 70px 80px;
          overflow: hidden;
        }
        .rtl-slider {
          direction: rtl;
        }
        .glow-backdrop {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 300px;
          background: radial-gradient(
            ellipse,
            rgba(0, 191, 255, 0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* الأزرار بـ position:absolute عشان مكانها ثابت بغض النظر عن ترتيب الـ DOM */
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }
        .nav-btn-prev {
          left: 8px;
        }
        .nav-btn-next {
          right: 8px;
        }
        .nav-btn:hover {
          background: rgba(0, 191, 255, 0.2);
          border-color: rgba(0, 191, 255, 0.5);
          transform: translateY(-50%) scale(1.08);
        }
        .nav-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        :global(.nav-btn.swiper-button-disabled) {
          opacity: 0.3;
          pointer-events: none;
        }

        :global(.teams-swiper) {
          overflow: visible !important;
          padding: 50px 0 70px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        :global(.teams-swiper .swiper-wrapper) {
          align-items: center;
          will-change: transform;
        }
        :global(.teams-swiper .swiper-slide) {
          transition:
            transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.6;
          transform: scale(0.82);
        }
        :global(.teams-swiper .swiper-slide-active) {
          opacity: 1;
          transform: scale(1.12);
          z-index: 10;
        }
        :global(.teams-swiper .swiper-slide-prev),
        :global(.teams-swiper .swiper-slide-next) {
          opacity: 0.75;
          transform: scale(0.93);
        }
        .team-card {
          width: 260px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card-image-wrapper {
          position: relative;
          width: 260px;
          height: 360px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        :global(.card-image) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .team-card:hover :global(.card-image) {
          transform: scale(1.07);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 24px;
        }
        @media (min-width: 1024px) {
          .team-card:hover .card-overlay {
            opacity: 1;
          }
        }
        .card-overlay-text {
          text-align: center;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }
        .team-card:hover .card-overlay-text {
          transform: translateY(0);
        }
        .card-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.15rem;
          text-transform: capitalize;
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }
        .card-role {
          color: rgba(0, 191, 255, 0.9);
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .active-ring {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          pointer-events: none;
          overflow: hidden;
        }
        .active-ring::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          border: 2px solid rgba(0, 191, 255, 0.6);
          transform: scale(0.94);
          opacity: 0;
        }
        :global(.swiper-slide-active) .active-ring::after {
          animation: ring-pulse 2.5s ease-in-out infinite;
        }
        @keyframes ring-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.04);
            opacity: 0;
          }
        }
        .card-mobile-info {
          margin-top: 16px;
          text-align: center;
          display: block;
        }
        @media (min-width: 1024px) {
          .card-mobile-info {
            display: none;
          }
        }
        .card-name-mobile {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
          text-transform: capitalize;
          margin-bottom: 4px;
        }
        .card-role-mobile {
          color: #00bfff;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .active-label {
          text-align: center;
          margin-top: -20px;
          margin-bottom: 20px;
          display: none;
          gap: 10px;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .active-label {
            display: flex;
          }
        }
        .active-label-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.03em;
        }
        .active-label-dot {
          color: rgba(0, 191, 255, 0.5);
          font-size: 1.4rem;
          line-height: 1;
        }
        .active-label-role {
          color: #00bfff;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        :global(.swiper-pagination) {
          bottom: 0 !important;
        }
        :global(.swiper-pagination-bullet) {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.25) !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
        }
        :global(.swiper-pagination-bullet-active) {
          width: 28px !important;
          background: #00bfff !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
}
