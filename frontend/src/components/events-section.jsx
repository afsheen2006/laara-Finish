import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/cms-helpers";
import { useState, useEffect } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data || []);
      setLoading(false);
    });
  }, []);

  const now = new Date();

  // Filter only featured events for the landing page
  const featuredEvents = events.filter((e) => e.isFeatured === true);

  // Filter events based on timeline
  // Sort upcoming events: soonest first
  const upcomingEvents = featuredEvents
    .filter((e) => e.timeline && new Date(e.timeline) > now)
    .sort((a, b) => new Date(a.timeline) - new Date(b.timeline));

  // Sort past events: most recently ended first
  const pastEvents = featuredEvents
    .filter((e) => !e.timeline || new Date(e.timeline) <= now)
    .sort((a, b) => new Date(b.timeline) - new Date(a.timeline));

  // Combine so upcoming events show first, followed by past events at the end
  const activeEvents = [...upcomingEvents, ...pastEvents];

  // Cap at 4 events for landing page visibility
  const displayedEvents = activeEvents.slice(0, 4);

  return (
    _jsx("section", { className: "relative py-12 sm:py-20 border-t border-border/30 bg-gradient-to-b from-transparent to-muted/10", children:
      _jsx("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children:
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 }, children: [

          _jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [
            _jsxs("div", { children: [
              _jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-4", children: [
                "Featured ",
                _jsx("span", { className: "text-primary", children: "Events" })
              ] }),
              _jsx("p", { className: "text-muted-foreground max-w-xl font-medium", children:
                "Connect with our community and explore the future of innovation at our upcoming summits and workshops."
              })
            ] }),
            _jsx(Link, { to: "/events", children:
              _jsxs(Button, { variant: "outline", className: "border-border hover:bg-muted rounded-xl gap-2", children: [
                "View All Events ",
                _jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            })
          ] }),

          loading ? (
            _jsxs("div", { className: "flex flex-col items-center justify-center py-20 w-full select-none", children: [
              _jsx(Loader2, { className: "w-10 h-10 animate-spin text-primary mb-4" }),
              _jsx("span", { className: "text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase", children: "Loading Events..." })
            ] })
          ) : activeEvents.length === 0 ? (
            _jsxs("div", { className: "py-16 text-center glass-card rounded-[2rem] border-dashed border-2 border-border/30 max-w-lg mx-auto w-full relative z-10", children: [
              _jsx(Clock, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" }),
              _jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "No Events Scheduled" }),
              _jsx("p", { className: "text-sm text-muted-foreground px-6", children: "There are currently no events listed. Please check back later!" })
            ] })
          ) : (
            _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children:
              displayedEvents.map((event, index) => {
                const eventDate = new Date(event.timeline);
                const isOver = event.timeline ? eventDate <= now : true;

                return (
                  _jsxs(motion.div, {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, delay: index * 0.1 },
                    className: `group relative p-8 rounded-[2rem] glass-card hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                      isOver ? "grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100" : ""
                    }`, children: [

                    _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" }),

                    _jsxs("div", { className: "relative z-10 w-full flex-1 flex flex-col", children: [
                      /* Badges */
                      _jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                        _jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary border border-primary/20", children:
                          event.type
                        }),
                        isOver ? (
                          _jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-red-500/10 text-red-400 border border-red-500/20", children: [
                            _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }),
                            "Over"
                          ] })
                        ) : (
                          _jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", children: [
                            _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                            "Upcoming"
                          ] })
                        )
                      ] }),

                      /* Poster Image */
                      event.image && _jsx("div", { className: "aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-border/20 relative", children:
                        _jsx("img", {
                          src: event.image,
                          alt: event.title,
                          className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        })
                      }),

                      _jsx("h3", { className: "text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors", children:
                        event.title
                      }),

                      _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed font-medium flex-1", children:
                        event.description
                      }),

                      _jsxs("div", { className: "flex flex-wrap gap-6 text-sm font-medium text-muted-foreground mb-6 pb-6 border-b border-border/30", children: [
                        _jsxs("div", { className: "flex items-center gap-2 group/info", children: [
                          _jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover/info:border-primary/30 transition-colors", children:
                            _jsx(Calendar, { className: "w-4 h-4 text-primary" })
                          }),
                          _jsx("span", { children: event.date })
                        ] }),
                        _jsxs("div", { className: "flex items-center gap-2 group/info", children: [
                          _jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover/info:border-accent/30 transition-colors", children:
                            _jsx(MapPin, { className: "w-4 h-4 text-accent" })
                          }),
                          _jsx("span", { children: event.location })
                        ] })
                      ] })
                    ] }),

                    /* Actions */
                    _jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row gap-3 w-full mt-4", children: [
                      _jsx(Link, { to: `/events/${event.id}`, className: "flex-1", children:
                        _jsx(Button, { variant: "outline", className: "w-full h-12 rounded-xl border border-border hover:bg-muted font-bold text-sm", children: "Read More" })
                      }),
                      event.gformLink && (
                        _jsx("a", { href: event.gformLink, target: "_blank", rel: "noopener noreferrer", className: "flex-1", children:
                          _jsx(Button, {
                            disabled: isOver,
                            className: "w-full h-12 rounded-xl bg-primary text-black hover:bg-primary/90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground font-bold text-sm cursor-pointer", children:
                              isOver ? "Registration Closed" : "Apply Now"
                          })
                        })
                      )
                    ] })
                  ] }, event.id)
                );
              })
            })
          )
        ] })
      })
    })
  );
}