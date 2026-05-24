import { format } from "date-fns";
import {
  Briefcase, GraduationCap, Phone, Mail,
  FileText, Download, Clock, Trash2, CheckCircle2 
} from "lucide-react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModal } from "./confirmation-modal";

export function ApplicationManagement({ applications = [], onRefresh }) {
  const [confirmDeleteApp, setConfirmDeleteApp] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await apiClient.put(`/careers/applications/${id}/status`, { status: newStatus });
      if (response.data?.success) {
        toast.success(`Application marked as ${newStatus.toLowerCase()}`);
        if (onRefresh) onRefresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteApp(id);
  };

  const executeDelete = async (id) => {
    try {
      const response = await apiClient.delete(`/careers/applications/${id}`);
      if (response.data?.success) {
        toast.success("Application rejected and deleted");
        if (onRefresh) onRefresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete application");
    }
  };

  const downloadCSV = () => {
    if (applications.length === 0) {
      toast.info("No applications to export.");
      return;
    }
    const headers = ["Name", "Email", "Mobile", "Qualification", "Role", "Resume", "Status", "Date"];
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const rows = applications.map((a) => [
      a.name || "",
      a.email || "",
      a.mobile || "",
      a.qualification || "",
      a.interestedRole || "",
      a.resumeUrl ? (a.resumeUrl.startsWith("/") ? `${API_URL}${a.resumeUrl}` : a.resumeUrl) : "N/A",
      a.status || "",
      a.createdAt ? format(new Date(a.createdAt), "yyyy-MM-dd") : ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `job_applications_${format(new Date(), "yyyyMMdd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  const getFullCVUrl = (resumeUrl) => {
    if (!resumeUrl) return "#";
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return resumeUrl.startsWith("/") ? `${API_URL}${resumeUrl}` : resumeUrl;
  };

  return (
    <div className="space-y-6">
      <ConfirmationModal
        isOpen={confirmDeleteApp !== null}
        onClose={() => setConfirmDeleteApp(null)}
        onConfirm={() => executeDelete(confirmDeleteApp)}
        title="Reject & Delete Application"
        message="Are you sure you want to reject and delete this job application? This candidate profile and CV link will be permanently removed."
      />
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Job Applications ({applications.length})</h3>
          <p className="text-sm text-gray-500">Track and manage talent acquisition.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs h-9"
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="p-12 text-center glass-card rounded-3xl text-gray-500 border border-white/5 bg-card/25">
            No candidate applications received yet.
          </div>
        ) : (
          applications.map((app) => (
            <div key={app._id || app.id} className="glass-card rounded-3xl p-6 border border-white/5 hover:border-primary/20 transition-all bg-card/30">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      app.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                      app.status === "REVIEWED" ? "bg-secondary/10 text-secondary border-secondary/20" :
                      "bg-primary/10 text-primary border-primary/20"
                    }`}>
                      {app.status || "PENDING"}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {app.createdAt ? format(new Date(app.createdAt), "MMM d, yyyy HH:mm") : "N/A"}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">{app.name}</h4>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        <span>{app.mobile}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Qualification</div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>{app.qualification || "N/A"}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Interested Role</div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-secondary" />
                        <span>{app.interestedRole || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {app.resumeUrl && (
                    <a
                      href={getFullCVUrl(app.resumeUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs hover:text-primary transition-all text-gray-300 font-semibold"
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      <span>View Resume / CV File</span>
                    </a>
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleStatusUpdate(app._id || app.id, "REVIEWED")}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs hover:bg-secondary/20 transition-all border border-white/10"
                  >
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>Mark Reviewed</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app._id || app.id, "HIRED")}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs hover:bg-primary/20 transition-all border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Hired</span>
                  </button>
                  <button
                    onClick={() => handleDelete(app._id || app.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs hover:bg-red-500/20 text-red-400 transition-all border border-white/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Reject / Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}