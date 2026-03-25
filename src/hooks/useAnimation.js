import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-setup";

/**
 * Custom hook for GSAP animations with ScrollTrigger support
 *
 * @param {Object} options - Animation configuration
 * @param {React.RefObject} options.ref - Reference to the target element
 * @param {string} options.type - Animation preset ('fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'scale-up')
 * @param {number} options.delay - Initial delay in seconds
 * @param {number} options.duration - Animation duration in seconds
 * @param {number} options.stagger - Stagger time for children
 * @param {string} options.start - ScrollTrigger start position
 * @param {string} options.end - ScrollTrigger end position
 * @param {boolean|number} options.scrub - ScrollTrigger scrub value
 * @param {boolean} options.markers - Show ScrollTrigger markers for debugging
 * @param {boolean} options.disabled - Disable the animation
 * @param {boolean} options.once - Whether animation should trigger only once
 */
export const useAnimation = ({
  ref,
  type = "fade",
  delay = 0,
  duration = 1,
  stagger = 0,
  start = "top 85%",
  end = "bottom top",
  scrub = false,
  markers = false,
  disabled = false,
  once = false,
} = {}) => {
  useGSAP(
    () => {
      if (disabled || !ref?.current) return;

      const element = ref.current;

      // Determine the target: either the element itself or its children if staggering is requested
      const target =
        stagger > 0 && element.children?.length > 0
          ? Array.from(element.children)
          : element;

      if (!target || (Array.isArray(target) && target.length === 0)) return;

      const vars = {
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          markers,
          toggleActions: once
            ? "play none none none"
            : "restart reset restart reset",
        },
      };

      // Add specific animation type properties
      switch (type) {
        case "slide-up":
          vars.y = 50;
          break;
        case "slide-down":
          vars.y = -50;
          break;
        case "slide-left":
          vars.x = 80;
          break;
        case "slide-right":
          vars.x = -80;
          break;
        case "scale":
          vars.scale = 0;
          break;
        case "scale-up":
          vars.scale = 0.8;
          break;
        case "fade":
        default:
          // Opacity is already handled
          break;
      }

      let tween;

      try {
        tween = gsap.from(target, vars);
      } catch (error) {
        // In iframe previews, ScrollTrigger can fail due to cross-origin window access.
        const fallbackVars = { ...vars };
        delete fallbackVars.scrollTrigger;

        try {
          tween = gsap.from(target, fallbackVars);
        } catch {
          return;
        }
      }

      return () => {
        if (tween) tween.kill();
      };
    },
    {
      scope: ref,
      dependencies: [
        disabled,
        type,
        delay,
        duration,
        stagger,
        start,
        end,
        scrub,
        once,
      ],
    },
  );
};

export default useAnimation;
