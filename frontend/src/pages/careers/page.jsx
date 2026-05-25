import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import CareersPage from "./careers-page";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

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

  return /*#__PURE__*/_jsx(CareersPage, { navLinks: navLinks, config: config, loadingConfig: loading });
}
