
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

import apiClient from "@/lib/api-client";
import { toast } from "sonner";import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post("/leads", {
        name: formData.name,
        email: formData.email,
        message: `[Mobile: ${formData.mobile}] ${formData.message}`
      });

      if (response.data?.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", mobile: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (/*#__PURE__*/
    _jsx("section", { id: "contact", className: "relative py-20 border-t border-border/50", children: /*#__PURE__*/
      _jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /*#__PURE__*/
        _jsxs(motion.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 }, children: [/*#__PURE__*/

          _jsx("h2", { className: "text-2xl font-bold text-foreground mb-10 text-center", children: "Contact us" }), /*#__PURE__*/

          _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 items-center", children: [/*#__PURE__*/

            _jsx("div", { className: "flex justify-center md:justify-start", children: /*#__PURE__*/
              _jsx(motion.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                className: "relative w-40 h-40", children: /*#__PURE__*/

                _jsx("img", {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg",
                  alt: "Laara Innovations",
                  className: "object-contain w-full h-full" }
                ) }
              ) }
            ), /*#__PURE__*/


            _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [/*#__PURE__*/
              _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [/*#__PURE__*/
                _jsx(Input, {
                  type: "text",
                  name: "name",
                  placeholder: "Name",
                  value: formData.name,
                  onChange: handleChange,
                  className: "bg-card border-border focus:border-primary",
                  required: true }
                ), /*#__PURE__*/
                _jsx(Input, {
                  type: "tel",
                  name: "mobile",
                  placeholder: "Mobile",
                  value: formData.mobile,
                  onChange: handleChange,
                  className: "bg-card border-border focus:border-primary",
                  required: true }
                )] }
              ), /*#__PURE__*/

              _jsx(Input, {
                type: "email",
                name: "email",
                placeholder: "E-mail",
                value: formData.email,
                onChange: handleChange,
                className: "bg-card border-border focus:border-primary",
                required: true }
              ), /*#__PURE__*/

              _jsx("textarea", {
                name: "message",
                placeholder: "Message",
                value: formData.message,
                onChange: handleChange,
                rows: 4,
                className: "w-full px-3 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none",
                required: true }
              ), /*#__PURE__*/

              _jsx(Button, {
                type: "submit",
                disabled: loading,
                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2", children:

                loading ? "Sending..." : /*#__PURE__*/
                _jsxs(_Fragment, { children: [/*#__PURE__*/
                  _jsx(Send, { className: "w-4 h-4" }), "Send msg"] }

                ) }

              )] }
            )] }
          )] }
        ) }
      ) }
    ));

}