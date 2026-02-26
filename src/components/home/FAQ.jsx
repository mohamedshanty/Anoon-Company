"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PatternBackground from "../ui/PatternBackground";
import { gsap } from "@/lib/gsap-setup";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const { isRTL, dir, rotate } = useRTL();

  const headerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const faqItemsRef = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Animations for FAQ items - أسرع
  useEffect(() => {
    if (!isMounted) return;

    // Animate FAQ items on mount - speeds أسرع
    gsap.fromTo(
      faqItemsRef.current,
      {
        y: 30, // مسافة أقل
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4, // من 0.8 إلى 0.4
        stagger: 0.1, // من 0.2 إلى 0.1
        ease: "power2.out", // easing أسرع
        scrollTrigger: {
          trigger: itemsContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(faqItemsRef.current);
    };
  }, [isMounted]);

  // Animate when opening/closing FAQ items - أسرع
  useEffect(() => {
    if (!isMounted || openIndex === -1) return;

    // Animate the answer content - أسرع
    gsap.fromTo(
      `.faq-answer-${openIndex}`,
      {
        y: -15, // مسافة أقل
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3, // من 0.5 إلى 0.3
        ease: "power2.out", // easing أسرع
      },
    );

    // Animate the arrow - أسرع
    gsap.to(arrowRefs.current[openIndex], {
      rotation: rotate(90),
      duration: 0.25, // من 0.4 إلى 0.25
      ease: "power1.inOut", // easing أبسط
    });

    // Animate the arrow pulse - أسرع
    gsap.to(arrowRefs.current[openIndex], {
      scale: 1.08, // تغيير أقل
      duration: 0.12, // من 0.2 إلى 0.12
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
    });
  }, [openIndex, isMounted, isRTL]);

  // Handle arrow rotation when closing - أسرع
  useEffect(() => {
    if (!isMounted) return;

    // Reset all arrows to 0 rotation when component mounts
    arrowRefs.current.forEach((arrow, index) => {
      if (arrow) {
        gsap.set(arrow, { rotation: 0 });
      }
    });
  }, [isMounted]);

  // Scroll reveal for header using the new useAnimation hook - أسرع
  useAnimation({
    ref: headerRef,
    type: "slide-up",
    stagger: 0.05, // من 0.1 إلى 0.05
    delay: 0, // إزالة التأخير
    disabled: !isMounted,
  });

  const faqs = t("faq.questions", { returnObjects: true }) || [];

  // Function to handle click and manage rotation - أسرع
  const handleQuestionClick = (index) => {
    // If closing the current open item
    if (openIndex === index) {
      // Rotate arrow back to 0 - أسرع
      gsap.to(arrowRefs.current[index], {
        rotation: 0,
        duration: 0.25, // من 0.4 إلى 0.25
        ease: "power1.inOut",
      });
      setOpenIndex(-1);
    }
    // If opening a new item
    else {
      // If there was a previously open item, rotate its arrow back to 0 - أسرع
      if (openIndex !== -1 && arrowRefs.current[openIndex]) {
        gsap.to(arrowRefs.current[openIndex], {
          rotation: 0,
          duration: 0.25, // من 0.4 إلى 0.25
          ease: "power1.inOut",
        });
      }
      setOpenIndex(index);
    }
  };

  // Pick the chevron icon based on direction
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section
      id="faq"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      dir={dir}
    >
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction="diagonal"
          translateY="-translate-y-30"
          opacity="opacity-100"
        />
      </div>

      <div className="main-container">
        <div className="max-w-4xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-12 md:mb-16 lg:mb-20 ${isRTL ? 'rtl' : ''}`}
          >
            <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-5">
              {t("faq.title")}
            </h2>
            <h3 className="font-semibold text-brand-sky text-base sm:text-lg md:text-xl lg:text-2xl">
              {t("faq.subtitle")}
            </h3>
          </div>

          <div
            ref={itemsContainerRef}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={(el) => (faqItemsRef.current[index] = el)}
                className={`rounded-2xl md:rounded-3xl bg-white text-brand-sky font-bold text-lg md:text-xl lg:text-2xl flex flex-col transition-all duration-200 shadow-lg hover:shadow-xl ${openIndex === index ? "ring-2 ring-brand-sky" : ""
                  }`}
              >
                <button
                  onClick={() => handleQuestionClick(index)}
                  className={`w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 ${isRTL ? 'text-right' : 'text-left'
                    } focus:outline-none group`}
                >
                  <h5 className="text-brand-sky transition-all duration-200 text-sm sm:text-base md:text-lg lg:text-xl flex-1">
                    {faq.q}
                  </h5>

                  {/* Arrow button with dynamic colors and rotation */}
                  <div
                    ref={(el) => (arrowRefs.current[index] = el)}
                    className={`rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shadow-md transition-all duration-200 ${openIndex === index
                      ? "bg-brand-sky"
                      : "bg-white"
                      }`}
                    style={{
                      transform: `rotate(${openIndex === index ? rotate(90) : 0}deg)`,
                    }}
                  >
                    <ArrowIcon
                      className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-200 ${openIndex === index
                        ? "text-white"
                        : "text-gray-400"
                        }`}
                    />
                  </div>
                </button>

                {/* Animated answer section with GSAP */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div
                    className={`faq-answer-${index} px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 text-gray-500 bg-white rounded-b-2xl md:rounded-b-3xl text-sm md:text-base lg:text-lg font-normal transform ${isRTL ? 'text-right' : ''
                      }`}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}