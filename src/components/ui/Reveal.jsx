"use client";

import { useRef } from "react";
import { useAnimation } from "@/hooks/useAnimation";

export default function Reveal({
  children,
  type = "fade",
  delay = 0,
  duration = 1,
  stagger = 0,
  start = "top 85%",
  once = false,
  className = "",
}) {
  const ref = useRef(null);

  useAnimation({
    ref,
    type,
    delay,
    duration,
    stagger,
    start,
    once,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
