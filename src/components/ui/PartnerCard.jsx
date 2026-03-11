// components/partners/PartnerCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ExternalLink,
  MapPin,
  Award,
  Heart,
  Shield,
  HandHeart,
} from "lucide-react";

export default function PartnerCard({
  name,
  logo,
  description,
  supportMessage,
  website,
  registrationNumber,
  location,
  charityType,
  isRTL = false,
  variant = "simple", // simple or detailed
}) {
  const { t } = useTranslation();

  const detailedContent = (
    <div className="space-y-5">
      {/* Support Message */}
      <div className="p-4 bg-gradient-to-r from-brand-sky/20 to-brand-orange/20 rounded-xl border border-white/10">
        <div className="flex items-start gap-3">
          <HandHeart className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
          <p
            className={`text-white/90 text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
          >
            {supportMessage ||
              t(
                "partner.supports_anoon",
                "Proudly supports Anoon's mission to empower youth through technology and education in Gaza.",
              )}
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-full">
          <Award className="w-4 h-4 text-brand-orange" />
          <span className="text-white/80">{registrationNumber}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-full">
          <MapPin className="w-4 h-4 text-brand-sky" />
          <span className="text-white/80">{location}</span>
        </div>
      </div>

      {/* Charity Type */}
      {charityType && (
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-brand-orange" />
          <span className="text-white/70 text-xs">{charityType}</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-brand-sky/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-sky/10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-sky/10 via-transparent to-brand-orange/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Logo Container */}
      <div className="flex justify-center mb-4">
        <div className="relative w-[200px] h-[100px] p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:border-brand-sky/30 transition-all duration-500">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="200px"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="text-center space-y-4">
        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto line-clamp-2">
          {description}
        </p>

        {/* Detailed Content */}
        {variant === "detailed" && detailedContent}
      </div>
    </div>
  );
}
