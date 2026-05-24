
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { GraduationCap, Code2, ArrowRight, Drone } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const segments = [
{
  id: "research ",
  title: "Research Programs",
  description: "Advanced R&D initiatives in propeller aerodynamics, materials science, and autonomous systems.",
  icon: Drone,
  href: "/drone-rd",
  color: "accent"
},
{
  id: "Digital Services",
  title: "Digital Services",
  description: "Full-stack development, Google Maps Optimization, CRM Development and SaaS solutions for businesses.",
  icon: Code2,
  href: "/software",
  color: "tertiary"
},
{
  id: "Hands on Training Programs",
  title: "Hands on Training Programs",
  description: "Practical workshops and certification courses in drone technology, programming, and emerging tech skills.",
  icon: GraduationCap,
  href: "/edutech",
  color: "primary"
}];




const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function SegmentsSection() {
  return (/*#__PURE__*/
    _jsx("section", { className: "relative py-12 sm:py-20 border-t border-border/50", children: /*#__PURE__*/
      _jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [/*#__PURE__*/
        _jsx(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-12", children: /*#__PURE__*/

          _jsx("h2", { className: "text-4xl font-black tracking-tighter text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Our Segments" }) }
        ), /*#__PURE__*/

        _jsx(motion.div, {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          className: "grid grid-cols-1 md:grid-cols-3 gap-6", children:

          segments.map((segment) => /*#__PURE__*/
          _jsx(motion.div, { variants: itemVariants, children: /*#__PURE__*/
            _jsx(Link, { to: segment.href, className: "group block h-full", children: /*#__PURE__*/
              _jsxs("div", { className: "relative h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1", children: [/*#__PURE__*/

                _jsx("div", { className: `inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${segment.color === "primary" ? "bg-primary/10 text-primary" :
                  segment.color === "accent" ? "bg-accent/10 text-accent" :
                  "bg-tertiary/10 text-tertiary"}`, children: /*#__PURE__*/

                  _jsx(segment.icon, { className: "w-6 h-6" }) }
                ), /*#__PURE__*/


                _jsx("h3", { className: "text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors", children:
                  segment.title }
                ), /*#__PURE__*/
                _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children:
                  segment.description }
                ), /*#__PURE__*/


                _jsxs("div", { className: "flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: [/*#__PURE__*/
                  _jsx("span", { children: "Explore" }), /*#__PURE__*/
                  _jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })] }
                )] }
              ) }
            ) }, segment.id
          )
          ) }
        )] }
      ) }
    ));

}