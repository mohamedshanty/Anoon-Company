"use client";

import React from "react";

/**
 * Typography component for unified text and heading styles.
 * Props:
 * - variant: h1, h2, h3, h4, h5, h6, subtitle, body, caption
 * - color: brand-orange, brand-sky, brand-white, brand-blue, white, gray
 * - gradient: false | "primary" | "orange"
 * - size: "responsive" | "sm" | "md" | "lg" (optional, for future use)
 * - as: override tag (e.g., span, p)
 * - className: additional classes
 * - children: content
 */
const Typography = ({
  variant = "body",
  color = "brand-white",
  gradient = false,
  size = "responsive",
  as,
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "transition-all duration-300";

  const variants = {
    h1: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight",
    h2: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h3: "text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h4: "text-3xl md:text-4xl lg:text-5xl font-bold",
    h5: "text-xl md:text-2xl font-bold",
    h6: "text-lg md:text-xl font-bold",
    body: "text-base md:text-lg leading-relaxed",
    subtitle: "text-lg md:text-xl font-medium opacity-90",
    caption: "text-sm text-white/60",
  };

  const colors = {
    "brand-orange": "text-brand-orange",
    "brand-sky": "text-brand-sky",
    "brand-white": "text-brand-white",
    "brand-blue": "text-brand-blue",
    white: "text-white",
    gray: "text-white/60",
  };

  const gradients = {
    primary:
      "bg-gradient-to-t from-[#3C6F99] to-[#64B9FF] bg-clip-text text-transparent",
    orange:
      "bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent",
  };

  // Pick tag based on variant, or override with 'as'
  const Tag =
    as ||
    (["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant) ? variant : "p");

  const combinedClasses = [
    baseStyles,
    variants[variant],
    gradient
      ? gradients[gradient === true ? "primary" : gradient]
      : colors[color],
    className,
  ].join(" ");

  return (
    <Tag className={combinedClasses} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
