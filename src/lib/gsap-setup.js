import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // High-end defaults
  gsap.defaults({
    ease: "power3.out",
    duration: 1,
  });

  // Configure ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
