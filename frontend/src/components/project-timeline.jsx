import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Clock, ArrowRight, Plus, Trash2, Edit3, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ConfirmationModal } from "./admin/confirmation-modal";

export function ProjectTimeline({ milestones = [], isAdmin = false, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editingMilestone, setEditingMilestone] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);

  const openAddModal = () => {
    setEditingMilestone(null);
    setTitle("");
    setDescription("");
    setStatus("upcoming");
    setDate("Q1 2026");
    setProgress(0);
    setIsModalOpen(true);
  };

  const openEditModal = (milestone) => {
    setEditingMilestone(milestone);
    setTitle(milestone.title || "");
    setDescription(milestone.description || "");
    setStatus(milestone.status || "upcoming");
    setDate(milestone.date || "");
    setProgress(milestone.progress || 0);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = (id) => {
    const updated = milestones.filter((m) => m.id !== id);
    if (onSave) onSave(updated);
  };

  const handleSave = () => {
    if (!title) {
      toast.error("Milestone title is required");
      return;
    }

    const milestoneData = {
      id: editingMilestone ? editingMilestone.id : Math.random().toString(36).substr(2, 9),
      title,
      description,
      status,
      date,
      progress: status === "in-progress" ? progress : status === "completed" ? 100 : 0
    };

    let updatedMilestones;
    if (editingMilestone) {
      updatedMilestones = milestones.map((m) => (m.id === editingMilestone.id ? milestoneData : m));
    } else {
      updatedMilestones = [...milestones, milestoneData];
    }

    if (onSave) {
      onSave(updatedMilestones);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative">
      {isAdmin && (
        <div className="flex justify-center mb-8">
          <Button onClick={openAddModal} className="bg-primary text-black font-bold hover:bg-primary/95 flex items-center gap-1.5 rounded-full px-6 shadow-lg shadow-primary/10">
            <Plus className="h-4 w-4" /> Add Project Milestone
          </Button>
        </div>
      )}

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-6 min-w-max px-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0 w-64 group"
            >
              {index < milestones.length - 1 && (
                <div className="absolute top-6 left-[calc(100%+8px)] w-4 h-0.5 bg-border">
                  <ArrowRight className="absolute -right-2 -top-1.5 h-4 w-4 text-border" />
                </div>
              )}

              <div
                className={`relative p-5 rounded-xl border transition-smooth h-full flex flex-col ${
                  milestone.status === "in-progress"
                    ? "bg-primary/10 border-primary glow-primary"
                    : milestone.status === "completed"
                    ? "bg-card border-border"
                    : "bg-card/50 border-border/50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : milestone.status === "in-progress"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.date}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    ) : milestone.status === "in-progress" ? (
                      <Clock className="h-5 w-5 text-primary animate-pulse flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </div>

                <h4
                  className={`text-sm font-semibold mb-2 ${
                    milestone.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {milestone.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {milestone.description}
                </p>

                {milestone.status === "in-progress" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">{milestone.progress || 67}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${milestone.progress || 67}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {isAdmin && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-blue-400 hover:bg-white/5"
                      onClick={() => openEditModal(milestone)}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDelete(milestone.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {milestones.length === 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm italic w-full">
              No milestones defined.
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />

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
              className="relative w-full max-w-md bg-card border border-border/80 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary animate-pulse" />
                  {editingMilestone ? "Edit Milestone" : "Add Milestone"}
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
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Milestone Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Concept Development"
                    className="bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the research milestone objectives"
                    rows={3}
                    className="bg-white/5 border-white/10 text-white rounded-xl resize-y"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Date</label>
                    <Input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. Q4 2026"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-primary outline-none text-white h-10"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>

                {status === "in-progress" && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      Progress Percentage ({progress}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(parseInt(e.target.value, 10))}
                      className="w-full accent-primary bg-white/10 rounded-lg h-2"
                    />
                  </div>
                )}
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
        title="Delete Milestone"
        message="Are you sure you want to delete this project milestone? This action cannot be undone."
      />
    </div>
  );
}