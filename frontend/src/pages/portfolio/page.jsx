import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";

export default function PortfolioPage() {
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

  return (
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),
      _jsxs("div", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [
        _jsxs("div", { className: "text-center mb-16", children: [
          _jsx("h1", { className: "text-4xl font-bold mb-4", children: "Project Portfolio" }),
          _jsx("p", { className: "text-muted-foreground", children: "A showcase of our innovation across different domains." })
        ] }),
        _jsx(PortfolioGrid, {})
      ] }),
      _jsx(Footer, { config: config })
    ] })
  );
}