
import { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30
  });

  const displayValue = useTransform(spring, (current) =>
  Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (/*#__PURE__*/
    _jsxs("span", { ref: ref, children: [/*#__PURE__*/
      _jsx(motion.span, { children: displayValue }),
      suffix] }
    ));

}