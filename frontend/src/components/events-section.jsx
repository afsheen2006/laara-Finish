
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const events = [
{
  id: 1,
  title: "Drone Tech Summit 2026",
  date: "June 15-17, 2026",
  location: "Bengaluru, India",
  description: "Join us for three days of workshops, keynotes, and hands-on demonstrations showcasing the latest in drone propulsion technology.",
  type: "Conference",
  href: "/events/drone-tech-summit-2026"
},
{
  id: 2,
  title: "EdTech Innovation Workshop",
  date: "July 8, 2026",
  location: "Virtual Event",
  description: "A deep dive into AI-powered learning platforms and the future of personalized education. Open to educators and developers.",
  type: "Workshop",
  href: "/events/edtech-innovation-workshop"
}];


export function EventsSection() {
  return (/*#__PURE__*/
    _jsx("section", { className: "relative py-20 border-t border-border/30 bg-gradient-to-b from-transparent to-muted/10", children: /*#__PURE__*/
      _jsx("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 }, children: [/*#__PURE__*/

          _jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-4", children: ["Upcoming ", /*#__PURE__*/
                _jsx("span", { className: "text-primary", children: "Events" })] }
              ), /*#__PURE__*/
              _jsx("p", { className: "text-muted-foreground max-w-xl font-medium", children: "Connect with our community and explore the future of innovation at our upcoming summits and workshops." }

              )] }
            ), /*#__PURE__*/
            _jsx(Link, { to: "/events", children: /*#__PURE__*/
              _jsxs(Button, { variant: "outline", className: "border-border hover:bg-muted rounded-xl gap-2", children: ["View All Events ", /*#__PURE__*/
                _jsx(ArrowRight, { className: "w-4 h-4" })] }
              ) }
            )] }
          ), /*#__PURE__*/

          _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children:
            events.map((event, index) => /*#__PURE__*/
            _jsxs(motion.div, {

              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: index * 0.1 },
              className: "group relative p-8 rounded-[2rem] glass-card hover:border-primary/50 transition-all duration-500 overflow-hidden", children: [/*#__PURE__*/


              _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /*#__PURE__*/

              _jsxs("div", { className: "relative z-10", children: [/*#__PURE__*/

                _jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary mb-6 border border-primary/20", children: [/*#__PURE__*/
                  _jsx("span", { className: "w-1 h-1 rounded-full bg-primary animate-pulse" }),
                  event.type] }
                ), /*#__PURE__*/

                _jsx("h3", { className: "text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors", children:
                  event.title }
                ), /*#__PURE__*/

                _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed font-medium", children:
                  event.description }
                ), /*#__PURE__*/

                _jsxs("div", { className: "flex flex-wrap gap-6 text-sm font-medium text-muted-foreground mb-8 pb-8 border-b border-border/30", children: [/*#__PURE__*/
                  _jsxs("div", { className: "flex items-center gap-2 group/info", children: [/*#__PURE__*/
                    _jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover/info:border-primary/30 transition-colors", children: /*#__PURE__*/
                      _jsx(Calendar, { className: "w-4 h-4 text-primary" }) }
                    ), /*#__PURE__*/
                    _jsx("span", { children: event.date })] }
                  ), /*#__PURE__*/
                  _jsxs("div", { className: "flex items-center gap-2 group/info", children: [/*#__PURE__*/
                    _jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover/info:border-accent/30 transition-colors", children: /*#__PURE__*/
                      _jsx(MapPin, { className: "w-4 h-4 text-accent" }) }
                    ), /*#__PURE__*/
                    _jsx("span", { children: event.location })] }
                  )] }
                ), /*#__PURE__*/

                _jsx(Link, { to: event.href, children: /*#__PURE__*/
                  _jsxs(Button, { variant: "ghost", className: "p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn font-bold text-base flex items-center gap-2", children: ["Full Event Details", /*#__PURE__*/

                    _jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all duration-300", children: /*#__PURE__*/
                      _jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" }) }
                    )] }
                  ) }
                )] }
              )] }, event.id
            )
            ) }
          )] }
        ) }
      ) }
    ));

}