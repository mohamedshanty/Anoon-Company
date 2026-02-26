"use client";

import React from "react";

/**
 * Container component for layout, padding, background, and RTL support.
 * Props:
 * - size: "main" | "sm" | "md" | "lg" | "xl" | "full"
 * - withPadding: boolean
 * - withBackground: boolean
 * - className: additional classes
 * - children: content
 */
const sizeClasses = {
  main: "max-w-7xl mx-auto",
  sm: "max-w-sm mx-auto",
  md: "max-w-md mx-auto",
  lg: "max-w-lg mx-auto",
  xl: "max-w-xl mx-auto",
  full: "w-full",
};

const Container = ({
  size = "main",
  withPadding = true,
  withBackground = false,
  className = "",
  children,
  ...props
}) => {
  const base = sizeClasses[size] || sizeClasses.main;
  const padding = withPadding ? "px-4 sm:px-6 lg:px-8" : "";
  const background = withBackground ? "bg-white/5 rounded-xl shadow-lg" : "";

  return (
    <div
      className={[base, padding, background, className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
