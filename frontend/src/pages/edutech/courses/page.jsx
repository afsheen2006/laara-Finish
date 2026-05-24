import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { CourseCatalog } from "@/components/edutech/course-catalog";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

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

  if (loading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Courses...</div>;
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/
      _jsx("div", { className: "pt-24 pb-20", children: /*#__PURE__*/
        _jsxs("div", { className: "px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [/*#__PURE__*/
          _jsxs("div", { className: "mb-12", children: [/*#__PURE__*/
            _jsxs("h1", { className: "text-4xl font-black tracking-tighter text-foreground mb-4", children: ["Our ", /*#__PURE__*/_jsx("span", { className: "text-primary", children: "Courses" })] }), /*#__PURE__*/
            _jsx("p", { className: "text-gray-400 max-w-2xl", children: "Explore our full curriculum of professional certifications and hands-on technical trainings." }

            )] }
          ), /*#__PURE__*/
          _jsx(CourseCatalog, {})] }
        ) }
      ), /*#__PURE__*/
      _jsx(Footer, { config: config })] }
    ));

}