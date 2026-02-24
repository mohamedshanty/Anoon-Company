"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { PREMIUM_GRADIENT } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check screen size for breakpoint at 1535px
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1535);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.programs"), href: "#programs", hasDropdown: true },
    { name: t("nav.agency"), href: "#agency" },
    { name: t("nav.impact"), href: "#impact" },
    { name: t("nav.team"), href: "#teams" },
    { name: t("nav.partner"), href: "#partner" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
        ? "backdrop-blur-xl border-b border-white/10 py-2 md:py-3 shadow-2xl"
        : "bg-transparent py-3 md:py-5"
        }`}
      style={
        scrolled
          ? {
            background: PREMIUM_GRADIENT,
          }
          : {}
      }
    >
      <div className="main-container flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={40}
            className={`w-auto h-7 sm:h-8 md:h-10 transition-transform duration-300 group-hover:scale-110 ${!scrolled ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""
              }`}
          />
        </Link>

        {/* Desktop Navigation - Only visible above 1535px */}
        {isLargeScreen && (
          <div className="flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) =>
              link.name === t("nav.programs") ? (
                <div className="relative group" key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white text-sm xl:text-base font-medium hover:text-white/90 transition-colors duration-200 flex items-center whitespace-nowrap"
                  >
                    {link.name}
                    <ChevronDown className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
                  </Link>
                  <div className="absolute left-0 rtl:left-auto rtl:right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto transition-opacity duration-200 z-50">
                    <Link
                      href="/programs/tamkeen"
                      className="block px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm rounded-t-xl"
                    >
                      {t("nav.dropdown.tamkeen")}
                    </Link>
                    <Link
                      href="/programs/anoon"
                      className="block px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm rounded-b-xl"
                    >
                      {t("nav.dropdown.anoon")}
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-white font-normal transition-colors duration-200 text-sm xl:text-base whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>
        )}

        {/* Tablet/Mobile Navigation - Hidden above 1535px */}
        {!isLargeScreen && (
          <div className="flex-1 mx-4">
            {/* This space is intentionally left empty - navigation is in burger menu */}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Support Us Button - Hidden on mobile, visible on tablet and desktop */}
          <Link
            href="/support"
            className={`hidden md:inline-block px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 border-2 font-medium rounded-lg lg:rounded-xl transition-all duration-500 text-xs lg:text-sm whitespace-nowrap ${scrolled
              ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-blue"
              : "border-[#3b82f6] text-white hover:bg-[#3b82f6] shadow-lg shadow-blue-600/20"
              }`}
          >
            {t("nav.support")}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Menu Button - Visible on all screens below 1535px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors ${isLargeScreen ? "hidden" : "flex"
              }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu (visible when burger menu is clicked) */}
      <div
        className={`fixed inset-x-0 top-[49px] sm:top-[53px] md:top-[61px] transition-all duration-300 ease-in-out ${mobileMenuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        style={
          scrolled
            ? {
              background: PREMIUM_GRADIENT,
            }
            : {
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(10px)",
            }
        }
      >
        <div className="flex flex-col p-4 md:p-6 max-h-[calc(100vh-49px)] sm:max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-61px)] overflow-y-auto">
          {navLinks.map((link) =>
            link.name === t("nav.programs") ? (
              <div key={link.name} className="mb-1 md:mb-2">
                <button
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className="flex items-center justify-between w-full text-left text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base"
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${programsDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${programsDropdownOpen ? "max-h-40" : "max-h-0"
                    }`}
                >
                  <div className="pl-6 md:pl-8 rtl:pr-6 rtl:pl-0 mt-1 space-y-1">
                    <Link
                      href="/programs/tamkeen"
                      className="block text-white/70 hover:text-white py-2 md:py-2.5 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.dropdown.tamkeen")}
                    </Link>
                    <Link
                      href="/programs/anoon"
                      className="block text-white/70 hover:text-white py-2 md:py-2.5 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.dropdown.anoon")}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base mb-1 md:mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ),
          )}

          {/* Support Us Button in Mobile/Tablet Menu */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
            <Link
              href="/support"
              className="block w-full text-center px-4 py-2.5 md:py-3 border-2 border-[#3b82f6] text-white hover:bg-[#3b82f6] rounded-lg transition-all duration-500 text-sm md:text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.support")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}