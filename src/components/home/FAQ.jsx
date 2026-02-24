"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, ChevronLeft } from "lucide-react"; // إضافة ChevronLeft
import PatternBackground from "../ui/PatternBackground";
import { gsap } from "@/lib/gsap-setup";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const headerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const faqItemsRef = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Animations for FAQ items
  useEffect(() => {
    if (!isMounted) return;

    // Animate FAQ items on mount
    gsap.fromTo(
      faqItemsRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
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

  // Animate when opening/closing FAQ items
  useEffect(() => {
    if (!isMounted || openIndex === -1) return;

    // Animate the answer content
    gsap.fromTo(
      `.faq-answer-${openIndex}`,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      },
    );

    // Animate the arrow - rotate based on RTL
    gsap.to(arrowRefs.current[openIndex], {
      rotation: isRTL ? -90 : 90, // عكس الاتجاه في RTL
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Animate the arrow pulse
    gsap.to(arrowRefs.current[openIndex], {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  }, [openIndex, isMounted, isRTL]);

  // Handle arrow rotation when closing
  useEffect(() => {
    if (!isMounted) return;

    // Reset all arrows to 0 rotation when component mounts
    arrowRefs.current.forEach((arrow, index) => {
      if (arrow) {
        gsap.set(arrow, { rotation: 0 });
      }
    });
  }, [isMounted]);

  // Scroll reveal for header
  useScrollReveal({
    ref: headerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.1,
    disabled: !isMounted,
  });

  const faqs = t("faq.questions", { returnObjects: true }) || [];

  // Function to handle click and manage rotation
  const handleQuestionClick = (index) => {
    // If closing the current open item
    if (openIndex === index) {
      // Rotate arrow back to 0
      gsap.to(arrowRefs.current[index], {
        rotation: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      setOpenIndex(-1);
    }
    // If opening a new item
    else {
      // If there was a previously open item, rotate its arrow back to 0
      if (openIndex !== -1 && arrowRefs.current[openIndex]) {
        gsap.to(arrowRefs.current[openIndex], {
          rotation: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
      setOpenIndex(index);
    }
  };

  // اختيار الأيقونة المناسبة حسب اللغة
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section
      id="faq"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
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
                className={`rounded-2xl md:rounded-3xl bg-white text-brand-sky font-bold text-lg md:text-xl lg:text-2xl flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl ${openIndex === index ? "ring-2 ring-brand-sky" : ""
                  }`}
              >
                <button
                  onClick={() => handleQuestionClick(index)}
                  className={`w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 ${isRTL ? 'text-right' : 'text-left'
                    } focus:outline-none group`}
                >
                  <h5 className="text-brand-sky transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl flex-1">
                    {faq.q}
                  </h5>

                  {/* Arrow button with dynamic colors and rotation */}
                  <div
                    ref={(el) => (arrowRefs.current[index] = el)}
                    className={`rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shadow-md transition-all duration-300 ${openIndex === index
                      ? "bg-brand-sky" // Blue background when open
                      : "bg-white" // White background when closed
                      }`}
                    style={{
                      transform: `rotate(${openIndex === index ? (isRTL ? -90 : 90) : 0
                        }deg)`,
                    }}
                  >
                    <ArrowIcon
                      className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${openIndex === index
                        ? "text-white" // White arrow when open
                        : "text-gray-400" // Gray arrow when closed
                        }`}
                    />
                  </div>
                </button>

                {/* Animated answer section with GSAP */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index
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