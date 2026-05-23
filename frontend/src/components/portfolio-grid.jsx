
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const categories = ["All", "Web Apps", "Mobile", "SaaS", "E-Commerce"];

const STATIC_PROJECTS = [
{
  id: 1,
  title: "Google maps optimization",
  description: "Maximizes local visibility to attract nearby customers.",
  category: "Web Apps",
  tags: ["SEO", "Maps", "Local"],
  image: "/projects/google_maps.png",
  gradient: "from-primary/40 to-cyan-600/40",
  featured: true
},
{
  id: 2,
  title: "LearnHub Platform",
  description: "Enterprise LMS with AI-powered course recommendations",
  category: "SaaS",
  tags: ["Education", "LMS", "AI"],
  image: "/projects/learnhub.png",
  gradient: "from-violet-600/40 to-primary/40",
  featured: false
},
{
  id: 3,
  title: "TechMart Store",
  description: "High-performance e-commerce platform with 99.9% uptime",
  category: "E-Commerce",
  tags: ["E-Commerce", "Next.js", "Stripe"],
  image: "/projects/techmart.png",
  gradient: "from-emerald-600/40 to-teal-600/40",
  featured: false
},
{
  id: 4,
  title: "Human Resource Management System",
  description: "Centralizes employee data and automates HR workflows.",
  category: "SaaS",
  tags: ["HRMS", "Automation", "Internal"],
  image: "/projects/hrms.png",
  gradient: "from-orange-600/40 to-red-600/40",
  featured: false
},
{
  id: 5,
  title: "customer relationship management",
  description: "Centralizes customer data to build better relationships.",
  category: "SaaS",
  tags: ["CRM", "Sales", "Data"],
  image: "/projects/crm.png",
  gradient: "from-primary/40 to-indigo-600/40",
  featured: true
},
{
  id: 6,
  title: "Food Delivery App",
  description: "Turn Your Restaurant Into a Brand.",
  category: "Web Apps",
  tags: ["Delivery", "Restaurant", "Mobile"],
  image: "/projects/webdev.png",
  gradient: "from-green-600/40 to-emerald-600/40",
  featured: false
}];


export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/projects");
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        // Fallback to static projects is already handled by initial state
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  if (loading) {
    return (/*#__PURE__*/
      _jsx("div", { className: "flex justify-center items-center py-20", children: /*#__PURE__*/
        _jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" }) }
      ));

  }

  return (/*#__PURE__*/
    _jsxs("div", { className: "py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto", children: [/*#__PURE__*/

      _jsxs("div", { className: "text-center mb-16", children: [/*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6", children: [/*#__PURE__*/

          _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), /*#__PURE__*/
          _jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary", children: "Capabilities" })] }
        ), /*#__PURE__*/
        _jsxs("h2", { className: "text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-foreground mb-6", children: ["Our Digital ", /*#__PURE__*/
          _jsx("span", { className: "text-primary", children: "Services" })] }
        ), /*#__PURE__*/
        _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto font-medium", children: "Transforming complex challenges into seamless digital experiences through cutting-edge engineering and human-centric design." }
        )] }
      ), /*#__PURE__*/

      _jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-8", children:
        categories.map((category) => /*#__PURE__*/
        _jsx("button", {
          onClick: () => setActiveCategory(category),
          className: `px-4 py-2 rounded-full text-sm font-medium transition-smooth ${activeCategory === category ?
          "bg-primary text-primary-foreground" :
          "bg-muted text-muted-foreground hover:bg-muted/80"}`, children:
          category }, category
        )
        ) }
      ), /*#__PURE__*/


      _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: /*#__PURE__*/
        _jsx(AnimatePresence, { mode: "popLayout", children:
          filteredProjects.map((project, index) => /*#__PURE__*/
          _jsx(motion.div, {

            layout: true,
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 },
            transition: { duration: 0.3 },
            className: "group h-full", children: /*#__PURE__*/

            _jsxs("div", { className: "relative h-full flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-smooth", children: [/*#__PURE__*/

              _jsxs("div", { className: "relative h-56 w-full overflow-hidden shrink-0", children: [
                project.image ? /*#__PURE__*/
                _jsx("img", {
                  src: project.image,
                  alt: project.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" }
                ) : /*#__PURE__*/

                _jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${project.gradient}` }), /*#__PURE__*/

                _jsx("div", { className: "absolute inset-0 circuit-pattern opacity-20" }), /*#__PURE__*/


                _jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-4 p-6 text-center", children: [/*#__PURE__*/
                  _jsx("p", { className: "text-white text-sm font-medium mb-2", children: "Interested in this service?" }), /*#__PURE__*/
                  _jsx(Link, { to: "/contact", className: "w-full max-w-[160px]", children: /*#__PURE__*/
                    _jsxs(Button, { variant: "default", className: "w-full bg-primary text-black font-bold rounded-full gap-2", children: ["Enquire Now", /*#__PURE__*/

                      _jsx(ArrowUpRight, { className: "h-4 w-4" })] }
                    ) }
                  )] }
                ),


                project.featured && /*#__PURE__*/
                _jsx("div", { className: "absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-xs font-medium text-primary-foreground z-10", children: "Featured" }

                )] }

              ), /*#__PURE__*/


              _jsxs("div", { className: "p-5 flex flex-col flex-grow", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [/*#__PURE__*/
                  _jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-smooth", children:
                    project.title }
                  ), /*#__PURE__*/
                  _jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" })] }
                ), /*#__PURE__*/
                _jsx("p", { className: "text-sm text-muted-foreground mb-4", children:
                  project.description }
                ), /*#__PURE__*/
                _jsx("div", { className: "flex flex-wrap gap-2 mt-auto", children:
                  project.tags?.map((tag) => /*#__PURE__*/
                  _jsx("span", {

                    className: "px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground", children:

                    tag }, tag
                  )
                  ) }
                )] }
              )] }
            ) }, project.id
          )
          ) }
        ) }
      )] }
    ));

}