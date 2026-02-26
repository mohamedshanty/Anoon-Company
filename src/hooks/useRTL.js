import { useTranslation } from "react-i18next";

/**
 * Custom hook to handle RTL (Right-to-Left) logic and styles
 * Returns helpers to adjust layouts and animations based on the current language direction
 */
export const useRTL = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const dir = isRTL ? "rtl" : "ltr";

  // Layout helpers
  const textAlign = isRTL ? "right" : "left";
  const flexDirection = isRTL ? "row-reverse" : "row";

  // Logical property helpers for styles
  const ms = isRTL ? "marginRight" : "marginLeft";
  const me = isRTL ? "marginLeft" : "marginRight";
  const ps = isRTL ? "paddingRight" : "paddingLeft";
  const pe = isRTL ? "paddingLeft" : "paddingRight";

  /**
   * Adjusts translateX value based on direction
   * @param {number|string} value - The movement value
   * @returns {number|string} Direction-aware value
   */
  const translateX = (value) => {
    if (typeof value === "string") {
      // If it's a string like "100%", we flip the sign if RTL
      if (isRTL) {
        return value.startsWith("-") ? value.substring(1) : `-${value}`;
      }
      return value;
    }
    return isRTL ? -value : value;
  };

  /**
   * Adjusts rotation value based on direction
   * @param {number} value - The rotation in degrees
   * @returns {number} Direction-aware rotation
   */
  const rotate = (value) => {
    return isRTL ? -value : value;
  };

  return {
    isRTL,
    dir,
    textAlign,
    flexDirection,
    ms,
    me,
    ps,
    pe,
    translateX,
    rotate,
  };
};

export default useRTL;
