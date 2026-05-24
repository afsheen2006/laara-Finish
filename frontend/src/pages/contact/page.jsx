import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNavLinks(),
      getSystemConfig()
    ]).then(([navLinksData, configData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Contact Page...</div>;
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/

      _jsx("div", { className: "pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: /*#__PURE__*/
        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20", children: [/*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6", children: [/*#__PURE__*/
              _jsx(MessageSquare, { className: "w-4 h-4 text-primary" }), /*#__PURE__*/
              _jsx("span", { className: "text-sm font-medium text-primary", children: "Contact Us" })] }
            ), /*#__PURE__*/
            _jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-glow", children: ["Let's Build ", /*#__PURE__*/_jsx("span", { className: "text-primary", children: "Together" })] }), /*#__PURE__*/
            _jsx("p", { className: "text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12", children: "Have a project in mind or just want to say hi? Reach out to our team and we'll get back to you as soon as possible." }
            ), /*#__PURE__*/

            _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/
              _jsx(ContactInfoItem, {
                icon: /*#__PURE__*/_jsx(Mail, { className: "text-primary" }),
                title: "Email Us",
                detail: config.contactEmail || "laarainnovations26@gmail.com" }
              ), /*#__PURE__*/
              _jsx(ContactInfoItem, {
                icon: /*#__PURE__*/_jsx(Phone, { className: "text-secondary" }),
                title: "Call Us",
                detail: "+91 9010906126" }
              ), /*#__PURE__*/
              _jsx(ContactInfoItem, {
                icon: /*#__PURE__*/_jsx(MapPin, { className: "text-accent" }),
                title: "Visit Us",
                detail: "Vijayawada, near Amaravathi, Andhra Pradesh, 521101" }
              )] }
            )] }
          ), /*#__PURE__*/

          _jsx("div", { className: "glass-card rounded-3xl p-8 border border-border bg-card/50", children: /*#__PURE__*/
            _jsx(ContactForm, {}) }
          )] }
        ) }
      ), /*#__PURE__*/

      _jsx(Footer, { config: config })] }
    ));

}

function ContactInfoItem({ icon, title, detail }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "flex gap-6 items-center", children: [/*#__PURE__*/
      _jsx("div", { className: "w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center shrink-0", children:
        icon }
      ), /*#__PURE__*/
      _jsxs("div", { children: [/*#__PURE__*/
        _jsx("h4", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: title }), /*#__PURE__*/
        _jsx("p", { className: "text-lg font-medium text-foreground", children: detail })] }
      )] }
    ));

}