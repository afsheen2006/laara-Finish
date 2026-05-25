import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, User, Mail, Building2, MessageSquare, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { useSession } from "@/lib/auth-store";
import { useNavigate } from "react-router-dom";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function ContactForm() {
  const { status } = useSession();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "authenticated") {
      toast.error("You must be signed in to submit an enquiry.");
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message")
    };

    try {
      const response = await apiClient.post("/leads", data);
      if (response.data?.success) {
        setIsSubmitted(true);
        toast.success("Inquiry received successfully!");
        formRef.current?.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Failed to submit inquiry");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-card border border-border p-8 lg:p-10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-tr-full blur-3xl pointer-events-none" />

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 border border-primary/30 shadow-[0_0_30px_rgba(0,224,170,0.2)]">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3 font-mono">Message Received!</h3>
          <p className="text-muted-foreground text-lg">We'll get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-muted-foreground ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  placeholder="John Doe"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-muted-foreground ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-gray-500'}`} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  placeholder="john@example.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-muted-foreground ml-1">Company (Optional)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building2 className={`h-5 w-5 transition-colors ${focusedField === 'company' ? 'text-primary' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                placeholder="Your Company Ltd."
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-muted-foreground ml-1">Project Details</label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                <MessageSquare className={`h-5 w-5 transition-colors ${focusedField === 'message' ? 'text-primary' : 'text-gray-500'}`} />
              </div>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 resize-none"
                placeholder="Tell us about your project goals and requirements..."
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,168,128,0.2)] gap-3 hover:-translate-y-1"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              {loading ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to our privacy policy. We'll never share your data.
            </p>
          </div>
        </form>
      )}

      {status !== "authenticated" && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[6px] flex flex-col items-center justify-center z-20 p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md space-y-6 flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(0,224,170,0.1)] mb-2">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-mono">Sign In Required</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You must be signed in to submit a message enquiry. Please sign in to contact our team.
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-primary text-black font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-8 py-5 transition-all hover:scale-105"
            >
              Sign In to Continue
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}