import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getBlocks, getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { Calendar, MapPin, ArrowRight, Sparkles, Edit, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { EventEditor } from "@/components/admin/event-editor";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const DUMMY_EVENTS = [
{
  id: "1",
  title: "Drone Tech Summit 2026",
  date: "June 15-17, 2026",
  location: "Bengaluru, India",
  description: "Join us for three days of workshops, keynotes, and hands-on demonstrations showcasing the latest in drone propulsion technology.",
  type: "Conference",
  image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000"
},
{
  id: "2",
  title: "EdTech Innovation Workshop",
  date: "July 8, 2026",
  location: "Virtual Event",
  description: "A deep dive into AI-powered learning platforms and the future of personalized education. Open to educators and developers.",
  type: "Workshop",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
},
{
  id: "3",
  title: "Robotics & AI Expo",
  date: "September 12, 2026",
  location: "Hyderabad, India",
  description: "Exploring the convergence of robotics and artificial intelligence in industrial automation and consumer electronics.",
  type: "Expo",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000"
}];

export default function EventsPage() {
  const [cmsEvents, setCmsEvents] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [eventsBlock, setEventsBlock] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check admin status
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u.role === "ADMIN" || u.role === "MASTER") {
          setIsAdmin(true);
        }
      }
    } catch (_) {}

    Promise.all([
      getBlocks(),
      getNavLinks(),
      getSystemConfig()
    ]).then(([blocksData, navLinksData, configData]) => {
      const block = blocksData.find(
        b => b.type === "TEXT_BLOCK" && b.title === "Global Events Configuration"
      );
      setEventsBlock(block || null);
      if (block) {
        try {
          setCmsEvents(JSON.parse(block.content));
        } catch (_) {
          setCmsEvents([]);
        }
      }
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  const handleRefresh = () => {
    getBlocks().then((blocksData) => {
      const block = blocksData.find(
        b => b.type === "TEXT_BLOCK" && b.title === "Global Events Configuration"
      );
      setEventsBlock(block || null);
      if (block) {
        try {
          setCmsEvents(JSON.parse(block.content));
        } catch (_) {
          setCmsEvents([]);
        }
      }
    });
    setIsEditorOpen(false);
  };

  // Combine CMS events with dummy data if CMS is empty, or just use CMS if populated
  const events = cmsEvents.length > 0 ? cmsEvents : DUMMY_EVENTS;

  return (
    _jsxs("main", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-black", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      _jsxs("section", { className: "relative pt-28 sm:pt-40 pb-12 sm:pb-20 overflow-hidden", children: [
        _jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          _jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" }),
          _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" })
        ] }),

        _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [
          _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8 backdrop-blur-md", children: [
            _jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
            _jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Innovation Calendar" })
          ] }),
          _jsxs("h1", { className: "text-6xl lg:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent", children: ["Upcoming ", _jsx("span", { className: "text-primary", children: "Events" })] }),
          _jsx("p", { className: "max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed font-medium", children: "Join the architects of tomorrow. From global tech summits to intimate innovation workshops, explore where Laara Innovations is shaping the future." }),
          isAdmin && _jsx("div", { className: "mt-8 flex justify-center", children:
            _jsxs(Button, {
              onClick: () => setIsEditorOpen(true),
              className: "bg-primary text-black font-bold hover:bg-primary/90 flex items-center gap-2 rounded-full px-6 py-3 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer", children: [
                _jsx(Edit, { className: "w-4 h-4" }),
                "Manage Events Calendar"
              ]
            })
          })
        ] })
      ] }),

      _jsx("section", { className: "py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10", children:
        _jsx("div", { className: "mx-auto max-w-7xl", children:
          loading ? (
            _jsxs("div", { className: "flex flex-col items-center justify-center py-20 min-h-[300px] w-full select-none", children: [
              _jsx(Loader2, { className: "w-12 h-12 animate-spin text-primary mb-4" }),
              _jsx("span", { className: "text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase", children: "Syncing Events Calendar..." })
            ] })
          ) : (
            _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children:
              events.map((event, index) => (
                _jsxs("div", {
                  className: "group relative flex flex-col rounded-[2.5rem] glass-card overflow-hidden hover:border-primary/50 transition-all duration-500", children: [
                    _jsxs("div", { className: "aspect-[16/10] overflow-hidden relative", children: [
                      _jsx("img", {
                        src: event.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
                        alt: event.title,
                        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      }),
                      _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
                      _jsx("div", { className: "absolute top-6 left-6", children:
                        _jsx("span", { className: "px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest", children:
                          event.type
                        })
                      })
                    ] }),
                    _jsxs("div", { className: "p-8 flex flex-col flex-1", children: [
                      _jsx("h3", { className: "text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300", children:
                        event.title
                      }),
                      _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8 flex-1", children:
                        event.description
                      }),
                      _jsxs("div", { className: "space-y-4 mb-8", children: [
                        _jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground font-medium", children: [
                          _jsx("div", { className: "w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors", children:
                            _jsx(Calendar, { className: "w-4 h-4 text-primary" })
                          }),
                          event.date
                        ] }),
                        _jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground font-medium", children: [
                          _jsx("div", { className: "w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-secondary/30 transition-colors", children:
                            _jsx(MapPin, { className: "w-4 h-4 text-secondary" })
                          }),
                          event.location
                        ] })
                      ] }),
                      _jsx(Link, { to: `/events/${event.id}`, children:
                        _jsxs(Button, { variant: "outline", className: "w-full h-14 rounded-2xl border border-border hover:bg-primary hover:text-black hover:border-primary font-bold transition-all duration-300 group/btn gap-3", children: [
                          "View Details",
                          _jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover/btn:translate-x-1" })
                        ] })
                      })
                    ] })
                  ]
                }, event.id)
              ))
            })
          )
        })
      }),

      _jsx("section", { className: "py-12 sm:py-20 px-4 sm:px-6 lg:px-8", children:
        _jsx("div", { className: "mx-auto max-w-5xl", children:
          _jsxs("div", { className: "rounded-[3rem] p-12 lg:p-20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-border text-center relative overflow-hidden", children: [
            _jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" }),
            _jsxs("h2", { className: "text-4xl lg:text-6xl font-black tracking-tighter text-foreground mb-8 relative z-10", children: ["Hosting an ", _jsx("span", { className: "text-primary", children: "Event?" })] }),
            _jsx("p", { className: "text-muted-foreground text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10", children: "We collaborate with tech communities and institutions worldwide. Let's explore how we can bring Laara Innovations to your stage." }),
            _jsx(Link, { to: "/contact", className: "relative z-10", children:
              _jsx(Button, { size: "lg", className: "h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-black hover:bg-primary/95 hover:scale-105 transition-all shadow-xl shadow-primary/20", children: "Partner With Us" })
            })
          ] })
        })
      }),

      _jsx(Footer, { config: config }),

      _jsx(AnimatePresence, { children:
        isEditorOpen && _jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
          _jsx(motion.div, {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: () => setIsEditorOpen(false),
            className: "absolute inset-0 bg-background/80 backdrop-blur-md"
          }),
          _jsxs(motion.div, {
            initial: { opacity: 0, scale: 0.95, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 20 },
            className: "relative w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto p-8 z-10", children: [
              _jsx("button", {
                onClick: () => setIsEditorOpen(false),
                className: "absolute top-6 right-6 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer", children:
                  _jsx(X, { className: "w-5 h-5" })
              }),
              _jsx("div", { className: "overflow-y-auto pr-2", children:
                _jsx(EventEditor, {
                  eventsBlock: eventsBlock,
                  onSave: handleRefresh
                })
              })
            ]
          })
        ] })
      })
    ] })
  );
}