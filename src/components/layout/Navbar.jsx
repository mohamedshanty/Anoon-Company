"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { PREMIUM_GRADIENT } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs", hasDropdown: true },
    { name: "Tech Agency", href: "#agency" },
    { name: "Our Impact", href: "#impact" },
    { name: "Our Team", href: "#teams" },
    { name: "Our Partner", href: "#partner" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
      style={
        scrolled
          ? {
              background: PREMIUM_GRADIENT,
            }
          : {}
      }
    >
      <div className="main-container flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={40}
            className={`w-auto h-10 transition-transform duration-300 group-hover:scale-110 ${!scrolled ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}`}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.name === "Programs" ? (
              <div className="relative group" key={link.name}>
                <Link
                  href={link.href}
                  className="text-white text-lg font-bold transition-colors duration-200"
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 ml-1 inline-block align-middle" />
                </Link>
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <Link
                    href="/programs/tamkeen"
                    className="block px-5 py-3 text-brand-blue hover:bg-blue-50 font-semibold rounded-t-xl"
                  >
                    Tamkeen
                  </Link>
                  <Link
                    href="/programs/anoon"
                    className="block px-5 py-3 text-brand-blue hover:bg-blue-50 font-semibold rounded-b-xl"
                  >
                    Anoon
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 font-normal transition-colors duration-200"
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        {/* Support Us Button & Flag */}
        <div className="flex items-center gap-6">
          <Link
            href="/support"
            className={`px-7 py-2.5 border-2 font-bold rounded-xl transition-all duration-500 text-xs ${
              scrolled
                ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-blue"
                : "border-[#3b82f6] text-white hover:bg-[#3b82f6] shadow-lg shadow-blue-600/20"
            }`}
          >
            Support Us
          </Link>
          <span className="ml-2">
            <svg
              className="w-9 h-6 rounded-[2px] shadow-lg"
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
    </nav>
  );
}
