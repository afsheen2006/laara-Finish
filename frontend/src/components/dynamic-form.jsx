
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const submitForm = async (...args) => { console.log("Stub called: submitForm", args); return {}; };import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function DynamicForm({ formBlock }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const content = JSON.parse(formBlock.content);
  const fields = content.fields || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {};
    fields.forEach((field) => {
      data[field.label] = formData.get(field.id);
    });

    try {
      const result = await submitForm(formBlock.id, formBlock.title, data);
      if (result.error) {
        toast.error(result.error);
      } else {
        setIsSubmitted(true);
        toast.success("Response submitted successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (/*#__PURE__*/
      _jsxs(motion.div, {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-12 glass-card rounded-3xl border border-green-500/20", children: [/*#__PURE__*/

        _jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4 text-green-400", children: /*#__PURE__*/
          _jsx(CheckCircle2, { className: "h-8 w-8" }) }
        ), /*#__PURE__*/
        _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Thank You!" }), /*#__PURE__*/
        _jsx("p", { className: "text-gray-400", children: "Your information has been received." }), /*#__PURE__*/
        _jsx(Button, {
          variant: "link",
          onClick: () => setIsSubmitted(false),
          className: "text-primary mt-4", children:
          "Send another response" }

        )] }
      ));

  }

  return (/*#__PURE__*/
    _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 glass-card p-8 rounded-3xl border border-white/10", children: [/*#__PURE__*/
      _jsxs("div", { className: "space-y-2 mb-8", children: [/*#__PURE__*/
        _jsx("h3", { className: "text-2xl font-bold text-white", children: formBlock.title }), /*#__PURE__*/
        _jsx("p", { className: "text-sm text-gray-500", children: "Please fill out the form below." })] }
      ), /*#__PURE__*/

      _jsx("div", { className: "space-y-4", children:
        fields.map((field) => /*#__PURE__*/
        _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
          _jsxs("label", { className: "text-xs font-bold uppercase tracking-widest text-gray-500 ml-1", children: [
            field.label, " ", field.required && /*#__PURE__*/_jsx("span", { className: "text-red-500", children: "*" })] }
          ),
          field.type === "textarea" ? /*#__PURE__*/
          _jsx("textarea", {
            name: field.id,
            required: field.required,
            className: "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none min-h-[120px] transition-all",
            placeholder: `Enter your ${field.label.toLowerCase()}` }
          ) : /*#__PURE__*/

          _jsx("input", {
            type: field.type,
            name: field.id,
            required: field.required,
            className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all",
            placeholder: `Enter your ${field.label.toLowerCase()}` }
          )] }, field.id

        )
        ) }
      ), /*#__PURE__*/

      _jsxs(Button, {
        type: "submit",
        disabled: loading,
        className: "w-full h-12 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all", children: [

        loading ? /*#__PURE__*/_jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /*#__PURE__*/_jsx(Send, { className: "w-5 h-5 mr-2" }),
        loading ? "Submitting..." : "Submit Response"] }
      )] }
    ));

}