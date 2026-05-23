
import { useState, useEffect } from "react";
import { Save, Globe, Link as LinkIcon } from "lucide-react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const updateBlock = async (id, data) => {
  const response = await apiClient.put(`/cms/blocks/${id}`, data);
  return response.data;
};

export function SystemEditor({ configBlock, navBlock, onSave }) {
  const [config, setConfig] = useState(() => {
    try {
      return JSON.parse(configBlock?.content || "{}");
    } catch (e) {
      return {};
    }
  });
  const [nav, setNav] = useState(() => {
    try {
      return JSON.parse(navBlock?.content || "[]");
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (configBlock?.content) {
      try {
        setConfig(JSON.parse(configBlock.content));
      } catch (e) {
        console.error("Failed to parse configBlock.content:", e);
      }
    }
  }, [configBlock]);

  useEffect(() => {
    if (navBlock?.content) {
      try {
        setNav(JSON.parse(navBlock.content));
      } catch (e) {
        console.error("Failed to parse navBlock.content:", e);
      }
    }
  }, [navBlock]);

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      await updateBlock(configBlock.id || configBlock._id, { content: JSON.stringify(config) });
      toast.success("System configuration updated");
      if (onSave) onSave();
    } catch (e) {
      toast.error("Failed to update config");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNav = async () => {
    setLoading(true);
    try {
      await updateBlock(navBlock.id || navBlock._id, { content: JSON.stringify(nav) });
      toast.success("Navigation links updated");
      if (onSave) onSave();
    } catch (e) {
      toast.error("Failed to update navigation");
    } finally {
      setLoading(false);
    }
  };

  const addNavLink = () => {
    setNav([...nav, { href: "/", label: "New Link" }]);
  };

  const removeNavLink = (index) => {
    setNav(nav.filter((_, i) => i !== index));
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-12", children: [/*#__PURE__*/
 
      _jsxs("section", { className: "glass-card rounded-3xl p-8 border border-white/5", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center justify-between mb-8", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children: /*#__PURE__*/
              _jsx(Globe, { className: "w-5 h-5" }) }
            ), /*#__PURE__*/
            _jsx("h3", { className: "text-xl font-bold", children: "Site Identity" })] }
          ), /*#__PURE__*/
          _jsxs("button", {
            onClick: handleSaveConfig,
            disabled: loading,
            className: "flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-all disabled:opacity-50", children: [/*#__PURE__*/
 
            _jsx(Save, { className: "w-4 h-4" }), "Save Changes"] }
 
          )] }
        ), /*#__PURE__*/
 
        _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/
          _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Site Name" }), /*#__PURE__*/
            _jsx("input", {
              value: config.siteName,
              onChange: (e) => setConfig({ ...config, siteName: e.target.value }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Support Email" }), /*#__PURE__*/
            _jsx("input", {
              value: config.contactEmail,
              onChange: (e) => setConfig({ ...config, contactEmail: e.target.value }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Client Count Limit" }), /*#__PURE__*/
            _jsx("input", {
              type: "number",
              value: config.clientCountLimit || "",
              onChange: (e) => setConfig({ ...config, clientCountLimit: parseInt(e.target.value, 10) || 0 }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Years of Experience" }), /*#__PURE__*/
            _jsx("input", {
              type: "number",
              value: config.yearsOfExperience || "",
              onChange: (e) => setConfig({ ...config, yearsOfExperience: parseInt(e.target.value, 10) || 0 }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "md:col-span-2 space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Logo URL" }), /*#__PURE__*/
            _jsx("input", {
              value: config.siteLogo,
              onChange: (e) => setConfig({ ...config, siteLogo: e.target.value }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "md:col-span-2 space-y-2", children: [/*#__PURE__*/
            _jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest", children: "Admin Emails (comma-separated)" }), /*#__PURE__*/
            _jsx("textarea", {
              rows: 3,
              value: config.adminEmails || "",
              onChange: (e) => setConfig({ ...config, adminEmails: e.target.value }),
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none resize-y" }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs("section", { className: "glass-card rounded-3xl p-8 border border-white/5", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center justify-between mb-8", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsx("div", { className: "p-2 rounded-xl bg-secondary/10 text-secondary", children: /*#__PURE__*/
              _jsx(LinkIcon, { className: "w-5 h-5" }) }
            ), /*#__PURE__*/
            _jsx("h3", { className: "text-xl font-bold", children: "Primary Navigation" })] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
            _jsx("button", {
              onClick: addNavLink,
              className: "px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all", children:
              "Add Link" }

            ), /*#__PURE__*/
            _jsxs("button", {
              onClick: handleSaveNav,
              disabled: loading,
              className: "flex items-center gap-2 px-6 py-2 rounded-xl bg-secondary text-black font-bold hover:scale-105 transition-all disabled:opacity-50", children: [/*#__PURE__*/

              _jsx(Save, { className: "w-4 h-4" }), "Save Links"] }

            )] }
          )] }
        ), /*#__PURE__*/

        _jsx("div", { className: "space-y-4", children:
          nav.map((link, index) => /*#__PURE__*/
          _jsxs("div", { className: "flex gap-4 items-end", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex-1 space-y-1", children: [/*#__PURE__*/
              _jsx("label", { className: "text-[10px] font-bold text-gray-500", children: "Label" }), /*#__PURE__*/
              _jsx("input", {
                value: link.label,
                onChange: (e) => {
                  const newNav = [...nav];
                  newNav[index].label = e.target.value;
                  setNav(newNav);
                },
                className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" }
              )] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "flex-1 space-y-1", children: [/*#__PURE__*/
              _jsx("label", { className: "text-[10px] font-bold text-gray-500", children: "HREF / Slug" }), /*#__PURE__*/
              _jsx("input", {
                value: link.href,
                onChange: (e) => {
                  const newNav = [...nav];
                  newNav[index].href = e.target.value;
                  setNav(newNav);
                },
                className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" }
              )] }
            ), /*#__PURE__*/
            _jsx("button", {
              onClick: () => removeNavLink(index),
              className: "p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all mb-1", children: /*#__PURE__*/

              _jsx(Save, { className: "w-4 h-4 rotate-45" }) }
            )] }, index
          )
          ) }
        )] }
      )] }
    ));

}