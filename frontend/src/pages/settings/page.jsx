import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { User, Bell, Shield, Palette } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function SettingsPage() {
  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [/*#__PURE__*/
      _jsx(Navigation, {}), /*#__PURE__*/
      _jsxs("div", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto", children: [/*#__PURE__*/
        _jsx("h1", { className: "text-4xl font-bold mb-8 text-glow", children: "Settings" }), /*#__PURE__*/

        _jsxs("div", { className: "space-y-6", children: [/*#__PURE__*/
          _jsx(SettingsSection, {
            icon: /*#__PURE__*/_jsx(User, {}),
            title: "Profile Information",
            description: "Manage your account details and public profile." }
          ), /*#__PURE__*/
          _jsx(SettingsSection, {
            icon: /*#__PURE__*/_jsx(Bell, {}),
            title: "Notifications",
            description: "Configure how you receive alerts and updates." }
          ), /*#__PURE__*/
          _jsx(SettingsSection, {
            icon: /*#__PURE__*/_jsx(Shield, {}),
            title: "Security",
            description: "Update your password and security preferences." }
          ), /*#__PURE__*/
          _jsx(SettingsSection, {
            icon: /*#__PURE__*/_jsx(Palette, {}),
            title: "Appearance",
            description: "Customize the look and feel of your dashboard." }
          )] }
        )] }
      ), /*#__PURE__*/
      _jsx(Footer, {})] }
    ));

}

function SettingsSection({ icon, title, description }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex items-start gap-6", children: [/*#__PURE__*/
      _jsx("div", { className: "p-3 rounded-xl bg-primary/10 text-primary", children:
        icon }
      ), /*#__PURE__*/
      _jsxs("div", { className: "flex-1", children: [/*#__PURE__*/
        _jsx("h3", { className: "text-lg font-bold", children: title }), /*#__PURE__*/
        _jsx("p", { className: "text-muted-foreground text-sm", children: description })] }
      ), /*#__PURE__*/
      _jsx("button", { className: "px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all", children: "Edit" }

      )] }
    ));

}