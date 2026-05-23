
import { motion } from "framer-motion";
import { Play, BookOpen, Trophy, Target, Sparkles, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

// Stubbed next-auth for Vite rewrite
const useSession = () => ({ data: { user: { name: 'Admin User', role: 'ADMIN' } }, status: 'authenticated' });
const signOut = async () => {};
const SessionProvider = ({ children }) => <>{children}</>;
    
import { VideoPlayer } from "@/components/video-player";
import { ProgressTracker } from "@/components/progress-tracker";
import { AssignmentsTable } from "@/components/assignments-table";
import { CourseCards } from "@/components/course-cards";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function StudentDashboard() {
  const { data: session } = useSession();

  return (/*#__PURE__*/
    _jsxs("div", { className: "p-6 lg:p-12 space-y-12", children: [/*#__PURE__*/

      _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6", children: [/*#__PURE__*/
        _jsxs("div", { children: [/*#__PURE__*/
          _jsxs(motion.h1, {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            className: "text-4xl font-black tracking-tighter text-white mb-2", children: [
            "Welcome Back, ",
            session?.user?.name?.split(' ')[0] || "Student", " ", /*#__PURE__*/_jsx("span", { className: "inline-block animate-bounce ml-2 text-3xl", children: "\uD83D\uDC4B" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "text-gray-500 font-medium", children: "You have 2 lessons to complete today to stay on track." })] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
          _jsxs("div", { className: "p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4", children: [/*#__PURE__*/
            _jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary", children: /*#__PURE__*/
              _jsx(Trophy, { className: "w-5 h-5" }) }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("p", { className: "text-[10px] uppercase tracking-widest text-gray-500 font-bold", children: "Daily Streak" }), /*#__PURE__*/
              _jsx("p", { className: "text-sm font-black text-white", children: "12 Days" })] }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4", children: [/*#__PURE__*/
            _jsx("div", { className: "w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary", children: /*#__PURE__*/
              _jsx(Target, { className: "w-5 h-5" }) }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("p", { className: "text-[10px] uppercase tracking-widest text-gray-500 font-bold", children: "XP Earned" }), /*#__PURE__*/
              _jsx("p", { className: "text-sm font-black text-white", children: "2,450" })] }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [/*#__PURE__*/

        _jsxs("div", { className: "xl:col-span-2 space-y-12", children: [/*#__PURE__*/

          _jsxs("section", { className: "space-y-6", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
              _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
                _jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /*#__PURE__*/
                  _jsx(Play, { className: "w-4 h-4 fill-current" }) }
                ), /*#__PURE__*/
                _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider", children: "Continue Watching" })] }
              ), /*#__PURE__*/
              _jsx(Button, { variant: "ghost", className: "text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold", children: "See History" }

              )] }
            ), /*#__PURE__*/
            _jsx("div", { className: "glass-card rounded-[2.5rem] overflow-hidden border border-white/5 relative", children: /*#__PURE__*/
              _jsx(VideoPlayer, {}) }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "space-y-6", children: [/*#__PURE__*/
            _jsx("div", { className: "flex items-center justify-between", children: /*#__PURE__*/
              _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
                _jsx("div", { className: "p-2 rounded-lg bg-secondary/10 text-secondary", children: /*#__PURE__*/
                  _jsx(BookOpen, { className: "w-4 h-4" }) }
                ), /*#__PURE__*/
                _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider", children: "Assignments" })] }
              ) }
            ), /*#__PURE__*/
            _jsx("div", { className: "glass-card rounded-[2rem] p-6 border border-white/5", children: /*#__PURE__*/
              _jsx(AssignmentsTable, {}) }
            )] }
          )] }
        ), /*#__PURE__*/


        _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/

          _jsxs("section", { className: "space-y-6", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsx("div", { className: "p-2 rounded-lg bg-accent/10 text-accent", children: /*#__PURE__*/
                _jsx(Sparkles, { className: "w-4 h-4" }) }
              ), /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider", children: "My Progress" })] }
            ), /*#__PURE__*/
            _jsx("div", { className: "glass-card rounded-[2rem] p-8 border border-white/5", children: /*#__PURE__*/
              _jsx(ProgressTracker, {}) }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "space-y-6", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /*#__PURE__*/
                _jsx(LayoutGrid, { className: "w-4 h-4" }) }
              ), /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider", children: "My Courses" })] }
            ), /*#__PURE__*/
            _jsx("div", { className: "space-y-4", children: /*#__PURE__*/
              _jsx(CourseCards, {}) }
            )] }
          )] }
        )] }
      )] }
    ));

}