import { Navigation } from "@/components/navigation";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { CourseCatalog } from "@/components/edutech/course-catalog";
import { StudentDashboard } from "@/components/edutech/student-dashboard";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const auth = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) return { user: JSON.parse(userStr) };
  } catch (e) {}
  return null;
};

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

  return (
    _jsxs("main", { className: "min-h-screen bg-background", children: [
      !session && _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      _jsx("div", { className: session ? "" : "pt-24", children:
        loading ? (
          <div className="flex flex-col items-center justify-center py-40 select-none">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <span className="text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase">Verifying Session...</span>
          </div>
        ) : session ? (
          _jsx(StudentDashboard, {})
        ) : (
          _jsx(CourseCatalog, {})
        )
      })
    ] })
  );
}