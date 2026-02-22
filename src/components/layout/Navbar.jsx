"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { PREMIUM_GRADIENT } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs", hasDropdown: true },
    { name: "Tech Agency", href: "#agency" },
    { name: "Our Impact", href: "#impact" },
    { name: "Our Team", href: "#teams" },
    { name: "Our Partner", href: "#partner" },
    { name: "Contact Us", href: "#contact" },
  ];

  // Split navLinks for tablet layout
  const firstRowLinks = navLinks.slice(0, 4);
  const secondRowLinks = navLinks.slice(4);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
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
      <div className="main-container flex flex-col md:flex-row items-center justify-between px-4 md:px-6 lg:px-8 gap-2 md:gap-0">
        {/* Logo and Actions Row */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={90}
              height={40}
              className={`w-auto h-7 sm:h-8 md:h-10 transition-transform duration-300 group-hover:scale-110 ${!scrolled ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}`}
            />
          </Link>
          {/* Actions for mobile/tablet */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* UK Flag - visible on mobile/tablet */}
            <span className="inline-block">
              <svg
                className="w-7 h-4 sm:w-8 sm:h-5 rounded-[2px] shadow-lg"
                viewBox="0 0 60 30"
              >
                <clipPath id="s-mobile">
                  <path d="M0,0 v30 h60 v-30 z" />
                </clipPath>
                <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                <path
                  d="M0,0 L60,30 M60,0 L0,30"
                  stroke="#fff"
                  strokeWidth="6"
                />
                <path
                  d="M0,0 L60,30 M60,0 L0,30"
                  stroke="#C8102E"
                  strokeWidth="4"
                />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path
                  d="M30,0 v30 M0,15 h60"
                  stroke="#C8102E"
                  strokeWidth="6"
                />
              </svg>
            </span>
            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
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

        {/* Desktop Navigation (lg and above) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) =>
            link.name === "Programs" ? (
              <div className="relative group" key={link.name}>
                <Link
                  href={link.href}
                  className="text-white text-sm xl:text-base font-medium hover:text-white/90 transition-colors duration-200 flex items-center"
                >
                  {link.name}
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </Link>
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <Link
                    href="/programs/tamkeen"
                    className="block px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm rounded-t-xl"
                  >
                    Tamkeen
                  </Link>
                  <Link
                    href="/programs/anoon"
                    className="block px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm rounded-b-xl"
                  >
                    Anoon
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

        {/* Tablet Navigation (md to lg) - Two rows */}
        <div className="hidden md:flex lg:hidden flex-col w-full mt-2 gap-1">
          {/* First row */}
          <div className="flex items-center justify-center gap-4">
            {firstRowLinks.map((link) =>
              link.name === "Programs" ? (
                <div className="relative group" key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white text-xs font-medium hover:text-white/90 transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </Link>
                  <div className="absolute left-0 top-full mt-2 w-36 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto transition-opacity duration-200 z-50">
                    <Link
                      href="/programs/tamkeen"
                      className="block px-3 py-2 text-brand-blue hover:bg-blue-50 font-medium text-xs rounded-t-lg"
                    >
                      Tamkeen
                    </Link>
                    <Link
                      href="/programs/anoon"
                      className="block px-3 py-2 text-brand-blue hover:bg-blue-50 font-medium text-xs rounded-b-lg"
                    >
                      Anoon
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-white font-normal transition-colors duration-200 text-xs whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>
          {/* Second row */}
          <div className="flex items-center justify-center gap-4">
            {secondRowLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white font-normal transition-colors duration-200 text-xs whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Support Us Button - Desktop/Tablet */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/support"
            className={`px-4 lg:px-5 xl:px-6 py-1.5 lg:py-2 border-2 font-medium rounded-lg lg:rounded-xl transition-all duration-500 text-xs lg:text-sm whitespace-nowrap ${
              scrolled
                ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-blue"
                : "border-[#3b82f6] text-white hover:bg-[#3b82f6] shadow-lg shadow-blue-600/20"
            }`}
          >
            Support Us
          </Link>

          {/* UK Flag - Desktop only */}
          <span className="hidden lg:inline-block">
            <svg
              className="w-8 h-5 lg:w-9 lg:h-6 rounded-[2px] shadow-lg"
              viewBox="0 0 60 30"
            >
              <clipPath id="s">
                <path d="M0,0 v30 h60 v-30 z" />
              </clipPath>
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path
                d="M0,0 L60,30 M60,0 L0,30"
                stroke="#C8102E"
                strokeWidth="4"
              />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Mobile/Tablet Menu (md and below) */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[49px] sm:top-[53px] transition-all duration-300 ease-in-out ${
          mobileMenuOpen
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
        <div className="flex flex-col p-4 max-h-[calc(100vh-49px)] sm:max-h-[calc(100vh-53px)] overflow-y-auto">
          {navLinks.map((link) =>
            link.name === "Programs" ? (
              <div key={link.name} className="mb-1">
                <button
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className="flex items-center justify-between w-full text-left text-white/90 hover:text-white py-2.5 px-3 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      programsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    programsDropdownOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="pl-6 mt-1 space-y-1">
                    <Link
                      href="/programs/tamkeen"
                      className="block text-white/70 hover:text-white py-2 px-3 hover:bg-white/10 rounded-lg transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tamkeen
                    </Link>
                    <Link
                      href="/programs/anoon"
                      className="block text-white/70 hover:text-white py-2 px-3 hover:bg-white/10 rounded-lg transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Anoon
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-white py-2.5 px-3 hover:bg-white/10 rounded-lg transition-colors text-sm mb-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ),
          )}

          {/* Support Us Button in Mobile Menu */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/support"
              className="block w-full text-center px-4 py-2.5 border-2 border-[#3b82f6] text-white hover:bg-[#3b82f6] rounded-lg transition-all duration-500 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
