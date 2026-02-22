"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  ShieldCheck,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import Button from "../ui/Button";
import { gsap } from "@/lib/gsap-setup";
import { useGSAP } from "@gsap/react";
import Stars from "../ui/Stars";

export default function Hero({ variant = "main" }) {
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

      if (!titleRef.current || !subtitleRef.current || !buttonsRef.current) {
        return;
      }

      const titleChildren = titleRef.current.children;
      const subtitleChildren = subtitleRef.current.children;
      const buttonChildren = buttonsRef.current.children;

      gsap.set(
        [titleChildren, subtitleChildren, buttonChildren, iconsRef.current],
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
      );

      const tl = gsap.timeline();

      tl.to(titleChildren, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
        .to(
          subtitleChildren,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          buttonChildren,
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
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
    },
    { scope: container, dependencies: [isMounted, variant] },
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
      className="relative flex items-center justify-center py-36 overflow-hidden"
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
        {/* TITLE */}
        <h1
          ref={titleRef}
          className="font-bold text-white mb-5 flex flex-col items-center"
        >
          {variant === "tamkeen" ? (
            <>
              <span>Enabling</span>

              <span className="text-brand-orange">The Future Generation</span>

              <span className="flex items-center gap-4 flex-wrap justify-center">
                <span>With</span>

                {/* Tamkeen Image */}
                <Image
                  src="/images/tamkeen-image.png"
                  alt="Tamkeen"
                  width={200}
                  height={80}
                  className="object-contain"
                  priority
                />
              </span>
            </>
          ) : (
            <>
              <span>Rising</span>
              <span className="text-brand-orange">From The Ashes</span>
              <span>
                To Build <span className="text-brand-sky">Better Future</span>
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        {/* Description */}
        <div ref={subtitleRef} className="max-w-4xl mx-auto space-y-4 mb-4">
          {variant === "main" ? (
            <>
              <p className="text-subtitle">
                We Don't Just Build Software,{" "}
                <span className="text-brand-orange">
                  We Build The Human Spirit
                </span>
              </p>
              <p className="text-subtitle">
                The <span className="text-brand-orange">Past</span> is behind
                and the{" "}
                <span className="text-brand-orange">Future Is Ours</span>
              </p>
              <p className="text-subtitle">
                We Don't make excuses{" "}
                <span className="text-brand-orange">We Rise</span>
              </p>
            </>
          ) : (
            <p className="text-subtitle text-white/80">
              Buildings can be broken, but the human Spirit remain Ignited. We
              didn't wait, We just did it because while aid sustains the body,
              knowledge reclaims the future. The war took Everything, but
              couldn't take our skills. We are building the minds that will
              rebuild this land.
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {variant === "tamkeen" ? (
            <>
              <Button variant="outline" color="orange">
                Visit Our Website
              </Button>
              <Button variant="outline" color="sky">
                Donate Now
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" color="orange">
                Explore Our Services
              </Button>
              <Button variant="outline" color="sky">
                Book A Free Meeting
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
