import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getEvents, getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronLeft, ArrowRight, Sparkles, AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const DUMMY_EVENTS = [
{
  id: "1",
  title: "Drone Tech Summit 2026",
  date: "June 15-17, 2026",
  location: "Bengaluru, India",
  description: "Join us for three days of workshops, keynotes, and hands-on demonstrations showcasing the latest in drone propulsion technology.",
  detailedDescription: "The Drone Tech Summit 2026 is the premier gathering for engineers, developers, and researchers in the unmanned aerial systems industry. Focus areas for this year's summit include:\n\n- Advanced CFD simulations for quad-blade configurations.\n- Carbon-fiber composite lightweighting and structural optimization.\n- Open-source autopilot integrations (ArduPilot/PX4) with custom hardware.\n- Next-generation electric motor propulsion systems and battery efficiency.\n\nAttendees will have the opportunity to participate in physical testing, network with leaders in aerospace engineering, and witness live propulsion R&D demonstrations from our engineering team.",
  type: "Conference",
  image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000"
},
{
  id: "2",
  title: "EdTech Innovation Workshop",
  date: "July 8, 2026",
  location: "Virtual Event",
  description: "A deep dive into AI-powered learning platforms and the future of personalized education. Open to educators and developers.",
  detailedDescription: "Explore how artificial intelligence is transforming instructional design and student engagement. This interactive online workshop is designed for edtech innovators, curriculum developers, and classroom leaders. Topics covered:\n\n- Designing adaptive learning algorithms and smart recommendation engines.\n- Utilizing LLMs for automated feedback and grading aids.\n- Gamification best practices for student retention.\n- Enhancing accessibility and support for neurodivergent learners.\n\nParticipants will gain access to hands-on programming sandboxes and receive a certificate of completion from Laara Innovations EdTech Division.",
  type: "Workshop",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
},
{
  id: "3",
  title: "Robotics & AI Expo",
  date: "September 12, 2026",
  location: "Hyderabad, India",
  description: "Exploring the convergence of robotics and artificial intelligence in industrial automation and consumer electronics.",
  detailedDescription: "The Robotics & AI Expo showcases cutting-edge advancements in hardware automation, robotics systems, and computer vision models. Key exhibition tracks:\n\n- Multi-axis robotic arms for industrial manufacturing.\n- Real-time computer vision and obstacle avoidance protocols.\n- Edge AI deployment for autonomous ground vehicles (AGVs).\n- Consumer robotics and intelligent smart-home assistant products.\n\nMeet startups, research institutions, and corporate innovation divisions exhibiting their prototypes. Hands-on coding zones and system debugging workshops will run hourly.",
  type: "Expo",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000"
}];

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

  // Combine CMS events with fallback dummy data
  const events = cmsEvents.length > 0 ? cmsEvents : DUMMY_EVENTS;
  const event = events.find(e => String(e.id) === String(params.id));

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
                _jsx("span", { className: "px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest inline-block", children:
                  event.type
                }),
                _jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent leading-none", children:
                  event.title
                })
              ] }),

              _jsx("div", { className: "aspect-video rounded-[2.5rem] overflow-hidden border border-border bg-muted relative", children:
                _jsx("img", {
                  src: event.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
                  alt: event.title,
                  className: "w-full h-full object-cover"
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
                _jsx("div", { className: "text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap space-y-4 font-medium", children:
                  event.detailedDescription || "No detailed description has been uploaded yet for this event by the administrator."
                })
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
                  _jsx(Link, { to: "/contact", className: "block", children:
                    _jsxs(Button, { className: "w-full h-14 bg-primary text-black font-black hover:bg-primary/90 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]", children: [
                      "Register Interest", _jsx(ArrowRight, { className: "w-4 h-4" })
                    ] })
                  }),
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
