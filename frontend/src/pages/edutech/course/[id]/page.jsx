import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, FileText, CheckCircle, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const auth = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) return { user: JSON.parse(userStr) };
  } catch (e) {}
  return null;
};

const redirect = (url) => { window.location.href = url; };

export default function CourseDetailPage() {
  const params = useParams();
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  useEffect(() => {
    if (!loading && !session) {
      redirect(`/login?callbackUrl=/edutech/course/${params.id}`);
    }
  }, [loading, session, params.id]);

  return (
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      _jsx("div", { className: "pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children:
        loading ? (
          <div className="flex flex-col items-center justify-center py-40 select-none">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <span className="text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase">Loading Course Detail...</span>
          </div>
        ) : session ? (
          _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [
            _jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
              _jsxs(Link, { to: "/edutech", className: "inline-flex items-center text-sm text-primary mb-8 hover:underline group", children: [
                _jsx(ChevronLeft, { className: "w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" }), "Back to Dashboard"
              ] }),
              _jsx("div", { className: "glass-card rounded-[2.5rem] overflow-hidden border border-border bg-card aspect-video flex items-center justify-center", children:
                _jsx(VideoPlayer, {})
              }),
              _jsxs("div", { children: [
                _jsxs("h1", { className: "text-3xl font-black tracking-tighter text-foreground mb-4", children: ["Course Content: Module ", params.id] }),
                _jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Welcome to this comprehensive module. Here you will find all the materials, video lectures, and interactive assignments needed to master this topic." })
              ] }),
              _jsxs("div", { className: "space-y-4", children: [
                _jsx("h3", { className: "text-xl font-bold text-foreground", children: "Module Curriculum" }),
                [1, 2, 3, 4].map((lesson) => (
                  _jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-muted border border-border hover:bg-muted/80 transition-all cursor-pointer", children: [
                    _jsxs("div", { className: "flex items-center gap-4", children: [
                      _jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary", children:
                        lesson === 1 ? _jsx(Play, { className: "w-4 h-4 fill-current" }) : _jsx(CheckCircle, { className: "w-4 h-4" })
                      }),
                      _jsxs("span", { className: "text-sm font-bold text-foreground", children: ["Lesson ", lesson, ": Introduction to Advanced Concepts"] })
                    ] }),
                    _jsx("span", { className: "text-xs text-muted-foreground", children: "12:45" })
                  ] }, lesson)
                ))
              ] })
            ] }),
            _jsxs("div", { className: "space-y-8", children: [
              _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-border bg-card", children: [
                _jsx("h4", { className: "text-lg font-bold text-foreground mb-6", children: "Course Resources" }),
                _jsxs("div", { className: "space-y-4", children: [
                  _jsxs(Button, { variant: "outline", className: "w-full justify-start gap-3 rounded-xl border-border h-12", children: [
                    _jsx(FileText, { className: "w-4 h-4 text-primary" }), "Lecture Notes (PDF)"
                  ] }),
                  _jsxs(Button, { variant: "outline", className: "w-full justify-start gap-3 rounded-xl border-border h-12", children: [
                    _jsx(FileText, { className: "w-4 h-4 text-secondary" }), "Technical Dataset"
                  ] })
                ] })
              ] }),
              _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-border bg-primary/5", children: [
                _jsx("h4", { className: "text-lg font-bold text-foreground mb-2", children: "Need Help?" }),
                _jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Our instructors are available for 1-on-1 sessions." }),
                _jsx(Button, { className: "w-full rounded-xl bg-primary text-primary-foreground font-bold h-12", children: "Book a Mentor" })
              ] })
            ] })
          ] })
        ) : null
      }),

      _jsx(Footer, { config: config })
    ] })
  );
}