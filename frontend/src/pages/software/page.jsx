import { Navigation } from "@/components/navigation";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { PricingCards } from "@/components/pricing-cards";
import { ContactForm } from "@/components/contact-form";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";



import { useState, useEffect } from "react";

export default function SoftwarePage() {
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
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Products Page...</div>;
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/


      _jsxs("section", { className: "pt-24 pb-12 px-4 sm:px-6 lg:px-8 circuit-pattern relative", children: [/*#__PURE__*/
        _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" }), /*#__PURE__*/
        _jsx("div", { className: "relative mx-auto max-w-7xl", children: /*#__PURE__*/
          _jsxs("div", { className: "text-center mb-16", children: [/*#__PURE__*/
            _jsx("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6", children: /*#__PURE__*/
              _jsx("span", { className: "text-sm font-medium text-primary", children: "Digital Solutions" }) }
            ), /*#__PURE__*/
            _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance", children: ["Build ", /*#__PURE__*/
              _jsx("span", { className: "text-primary", children: "Exceptional" }), " Software"] }
            ), /*#__PURE__*/
            _jsx("p", { className: "max-w-2xl mx-auto text-lg text-muted-foreground text-pretty", children: "From concept to deployment, we deliver enterprise-grade solutions with cutting-edge technology and meticulous attention to detail." }


            )] }
          ) }
        )] }
      ), /*#__PURE__*/


      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs("div", { className: "mx-auto max-w-7xl", children: [/*#__PURE__*/
          _jsxs("div", { className: "text-center mb-12", children: [/*#__PURE__*/
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Featured Projects" }

            ), /*#__PURE__*/
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Explore our portfolio of successful web and software projects" }

            )] }
          ), /*#__PURE__*/
          _jsx(PortfolioGrid, {})] }
        ) }
      ), /*#__PURE__*/


      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-card/50", children: /*#__PURE__*/
        _jsxs("div", { className: "mx-auto max-w-7xl", children: [/*#__PURE__*/
          _jsxs("div", { className: "text-center mb-12", children: [/*#__PURE__*/
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Services & Pricing" }

            ), /*#__PURE__*/
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Transparent pricing for all your digital needs" }

            )] }
          ), /*#__PURE__*/
          _jsx(PricingCards, {})] }
        ) }
      ), /*#__PURE__*/


      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs("div", { className: "mx-auto max-w-3xl", children: [/*#__PURE__*/
          _jsxs("div", { className: "text-center mb-12", children: [/*#__PURE__*/
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Start Your Project" }

            ), /*#__PURE__*/
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Tell us about your vision and we'll bring it to life" }

            )] }
          ), /*#__PURE__*/
          _jsx(ContactForm, {})] }
        ) }
      )] }
    ));

}