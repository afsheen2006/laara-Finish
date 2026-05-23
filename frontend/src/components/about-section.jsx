
import { motion } from "framer-motion";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function AboutSection() {
  return (/*#__PURE__*/
    _jsx("section", { id: "about", className: "relative py-20 border-t border-border/50", children: /*#__PURE__*/
      _jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 }, children: [/*#__PURE__*/

          _jsx("h2", { className: "text-2xl font-bold text-foreground mb-6", children: "About" }), /*#__PURE__*/
          _jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [/*#__PURE__*/
            _jsx("p", { children: "Laara Innovations is a multi-disciplinary technology company at the forefront of innovation across drone research, educational technology, and digital services. Founded with a vision to bridge the gap between cutting-edge research and practical applications, we deliver solutions that transform industries." }




            ), /*#__PURE__*/
            _jsx("p", { children: "Our team of engineers, researchers, and educators work collaboratively to push boundaries and create meaningful impact. From advanced propeller designs to immersive learning platforms, every project we undertake is driven by our commitment to excellence and innovation." }




            )] }
          )] }
        ) }
      ) }
    ));

}