import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { CourseCatalog } from "@/components/edutech/course-catalog";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";

export default function CoursesPage() {
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
    _jsxs("main", { className: "min-h-screen bg-background", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),
      _jsx("div", { className: "pt-24 pb-20", children:
        _jsxs("div", { className: "px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [
          _jsxs("div", { className: "mb-12", children: [
            _jsxs("h1", { className: "text-4xl font-black tracking-tighter text-foreground mb-4", children: ["Our ", _jsx("span", { className: "text-primary", children: "Courses" })] }),
            _jsx("p", { className: "text-gray-400 max-w-2xl", children: "Explore our full curriculum of professional certifications and hands-on technical trainings." })
          ] }),
          _jsx(CourseCatalog, {})
        ] })
      }),
      _jsx(Footer, { config: config })
    ] })
  );
}