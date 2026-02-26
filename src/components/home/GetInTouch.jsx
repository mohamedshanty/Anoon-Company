"use client";

import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-setup";
import { useTranslation } from "react-i18next";

const GetInTouch = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const formInputsRef = useRef([]);
  const contactInfoRef = useRef(null);
  const mapRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Create a timeline for better control - مع speeds أسرع
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // بدأ مبكراً قليلاً
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title - أسرع
    tl.fromTo(
      titleRef.current,
      {
        y: 30, // مسافة أقل
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4, // من 0.8 إلى 0.4
        ease: "power2.out", // easing أسرع
      },
    )
      // Animate subtitle - أسرع وتأخير أقل
      .fromTo(
        subtitleRef.current,
        {
          y: 20, // مسافة أقل
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3, // من 0.6 إلى 0.3
          ease: "power2.out",
        },
        "-=0.2", // تأخير أقل (كان -=0.4)
      )
      // Animate form inputs with stagger - أسرع
      .fromTo(
        formInputsRef.current,
        {
          x: -30, // مسافة أقل
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3, // من 0.6 إلى 0.3
          stagger: 0.08, // stagger أقل (كان 0.15)
          ease: "power2.out",
        },
        "-=0.1", // تأخير أقل
      )
      // Animate button with pulse effect - أسرع
      .fromTo(
        buttonRef.current,
        {
          scale: 0.95, // مقياس أقرب للطبيعي
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3, // من 0.5 إلى 0.3
          ease: "back.out(1.5)", // back out أقوى
        },
      )
      // Animate contact info - أسرع
      .fromTo(
        contactInfoRef.current,
        {
          y: 20, // مسافة أقل
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3, // من 0.6 إلى 0.3
          ease: "power2.out",
        },
        "-=0.1", // تأخير أقل
      )
      // Animate map with rotation and scale - أسرع
      .fromTo(
        mapRef.current,
        {
          rotationY: 10, // دوران أقل
          scale: 0.9, // مقياس أقرب
          opacity: 0,
        },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5, // من 1.0 إلى 0.5
          ease: "power2.out",
        },
        "-=0.2", // تأخير أقل
      );

    // Add hover animation for form inputs - مع speeds أسرع
    formInputsRef.current.forEach((input) => {
      if (input) {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.01, // تغيير أقل
            borderColor: "#38bdf8",
            duration: 0.15, // من 0.3 إلى 0.15
            ease: "power1.out", // easing أبسط
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            borderColor: "rgba(255,255,255,0.3)",
            duration: 0.15, // من 0.3 إلى 0.15
            ease: "power1.out",
          });
        });
      }
    });

    // Add hover animation for button - أسرع
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.03, // تغيير أقل
          boxShadow: "0 8px 20px -5px rgba(56, 189, 248, 0.4)",
          duration: 0.15, // من 0.3 إلى 0.15
          ease: "power1.out",
        });
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "none",
          duration: 0.15, // من 0.3 إلى 0.15
          ease: "power1.out",
        });
      });
    }

    // Add hover animation for contact info items - أسرع
    const contactItems = contactInfoRef.current?.children;
    if (contactItems) {
      Array.from(contactItems).forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 5, // حركة أقل
            duration: 0.15, // من 0.3 إلى 0.15
            ease: "power1.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.15, // من 0.3 إلى 0.15
            ease: "power1.out",
          });
        });
      });
    }

    // Cleanup
    return () => {
      tl.kill();
      formInputsRef.current.forEach((input) => {
        if (input) {
          input.removeEventListener("focus", () => { });
          input.removeEventListener("blur", () => { });
        }
      });
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", () => { });
        buttonRef.current.removeEventListener("mouseleave", () => { });
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-sky/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-sky/5 rounded-full blur-[100px]" />
      </div>

      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Left: Form + Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div ref={titleRef} className="mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                {t("get_in_touch.title")} <span className="text-brand-sky">{t("get_in_touch.title_highlight")}</span>
              </h2>
              <p
                ref={subtitleRef}
                className="mt-2 text-sm sm:text-base md:text-lg text-gray-300"
              >
                {t("get_in_touch.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form ref={formRef} className="space-y-4 md:space-y-5 lg:space-y-6">
              <input
                ref={(el) => (formInputsRef.current[0] = el)}
                type="text"
                placeholder={t("get_in_touch.form.name")}
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base transition-all duration-300 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky"
              />
              <input
                ref={(el) => (formInputsRef.current[1] = el)}
                type="email"
                placeholder={t("get_in_touch.form.email")}
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base transition-all duration-300 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky"
              />
              <input
                ref={(el) => (formInputsRef.current[2] = el)}
                type="tel"
                placeholder={t("get_in_touch.form.phone")}
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base transition-all duration-300 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky"
              />
              <textarea
                ref={(el) => (formInputsRef.current[3] = el)}
                placeholder={t("get_in_touch.form.find_us")}
                rows={4}
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base transition-all duration-300 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky resize-none"
              />

              <button
                ref={buttonRef}
                type="submit"
                className="w-full py-3 md:py-4 bg-brand-sky hover:bg-brand-sky/90 rounded-md font-semibold text-sm md:text-base transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">{t("get_in_touch.form.send")}</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </form>

            {/* Contact Info */}
            <div ref={contactInfoRef}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16">
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                  <Phone
                    className="text-white group-hover:text-brand-sky transition-colors duration-200"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">{t("get_in_touch.contact.phone")}</p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      +972 567098648
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                  <Mail
                    className="text-white group-hover:text-brand-sky transition-colors duration-200" // من 300 إلى 200
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">{t("get_in_touch.contact.email")}</p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      info@anoonsolutions.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Map */}
          <div
            ref={mapRef}
            className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-md overflow-hidden shadow-2xl"
          >
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d850.3676314386595!2d34.4542017!3d31.5112344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f68c560acb1%3A0xac8bdddab409dad6!2sSun%20Revolt%20Co!5e0!3m2!1sar!2s!4v1772023326422!5m2!1sar!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;