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
    window.scrollTo(0, 0);
    Promise.all([
      getNavLinks(),
      getSystemConfig()
    ]).then(([navLinksData, configData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  return (
    _jsxs("main", { className: "min-h-screen bg-background", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      _jsxs("section", { className: "pt-24 pb-12 px-4 sm:px-6 lg:px-8 circuit-pattern relative", children: [
        _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" }),
        _jsx("div", { className: "relative mx-auto max-w-7xl", children:
          _jsxs("div", { className: "text-center mb-16", children: [
            _jsx("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6", children:
              _jsx("span", { className: "text-sm font-medium text-primary", children: "Digital Solutions" })
            }),
            _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance", children: ["Build ", _jsx("span", { className: "text-primary", children: "Exceptional" }), " Software"] }),
            _jsx("p", { className: "max-w-2xl mx-auto text-lg text-muted-foreground text-pretty", children: "From concept to deployment, we deliver enterprise-grade solutions with cutting-edge technology and meticulous attention to detail." })
          ] })
        })
      ] }),

      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8", children:
        _jsxs("div", { className: "mx-auto max-w-7xl", children: [
          _jsxs("div", { className: "text-center mb-12", children: [
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Featured Projects" }),
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Explore our portfolio of successful web and software projects" })
          ] }),
          _jsx(PortfolioGrid, {})
        ] })
      }),

      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-card/50", children:
        _jsxs("div", { className: "mx-auto max-w-7xl", children: [
          _jsxs("div", { className: "text-center mb-12", children: [
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Services & Pricing" }),
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Transparent pricing for all your digital needs" })
          ] }),
          _jsx(PricingCards, {})
        ] })
      }),

      _jsx("section", { className: "py-10 sm:py-16 px-4 sm:px-6 lg:px-8", children:
        _jsxs("div", { className: "mx-auto max-w-3xl", children: [
          _jsxs("div", { className: "text-center mb-12", children: [
            _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Start Your Project" }),
            _jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Tell us about your vision and we'll bring it to life" })
          ] }),
          _jsx(ContactForm, {})
        ] })
      })
    ] })
  );
}