import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function Footer({ config }) {
  const siteName = config?.siteName || "Laara Innovations";
  const contactEmail = config?.contactEmail || "vishnu24.igm@gmail.com";
  return (/*#__PURE__*/
    _jsx("footer", { className: "border-t border-border/50 bg-card/30 pt-16 pb-8", children: /*#__PURE__*/
      _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [/*#__PURE__*/
        _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-12", children: [/*#__PURE__*/

          _jsxs("div", { className: "col-span-1 md:col-span-1", children: [/*#__PURE__*/
            _jsx(Link, { to: "/", className: "text-xl font-bold tracking-tighter mb-4 block", children: /*#__PURE__*/
              _jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children:
                siteName.toUpperCase() }
              ) }
            ), /*#__PURE__*/
            _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "We blend advanced hardware and software development with immersive education to actively shape eager students into the skilled engineers and technological architects of tomorrow." }

            )] }
          ), /*#__PURE__*/


          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Ecosystem" }), /*#__PURE__*/
            _jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [/*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/drone-rd", className: "hover:text-primary transition-colors", children: "Research Programs" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/edutech", className: "hover:text-primary transition-colors", children: "Hands On Trainings" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/portfolio", className: "hover:text-primary transition-colors", children: "Digital Services" }) })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Company" }), /*#__PURE__*/
            _jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [/*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/about", className: "hover:text-primary transition-colors", children: "About Us" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/careers", className: "hover:text-primary transition-colors", children: "Careers" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/contact", className: "hover:text-primary transition-colors", children: "Contact us" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/privacy", className: "hover:text-primary transition-colors", children: "Privacy Policy" }) })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Get in Touch" }), /*#__PURE__*/
            _jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [/*#__PURE__*/
              _jsxs("li", { className: "flex items-center gap-2", children: [/*#__PURE__*/
                _jsx(Mail, { className: "w-4 h-4 text-primary" }), /*#__PURE__*/
                _jsx("span", { children: "laarainnovations26@gmail.com" })] }
              ), /*#__PURE__*/
              _jsxs("li", { className: "flex items-center gap-2", children: [/*#__PURE__*/
                _jsx(MapPin, { className: "w-4 h-4 text-primary" }), /*#__PURE__*/
                _jsx("span", { children: "Vijayawada, near Amaravathi, Andhra Pradesh, 521101" }
                )] }
              ), /*#__PURE__*/
              _jsxs("li", { className: "flex gap-4 pt-2", children: [/*#__PURE__*/
                _jsx(Link, { to: "https://www.linkedin.com/company/laara-innovations/", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors", children: /*#__PURE__*/
                  _jsx(Linkedin, { className: "w-5 h-5" }) }
                ), /*#__PURE__*/
                _jsx(Link, { to: "https://www.instagram.com/laara_innovations?igsh=dXlpM3YwNTF4ZTV2", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors", children: /*#__PURE__*/
                  _jsx(Instagram, { className: "w-5 h-5" }) }
                )] }
              )] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "border-t border-border/50 pt-8 text-center text-xs text-muted-foreground", children: ["\xA9 ",
          new Date().getFullYear(), " ", siteName, ". All rights reserved. Designed with precision."] }
        )] }
      ) }
    ));

}