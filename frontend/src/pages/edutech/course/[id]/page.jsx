import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
const auth = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) return { user: JSON.parse(userStr) };
  } catch (e) {}
  return null;
};
const redirect = (url) => { window.location.href = url; };
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, FileText, CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const params = useParams();
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
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Course Detail...</div>;
  }

  if (!session) {
    redirect(`/login?callbackUrl=/edutech/course/${params.id}`);
  }

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/

      _jsxs("div", { className: "pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [/*#__PURE__*/
        _jsxs(Link, { to: "/edutech", className: "inline-flex items-center text-sm text-primary mb-8 hover:underline group", children: [/*#__PURE__*/
          _jsx(ChevronLeft, { className: "w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" }), "Back to Dashboard"] }

        ), /*#__PURE__*/

        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [/*#__PURE__*/

          _jsxs("div", { className: "lg:col-span-2 space-y-8", children: [/*#__PURE__*/
            _jsx("div", { className: "glass-card rounded-[2.5rem] overflow-hidden border border-border bg-card aspect-video flex items-center justify-center", children: /*#__PURE__*/
              _jsx(VideoPlayer, {}) }
            ), /*#__PURE__*/

            _jsxs("div", { children: [/*#__PURE__*/
              _jsxs("h1", { className: "text-3xl font-black tracking-tighter text-foreground mb-4", children: ["Course Content: Module ", params.id] }), /*#__PURE__*/
              _jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Welcome to this comprehensive module. Here you will find all the materials, video lectures, and interactive assignments needed to master this topic." }

              )] }
            ), /*#__PURE__*/

            _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
              _jsx("h3", { className: "text-xl font-bold text-foreground", children: "Module Curriculum" }),
              [1, 2, 3, 4].map((lesson) => /*#__PURE__*/
              _jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-muted border border-border hover:bg-muted/80 transition-all cursor-pointer", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
                  _jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary", children:
                    lesson === 1 ? /*#__PURE__*/_jsx(Play, { className: "w-4 h-4 fill-current" }) : /*#__PURE__*/_jsx(CheckCircle, { className: "w-4 h-4" }) }
                  ), /*#__PURE__*/
                  _jsxs("span", { className: "text-sm font-bold text-foreground", children: ["Lesson ", lesson, ": Introduction to Advanced Concepts"] })] }
                ), /*#__PURE__*/
                _jsx("span", { className: "text-xs text-muted-foreground", children: "12:45" })] }, lesson
              )
              )] }
            )] }
          ), /*#__PURE__*/


          _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/
            _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-border bg-card", children: [/*#__PURE__*/
              _jsx("h4", { className: "text-lg font-bold text-foreground mb-6", children: "Course Resources" }), /*#__PURE__*/
              _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
                _jsxs(Button, { variant: "outline", className: "w-full justify-start gap-3 rounded-xl border-border h-12", children: [/*#__PURE__*/
                  _jsx(FileText, { className: "w-4 h-4 text-primary" }), "Lecture Notes (PDF)"] }

                ), /*#__PURE__*/
                _jsxs(Button, { variant: "outline", className: "w-full justify-start gap-3 rounded-xl border-border h-12", children: [/*#__PURE__*/
                  _jsx(FileText, { className: "w-4 h-4 text-secondary" }), "Technical Dataset"] }

                )] }
              )] }
            ), /*#__PURE__*/

            _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-border bg-primary/5", children: [/*#__PURE__*/
              _jsx("h4", { className: "text-lg font-bold text-foreground mb-2", children: "Need Help?" }), /*#__PURE__*/
              _jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Our instructors are available for 1-on-1 sessions." }), /*#__PURE__*/
              _jsx(Button, { className: "w-full rounded-xl bg-primary text-primary-foreground font-bold h-12", children: "Book a Mentor" }

              )] }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/

      _jsx(Footer, { config: config })] }
    ));

}