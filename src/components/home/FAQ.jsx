"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight } from "lucide-react";
import PatternBackground from "../ui/PatternBackground";

export default function FAQ() {
  const headerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only use scroll reveal if the hook exists and component is mounted
  if (isMounted) {
    try {
      useScrollReveal({
        ref: headerRef,
        animation: "slide-up",
        isChildren: true,
        stagger: 0.1,
      });

      useScrollReveal({
        ref: itemsContainerRef,
        animation: "slide-up",
        isChildren: true,
        stagger: 0.15,
        start: "top 80%",
      });
    } catch (error) {
      console.error("Scroll reveal error:", error);
    }
  }

  const faqs = [
    {
      question: "Is Anoon a charity or a company?",
      answer:
        "Anoon is a social enterprise, not a charity. We combine education and technical solutions for sustainable impact.",
    },
    {
      question: "Do you work with international partners?",
      answer:
        "Yes, we collaborate with international organizations to expand our reach and impact.",
    },
    {
      question: "What makes your workspace different?",
      answer:
        'We Don’t Offer just desks, we offer a "rehabilitation" approach providing the routine, peer support, and stability needed to work professionally in a conflict zone & After all that we provide freelancing training so it could compete in the Modern day world.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction="diagonal"
          translateY="-translate-y-30"
          opacity="opacity-100"
        />
      </div>

      <div className="main-container">
        <div className="max-w-4xl mx-auto">
          <div ref={headerRef} className="text-center mb-16 md:mb-25">
            <h2 className="text-white font-semibold text-5xl md:text-6xl mb-5">
              FAQ
            </h2>
            <h3 className="font-semibold text-[#6EC1FF] mb-8">
              Learn More About Us
            </h3>
          </div>
          <div ref={itemsContainerRef} className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-3xl bg-white text-brand-sky font-bold text-2xl flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl ${openIndex === index ? "ring-2 ring-[#6EC1FF]" : ""
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none group"
                >
                  <h5 className="text-brand-sky transition-all duration-300">
                    {faq.question}
                  </h5>

                  {/* Arrow button with dynamic colors based on open/close state */}
                  <div
                    className={`rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-500 ${openIndex === index
                      ? "bg-[#6EC1FF] rotate-90" // Blue background when open
                      : "bg-white rotate-0" // White background when closed
                      }`}
                  >
                    <ChevronRight
                      className={`w-6 h-6 transition-all duration-300 ${openIndex === index
                        ? "text-white" // White arrow when open
                        : "text-gray-400" // Gray arrow when closed
                        }`}
                    />
                  </div>
                </button>

                {/* Animated answer section */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-8 pb-6 text-gray-500 bg-white rounded-b-3xl text-lg font-normal transform transition-all duration-500">
                    {faq.answer}
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