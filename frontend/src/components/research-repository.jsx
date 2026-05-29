import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Download, ChevronRight, Filter, Plus, Trash2, Edit3, X, Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ConfirmationModal } from "./admin/confirmation-modal";

const categories = ["All", "Aerodynamics", "Materials", "Acoustics", "Performance", "Manufacturing"];
const paperTypes = ["Whitepaper", "Technical Spec", "Research Paper", "Benchmark Report"];

export function ResearchRepository({ papers = [], isAdmin = false, onSave }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Whitepaper");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Aerodynamics");
  const [size, setSize] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = paper.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || paper.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingPaper(null);
    setTitle("");
    setType("Whitepaper");
    setDate(new Date().toISOString().substring(0, 7)); // e.g. "2026-05"
    setCategory("Aerodynamics");
    setSize("");
    setFileUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (paper) => {
    setEditingPaper(paper);
    setTitle(paper.title || "");
    setType(paper.type || "Whitepaper");
    setDate(paper.date || "");
    setCategory(paper.category || "Aerodynamics");
    setSize(paper.size || "");
    setFileUrl(paper.fileUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = (id) => {
    const updated = papers.filter((p) => p.id !== id);
    if (onSave) onSave(updated);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await apiClient.post("/cms/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success) {
        setFileUrl(response.data.url);
        // Automatically compute size
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        setSize(`${sizeMB} MB`);
        toast.success("Research paper uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!title) {
      toast.error("Paper title is required");
      return;
    }

    const paperData = {
      id: editingPaper ? editingPaper.id : Math.random().toString(36).substr(2, 9),
      title,
      type,
      date,
      category,
      size: size || "N/A",
      fileUrl,
    };

    let updatedPapers;
    if (editingPaper) {
      updatedPapers = papers.map((p) => (p.id === editingPaper.id ? paperData : p));
    } else {
      updatedPapers = [...papers, paperData];
    }

    if (onSave) {
      onSave(updatedPapers);
      setIsModalOpen(false);
    }
  };

  const handleDownload = (paper) => {
    if (paper.fileUrl) {
      const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace("5000", "5001");
      const fullUrl = paper.fileUrl.startsWith("/") ? `${API_URL}${paper.fileUrl}` : paper.fileUrl;
      window.open(fullUrl, "_blank");
    } else {
      toast.info("No file uploaded for this paper. This is a reference entry.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Research Repository</h3>
        <div className="flex gap-2">
          {isAdmin && (
            <Button onClick={openAddModal} size="sm" className="bg-primary text-black font-bold hover:bg-primary/95 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Paper
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search papers and specifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div onClick={() => handleDownload(paper)} className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div onClick={() => handleDownload(paper)} className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                    {paper.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{paper.type}</span>
                    <span className="text-xs text-muted-foreground">{paper.date}</span>
                    <span className="text-xs text-muted-foreground">{paper.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white/5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => { e.stopPropagation(); openEditModal(paper); }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => { e.stopPropagation(); handleDelete(paper.id); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); handleDownload(paper); }}>
                    <Download className="h-4 w-4 text-muted-foreground hover:text-white" />
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
          {filteredPapers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm italic">
              No matching research papers found.
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{papers.length}</p>
          <p className="text-xs text-muted-foreground">Documents</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground">Active Projects</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">3</p>
          <p className="text-xs text-muted-foreground">Patents Filed</p>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {editingPaper ? "Edit Research Paper" : "Add Research Paper"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Paper Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Aerodynamic Design Optimization"
                    className="bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Document Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-primary outline-none text-white h-10"
                    >
                      {paperTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-primary outline-none text-white h-10"
                    >
                      {categories.filter(c => c !== "All").map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Publish Date (YYYY-MM)</label>
                    <Input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. 2026-05"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">File Size</label>
                    <Input
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="e.g. 2.4 MB (Auto-filled on upload)"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Paper File PDF/Doc</label>
                  <div className="flex gap-3 items-center">
                    <Input
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="Select a file to upload or enter a link"
                      className="bg-white/5 border-white/10 text-xs text-white rounded-xl flex-1"
                    />
                    <input
                      type="file"
                      id="paper-file-upload"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="paper-file-upload"
                      className="cursor-pointer bg-primary text-black font-semibold h-10 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs hover:bg-primary/90 transition-all flex-shrink-0"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-3 justify-end mt-4">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="hover:bg-white/5 text-white rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary text-black font-bold hover:bg-primary/90 rounded-xl px-6">
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => executeDelete(confirmDeleteId)}
        title="Delete Research Paper"
        message="Are you sure you want to delete this research paper? This action cannot be undone."
      />
    </div>
  );
}