"use client";

import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import React, { useRef, useEffect, useState, useCallback } from "react";
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
  const recaptchaWidgetRef = useRef(null);
  const [RecaptchaComponent, setRecaptchaComponent] = useState(null);
  const [siteKey, setSiteKey] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "");
  }, []);

  // Lazy-load reCAPTCHA only when user focuses any form field
  const loadRecaptcha = useCallback(() => {
    if (RecaptchaComponent || !siteKey) return;
    import("react-google-recaptcha").then((mod) => {
      setRecaptchaComponent(() => mod.default);
    });
  }, [siteKey, RecaptchaComponent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    if (!recaptchaWidgetRef.current) {
      // If recaptcha hasn't loaded yet, load it and ask user to retry
      loadRecaptcha();
      setStatus({
        loading: false,
        success: false,
        error: "Please try again in a moment.",
      });
      return;
    }

    try {
      const recaptchaToken = await recaptchaWidgetRef.current.executeAsync();

      if (!recaptchaToken) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      const formData = {
        name: formInputsRef.current[0]?.value || "",
        email: formInputsRef.current[1]?.value || "",
        phone: formInputsRef.current[2]?.value || "",
        message: formInputsRef.current[3]?.value || "",
        recaptchaToken,
      };

      // التحقق من الحقول المطلوبة
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        formRef.current.reset();
        recaptchaWidgetRef.current?.reset();
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        loading: false,
        success: false,
        error: error.message || "An error occurred. Please try again.",
      });
    }
  };

  useEffect(() => {
    // Use requestAnimationFrame to batch DOM reads and avoid forced reflow
    const rafId = requestAnimationFrame(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          formInputsRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" },
          "-=0.1",
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" },
        )
        .fromTo(
          contactInfoRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1",
        )
        .fromTo(
          mapRef.current,
          { rotationY: 10, scale: 0.9, opacity: 0 },
          {
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        );
    });

    // Input focus/blur animations are now handled via CSS transitions
    // (see className "transition-transform" on inputs) — avoids forced reflow

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
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
                {t("get_in_touch.title")}{" "}
                <span className="text-brand-sky">
                  {t("get_in_touch.title_highlight")}
                </span>
              </h2>
              <p
                ref={subtitleRef}
                className="mt-2 text-sm sm:text-base md:text-lg text-gray-300"
              >
                {t("get_in_touch.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onFocus={loadRecaptcha}
              className="space-y-4 md:space-y-5 lg:space-y-6"
            >
              <input
                ref={(el) => (formInputsRef.current[0] = el)}
                type="text"
                placeholder={t("get_in_touch.form.name")}
                required
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base focus:border-brand-sky focus:ring-1 focus:ring-brand-sky focus:scale-[1.01] transition-all duration-200"
              />
              <input
                ref={(el) => (formInputsRef.current[1] = el)}
                type="email"
                placeholder={t("get_in_touch.form.email")}
                required
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base focus:border-brand-sky focus:ring-1 focus:ring-brand-sky focus:scale-[1.01] transition-all duration-200"
              />
              <input
                ref={(el) => (formInputsRef.current[2] = el)}
                type="tel"
                placeholder={t("get_in_touch.form.phone")}
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base focus:border-brand-sky focus:ring-1 focus:ring-brand-sky focus:scale-[1.01] transition-all duration-200"
              />
              <textarea
                ref={(el) => (formInputsRef.current[3] = el)}
                placeholder={t("get_in_touch.form.find_us")}
                rows={4}
                required
                className="w-full p-3 md:p-4 rounded-md bg-transparent border border-white/30 placeholder-gray-400 outline-none text-sm md:text-base focus:border-brand-sky focus:ring-1 focus:ring-brand-sky focus:scale-[1.01] transition-all duration-200 resize-none"
              />

              {/* reCAPTCHA - Lazy loaded on form focus */}
              {RecaptchaComponent && siteKey && (
                <RecaptchaComponent
                  ref={recaptchaWidgetRef}
                  sitekey={siteKey}
                  size="invisible"
                  theme="dark"
                />
              )}

              <button
                ref={buttonRef}
                type="submit"
                disabled={status.loading || !siteKey}
                className="w-full py-3 md:py-4 bg-brand-sky hover:bg-brand-sky/90 hover:scale-[1.03] active:scale-[0.98] rounded-md font-semibold text-sm md:text-base transition-all duration-200 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status.loading
                    ? t("get_in_touch.form.sending", "Sending...")
                    : t("get_in_touch.form.send")}
                </span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>

              {status.success && (
                <p className="text-green-500 text-sm mt-2">
                  {t("get_in_touch.form.success", "Message sent successfully!")}
                </p>
              )}
              {status.error && (
                <p className="text-red-500 text-sm mt-2">{status.error}</p>
              )}
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
                    <p className="font-semibold text-sm md:text-base">
                      {t("get_in_touch.contact.phone")}
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      +972 567098648
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                  <Mail
                    className="text-white group-hover:text-brand-sky transition-colors duration-200"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {t("get_in_touch.contact.email")}
                    </p>
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
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d850.3659826430599!2d34.454040238200285!3d31.51141560541474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDMwJzQwLjciTiAzNMKwMjcnMTQuOCJF!5e0!3m2!1sar!2s!4v1772710212552!5m2!1sar!2s"
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
