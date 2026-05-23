import { format } from "date-fns";
import {
  Mail, MessageSquare, Building2, Calendar,
  CheckCircle2, Clock, Trash2 
} from "lucide-react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModal } from "./confirmation-modal";

export function LeadManagement({ leads = [], onRefresh }) {
  const [confirmDeleteQuery, setConfirmDeleteQuery] = useState(null);
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await apiClient.put(`/leads/${id}`, { status: newStatus });
      if (response.data?.success) {
        toast.success("Query status updated");
        if (onRefresh) onRefresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteQuery(id);
  };

  const executeDelete = async (id) => {
    try {
      const response = await apiClient.delete(`/leads/${id}`);
      if (response.data?.success) {
        toast.success("Query deleted successfully");
        if (onRefresh) onRefresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete query");
    }
  };

  return (
    <div className="space-y-4">
      <ConfirmationModal
        isOpen={confirmDeleteQuery !== null}
        onClose={() => setConfirmDeleteQuery(null)}
        onConfirm={() => executeDelete(confirmDeleteQuery)}
        title="Delete User Query"
        message="Are you sure you want to permanently delete this user query? This action cannot be undone."
      />
      {leads.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/5">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No user queries or messages received yet.</p>
        </div>
      ) : (
        leads.map((lead) => (
          <div key={lead._id || lead.id} className="glass-card rounded-3xl p-6 hover:border-primary/30 transition-all border border-white/5 bg-card/40">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === "NEW" ? "bg-primary/10 text-primary border border-primary/20" :
                    lead.status === "CONTACTED" ? "bg-secondary/10 text-secondary border border-secondary/20" :
                    "bg-gray-500/10 text-gray-500 border border-white/10"
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lead.createdAt ? format(new Date(lead.createdAt), "MMM d, yyyy HH:mm") : "N/A"}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>{lead.email}</span>
                    </div>
                    {lead.company && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Building2 className="w-3.5 h-3.5 text-secondary" />
                        <span>{lead.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-300 italic whitespace-pre-wrap">
                  "{lead.message}"
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => handleStatusUpdate(lead._id || lead.id, "CONTACTED")}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-secondary/20 hover:text-secondary transition-all"
                >
                  <Clock className="w-4 h-4" />
                  <span>Mark Contacted</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(lead._id || lead.id, "CLOSED")}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-primary/20 hover:text-primary transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Close Inquiry</span>
                </button>
                <button
                  onClick={() => handleDelete(lead._id || lead.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Query</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}