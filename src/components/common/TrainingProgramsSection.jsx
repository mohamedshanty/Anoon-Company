"use client";

import SectionHeader from "../ui/SectionHeader";
import Stars from "../ui/Stars";
import TrainingProgramCard from "../ui/TrainingProgramCardProps";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TrainingProgramsSection = ({
  title,
  subtitleHighlightedWords,
  description,
  cardProps, // legacy single-card support
  cards, // array of courses
  starsCount = 20,
  maxWidth = "3xl",
  align = "center",
  isRTL = false,
}) => {
  const courseList = cards ?? (cardProps ? [cardProps] : []);
  const isSingle = courseList.length === 1;

  return (
    <section
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      <div className="main-container flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={{ highlightedWords: subtitleHighlightedWords }}
          description={description}
          starsCount={starsCount}
          maxWidth={maxWidth}
          align={align}
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-5xl">
          {isSingle ? (
            // دورة واحدة — بدون swiper
            <div className="card-wrapper">
              <TrainingProgramCard {...courseList[0]} isRTL={isRTL} />
            </div>
          ) : (
            <div className="courses-swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                slidesPerView={1}
                loop={courseList.length > 1}
                speed={550}
                dir={isRTL ? "rtl" : "ltr"}
                navigation={{
                  nextEl: ".courses-next",
                  prevEl: ".courses-prev",
                }}
                pagination={{
                  el: ".courses-pagination",
                  clickable: true,
                }}
                className="courses-swiper"
              >
                {courseList.map((course, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="slide-content">
                      <TrainingProgramCard {...course} isRTL={isRTL} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* أزرار التنقل */}
              <div className="courses-nav-wrapper">
                <button
                  className="courses-prev courses-nav-btn"
                  aria-label="Previous course"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Pagination dots تظهر بين الزرين */}
                <div className="courses-pagination" />

                <button
                  className="courses-next courses-nav-btn"
                  aria-label="Next course"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
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
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .courses-swiper-wrapper {
          position: relative;
          width: 100%;
        }

        /* تعديلات لإظهار الظل مع الحفاظ على إخفاء البطاقات الأخرى */
        :global(.courses-swiper) {
          width: 100%;
          overflow: hidden !important; /* تغيير من visible إلى hidden */
          padding: 20px 0 !important; /* إزالة padding الأفقي */
          margin: -20px 0 !important; /* تعديل margin */
        }

        :global(.courses-swiper .swiper-wrapper) {
          overflow: visible !important;
        }

        :global(.courses-swiper .swiper-slide) {
          height: auto;
          overflow: visible !important;
          display: flex;
          justify-content: center;
        }

        /* حاوية البطاقة في حالة السلايدر */
        .slide-content {
          height: 100%;
          width: 100%;
          max-width: 100%;
          overflow: visible !important;
          display: flex;
          justify-content: center;
        }

        /* حاوية البطاقة في حالة البطاقة الواحدة */
        .card-wrapper {
          width: 100%;
          overflow: visible !important;
          padding: 20px 0;
          margin: -20px 0;
          display: flex;
          justify-content: center;
        }

        /* أزرار التنقل */
        .courses-nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 28px;
          position: relative;
          z-index: 10;
        }

        :global(.courses-nav-btn) {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        :global(.courses-nav-btn:hover) {
          background: rgba(0, 191, 255, 0.15);
          border-color: rgba(0, 191, 255, 0.4);
          transform: scale(1.07);
        }

        :global(.courses-nav-btn:active) {
          transform: scale(0.95);
        }

        :global(.courses-nav-btn.swiper-button-disabled) {
          opacity: 0.2;
          cursor: not-allowed;
          transform: none;
        }

        /* Pagination */
        :global(.courses-pagination) {
          display: flex !important;
          position: static !important;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 80px;
        }

        :global(.courses-pagination .swiper-pagination-bullet) {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.25) !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
          opacity: 1 !important;
          margin: 0 !important;
        }

        :global(.courses-pagination .swiper-pagination-bullet-active) {
          width: 24px !important;
          background: #00bfff !important;
        }

        /* تحسين للشاشات الصغيرة */
        @media (max-width: 640px) {
          :global(.courses-swiper) {
            padding: 15px 0 !important;
            margin: -15px 0 !important;
          }

          .card-wrapper {
            padding: 15px 0;
            margin: -15px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default TrainingProgramsSection;
