"use client";

import Image from "next/image";
import Stars from "../ui/Stars";

const Newsletter = () => {
  return (
    <section className="relative flex items-center justify-center p-6 overflow-visible my-20">
      <Stars />
      {/* الكرت الأبيض الرئيسي */}
      <div className="relative w-full max-w-4xl">
        {/* العناصر الزخرفية (النقاط) - توضع خارج الكرت */}
        <div className="absolute -top-10 -right-10 z-0">
          <Image
            src="/images/dots.png"
            alt="Decorative Dots"
            width={200}
            height={200}
            className="opacity-50"
            priority={false}
          />
        </div>
        <div className="absolute -bottom-10 -left-10 z-0">
          <Image
            src="/images/dots.png"
            alt="Decorative Dots"
            width={200}
            height={200}
            className="opacity-50"
            priority={false}
          />
        </div>

        {/* الكرت الرئيسي */}
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden p-10 md:p-16 pb-6 md:pb-8">
          {" "}
          {/* زر الإغلاق الصغير في الزاوية */}
          <button className="absolute top-6 right-8 text-gray-300 hover:text-gray-500 text-xl font-bold z-20">
            ✕
          </button>
          <div className="flex flex-col md:flex-row items-center gap-12 mb-15">
            {/* القسم الأيسر: الصورة والشكل الهندسي */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              {/* الصورة التوضيحية */}
              <Image
                src="/images/newsletter.png"
                width={350}
                height={350}
                alt="Reading News"
                className="relative z-10 drop-shadow-xl"
                priority={true}
              />

              {/* أوراق الشجر الصغيرة في الزاوية */}
              <div className="absolute bottom-4 left-12 w-6 h-6 bg-slate-700 rounded-tl-full rotate-45 opacity-20"></div>
            </div>

            {/* القسم الأيمن: المحتوى النصي */}
            <div className="w-full md:w-1/2">
              <h5 className="font-bold tracking-[0.05em] text-gray-900 uppercase mb-2">
                Get Our Weekly
              </h5>
              <h4 className="font-bold tracking-[0.2em] text-brand-sky uppercase leading-[0.9] mb-8">
                Newsletter
              </h4>

              <div className="text-gray-600 text-[19px] mb-8 max-w-sm">
                Get weekly updates on the newest design stories, case studies
                and tips right in your mailbox.
                <p className="font-medium text-gray-900 mt-2">Subscribe now!</p>
              </div>
            </div>
          </div>
          {/* حقل الإدخال والزر */}
          <div className="flex flex-col sm:flex-row items-stretch border-[1px] border-gray-200 rounded-md overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow px-5 py-4 outline-none text-gray-700 placeholder-gray-300 text-sm"
            />
            <button className="bg-brand-sky hover:bg-[#58a4e8] cursor-pointer text-white font-bold px-10 py-4 transition-all uppercase text-xs tracking-widest whitespace-nowrap">
              Subscribe
            </button>
          </div>
          {/* النص السفلي الصغير */}
          <p className="text-center text-[16px] text-gray-300 italic mt-5">
            Your email is safe with us, we don't spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
