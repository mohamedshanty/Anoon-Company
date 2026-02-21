"use client";

import { useRef, useEffect, useState } from "react";
import {
  BarChart3,
  ShieldCheck,
  LayoutGrid,
  MessageSquare,
  Zap,
} from "lucide-react";
import Button from "../ui/Button";
import { gsap } from "@/lib/gsap-setup";
import { useGSAP } from "@gsap/react";
import Stars from "../ui/Stars";

export default function Hero() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const iconsRef = useRef([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted) return;

      if (!titleRef.current?.children?.length ||
        !subtitleRef.current?.children?.length ||
        !buttonsRef.current?.children?.length) {
        return;
      }

      gsap.set([titleRef.current.children, subtitleRef.current.children, buttonsRef.current.children, iconsRef.current], {
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(titleRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
        .to(
          subtitleRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          buttonsRef.current.children,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
        .to(
          iconsRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
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
      delay: "0s",
    },
    {
      Icon: BarChart3,
      color: "text-blue-400",
      pos: "top-[40%] left-[10%]",
      delay: "1.5s",
    },
    {
      Icon: LayoutGrid,
      color: "text-amber-400",
      pos: "top-[25%] right-[15%]",
      delay: "0.8s",
    },
    {
      Icon: MessageSquare,
      color: "text-orange-400",
      pos: "top-[45%] right-[10%]",
      delay: "2.2s",
    },
  ];

  return (
    <section
      ref={container}
      className="relative flex items-center justify-center py-36"
    >
      {/* Background Glows & Particles (Star-like) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glows */}
        <div className="absolute top-10 right-10 w-[45%] h-[45%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[35%] h-[35%] bg-brand-orange/5 blur-[100px] rounded-full animate-pulse delay-1000" />

        {/* Stars */}
        <Stars count={20} zIndex={-5} opacity={0.8} />
      </div>

      {/* Floating Icon Cards */}
      {floatingIcons.map((item, idx) => (
        <div
          key={idx}
          ref={(el) => (iconsRef.current[idx] = el)}
          className={`absolute ${item.pos} hidden md:block animate-float`}
          style={{ animationDelay: item.delay }}
        >
          <div className="p-3 glass-card">
            <item.Icon className={`w-6 h-6 ${item.color}`} />
          </div>
        </div>
      ))}

      <div className="container mx-auto px-12 text-center relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-[1px] mb-10 flex flex-col items-center"
        >
          <span>Rising</span>
          <span className="text-brand-orange drop-shadow-[0_0_30px_rgba(249,157,27,0.2)]">
            From The Ashes
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-4">
            <span>To Build</span>
            <span className="text-brand-sky drop-shadow-[0_0_30px_rgba(100,185,255,0.2)]">
              Better Future
            </span>
          </div>
        </h1>

        <div ref={subtitleRef} className="max-w-3xl mx-auto space-y-2 mb-12">
          <p className="text-subtitle">
            We Don't Just Build Software{" "}
            <span className="text-brand-orange">We Build The Human Spirit</span>
          </p>
          <p className="text-subtitle">
            The <span className="text-brand-orange">Past</span> is behind and
            the <span className="text-brand-orange">Future Is Ours</span>
          </p>
          <p className="text-subtitle">
            We Don't make excuses{" "}
            <span className="text-brand-orange">We Rise</span>
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button variant="outline" color="orange">
            Explore Our Services
          </Button>
          <Button variant="outline" color="blue">
            Book A Free Meeting
          </Button>
        </div>
      </div>

    </section>
  );
}
