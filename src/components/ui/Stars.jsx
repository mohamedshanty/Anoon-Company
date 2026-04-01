"use client";

import React from "react";

// Pre-compute star positions at module level (no client-side computation on mount)
const computeStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 1.5;
    const x = Math.abs((Math.sin(seed) * 10000) % 100);
    const y = Math.abs((Math.cos(seed) * 10000) % 100);
    const s = 2 + (i % 10);
    const d = (i % 4) * 0.5;
    const dur = 3 + (i % 5);
    stars.push({ x, y, s, d, dur });
  }
  return stars;
};

// Cache star configurations
const starCache = new Map();

const Stars = React.memo(function Stars({
  count = 20,
  className = "",
  zIndex = -10,
  opacity = 1,
}) {
  // Use cached stars to avoid re-computation
  if (!starCache.has(count)) {
    starCache.set(count, computeStars(count));
  }
  const stars = starCache.get(count);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-brand-orange rounded-full blur-[2px] animate-pulse"
          style={{
            top: `${star.y.toFixed(4)}%`,
            left: `${star.x.toFixed(4)}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            opacity: opacity * 0.9,
            animationDelay: `${star.d}s`,
            animationDuration: `${star.dur}s`,
          }}
        />
      ))}
    </div>
  );
});

export default Stars;
