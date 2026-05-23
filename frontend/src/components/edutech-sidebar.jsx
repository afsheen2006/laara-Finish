
import { useState } from "react";
import { Link } from 'react-router-dom';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Stubbed next-auth for Vite rewrite
const useSession = () => ({ data: { user: { name: 'Admin User', role: 'ADMIN' } }, status: 'authenticated' });
const signOut = async () => {};
const SessionProvider = ({ children }) => <>{children}</>;
    
import {
  Home,
  BookOpen,

  FileText,
  Award,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Sparkles,

  Zap } from
"lucide-react";import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";


const navItems = [
{ href: "/edutech", label: "Dashboard", icon: Home },
{ href: "/edutech#courses", label: "My Courses", icon: BookOpen },
{ href: "/edutech/courses", label: "Our Courses", icon: Sparkles },
{ href: "/edutech#assignments", label: "Assignments", icon: FileText },
{ href: "/edutech#certificates", label: "Certificates", icon: Award }];


const bottomNavItems = [
{ href: "/edutech/settings", label: "Settings", icon: Settings },
{ href: "/edutech/help", label: "Help & Support", icon: HelpCircle }];


export function EdutechSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock progress data - in a real app this would come from a database/CMS
  const userProgress = {
    percentage: 68,
    coursesCompleted: 4,
    points: 1250
  };

  const SidebarContent = () => /*#__PURE__*/
  _jsxs("div", { className: "flex flex-col h-full bg-[#050505]/80 backdrop-blur-xl border-r border-white/5", children: [/*#__PURE__*/

    _jsx("div", { className: "p-8 border-b border-white/5", children: /*#__PURE__*/
      _jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [/*#__PURE__*/
        _jsx("div", { className: "relative h-10 w-10 overflow-hidden rounded-xl bg-primary/10 p-1.5 transition-transform duration-300 group-hover:scale-110 border border-primary/20", children: /*#__PURE__*/
          _jsx("img", {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg",
            alt: "Laara Innovations",
            className: "h-full w-full object-contain" }
          ) }
        ), /*#__PURE__*/
        _jsxs("div", { children: [/*#__PURE__*/
          _jsx("span", { className: "text-lg font-black tracking-tighter bg-gradient-to-r from-[#15E5C4] to-[#00A3FF] bg-clip-text text-transparent", children: "LAARA" }

          ), /*#__PURE__*/
          _jsx("span", { className: "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500", children: "Academy" }

          )] }
        )] }
      ) }
    ), /*#__PURE__*/


    _jsx("div", { className: "px-4 py-6", children: /*#__PURE__*/
      _jsxs("div", { className: "p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden group", children: [/*#__PURE__*/
        _jsx("div", { className: "absolute top-0 right-0 p-2 opacity-20", children: /*#__PURE__*/
          _jsx(Zap, { className: "w-8 h-8 text-primary" }) }
        ), /*#__PURE__*/
        _jsxs("div", { className: "relative z-10", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center justify-between mb-3", children: [/*#__PURE__*/
            _jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-400", children: "Your Progress" }), /*#__PURE__*/
            _jsxs("span", { className: "text-xs font-bold text-primary", children: [userProgress.percentage, "%"] })] }
          ), /*#__PURE__*/
          _jsx("div", { className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4", children: /*#__PURE__*/
            _jsx(motion.div, {
              initial: { width: 0 },
              animate: { width: `${userProgress.percentage}%` },
              transition: { duration: 1, ease: "easeOut" },
              className: "h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(21,229,196,0.3)]" }
            ) }
          ), /*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex flex-col", children: [/*#__PURE__*/
              _jsx("span", { className: "text-lg font-black text-white", children: userProgress.coursesCompleted }), /*#__PURE__*/
              _jsx("span", { className: "text-[10px] uppercase tracking-tighter text-gray-500", children: "Courses" })] }
            ), /*#__PURE__*/
            _jsx("div", { className: "w-px h-6 bg-white/10" }), /*#__PURE__*/
            _jsxs("div", { className: "flex flex-col", children: [/*#__PURE__*/
              _jsx("span", { className: "text-lg font-black text-white", children: userProgress.points }), /*#__PURE__*/
              _jsx("span", { className: "text-[10px] uppercase tracking-tighter text-gray-500", children: "XP Points" })] }
            )] }
          )] }
        )] }
      ) }
    ), /*#__PURE__*/


    _jsxs("nav", { className: "flex-1 px-3 py-2 space-y-1", children: [/*#__PURE__*/
      _jsx("div", { className: "px-4 mb-4", children: /*#__PURE__*/
        _jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600", children: "Main Menu" }) }
      ),
      navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (/*#__PURE__*/
          _jsxs(Link, { to: item.href,
            onClick: () => setMobileOpen(false),
            className: `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative group ${
            isActive ?
            "text-primary bg-primary/5" :
            "text-gray-400 hover:text-white hover:bg-white/5"}`, children: [/*#__PURE__*/


            _jsx(item.icon, { className: `h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-gray-500 group-hover:text-white"}` }),
            item.label,
            isActive && /*#__PURE__*/
            _jsx(motion.div, {
              layoutId: "sidebar-active",
              className: "absolute left-0 w-1 h-6 bg-primary rounded-r-full" }
            )] }, item.href

          ));

      })] }
    ), /*#__PURE__*/


    _jsx("div", { className: "p-4 mt-auto", children: /*#__PURE__*/
      _jsxs("div", { className: "relative", children: [/*#__PURE__*/
        _jsxs("button", {
          onClick: () => setUserMenuOpen(!userMenuOpen),
          className: "flex items-center gap-3 w-full p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group", children: [/*#__PURE__*/

          _jsxs("div", { className: "relative", children: [/*#__PURE__*/
            _jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 overflow-hidden", children:
              session?.user?.image ? /*#__PURE__*/
              _jsx("img", { src: session.user.image, alt: session.user.name || "User", className: "w-full h-full object-cover" }) : /*#__PURE__*/

              _jsx(User, { className: "h-5 w-5 text-primary" }) }

            ), /*#__PURE__*/
            _jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#050505] shadow-lg shadow-green-500/20" })] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "flex-1 text-left overflow-hidden", children: [/*#__PURE__*/
            _jsx("p", { className: "text-sm font-bold text-white truncate", children: session?.user?.name || "Student User" }), /*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-1", children: [/*#__PURE__*/
              _jsx(Sparkles, { className: "w-3 h-3 text-primary" }), /*#__PURE__*/
              _jsx("span", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Premium Plan" })] }
            )] }
          ), /*#__PURE__*/
          _jsx(ChevronDown, { className: `h-4 w-4 text-gray-500 transition-transform duration-300 ${userMenuOpen ? "rotate-180 text-white" : ""}` })] }
        ), /*#__PURE__*/

        _jsx(AnimatePresence, { children:
          userMenuOpen && /*#__PURE__*/
          _jsxs(motion.div, {
            initial: { opacity: 0, y: 10, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 10, scale: 0.95 },
            className: "absolute bottom-full left-0 right-0 mb-4 p-2 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl z-50 backdrop-blur-xl", children: [/*#__PURE__*/

            _jsxs("div", { className: "p-3 border-b border-white/5 mb-2", children: [/*#__PURE__*/
              _jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1", children: "Signed in as" }), /*#__PURE__*/
              _jsx("p", { className: "text-xs font-bold text-white truncate", children: session?.user?.email || "guest@laarainnovations.com" })] }
            ), /*#__PURE__*/
            _jsxs(Link, { to: "/edutech/profile",
              className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all", children: [/*#__PURE__*/

              _jsx(User, { className: "h-4 w-4" }), "Account Settings"] }

            ), /*#__PURE__*/
            _jsxs(Link, { to: "/edutech/help",
              className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all", children: [/*#__PURE__*/

              _jsx(HelpCircle, { className: "h-4 w-4" }), "Support Center"] }

            ), /*#__PURE__*/
            _jsx("div", { className: "h-px bg-white/5 my-2" }), /*#__PURE__*/
            _jsxs("button", {
              onClick: () => signOut(),
              className: "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all", children: [/*#__PURE__*/

              _jsx(LogOut, { className: "h-4 w-4" }), "Sign Out"] }

            )] }
          ) }

        )] }
      ) }
    )] }
  );


  return (/*#__PURE__*/
    _jsxs(_Fragment, { children: [/*#__PURE__*/

      _jsx("button", {
        onClick: () => setMobileOpen(true),
        className: "fixed top-6 left-6 z-50 lg:hidden p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-lg shadow-black/50", children: /*#__PURE__*/

        _jsx(Menu, { className: "h-6 w-6 text-white" }) }
      ), /*#__PURE__*/


      _jsx("aside", { className: "hidden lg:flex fixed left-0 top-0 bottom-0 w-80 flex-col z-40", children: /*#__PURE__*/
        _jsx(SidebarContent, {}) }
      ), /*#__PURE__*/


      _jsx(AnimatePresence, { children:
        mobileOpen && /*#__PURE__*/
        _jsxs(_Fragment, { children: [/*#__PURE__*/
          _jsx(motion.div, {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: () => setMobileOpen(false),
            className: "fixed inset-0 z-[60] bg-black/80 backdrop-blur-md lg:hidden" }
          ), /*#__PURE__*/
          _jsxs(motion.aside, {
            initial: { x: -320 },
            animate: { x: 0 },
            exit: { x: -320 },
            transition: { type: "spring", damping: 30, stiffness: 300 },
            className: "fixed left-0 top-0 bottom-0 z-[70] w-80 lg:hidden", children: [/*#__PURE__*/

            _jsx("button", {
              onClick: () => setMobileOpen(false),
              className: "absolute top-6 right-[-60px] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white", children: /*#__PURE__*/

              _jsx(X, { className: "h-6 w-6" }) }
            ), /*#__PURE__*/
            _jsx(SidebarContent, {})] }
          )] }
        ) }

      )] }
    ));

}