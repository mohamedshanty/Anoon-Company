"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // روابط التواصل الاجتماعي
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  // معلومات الاتصال
  const contactInfo = {
    address: t("footer.address", "8819 Ohio St. South Gate, CA 90280"),
    addressFormatted: {
      line1: t("footer.address.line1", "8819 Ohio St. South Gate,"),
      line2: t("footer.address.line2", "CA 90280"),
    },
    email: t("footer.email", "Ourstudio@hello.com"),
    phone: t("footer.phone", "+1 386-688-3295"),
    phoneFormatted: t("footer.phone.formatted", "386-688-3295 1+"),
  };

  return (
    <footer
      className="pt-20 pb-10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="main-container">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/footer.png"
                alt={t("footer.logo_alt", "Anoon Logo")}
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </Link>
            <p className="text-white leading-relaxed mb-6 max-w-sm">
              {t("footer.description", "OurStudio is a digital agency UI/UX Design and Website Development located in Ohio, United States of America")}
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">
              {t("footer.get_in_touch", "تواصل معنا")}
            </h4>
            <ul className="space-y-6">
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row' : ''}`}>
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col text-white">
                  {isRTL ? (
                    <>
                      <span>{t("footer.address.line1", "8819 Ohio St. South Gate,")}</span>
                      <span>{t("footer.address.line2", "CA 90280")}</span>
                    </>
                  ) : (
                    <span>{contactInfo.address}</span>
                  )}
                </div>
              </li>

              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row' : ''}`}>
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">{contactInfo.email}</span>
              </li>

              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row' : ''}`}>
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                {isRTL ? (
                  <span className="text-white">{t("footer.phone.formatted", "386-688-3295 1+")}</span>
                ) : (
                  <span className="text-white">{contactInfo.phone}</span>
                )}
              </li>
            </ul>
          </div>

          {/* Social & Description - الجزء المعدل */}
          <div>
            <div className={`flex gap-4 mb-8 ${isRTL ? 'justify-start' : ''}`}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className={`text-white text-sm leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {t("footer.social_description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.")}
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">
              {t("footer.newsletter.title", "Join a Newsletter")}
            </h4>
            <div className="space-y-4">
              <p className={`text-white text-sm ${isRTL ? 'text-right' : ''}`}>
                {t("footer.newsletter.label", "Your Email")}
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t("footer.newsletter.placeholder", "Enter Your Email")}
                  className={`w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:border-orange-500 transition-colors ${isRTL ? 'text-right' : ''
                    }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <div className="mt-5">
                  <Button
                    variant="filled"
                    color="orange"
                    className="w-full sm:w-auto"
                  >
                    {t("footer.newsletter.button", "Subscribe")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className={`text-white text-sm ${isRTL ? 'text-center' : ''}`}>
            {t("footer.copyright", "Copyright ANoon LLC")}
          </p>
        </div>
      </div>
    </footer>
  );
}