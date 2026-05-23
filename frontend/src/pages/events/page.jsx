import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getEvents, getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";



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


import { useState, useEffect } from "react";

export default function EventsPage() {
  const [cmsEvents, setCmsEvents] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return <div className="min-h-screen bg-background text-white p-8">Loading Events...</div>;
  }

  // Combine CMS events with dummy data if CMS is empty, or just use CMS if populated
  const events = cmsEvents.length > 0 ? cmsEvents : DUMMY_EVENTS;

  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/


      _jsxs("section", { className: "relative pt-40 pb-20 overflow-hidden", children: [/*#__PURE__*/
        _jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [/*#__PURE__*/
          _jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" }), /*#__PURE__*/
          _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" })] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [/*#__PURE__*/
          _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md", children: [/*#__PURE__*/
            _jsx(Sparkles, { className: "w-4 h-4 text-primary" }), /*#__PURE__*/
            _jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-gray-400", children: "Innovation Calendar" })] }
          ), /*#__PURE__*/
          _jsxs("h1", { className: "text-6xl lg:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent", children: ["Upcoming ", /*#__PURE__*/
            _jsx("span", { className: "text-primary", children: "Events" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium", children: "Join the architects of tomorrow. From global tech summits to intimate innovation workshops, explore where Laara Innovations is shaping the future." }


          )] }
        )] }
      ), /*#__PURE__*/


      _jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8 relative z-10", children: /*#__PURE__*/
        _jsx("div", { className: "mx-auto max-w-7xl", children: /*#__PURE__*/
          _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children:
            events.map((event, index) => /*#__PURE__*/
            _jsxs("div", {

              className: "group relative flex flex-col rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-500", children: [/*#__PURE__*/


              _jsxs("div", { className: "aspect-[16/10] overflow-hidden relative", children: [/*#__PURE__*/
                _jsx("img", {
                  src: event.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
                  alt: event.title,
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }
                ), /*#__PURE__*/
                _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" }), /*#__PURE__*/
                _jsx("div", { className: "absolute top-6 left-6", children: /*#__PURE__*/
                  _jsx("span", { className: "px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest", children:
                    event.type }
                  ) }
                )] }
              ), /*#__PURE__*/


              _jsxs("div", { className: "p-8 flex flex-col flex-1", children: [/*#__PURE__*/
                _jsx("h3", { className: "text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300", children:
                  event.title }
                ), /*#__PURE__*/
                _jsx("p", { className: "text-gray-400 text-sm leading-relaxed mb-8 flex-1", children:
                  event.description }
                ), /*#__PURE__*/

                _jsxs("div", { className: "space-y-4 mb-8", children: [/*#__PURE__*/
                  _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-500 font-medium", children: [/*#__PURE__*/
                    _jsx("div", { className: "w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors", children: /*#__PURE__*/
                      _jsx(Calendar, { className: "w-4 h-4 text-primary" }) }
                    ),
                    event.date] }
                  ), /*#__PURE__*/
                  _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-500 font-medium", children: [/*#__PURE__*/
                    _jsx("div", { className: "w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-secondary/30 transition-colors", children: /*#__PURE__*/
                      _jsx(MapPin, { className: "w-4 h-4 text-secondary" }) }
                    ),
                    event.location] }
                  )] }
                ), /*#__PURE__*/

                _jsx(Link, { to: `/events/${event.id}`, children: /*#__PURE__*/
                  _jsxs(Button, { className: "w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-bold transition-all duration-300 group/btn gap-3", children: ["View Details", /*#__PURE__*/

                    _jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover/btn:translate-x-1" })] }
                  ) }
                )] }
              )] }, event.id
            )
            ) }
          ) }
        ) }
      ), /*#__PURE__*/


      _jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsx("div", { className: "mx-auto max-w-5xl", children: /*#__PURE__*/
          _jsxs("div", { className: "rounded-[3rem] p-12 lg:p-20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-white/5 text-center relative overflow-hidden", children: [/*#__PURE__*/
            _jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" }), /*#__PURE__*/
            _jsxs("h2", { className: "text-4xl lg:text-6xl font-black tracking-tighter text-white mb-8 relative z-10", children: ["Hosting an ", /*#__PURE__*/
              _jsx("span", { className: "text-primary", children: "Event?" })] }
            ), /*#__PURE__*/
            _jsx("p", { className: "text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10", children: "We collaborate with tech communities and institutions worldwide. Let's explore how we can bring Laara Innovations to your stage." }


            ), /*#__PURE__*/
            _jsx(Link, { to: "/contact", className: "relative z-10", children: /*#__PURE__*/
              _jsx(Button, { size: "lg", className: "h-16 px-10 rounded-2xl bg-white text-black font-black hover:bg-primary hover:scale-105 transition-all shadow-xl shadow-white/10", children: "Partner With Us" }

              ) }
            )] }
          ) }
        ) }
      ), /*#__PURE__*/

      _jsx(Footer, { config: config })] }
    ));

}