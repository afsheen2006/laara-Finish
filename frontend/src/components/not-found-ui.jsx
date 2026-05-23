
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Home, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function NotFoundUI() {
  return (/*#__PURE__*/
    _jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center", children: [/*#__PURE__*/

      _jsxs(motion.div, {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, ease: "easeOut" },
        className: "relative group mb-8", children: [/*#__PURE__*/

        _jsxs("h1", { className: "text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none select-none", children: [/*#__PURE__*/
          _jsx("span", { className: "bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent", children: "4" }), /*#__PURE__*/
          _jsx(motion.span, {
            animate: {
              rotate: [12, 15, 12],
              scale: [1, 1.05, 1]
            },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            className: "text-primary inline-block transform rotate-12 mx-[-2rem] md:mx-[-4rem]", children:
            "0" }

          ), /*#__PURE__*/
          _jsx("span", { className: "bg-gradient-to-t from-white to-white/20 bg-clip-text text-transparent", children: "4" })] }
        ), /*#__PURE__*/
        _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /*#__PURE__*/
          _jsx(Compass, { className: "w-24 h-24 md:w-32 md:h-32 text-primary/10 animate-[spin_10s_linear_infinite]" }) }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { className: "max-w-2xl mx-auto space-y-8", children: [/*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "space-y-4", children: [/*#__PURE__*/

          _jsxs("h2", { className: "text-3xl md:text-5xl font-bold tracking-tight", children: ["Lost in ", /*#__PURE__*/_jsx("span", { className: "text-primary", children: "Innovation?" })] }), /*#__PURE__*/
          _jsx("p", { className: "text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto", children: "The page you are looking for has drifted off the radar or moved to a new set of coordinates." }

          )] }
        ), /*#__PURE__*/


        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [/*#__PURE__*/

          _jsx(Link, { to: "/", children: /*#__PURE__*/
            _jsxs(Button, { size: "lg", className: "h-14 px-8 rounded-2xl bg-primary text-black font-black hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group", children: [/*#__PURE__*/
              _jsx(Home, { className: "w-5 h-5 mr-2" }), "Back to Mission Control"] }

            ) }
          ), /*#__PURE__*/
          _jsx(Link, { to: "/contact", children: /*#__PURE__*/
            _jsxs(Button, { size: "lg", variant: "outline", className: "h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 transition-all text-white font-bold group", children: [/*#__PURE__*/
              _jsx(Search, { className: "w-5 h-5 mr-2 group-hover:text-primary transition-colors" }), "Report a Disruption"] }

            ) }
          )] }
        ), /*#__PURE__*/


        _jsxs(motion.div, {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.6 },
          className: "pt-12 border-t border-white/5", children: [/*#__PURE__*/

          _jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6", children: "Popular Destinations" }), /*#__PURE__*/
          _jsx("div", { className: "flex flex-wrap justify-center gap-x-8 gap-y-4", children:
            ["Drone R&D", "Software", "Portfolio", "Edutech"].map((item) => /*#__PURE__*/
            _jsx(Link, { to: `/${item.toLowerCase().replace(" ", "-").replace("&", "rd")}`,
              className: "text-sm font-bold text-gray-400 hover:text-primary transition-colors", children:

              item }, item
            )
            ) }
          )] }
        )] }
      )] }
    ));

}