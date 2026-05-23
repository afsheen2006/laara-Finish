
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const socials = [

{
  name: "Instagram",
  href: "https://www.instagram.com/laara_innovations?igsh=dXlpM3YwNTF4ZTV2",
  icon: /*#__PURE__*/
  _jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6", children: [/*#__PURE__*/
    _jsx("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }), /*#__PURE__*/
    _jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }), /*#__PURE__*/
    _jsx("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })] }
  )

},
{
  name: "LinkedIn",
  href: "https://www.linkedin.com/company/laara-innovations/",
  icon: /*#__PURE__*/
  _jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6", children: /*#__PURE__*/
    _jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }
  )

}];


export function SocialSection() {
  return (/*#__PURE__*/
    _jsx("section", { className: "relative py-16 border-t border-border/50", children: /*#__PURE__*/
      _jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center", children: [/*#__PURE__*/

          _jsx("h2", { className: "text-xl font-bold text-foreground mb-8", children: "Follow us on" }), /*#__PURE__*/

          _jsx("div", { className: "flex items-center justify-center gap-6", children:
            socials.map((social) => /*#__PURE__*/
            _jsx(Link, {

              href: social.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-3 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300",
              "aria-label": `Follow us on ${social.name}`, children:

              social.icon }, social.name
            )
            ) }
          )] }
        ) }
      ) }
    ));

}