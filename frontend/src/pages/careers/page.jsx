import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import CareersPage from "./careers-page";import { jsx as _jsx } from "react/jsx-runtime";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";

export default function Careers() {
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
    return <div className="min-h-screen bg-background text-white p-8">Loading Careers...</div>;
  }

  return /*#__PURE__*/_jsx(CareersPage, { navLinks: navLinks, config: config });
}