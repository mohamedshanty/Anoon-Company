import { useAnimation } from "./useAnimation";

/**
 * Custom hook for scroll-triggered reveal animations
 * Now a wrapper around the more flexible useAnimation hook
 * 
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.ref - Reference to the element(s) to animate
 * @param {string} options.animation - Type of animation
 * @param {number} options.duration - Animation duration in seconds
 * @param {number} options.delay - Initial delay in seconds
 * @param {number} options.stagger - Stagger time between multiple elements
 * @param {string} options.start - ScrollTrigger start position
 * @param {boolean} options.once - Whether the animation should only play once
 * @param {boolean} options.isChildren - If true, ensures children are targeted if stagger isn't enough
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
  // Map 'animation' to 'type' and handle 'isChildren' logic
  // If isChildren is true, we force stagger to be at least a very small value if it's 0,
  // or useAnimation's target logic will handle it if we pass a target override
  
  useAnimation({
    ref,
    type: animation === "fade-in" ? "fade" : animation,
    duration,
    delay,
    stagger: stagger || (isChildren ? 0.1 : 0),
    start,
    once,
  });
};

export default useScrollReveal;
