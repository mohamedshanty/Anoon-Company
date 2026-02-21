import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-setup";

/**
 * Custom hook for scroll-triggered reveal animations using GSAP
 * 
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.ref - Reference to the element(s) to animate
 * @param {string} options.animation - Type of animation ('fade-in', 'slide-up', 'slide-left', 'slide-right', 'scale-up')
 * @param {number} options.duration - Animation duration in seconds
 * @param {number} options.delay - Initial delay in seconds
 * @param {number} options.stagger - Stagger time between multiple elements
 * @param {string} options.start - ScrollTrigger start position (e.g. 'top 85%')
 * @param {boolean} options.once - Whether the animation should only play once
 * @param {boolean} options.isChildren - If true, animates children of the ref instead of the ref itself
 */
export const useScrollReveal = ({
  ref,
  animation = "slide-up",
  duration = 1,
  delay = 0,
  stagger = 0,
  start = "top 85%",
  once = true,
  isChildren = false,
} = {}) => {
  useGSAP(() => {
    if (!ref.current) return;

    const target = isChildren ? ref.current.children : ref.current;
    if (!target) return;

    const vars = {
      opacity: 0,
      duration,
      delay,
      stagger,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      }
    };

    switch (animation) {
      case "slide-up":
        vars.y = 50;
        break;
      case "slide-down":
        vars.y = -50;
        break;
      case "slide-left":
        vars.x = 50;
        break;
      case "slide-right":
        vars.x = -50;
        break;
      case "scale-up":
        vars.scale = 0.8;
        break;
      case "fade-in":
      default:
        // Already handling opacity: 0
        break;
    }

    gsap.from(target, vars);
  }, { scope: ref });
};
