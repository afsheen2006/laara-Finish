import { Navigation } from "@/components/navigation";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
const auth = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) return { user: JSON.parse(userStr) };
  } catch (e) {}
  return null;
};
import { CourseCatalog } from "@/components/edutech/course-catalog";
import { StudentDashboard } from "@/components/edutech/student-dashboard";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { useState, useEffect } from "react";

export default function EdutechPage() {
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNavLinks(),
      getSystemConfig(),
      auth()
    ]).then(([navLinksData, configData, sessionData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setSession(sessionData || null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Edutech...</div>;
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background", children: [
      !session && /*#__PURE__*/_jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/

      _jsx("div", { className: session ? "" : "pt-24", children:
        session ? /*#__PURE__*/
        _jsx(StudentDashboard, {}) : /*#__PURE__*/

        _jsx(CourseCatalog, {}) }

      )] }
    ));

}