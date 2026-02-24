"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الشهادات
  const testimonials = [
    {
      id: "alla",
      name: t("testimonials.alla.name", "Alla Abu Hamaza"),
      role: t("testimonials.alla.role", "Front End Development"),
      image: "/images/alaa.png",
      quote: t("testimonials.alla.quote", "Thank You Tamkeen I didn't just make money i was able to achieve my dreams, i know that i have the skill but you give me the tools and platform and the network i need it was a lovely journey, yes it was tough but we made it through together"),
    },
    {
      id: "yazan",
      name: t("testimonials.yazan.name", "Yazan Deher"),
      role: t("testimonials.yazan.role", "UI UX Designer"),
      image: "/images/yazan.png",
      quote: t("testimonials.yazan.quote", "I Believe That i was my destiny, i am amazing UX Designer yet i learned a lot of empathy from the staff i needed a place to feel where i belong and i found it here, Now i am in a better place, happy where i am and still rising and i will never give up"),
    },
  ];

  return (
    <div className="flex items-center justify-center p-6 mt-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl px-12 py-10 relative transform -skew-x-10 overflow-visible"
          >
            <div className="skew-x-10">
              {/* صورة الشخص والمعلومات - محسنة لـ RTL */}
              <div className={`flex items-center gap-6 mb-4 ${isRTL ? 'flex-row' : ''}`}>
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="font-bold text-black leading-tight text-xl">
                    {testimonial.name}
                  </h4>
                  <p className="text-brand-sky text-xl font-bold italic tracking-tight">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* منطقة الاقتباس مع تحسين مواضع الأيقونات */}
              <div className="relative px-8">
                {/* أيقونة الاقتباس العلوية - محسنة للموضع */}
                <div className={`absolute ${isRTL ? '-right-2' : '-left-2'} -top-6 z-10`}>
                  <Image
                    src="/images/quote1.png"
                    alt={t("testimonials.quote_alt", "quote")}
                    width={70}
                    height={70}
                    className="opacity-80"
                  />
                </div>

                {/* نص الاقتباس */}
                <p className={`text-gray-600 text-base leading-relaxed italic font-normal px-6 py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {testimonial.quote}
                </p>

                {/* أيقونة الاقتباس السفلية - محسنة للموضع */}
                <div className={`absolute ${isRTL ? '-left-2' : '-right-2'} -bottom-6 z-10`}>
                  <Image
                    src="/images/quote.png"
                    alt={t("testimonials.quote_alt", "quote")}
                    width={70}
                    height={70}
                    className="opacity-80 rotate-180"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;