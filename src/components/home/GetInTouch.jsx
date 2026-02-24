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
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title
    tl.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    )
      // Animate subtitle
      .fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      // Animate form inputs with stagger
      .fromTo(
        formInputsRef.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.2",
      )
      // Animate button with pulse effect
      .fromTo(
        buttonRef.current,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
        },
      )
      // Animate contact info
      .fromTo(
        contactInfoRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
      // Animate map with rotation and scale
      .fromTo(
        mapRef.current,
        {
          rotationY: 15,
          scale: 0.8,
          opacity: 0,
        },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4",
      );

    // Add hover animation for form inputs
    formInputsRef.current.forEach((input) => {
      if (input) {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.02,
            borderColor: "#38bdf8",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            borderColor: "rgba(255,255,255,0.3)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    // Add hover animation for button
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(56, 189, 248, 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // Add hover animation for contact info items
    const contactItems = contactInfoRef.current?.children;
    if (contactItems) {
      Array.from(contactItems).forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
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
              <select
                ref={(el) => (formInputsRef.current[3] = el)}
                defaultValue=""
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 outline-none text-sm md:text-base text-gray-400 transition-all duration-300 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky"
              >
                <option value="" disabled>
                  {t("get_in_touch.form.find_us")}
                </option>
                <option value="google" className="text-brand-blue bg-white">
                  {t("get_in_touch.form.google")}
                </option>
                <option value="friend" className="text-brand-blue bg-white">
                  {t("get_in_touch.form.friend")}
                </option>
                <option value="social" className="text-brand-blue bg-white">
                  {t("get_in_touch.form.social")}
                </option>
              </select>

              <button
                ref={buttonRef}
                type="submit"
                className="w-full py-3 md:py-4 bg-brand-sky hover:bg-brand-sky/90 rounded-md font-semibold text-sm md:text-base transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">{t("get_in_touch.form.send")}</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </form>

            {/* Contact Info */}
            <div ref={contactInfoRef} className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16">
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                  <Phone
                    className="text-white group-hover:text-brand-sky transition-colors duration-300"
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
                    className="text-white group-hover:text-brand-sky transition-colors duration-300"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0921962908023!2d106.82496491476962!3d-6.202044195495702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d5a5e0efb1%3A0x5c4a6f23456789ab!2sKebon%20Melati!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
