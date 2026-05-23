
import { useState } from "react";
import {
  Shield, Users, LayoutDashboard, FileText, Activity,
  Bell, Globe, Mail, Settings, ChevronRight, Briefcase, ClipboardList } from
"lucide-react";
import { AdminManagement } from "./admin-management";
import { LeadManagement } from "./lead-management";
import { ApplicationManagement } from "./application-management";
import { ModularCMSManager } from "./modular-cms";
import { SystemEditor } from "./system-editor";
import { EventEditor } from "./event-editor";
import { FormManagement } from "./form-management";
import { format } from "date-fns";
import { Link } from 'react-router-dom';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function AdminLayout({ users, auditLogs, leads, applications, configBlock, navBlock, eventsBlock, forms, submissions, currentUserId, currentUserRole, onUsersRefresh, onBlocksRefresh, onLeadsRefresh, onApplicationsRefresh }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [cmsMode, setCmsMode] = useState("modular");

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: /*#__PURE__*/_jsx(LayoutDashboard, {}) },
    { id: "personnel", label: "Personnel", icon: /*#__PURE__*/_jsx(Users, {}) },
    { id: "queries", label: "Queries", icon: /*#__PURE__*/_jsx(Mail, {}) },
    { id: "applications", label: "Applications", icon: /*#__PURE__*/_jsx(Briefcase, {}) }
  ];


  return (/*#__PURE__*/
    _jsxs("div", { className: "min-h-screen bg-[#020202] text-white flex", children: [/*#__PURE__*/

      _jsxs("aside", { className: "w-72 border-r border-white/5 bg-[#050505] flex flex-col sticky top-0 h-screen p-8", children: [/*#__PURE__*/
        _jsx("div", { className: "flex items-center gap-3 mb-12", children: /*#__PURE__*/
          _jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsx("div", { className: "w-10 h-10 bg-gradient-tech rounded-xl flex items-center justify-center shadow-lg shadow-primary/20", children: /*#__PURE__*/
              _jsx(Shield, { className: "w-6 h-6 text-black" }) }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("div", { className: "font-bold text-xl tracking-tight", children: "Open Portal" }), /*#__PURE__*/
              _jsx("div", { className: "text-[10px] text-primary font-bold uppercase tracking-widest", children: "Master Control" })] }
            )] }
          ) }
        ), /*#__PURE__*/

        _jsxs("nav", { className: "space-y-1.5 flex-1", children: [/*#__PURE__*/
          _jsx("div", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-4", children: "Core Systems" }),
          sidebarLinks.map((link) => /*#__PURE__*/
          _jsxs("button", {

            onClick: () => setActiveTab(link.id),
            className: `w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group ${
            activeTab === link.id ?
            "bg-primary text-black shadow-lg shadow-primary/20" :
            "text-gray-400 hover:text-white hover:bg-white/5"}`, children: [/*#__PURE__*/


            _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsx("span", { className: activeTab === link.id ? "text-black" : "text-gray-500 group-hover:text-primary transition-colors", children:
                link.icon }
              ), /*#__PURE__*/
              _jsx("span", { children: link.label })] }
            ),
            activeTab === link.id && /*#__PURE__*/_jsx(ChevronRight, { className: "w-4 h-4" })] }, link.id
          )
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "mt-auto space-y-4", children: [/*#__PURE__*/
          _jsx("div", { className: "p-4 bg-primary/5 rounded-2xl border border-primary/20", children: /*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30", children: /*#__PURE__*/
                _jsx(Globe, { className: "w-4 h-4 text-primary" }) }
              ), /*#__PURE__*/
              _jsxs("div", { className: "flex-1 min-w-0", children: [/*#__PURE__*/
                _jsx("div", { className: "font-bold text-[11px] truncate", children: "Admin Active" }), /*#__PURE__*/
                _jsx("div", { className: "text-[9px] text-primary uppercase font-bold tracking-tighter", children: "Secure Session" })] }
              )] }
            ) }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs("main", { className: "flex-1 p-12 overflow-y-auto", children: [/*#__PURE__*/
        _jsxs("header", { className: "flex items-center justify-between mb-12", children: [/*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsxs("h1", { className: "text-4xl font-bold tracking-tight text-glow capitalize", children: [
              activeTab, " Management"] }
            ), /*#__PURE__*/
            _jsxs("p", { className: "text-gray-500 mt-1", children: [
              activeTab === "overview" && "High-level metrics and system status.",
              activeTab === "personnel" && "Manage authorized personnel and access roles.",
              activeTab === "queries" && "Review and manage incoming user queries and messages.",
              activeTab === "applications" && "Review job applications and talent submissions."] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          activeTab === "overview" && /*#__PURE__*/
          _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [/*#__PURE__*/
            _jsx(StatCard, { label: "Total Users", value: users.length, change: "+12%", trend: "up" }), /*#__PURE__*/
            _jsx(StatCard, { label: "Total Queries", value: leads.length, change: "+5%", trend: "up" }), /*#__PURE__*/
            _jsx(StatCard, { label: "System Health", value: "100%", change: "Stable", trend: "up" }), /*#__PURE__*/

            _jsxs("div", { className: "md:col-span-3 space-y-6", children: [/*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold", children: "Recent Activity" }), /*#__PURE__*/
              _jsx("div", { className: "glass-card rounded-3xl p-6", children: /*#__PURE__*/
                _jsx("p", { className: "text-gray-500 text-sm", children: "System is performing optimally. No critical alerts detected." }) }
              )] }
            )] }
          ),


          activeTab === "personnel" && /*#__PURE__*/
          _jsx(AdminManagement, {
            users: users,
            currentUserId: currentUserId,
            currentUserRole: currentUserRole,
            onRefresh: onUsersRefresh }
          ),


          activeTab === "queries" && /*#__PURE__*/
          _jsx(LeadManagement, { leads: leads, onRefresh: onLeadsRefresh }),


          activeTab === "applications" && /*#__PURE__*/
          _jsx(ApplicationManagement, { applications: applications, onRefresh: onApplicationsRefresh })] }
        )] }
      )] }
    ));

}

function StatCard({ label, value, change, trend }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "glass-card p-8 rounded-3xl group border border-white/5 hover:border-primary/20 transition-all", children: [/*#__PURE__*/
      _jsx("div", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4", children: label }), /*#__PURE__*/
      _jsxs("div", { className: "flex items-end justify-between", children: [/*#__PURE__*/
        _jsx("div", { className: "text-4xl font-bold text-white group-hover:text-glow transition-all", children: value }), /*#__PURE__*/
        _jsx("div", { className: `text-[10px] font-bold px-3 py-1 rounded-full ${
          trend === "up" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"}`, children:

          change }
        )] }
      )] }
    ));

}