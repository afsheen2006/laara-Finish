import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getEvents, getNavLinks, getSystemConfig, resolveImageUrl } from "@/lib/cms-helpers";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronLeft, ArrowRight, Sparkles, AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function EventDetailPage() {
  const params = useParams();
  const [cmsEvents, setCmsEvents] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      getEvents(),
      getNavLinks(),
      getSystemConfig()
    ]).then(([cmsEventsData, navLinksData, configData]) => {
      setCmsEvents(cmsEventsData || []);
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  const event = cmsEvents.find(e => String(e.id) === String(params.id));

  return (
    _jsxs("main", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-black flex flex-col justify-between", children: [
      _jsx(Navigation, { customLinks: navLinks, config: config, loading: loading }),

      loading ? (
        _jsxs("div", { className: "flex flex-col items-center justify-center py-40 select-none flex-1", children: [
          _jsx(Loader2, { className: "w-10 h-10 animate-spin text-primary mb-4" }),
          _jsx("span", { className: "text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase", children: "Loading Event Details..." })
        ] })
      ) : !event ? (
        _jsxs("section", { className: "py-40 px-4 text-center max-w-xl mx-auto space-y-6 flex-1 flex flex-col justify-center items-center", children: [
          _jsx(AlertCircle, { className: "w-16 h-16 text-primary animate-pulse" }),
          _jsx("h1", { className: "text-4xl font-black tracking-tight", children: "Event Not Found" }),
          _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "The event you are looking for might have been rescheduled, removed, or the URL contains an invalid ID." }),
          _jsx(Link, { to: "/events", children:
            _jsxs(Button, { className: "bg-primary text-black font-bold hover:bg-primary/90 rounded-2xl gap-2 px-6 h-12", children: [
              _jsx(ChevronLeft, { className: "w-4 h-4" }), "Back to Events Calendar"
            ] })
          })
        ] })
      ) : (
        _jsxs("div", { className: "flex-1 pt-24 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12", children: [
          _jsx("div", { className: "relative z-10", children:
            _jsxs(Link, { to: "/events", className: "inline-flex items-center text-sm font-semibold text-primary hover:underline group gap-1", children: [
              _jsx(ChevronLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }), "Back to Events"
            ] })
          }),

          _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10", children: [
            /* Left main details column */
            _jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
              _jsxs("div", { className: "space-y-4", children: [
                _jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
                  _jsx("span", { className: "px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest inline-block", children:
                    event.type
                  }),
                  (event.timeline && new Date(event.timeline) <= new Date()) ? (
                    _jsxs("span", { className: "px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5", children: [
                      _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }),
                      "Over"
                    ] })
                  ) : (
                    _jsxs("span", { className: "px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5", children: [
                      _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                      "Upcoming"
                    ] })
                  )
                ] }),
                _jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent leading-none", children:
                  event.title
                })
              ] }),

              _jsx("div", { className: "aspect-video rounded-[2.5rem] overflow-hidden border border-border bg-muted relative", children:
                _jsx("img", {
                  src: resolveImageUrl(event.image) || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
                  alt: event.title,
                  className: `w-full h-full object-cover transition-all duration-500 ${(event.timeline && new Date(event.timeline) <= new Date()) ? "grayscale contrast-125 opacity-70 hover:grayscale-0" : ""}`
                })
              }),

              _jsxs("div", { className: "glass-card rounded-[2.5rem] p-8 sm:p-10 space-y-6", children: [
                _jsx("h3", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
                  _jsx(Info, { className: "w-5 h-5 text-primary" }), "About the Event"
                ] }),
                _jsx("p", { className: "text-muted-foreground leading-relaxed font-semibold text-lg", children:
                  event.description
                }),
                _jsx("hr", { className: "border-border" }),
                (!event.curriculum || event.curriculum.length === 0) && !event.detailedDescription ? (
                  _jsx("div", { className: "text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap space-y-4 font-medium", children:
                    "No curriculum or detailed description has been uploaded yet for this event by the administrator."
                  })
                ) : (
                  _jsxs("div", { className: "space-y-6", children: [
                    event.detailedDescription && _jsx("div", { className: "text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap space-y-4 font-medium", children: event.detailedDescription }),
                    (event.curriculum || []).map((item, idx) => (
                      _jsxs("div", { key: idx, className: "space-y-2", children: [
                        _jsx("h4", { className: "text-lg font-bold text-foreground", children: item.heading }),
                        _jsx("p", { className: "text-muted-foreground leading-relaxed text-sm font-medium whitespace-pre-wrap", children: item.text })
                      ] })
                    ))
                  ] })
                )
              ] })
            ] }),

            /* Right details box sidebar */
            _jsxs("div", { className: "space-y-8", children: [
              _jsxs("div", { className: "glass-card rounded-[2.5rem] p-8 space-y-6", children: [
                _jsx("h4", { className: "text-lg font-bold text-foreground", children: "Schedule & Location" }),
                _jsxs("div", { className: "space-y-4", children: [
                  _jsxs("div", { className: "flex items-start gap-4", children: [
                    _jsx("div", { className: "w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-primary flex-shrink-0", children:
                      _jsx(Calendar, { className: "w-5 h-5" })
                    }),
                    _jsxs("div", { children: [
                      _jsx("div", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest", children: "Date & Time" }),
                      _jsx("div", { className: "text-sm font-semibold text-foreground mt-0.5", children: event.date })
                    ] })
                  ] }),
                  _jsxs("div", { className: "flex items-start gap-4", children: [
                    _jsx("div", { className: "w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-secondary flex-shrink-0", children:
                      _jsx(MapPin, { className: "w-5 h-5" })
                    }),
                    _jsxs("div", { children: [
                      _jsx("div", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest", children: "Venue" }),
                      _jsx("div", { className: "text-sm font-semibold text-foreground mt-0.5", children: event.location })
                    ] })
                  ] })
                ] }),
                _jsx("hr", { className: "border-border" }),
                _jsxs("div", { className: "space-y-3", children: [
                  event.gformLink ? (
                    _jsx("a", { href: event.gformLink.startsWith("http") ? event.gformLink : `https://${event.gformLink}`, target: "_blank", rel: "noopener noreferrer", className: "block", children:
                      _jsxs(Button, {
                        disabled: event.timeline ? new Date(event.timeline) <= new Date() : false,
                        className: "w-full h-14 bg-primary text-black font-black hover:bg-primary/90 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground cursor-pointer", children: [
                          (event.timeline && new Date(event.timeline) <= new Date()) ? "Registration Closed" : "Apply Now",
                          _jsx(ArrowRight, { className: "w-4 h-4" })
                        ]
                      })
                    })
                  ) : (
                    _jsx(Link, { to: "/contact", className: "block", children:
                      _jsxs(Button, { className: "w-full h-14 bg-primary text-black font-black hover:bg-primary/90 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]", children: [
                        "Register Interest", _jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    })
                  ),
                  _jsx(Link, { to: "/contact", className: "block", children:
                    _jsx(Button, { variant: "outline", className: "w-full h-14 border-border hover:bg-muted text-foreground font-bold rounded-2xl", children:
                      "Inquire About Speakers"
                    })
                  })
                ] })
              ] }),

              _jsxs("div", { className: "glass-card rounded-[2.5rem] p-8 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden space-y-4", children: [
                _jsxs("h4", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
                  _jsx(Sparkles, { className: "w-5 h-5 text-primary" }), "Partner with Us"
                ] }),
                _jsx("p", { className: "text-xs text-muted-foreground leading-relaxed font-medium", children:
                  "Want to co-host an event, invite our research speakers, or sponsor key aerospace/edtech tracks? Contact our support staff."
                }),
                _jsx(Link, { to: "/contact", className: "block", children:
                  _jsx(Button, { variant: "outline", className: "w-full rounded-xl hover:bg-foreground/5 text-xs font-bold h-10", children:
                    "Contact Partnerships"
                  })
                })
              ] })
            ] })
          ] })
        ] })
      ),

      _jsx(Footer, { config: config })
    ] })
  );
}
