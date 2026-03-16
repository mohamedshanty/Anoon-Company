"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { AnimatePresence, motion } from "framer-motion";

export default function FAQClient({ faqs, isRTL }) {
  const [openIndex, setOpenIndex] = useState(0);
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;
  const rotate = (angle) => (isRTL ? -angle : angle);

  const getRevealType = (index, total) => {
    // Alternate entry direction for a modern rhythm.
    // First/last from left-to-right, second from right-to-left.
    if (index === 0 || index === total - 1) return "slide-right";
    return index % 2 === 1 ? "slide-left" : "slide-right";
  };

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      {faqs.map((faq, index) => (
        <Reveal
          key={index}
          type={getRevealType(index, faqs.length)}
          duration={0.42}
          delay={index * 0.06}
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-brand-sky/15 bg-linear-to-br from-white via-white to-sky-50/50 text-brand-sky flex flex-col shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)] transition-all duration-300 ${
            openIndex === index
              ? "ring-2 ring-brand-sky/40 border-brand-sky/30"
              : ""
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_45%)]" />

          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className={`relative z-10 w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 ${
              isRTL ? "text-right" : "text-left"
            } focus:outline-none group cursor-pointer`}
            aria-expanded={openIndex === index}
          >
            <h4 className="text-brand-sky font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed flex-1 transition-colors duration-300 group-hover:text-sky-700">
              {faq.q}
            </h4>

            <motion.div
              animate={{
                rotate: openIndex === index ? rotate(90) : 0,
                scale: openIndex === index ? 1.05 : 1,
              }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center border shadow-md ${
                openIndex === index
                  ? "bg-brand-sky border-brand-sky"
                  : "bg-white border-brand-sky/20"
              }`}
            >
              <ArrowIcon
                className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-colors duration-200 ${
                  openIndex === index ? "text-white" : "text-brand-sky/60"
                }`}
              />
            </motion.div>
          </button>

          <AnimatePresence initial={false} mode="wait">
            {openIndex === index && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0, y: -8 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -6 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className={`relative z-10 px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 text-gray-600 text-sm md:text-base lg:text-lg font-normal leading-relaxed ${
                    isRTL ? "text-right" : ""
                  }`}
                >
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}
