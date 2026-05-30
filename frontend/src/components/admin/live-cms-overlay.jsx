import React, { useState } from "react";
import { Edit3, Save, X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * LiveCMSOverlay provides a floating "Edit Section" button (only visible to admins)
 * and an overlay modal to edit the content.
 */
export function LiveCMSOverlay({
  blockType,
  blockTitle,
  initialContent,
  blockId,
  fields,
  onSave,
  buttonLabel = "Edit Content",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialContent || {});
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploadingField(key);
    try {
      const response = await apiClient.post("/cms/upload", uploadData, {
        headers: {
          "Content-Type": undefined, // Let Axios auto-generate boundary
        },
      });

      if (response.data?.success) {
        const fileUrl = response.data.url; // `/uploads/filename`
        handleInputChange(key, fileUrl);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload file");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // 1. If blockId is null/missing, we first POST to create it, otherwise PUT to update it.
      let response;
      if (!blockId) {
        response = await apiClient.post("/cms/blocks", {
          type: blockType,
          title: blockTitle || `${blockType} Content`,
          content: JSON.stringify(formData),
          order: 99,
          isActive: true,
        });
      } else {
        response = await apiClient.put(`/cms/blocks/${blockId}`, {
          content: JSON.stringify(formData),
        });
      }

      if (response.data?.success) {
        toast.success("Content saved successfully!");
        setIsOpen(false);
        if (onSave) {
          onSave(response.data.block);
        }
      } else {
        toast.error("Failed to save changes");
      }
    } catch (error) {
      console.error("CMS save error:", error);
      toast.error(error.message || "Failed to save block");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Edit Button Overlay (Absolute positioned relative to container) */}
      <div className="absolute top-4 right-4 z-40 pointer-events-auto">
        <Button
          size="sm"
          onClick={() => {
            setFormData(initialContent || {});
            setIsOpen(true);
          }}
          className="bg-primary/95 text-black hover:bg-primary border border-primary/20 hover:scale-105 active:scale-95 transition-all shadow-lg rounded-full font-bold flex items-center gap-1.5 px-4"
        >
          <Edit3 className="w-3.5 h-3.5" />
          {buttonLabel}
        </Button>
      </div>

      {/* Editor Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-primary" />
                    Edit {blockTitle || blockType}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Direct live editing of text and image content.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors text-muted-foreground hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Fields */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                      <span>{field.label}</span>
                      {field.type === "image" && (
                        <span className="text-[10px] text-primary lowercase font-normal">
                          Saved locally to public/uploads
                        </span>
                      )}
                    </label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        value={formData[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                        placeholder={field.placeholder}
                      />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        rows={4}
                        value={formData[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors resize-y"
                        placeholder={field.placeholder}
                      />
                    )}

                    {field.type === "number" && (
                      <input
                        type="number"
                        value={formData[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleInputChange(field.key, parseInt(e.target.value, 10) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                        placeholder={field.placeholder}
                      />
                    )}

                    {field.type === "image" && (
                      <div className="space-y-4">
                        {/* File preview and input row */}
                        <div className="flex gap-4 items-center">
                          <div className="relative w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center text-muted-foreground flex-shrink-0">
                            {formData[field.key] ? (
                              <img
                                src={formData[field.key]}
                                alt="Preview"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6" />
                            )}
                          </div>

                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={formData[field.key] ?? field.defaultValue ?? ""}
                              onChange={(e) => handleInputChange(field.key, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                              placeholder="Image Path or URL (e.g. /uploads/...)"
                            />
                          </div>
                        </div>

                        {/* File selector input */}
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, field.key)}
                            className="hidden"
                            id={`file-upload-${field.key}`}
                            disabled={uploadingField === field.key}
                          />
                          <label
                            htmlFor={`file-upload-${field.key}`}
                            className="flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-primary/50 bg-white/5 hover:bg-white/10 rounded-xl p-4 cursor-pointer transition-all text-sm font-semibold"
                          >
                            {uploadingField === field.key ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                <span className="text-muted-foreground">Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 text-primary" />
                                <span>Choose Local Image File</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-border/40 bg-white/2 flex gap-4 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/5 font-bold rounded-xl text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-primary text-black font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 rounded-xl px-6 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
