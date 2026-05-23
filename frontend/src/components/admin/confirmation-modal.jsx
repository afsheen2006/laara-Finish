import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Delete", 
  cancelText = "Cancel", 
  variant = "danger" 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card/95 border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto z-10"
          >
            {/* Soft decorative glow */}
            <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
              variant === "danger" ? "bg-red-500/10" : "bg-primary/10"
            }`} />

            <div className="flex items-start gap-4 relative z-10">
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                variant === "danger"
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-primary/10 border-primary/20 text-primary"
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>

              {/* Text details */}
              <div className="space-y-1.5 flex-1 pt-1">
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{message}</p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5 relative z-10">
              <Button
                variant="ghost"
                onClick={onClose}
                className="hover:bg-white/5 text-white rounded-xl"
              >
                {cancelText}
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`font-bold rounded-xl px-5 transition-all ${
                  variant === "danger"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary hover:bg-primary/90 text-black"
                }`}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
