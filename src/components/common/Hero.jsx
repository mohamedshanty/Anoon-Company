"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  ShieldCheck,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import { gsap } from "@/lib/gsap-setup";
import { useGSAP } from "@gsap/react";
import Stars from "../ui/Stars";

export default function Hero({ children }) {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const iconsRef = useRef([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useGSAP(
    () => {
      if (!isMounted) return;

      const title = container.current?.querySelector('[data-hero="title"]');
      const subtitle = container.current?.querySelector(
        '[data-hero="subtitle"]',
      );
      const buttons = container.current?.querySelector('[data-hero="buttons"]');

      const titleChildren = title?.children;
      const subtitleChildren = subtitle?.children;
      const buttonChildren = buttons?.children;

      if (titleChildren) {
        gsap.set(titleChildren, { opacity: 0, y: 30, scale: 0.9 });
      }
      if (subtitleChildren) {
        gsap.set(subtitleChildren, { opacity: 0, y: 30, scale: 0.9 });
      }
      if (buttonChildren) {
        gsap.set(buttonChildren, { opacity: 0, y: 30, scale: 0.9 });
      }
      gsap.set(iconsRef.current, { opacity: 0, y: 30, scale: 0.9 });

      const tl = gsap.timeline();

      if (titleChildren) {
        tl.to(titleChildren, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      }

      if (subtitleChildren) {
        tl.to(
          subtitleChildren,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      if (buttonChildren) {
        tl.to(
          buttonChildren,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
      }
      const actions = container.current?.querySelector('[data-hero="actions"]');
      const actionsChildren = actions?.children;

      if (actionsChildren) {
        gsap.set(actionsChildren, { opacity: 0, y: 30, scale: 0.95 });
      }

      if (actionsChildren) {
        tl.to(
          actionsChildren,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      tl.to(
        iconsRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );
    },
    { scope: container, dependencies: [isMounted] },
  );

  const floatingIcons = [
    {
      Icon: ShieldCheck,
      color: "text-emerald-400",
      pos: "top-[20%] left-[15%]",
    },
    { Icon: BarChart3, color: "text-blue-400", pos: "top-[40%] left-[10%]" },
    { Icon: LayoutGrid, color: "text-amber-400", pos: "top-[25%] right-[15%]" },
    {
      Icon: MessageSquare,
      color: "text-orange-400",
      pos: "top-[45%] right-[10%]",
    },
  ];

  return (
    <section
      ref={container}
      className="relative flex items-center justify-center py-36 overflow-hidden min-h-[600px]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-[45%] h-[45%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[35%] h-[35%] bg-brand-orange/10 blur-[100px] rounded-full" />
        <Stars count={20} zIndex={-5} opacity={0.8} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <div
          key={idx}
          ref={(el) => (iconsRef.current[idx] = el)}
          className={`absolute ${item.pos} hidden md:block animate-float`}
        >
          <div className="p-3 glass-card">
            <item.Icon className={`w-6 h-6 ${item.color}`} />
          </div>
        </div>
      ))}

      <div className="container mx-auto px-6 text-center relative z-10">
        {children}
      </div>
    </section>
  );
}

// Sub-components للاستخدام السهل
Hero.Title = function HeroTitle({ children, className = "" }) {
  return (
    <h1
      data-hero="title"
      className={`font-bold text-white mb-5 flex flex-col items-center ${className}`}
    >
      {children}
    </h1>
  );
};

Hero.Subtitle = function HeroSubtitle({ children, className = "" }) {
  return (
    <div
      data-hero="subtitle"
      className={`max-w-3xl mx-auto space-y-4 mb-4 ${className}`}
    >
      {children}
    </div>
  );
};

Hero.Buttons = function HeroButtons({ children, className = "" }) {
  return (
    <div
      data-hero="buttons"
      className={`flex flex-col sm:flex-row gap-6 justify-center ${className}`}
    >
      {children}
    </div>
  );
};

Hero.Actions = function HeroActions({ children, className = "" }) {
  return (
    <div
      data-hero="actions"
      className={`mt-14 flex justify-center ${className}`}
    >
      {children}
    </div>
  );
};
