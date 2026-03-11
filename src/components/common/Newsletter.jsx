"use client";

import Image from "next/image";
import Stars from "../ui/Stars";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Newsletter = () => {
  const { t } = useTranslation();
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <section className="relative flex items-center justify-center p-4 md:p-6 overflow-hidden my-10 md:my-20">
      <Stars />
      <div className="relative w-full max-w-4xl">
        <div className="absolute -top-10 -right-10 z-0 hidden md:block">
          <Image
            src="/images/dots.png"
            alt="Decorative Dots"
            width={200}
            height={200}
            className="opacity-50"
            priority={false}
          />
        </div>
        <div className="absolute -bottom-10 -left-10 z-0 hidden md:block">
          <Image
            src="/images/dots.png"
            alt="Decorative Dots"
            width={200}
            height={200}
            className="opacity-50"
            priority={false}
          />
        </div>

        <div className="relative z-10 bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden p-6 md:p-16 md:pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-6 md:mb-15">
            {/* Image — hidden on mobile */}
            <div className="hidden md:flex w-full md:w-1/2 justify-center relative">
              <Image
                src="/images/newsletter.png"
                width={350}
                height={350}
                alt="Reading News"
                className="relative z-10 drop-shadow-xl"
                priority={true}
              />
              <div className="absolute bottom-4 left-12 w-6 h-6 bg-slate-700 rounded-tl-full rotate-45 opacity-20" />
            </div>

            <div className="w-full md:w-1/2">
              <h5 className="font-bold tracking-[0.05em] text-gray-900 uppercase mb-1 md:mb-2 text-sm md:text-base">
                {t("newsletter.badge")}
              </h5>
              <h4 className="font-bold tracking-[0.2em] text-blue-600 uppercase leading-tight mb-4 md:mb-8 text-2xl md:text-4xl">
                {t("newsletter.title")}
              </h4>

              <div className="text-gray-600 text-sm md:text-[19px] mb-4 md:mb-8 max-w-sm">
                {t("newsletter.description")}
                <p className="font-medium text-gray-900 mt-2">
                  {t("newsletter.cta")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-stretch border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="grow px-4 py-3 md:px-5 md:py-4 outline-none text-gray-700 placeholder-gray-300 text-sm"
                aria-label={t("newsletter.placeholder")}
              />
              <button
                onClick={() => {
                  setComingSoon(true);
                  setTimeout(() => setComingSoon(false), 3000);
                }}
                className="bg-brand-sky hover:bg-blue-600 cursor-pointer text-white font-bold px-8 py-3 md:px-10 md:py-4 transition-all uppercase text-xs tracking-widest whitespace-nowrap"
              >
                {t("newsletter.button")}
              </button>
            </div>

            {comingSoon && (
              <p className="mt-2 text-center text-sm text-blue-600 font-medium animate-fadeIn">
                🚀 {t("comingSoon.title")}
              </p>
            )}
          </div>

          <p className="text-center text-sm md:text-[16px] text-gray-300 italic mt-4 md:mt-5">
            {t("newsletter.footer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
