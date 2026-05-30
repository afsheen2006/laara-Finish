import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getBlocks, getNavLinks, getSystemConfig, resolveImageUrl } from "@/lib/cms-helpers";
import { Calendar, MapPin, ArrowRight, Sparkles, Edit, X, Loader2, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { EventEditor } from "@/components/admin/event-editor";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

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
        if (u.role && (u.role.toUpperCase() === "ADMIN" || u.role.toUpperCase() === "MASTER")) {
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

  const handleDeleteEvent = async (eventId) => {
    const updatedEvents = cmsEvents.filter(e => e.id !== eventId);
    
    // Optimistic UI Update
    setCmsEvents(updatedEvents);
    
    try {
      const blockId = eventsBlock.id || eventsBlock._id;
      const res = await apiClient.put(`/cms/blocks/${blockId}`, { content: JSON.stringify(updatedEvents) });
      if (res.data.success) {
        toast.success("Event deleted successfully");
        // Update local block state silently
        setEventsBlock(res.data.block || { ...eventsBlock, content: JSON.stringify(updatedEvents) });
      } else {
        toast.error("Failed to delete event");
        handleRefresh(); // revert on failure
      }
    } catch (e) {
      toast.error("Failed to delete event: " + e.message);
      handleRefresh(); // revert on failure
    }
  };

  const now = new Date();
  
  // Sort upcoming events: soonest first
  const upcomingEvents = cmsEvents
    .filter((e) => !e.timeline || new Date(e.timeline) > now)
    .sort((a, b) => {
      // Put events without a timeline at the TOP
      if (!a.timeline && !b.timeline) return 0;
      if (!a.timeline) return -1;
      if (!b.timeline) return 1;
      return new Date(a.timeline) - new Date(b.timeline);
    });

  // Sort past events: most recently ended first
  const pastEvents = cmsEvents
    .filter((e) => e.timeline && new Date(e.timeline) <= now)
    .sort((a, b) => new Date(b.timeline) - new Date(a.timeline));

  const renderEventCard = (event, isOver) => {
    return (
      _jsxs("div", {
        className: `group relative flex flex-col rounded-[2.5rem] glass-card overflow-hidden hover:border-primary/50 transition-all duration-500 ${
          isOver ? "grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100" : ""
        }`, children: [
          _jsxs("div", { className: "aspect-[16/10] overflow-hidden relative", children: [
            _jsx("img", {
              src: resolveImageUrl(event.image) || resolveImageUrl(event.poster) || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
              alt: event.title,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            }),
            _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
            
            /* Admin overlay controls on card */
            isAdmin && _jsxs("div", { className: "absolute top-6 right-6 flex gap-2 z-20", children: [
              _jsx("button", {
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEditorOpen(true);
                },
                className: "p-2 rounded-xl bg-black/60 hover:bg-primary hover:text-black border border-white/10 transition-colors text-white cursor-pointer",
                title: "Edit Event",
                children: _jsx(Edit, { className: "w-4 h-4" })
              }),
              _jsx("button", {
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteEvent(event.id);
                },
                className: "p-2 rounded-xl bg-black/60 hover:bg-red-500 hover:text-white border border-white/10 transition-colors text-white cursor-pointer",
                title: "Delete Event",
                children: _jsx(Trash2, { className: "w-4 h-4" })
              })
            ] }),

            _jsxs("div", { className: "absolute top-6 left-6 flex gap-2 z-10", children: [
              _jsx("span", { className: "px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest", children:
                event.type
              }),
              isOver ? (
                _jsxs("span", { className: "px-4 py-1.5 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5", children: [
                  _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }),
                  "Over"
                ] })
              ) : (
                _jsxs("span", { className: "px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5", children: [
                  _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                  "Upcoming"
                ] })
              )
            ] })
          ] }),
          _jsxs("div", { className: "p-8 flex flex-col flex-1 justify-between", children: [
            _jsxs("div", { className: "flex-1 flex flex-col", children: [
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
              ] })
            ] }),
            _jsxs("div", { className: "flex flex-col gap-3 w-full mt-4", children: [
              event.gformLink && (
                _jsx("a", { href: event.gformLink.startsWith("http") ? event.gformLink : `https://${event.gformLink}`, target: "_blank", rel: "noopener noreferrer", className: "w-full", children:
                  _jsx(Button, {
                    disabled: isOver,
                    className: "w-full h-14 rounded-2xl bg-primary text-black hover:bg-primary/90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground font-bold text-sm cursor-pointer", children:
                      isOver ? "Registration Closed" : "Apply Now"
                  })
                })
              ),
              _jsx(Link, { to: `/events/${event.id}`, className: "w-full", children:
                _jsx(Button, { variant: "outline", className: "w-full h-14 rounded-2xl border border-border hover:bg-muted font-bold text-sm", children: "Read More" })
              })
            ] })
          ] })
        ]
      }, event.id)
    );
  };

  return (
    _jsxs("main", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-black", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      _jsxs("section", { className: "relative pt-28 sm:pt-40 pb-12 sm:pb-20 overflow-hidden", children: [
        _jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          _jsx("div", { className: "absolute top-[-10%] right-[-10%] z-0 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" }),
          _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] z-0 w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" })
        ] }),

        _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [
          _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8 backdrop-blur-md", children: [
            _jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
            _jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Innovation Calendar" })
          ] }),
          _jsxs("h1", { className: "text-6xl lg:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent", children: ["Innovations ", _jsx("span", { className: "text-primary", children: "Events" })] }),
          _jsx("p", { className: "max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed font-medium", children: "Explore where Laara Innovations is shaping the future, from upcoming conferences to past innovation showcases." }),
          isAdmin && _jsx("div", { className: "mt-8 flex justify-center", children:
            _jsxs(Button, {
              onClick: () => setIsEditorOpen(true),
              className: "bg-primary text-black font-bold hover:bg-primary/90 flex items-center gap-2 rounded-full px-6 py-3 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer", children: [
                _jsx(Plus, { className: "w-4 h-4" }),
                "Add New Event"
              ]
            })
          })
        ] })
      ] }),

      _jsx("section", { className: "py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10", children:
        _jsxs("div", { className: "mx-auto max-w-7xl space-y-20", children: [
          
          /* Upcoming Events Section */
          _jsxs("div", { className: "space-y-8", children: [
            _jsxs("div", { className: "flex items-center justify-between border-b border-border/30 pb-4", children: [
              _jsxs("h2", { className: "text-3xl font-black tracking-tight flex items-center gap-3 text-foreground", children: [
                _jsx(Calendar, { className: "w-6 h-6 text-primary" }),
                "Upcoming ",
                _jsx("span", { className: "text-primary", children: "Events" })
              ] }),
              isAdmin && _jsxs(Button, {
                onClick: () => setIsEditorOpen(true),
                className: "bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary hover:text-black flex items-center gap-2 rounded-full px-5 py-2 text-xs cursor-pointer transition-all",
                children: [
                  _jsx(Plus, { className: "w-4 h-4" }),
                  "Add Event"
                ]
              })
            ] }),
            loading ? (
              _jsxs("div", { className: "flex flex-col items-center justify-center py-20 min-h-[300px] w-full select-none", children: [
                _jsx(Loader2, { className: "w-12 h-12 animate-spin text-primary mb-4" }),
                _jsx("span", { className: "text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase", children: "Syncing Events..." })
              ] })
            ) : upcomingEvents.length === 0 && !isAdmin ? (
              _jsx("div", { className: "py-16 text-center glass-card rounded-[2.5rem] border border-border/20", children:
                _jsx("p", { className: "text-muted-foreground font-medium", children: "No upcoming events scheduled. Check back soon!" })
              })
            ) : (
              _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
                isAdmin && _jsxs("button", {
                  onClick: () => setIsEditorOpen(true),
                  className: "group relative flex flex-col rounded-[2.5rem] border-2 border-dashed border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-500 min-h-[400px] items-center justify-center cursor-pointer",
                  children: [
                    _jsx(Plus, { className: "w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" }),
                    _jsx("span", { className: "text-primary font-bold text-lg", children: "Create New Event" })
                  ]
                }),
                upcomingEvents.map((event, index) => renderEventCard(event, false))
              ] })
            )
          ] }),

          /* Past Events Section */
          _jsxs("div", { className: "space-y-8", children: [
            _jsxs("div", { className: "flex items-center justify-between border-b border-border/30 pb-4", children:
              _jsxs("h2", { className: "text-3xl font-black tracking-tight flex items-center gap-3 text-foreground/75", children: [
                _jsx(Clock, { className: "w-6 h-6 text-muted-foreground" }),
                "Past ",
                _jsx("span", { className: "text-muted-foreground", children: "Events" })
              ] })
            }),
            loading ? null : pastEvents.length === 0 ? (
              _jsx("div", { className: "py-16 text-center glass-card rounded-[2.5rem] border border-border/20 opacity-70", children:
                _jsx("p", { className: "text-muted-foreground font-medium", children: "No past events recorded." })
              })
            ) : (
              _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children:
                pastEvents.map((event, index) => renderEventCard(event, true))
              })
            )
          ] })

        ] })
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
            className: "relative z-10 w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto p-8 z-10", children: [
              _jsx("button", {
                onClick: () => setIsEditorOpen(false),
                className: "absolute top-6 right-6 z-30 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer", children:
                  _jsx(X, { className: "w-5 h-5" })
              }),
              _jsx("div", { className: "overflow-y-auto pr-2 z-20", children:
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