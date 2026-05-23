
import { motion } from "framer-motion";
import { Clock, BookOpen, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

import { useSession } from "@/lib/auth-store";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const courses = [
{
  id: 1,
  title: "Drone Aerodynamics & Propeller Design",
  description: "Master the principles of lift, drag, and thrust. Design high-efficiency propellers using computational fluid dynamics.",
  lessons: 32,
  duration: "12 hours",
  students: "1.2k+",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
  category: "Engineering",
  color: "from-blue-600 to-cyan-500"
},
{
  id: 2,
  title: "Autonomous Navigation with AI",
  description: "Implement computer vision and pathfinding algorithms for fully autonomous drone operations.",
  lessons: 28,
  duration: "10 hours",
  students: "850+",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1527430295725-49952e1b0923?auto=format&fit=crop&q=80&w=800",
  category: "Software",
  color: "from-primary to-secondary"
},
{
  id: 3,
  title: "Full-Stack Software Architecture",
  description: "Learn to build scalable cloud infrastructures and real-time control dashboards for IoT devices.",
  lessons: 45,
  duration: "18 hours",
  students: "2.1k+",
  rating: 5.0,
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  category: "Development",
  color: "from-purple-600 to-pink-500"
},
{
  id: 4,
  title: "Robotics & Embedded Systems",
  description: "Hands-on guide to Arduino, Raspberry Pi, and custom PCB design for next-gen hardware.",
  lessons: 24,
  duration: "8 hours",
  students: "600+",
  rating: 4.7,
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  category: "Hardware",
  color: "from-orange-500 to-red-600"
}];


export function CourseCatalog() {
  const router = useNavigate();
  const { data: session } = useSession();

  const handleAccess = (courseId) => {
    if (!session) {
      router(`/login?callbackUrl=/edutech/course/${courseId}`);
    } else {
      router(`/edutech/course/${courseId}`);
    }
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-12 pb-20", children: [/*#__PURE__*/

      _jsxs("section", { className: "relative py-20 px-4 overflow-hidden rounded-[3rem] bg-card border border-border", children: [/*#__PURE__*/
        _jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full" }), /*#__PURE__*/
        _jsxs("div", { className: "relative z-10 max-w-4xl mx-auto text-center", children: [/*#__PURE__*/
          _jsxs(motion.h2, {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6", children: [
            "Master the Skills of ", /*#__PURE__*/
            _jsx("span", { className: "text-primary", children: "Tomorrow" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-2xl mx-auto", children: "Choose from our industry-leading certification programs in Drone Tech, Software Engineering, and Robotics." }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children:
        courses.map((course, i) => /*#__PURE__*/
        _jsxs(motion.div, {

          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "group glass-card rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row h-full", children: [/*#__PURE__*/

          _jsxs("div", { className: "relative w-full md:w-2/5 aspect-video md:aspect-auto", children: [/*#__PURE__*/
            _jsx("img", { src: course.image, alt: course.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }), /*#__PURE__*/
            _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }), /*#__PURE__*/
            _jsx("div", { className: "absolute top-4 left-4", children: /*#__PURE__*/
              _jsx("span", { className: "px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest", children:
                course.category }
              ) }
            )] }
          ), /*#__PURE__*/

          _jsxs("div", { className: "flex-1 p-8 flex flex-col justify-between", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsxs("div", { className: "flex items-center justify-between mb-4", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-1 text-yellow-500", children: [/*#__PURE__*/
                  _jsx(Star, { className: "w-4 h-4 fill-current" }), /*#__PURE__*/
                  _jsx("span", { className: "text-sm font-bold text-foreground", children: course.rating })] }
                ), /*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-xs", children: [/*#__PURE__*/
                  _jsx(Users, { className: "w-4 h-4" }),
                  course.students] }
                )] }
              ), /*#__PURE__*/
              _jsx("h3", { className: "text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors", children: course.title }), /*#__PURE__*/
              _jsx("p", { className: "text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed", children: course.description }), /*#__PURE__*/

              _jsxs("div", { className: "flex items-center gap-6 mb-8", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [/*#__PURE__*/
                  _jsx(BookOpen, { className: "w-4 h-4" }),
                  course.lessons, " Lessons"] }
                ), /*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [/*#__PURE__*/
                  _jsx(Clock, { className: "w-4 h-4" }),
                  course.duration] }
                )] }
              )] }
            ), /*#__PURE__*/

            _jsxs(Button, {
              onClick: () => handleAccess(course.id),
              className: "w-full h-12 rounded-2xl bg-muted border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all group/btn flex items-center justify-between px-6", children: [/*#__PURE__*/

              _jsx("span", { className: "font-bold", children: "Start Learning" }), /*#__PURE__*/
              _jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover/btn:translate-x-1" })] }
            )] }
          )] }, course.id
        )
        ) }
      )] }
    ));

}