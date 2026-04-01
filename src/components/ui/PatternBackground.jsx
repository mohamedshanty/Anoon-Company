// components/ui/PatternBackground.jsx
import Image from "next/image";
import React from "react";

const PatternBackground = React.memo(function PatternBackground({
  direction = "default",
  opacity = "opacity-70",
  className = "",
  translateY = "-translate-y-30",
  priority = false,
}) {
  const directionClass = direction === "diagonal" ? "rotate-[160deg]" : "";

  return (
    <div
      className={`absolute inset-0 pointer-events-none -z-20 ${opacity} overflow-hidden ${className}`}
    >
      <div className={`relative w-full h-full ${directionClass}`}>
        <Image
          src="/images/pattern-v2.webp"
          alt=""
          fill
          className={`object-cover ${translateY}`}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          quality={40}
          sizes="(max-width: 640px) 100vw, 100vw"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
});

export default PatternBackground;
