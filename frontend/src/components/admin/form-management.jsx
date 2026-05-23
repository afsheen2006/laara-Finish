
import { useState } from "react";
import {
  Plus, Trash2, Save, Eye, ClipboardList,
  ChevronRight, Layout } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
const createForm = async (...args) => { console.log("Stub called: createForm", args); return {}; };
import { motion, AnimatePresence } from "framer-motion";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function FormManagement({ forms, submissions }) {
  const [isCreating, setIsCreating] = useState(false);
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([
  { id: "1", label: "Full Name", type: "text", required: true },
  { id: "2", label: "Email Address", type: "email", required: true }]
  );

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), label: "New Field", type: "text", required: false }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id, updates) => {
    setFields(fields.map((f) => f.id === id ? { ...f, ...updates } : f));
  };

  const handleCreateForm = async () => {
    if (!formName) {
      toast.error("Please enter a form name");
      return;
    }
    const result = await createForm(formName, fields);
    if (result.success) {
      toast.success("Form created successfully!");
      setIsCreating(false);
      setFormName("");
      setFields([{ id: "1", label: "Full Name", type: "text", required: true }]);
    } else {
      toast.error("Failed to create form");
    }
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
        _jsx("h2", { className: "text-2xl font-bold", children: "Forms & Submissions" }), /*#__PURE__*/
        _jsxs(Button, {
          onClick: () => setIsCreating(!isCreating),
          className: "bg-primary text-black font-bold gap-2", children: [

          isCreating ? /*#__PURE__*/_jsx(ChevronRight, { className: "rotate-180" }) : /*#__PURE__*/_jsx(Plus, { className: "w-4 h-4" }),
          isCreating ? "Back to List" : "Create New Form"] }
        )] }
      ), /*#__PURE__*/

      _jsx(AnimatePresence, { mode: "wait", children:
        isCreating ? /*#__PURE__*/
        _jsx(motion.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          className: "glass-card p-8 rounded-3xl border border-white/10", children: /*#__PURE__*/

          _jsxs("div", { className: "max-w-2xl space-y-8", children: [/*#__PURE__*/
            _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
              _jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-gray-500", children: "Form Configuration" }), /*#__PURE__*/
              _jsx(Input, {
                placeholder: "Enter Form Name (e.g., Contact Us, Survey 2026)",
                value: formName,
                onChange: (e) => setFormName(e.target.value),
                className: "bg-white/5 border-white/10 text-xl h-14" }
              )] }
            ), /*#__PURE__*/

            _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
              _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
                _jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-gray-500", children: "Form Fields" }), /*#__PURE__*/
                _jsxs(Button, { variant: "ghost", onClick: addField, className: "text-primary hover:bg-primary/10 text-xs", children: [/*#__PURE__*/
                  _jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add Field"] }
                )] }
              ), /*#__PURE__*/

              _jsx("div", { className: "space-y-4", children:
                fields.map((field) => /*#__PURE__*/
                _jsxs("div", { className: "flex gap-4 items-start bg-white/[0.02] p-4 rounded-2xl border border-white/5 group", children: [/*#__PURE__*/
                  _jsxs("div", { className: "flex-1 space-y-3", children: [/*#__PURE__*/
                    _jsx(Input, {
                      value: field.label,
                      onChange: (e) => updateField(field.id, { label: e.target.value }),
                      className: "bg-transparent border-white/10 h-10",
                      placeholder: "Field Label" }
                    ), /*#__PURE__*/
                    _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
                      _jsxs("select", {
                        value: field.type,
                        onChange: (e) => updateField(field.id, { type: e.target.value }),
                        className: "flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 text-xs outline-none focus:border-primary", children: [/*#__PURE__*/

                        _jsx("option", { value: "text", children: "Text Input" }), /*#__PURE__*/
                        _jsx("option", { value: "email", children: "Email Input" }), /*#__PURE__*/
                        _jsx("option", { value: "textarea", children: "Text Area" }), /*#__PURE__*/
                        _jsx("option", { value: "number", children: "Number" })] }
                      ), /*#__PURE__*/
                      _jsxs("label", { className: "flex items-center gap-2 text-xs text-gray-400 cursor-pointer", children: [/*#__PURE__*/
                        _jsx("input", {
                          type: "checkbox",
                          checked: field.required,
                          onChange: (e) => updateField(field.id, { required: e.target.checked }),
                          className: "accent-primary" }
                        ), "Required"] }

                      )] }
                    )] }
                  ), /*#__PURE__*/
                  _jsx("button", {
                    onClick: () => removeField(field.id),
                    className: "p-2 text-gray-600 hover:text-red-500 transition-colors", children: /*#__PURE__*/

                    _jsx(Trash2, { className: "w-4 h-4" }) }
                  )] }, field.id
                )
                ) }
              )] }
            ), /*#__PURE__*/

            _jsxs(Button, { onClick: handleCreateForm, className: "w-full h-14 bg-primary text-black font-bold text-lg rounded-2xl shadow-lg shadow-primary/20", children: [/*#__PURE__*/
              _jsx(Save, { className: "w-5 h-5 mr-2" }), "Publish Form"] }

            )] }
          ) }
        ) : /*#__PURE__*/

        _jsxs(motion.div, {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [/*#__PURE__*/


          _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
            _jsxs("h3", { className: "text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2", children: [/*#__PURE__*/
              _jsx(Layout, { className: "w-4 h-4" }), " Active Forms"] }
            ), /*#__PURE__*/
            _jsx("div", { className: "space-y-3", children:
              forms?.map((form) => /*#__PURE__*/
              _jsxs("div", { className: "glass-card p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
                  _jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary", children: /*#__PURE__*/
                    _jsx(ClipboardList, { className: "w-5 h-5" }) }
                  ), /*#__PURE__*/
                  _jsxs("div", { children: [/*#__PURE__*/
                    _jsx("div", { className: "font-bold text-white group-hover:text-primary transition-colors", children: form.title }), /*#__PURE__*/
                    _jsxs("div", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-bold", children: [
                      JSON.parse(form.content).fields.length, " Fields \u2022 Created ", new Date(form.createdAt).toLocaleDateString()] }
                    )] }
                  )] }
                ), /*#__PURE__*/
                _jsx(ChevronRight, { className: "w-4 h-4 text-gray-600 group-hover:text-white" })] }, form.id
              )
              ) }
            )] }
          ), /*#__PURE__*/


          _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
            _jsxs("h3", { className: "text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2", children: [/*#__PURE__*/
              _jsx(Eye, { className: "w-4 h-4" }), " Recent Submissions"] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "glass-card rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden", children: [
              submissions?.map((sub) => /*#__PURE__*/
              _jsxs("div", { className: "p-4 hover:bg-white/[0.02] transition-all", children: [/*#__PURE__*/
                _jsxs("div", { className: "flex items-center justify-between mb-2", children: [/*#__PURE__*/
                  _jsx("span", { className: "text-xs font-bold text-primary", children: sub.formName }), /*#__PURE__*/
                  _jsx("span", { className: "text-[10px] text-gray-500", children: new Date(sub.createdAt).toLocaleString() })] }
                ), /*#__PURE__*/
                _jsx("div", { className: "text-sm text-gray-400 line-clamp-1", children:
                  Object.entries(JSON.parse(sub.data)).map(([key, val]) => `${key}: ${val}`).join(" • ") }
                )] }, sub.id
              )
              ),
              !submissions?.length && /*#__PURE__*/_jsx("div", { className: "p-8 text-center text-gray-500 text-sm italic", children: "No submissions yet" })] }
            )] }
          )] }
        ) }

      )] }
    ));

}