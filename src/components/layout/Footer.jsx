"use client";
// components/layout/Footer.jsx
// Wrapped with NavbarGuard so it disappears on /dashboard routes.

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/dashboard", "/login"];

export default function Footer() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();
  const pathname = usePathname();

  // Hide footer on dashboard and all sub-routes
  const isHidden = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  if (isHidden) return null;

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=61584269549700",
      label: "Facebook",
    },
    { icon: FaWhatsapp, href: "https://wa.me/972567098648", label: "WhatsApp" },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/anoonsolutions/?utm_source=ig_web_button_share_sheet",
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/anoon-solutions-%D8%A7%D9%84%D9%86%D9%88%D9%86-%D9%84%D9%84%D8%AD%D9%84%D9%88%D9%84-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A%D8%A9/posts/?feedView=all&viewAsMember=true",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="pt-20 pb-10" dir={dir}>
      <div className="main-container">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1 text-center md:text-start">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo1.png"
                alt={t("footer.logo_alt", "Anoon Logo")}
                width={100}
                height={100}
              />
            </Link>
            <p className="text-white leading-relaxed mb-6 max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">
              {t("footer.get_in_touch", "Get in Touch")}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col text-white">
                  <span>{t("footer.addressFormatted.line1")}</span>
                  <span>{t("footer.addressFormatted.line2")}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-white">{t("footer.email")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-white" dir="ltr">
                  {t("footer.phone")}
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Description */}
          <div>
            <div className="flex gap-4 mb-8">
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
            <p className="text-white text-sm leading-relaxed">
              {t("footer.social_description")}
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">
              {t("footer.newsletter.title", "Join our Newsletter")}
            </h3>
            <div className="space-y-4">
              <p className="text-white text-sm">
                {t("footer.newsletter.label", "Email Address")}
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t(
                    "footer.newsletter.placeholder",
                    "Enter Your Email",
                  )}
                  className={`w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors ${isRTL ? "text-right" : ""}`}
                />
                <div className="mt-5">
                  <Button
                    variant="filled"
                    color="orange"
                    aria-label="Subscribe"
                    className="w-full sm:w-auto bg-[#b85c00]! text-white! hover:bg-[#9a4d00]!"
                  >
                    {t("footer.newsletter.button", "Subscribe")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center flex flex-col items-center gap-2">
          <p className="text-white text-sm font-medium flex items-center justify-center gap-2">
            <span>&copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span>{t("footer.copyright")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
