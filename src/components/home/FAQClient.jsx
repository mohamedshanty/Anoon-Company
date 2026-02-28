"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FAQClient({ faqs, isRTL }) {
    const [openIndex, setOpenIndex] = useState(0);
    const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;
    const rotate = (angle) => (isRTL ? -angle : angle);

    return (
        <div className="space-y-4 md:space-y-5 lg:space-y-6">
            {faqs.map((faq, index) => (
                <Reveal
                    key={index}
                    type="slide-up"
                    duration={0.5}
                    delay={index * 0.05}
                    className={`rounded-2xl md:rounded-3xl bg-white text-brand-sky font-bold text-lg md:text-xl lg:text-2xl flex flex-col transition-all duration-200 shadow-lg hover:shadow-xl ${openIndex === index ? "ring-2 ring-brand-sky" : ""
                        }`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        className={`w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 ${isRTL ? "text-right" : "text-left"
                            } focus:outline-none group`}
                    >
                        <h4 className="text-brand-sky transition-all duration-200 text-sm sm:text-base md:text-lg lg:text-xl flex-1">
                            {faq.q}
                        </h4>

                        <div
                            className={`rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shadow-md transition-all duration-300 ${openIndex === index ? "bg-brand-sky" : "bg-white"
                                }`}
                            style={{
                                transform: `rotate(${openIndex === index ? rotate(90) : 0}deg)`,
                            }}
                        >
                            <ArrowIcon
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-200 ${openIndex === index ? "text-white" : "text-gray-400"
                                    }`}
                            />
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className={`px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 text-gray-500 bg-white rounded-b-2xl md:rounded-b-3xl text-sm md:text-base lg:text-lg font-normal ${isRTL ? "text-right" : ""}`}>
                            {faq.a}
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    );
}
