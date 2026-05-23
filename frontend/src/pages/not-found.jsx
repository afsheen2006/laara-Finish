import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { NotFoundUI } from "@/components/not-found-ui";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { useState, useEffect } from "react";

export default function NotFound() {
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
    return <div className="min-h-screen bg-background text-white p-8">Loading...</div>;
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-[#020202] text-white overflow-hidden relative", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/


      _jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [/*#__PURE__*/
        _jsx("div", { className: "absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" }), /*#__PURE__*/
        _jsx("div", { className: "absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full" }), /*#__PURE__*/


        _jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" })] }
      ), /*#__PURE__*/

      _jsx(NotFoundUI, {}), /*#__PURE__*/

      _jsx(Footer, { config: config })] }
    ));

}