import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { 
  Briefcase, Send, User, Phone, Mail, FileText, Plus, 
  Trash2, Download, Calendar, Clock, X, Loader2, CheckCircle2, Edit3
} from "lucide-react";
import { useSession } from "@/lib/auth-store";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmationModal } from "@/components/admin/confirmation-modal";

export default function CareersPage({ navLinks, config }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "MASTER";

  // Data states
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteJobId, setConfirmDeleteJobId] = useState(null);
  const [confirmDeleteAppId, setConfirmDeleteAppId] = useState(null);

  // Form & modal states for Job Posting (Admin)
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [submittingJob, setSubmittingJob] = useState(false);

  // Form & modal states for Applying (User)
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantMobile, setApplicantMobile] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submittingApplication, setSubmittingApplication] = useState(false);

  // Load all jobs and (if admin) all applications
  const fetchCareers = async () => {
    try {
      const res = await apiClient.get("/careers");
      setCareers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch careers:", err);
      toast.error("Failed to load job listings");
    }
  };

  const fetchApplications = async () => {
    if (!isAdmin) return;
    try {
      const res = await apiClient.get("/careers/applications");
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCareers();
      if (isAdmin) {
        await fetchApplications();
      }
      setLoading(false);
    };
    init();
  }, [isAdmin]);

  // Open modals
  const openAddJobModal = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobDeadline("");
    setJobDescription("");
    setIsAddJobOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobTitle(job.title || "");
    setJobDeadline(job.deadline || "");
    setJobDescription(job.description || "");
    setIsAddJobOpen(true);
  };

  // Admin: Create or Update job listing
  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!jobTitle || !jobDeadline || !jobDescription) {
      toast.error("All fields are required");
      return;
    }
    setSubmittingJob(true);
    try {
      let res;
      if (editingJob) {
        res = await apiClient.put(`/careers/${editingJob._id || editingJob.id}`, {
          title: jobTitle,
          deadline: jobDeadline,
          description: jobDescription
        });
      } else {
        res = await apiClient.post("/careers", {
          title: jobTitle,
          deadline: jobDeadline,
          description: jobDescription
        });
      }
      if (res.data?.success) {
        toast.success(editingJob ? "Job listing updated successfully!" : "Job listing created successfully!");
        setJobTitle("");
        setJobDeadline("");
        setJobDescription("");
        setEditingJob(null);
        setIsAddJobOpen(false);
        fetchCareers();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to save job listing");
    } finally {
      setSubmittingJob(false);
    }
  };

  // Admin: Delete job listing
  const handleDeleteJob = (id) => {
    setConfirmDeleteJobId(id);
  };

  const executeDeleteJob = async (id) => {
    try {
      const res = await apiClient.delete(`/careers/${id}`);
      if (res.data?.success) {
        toast.success("Job listing deleted");
        fetchCareers();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job listing");
    }
  };

  // User: Submit Application
  const handleApply = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantMobile || !selectedFile) {
      toast.error("All fields, including CV upload, are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", applicantName);
    formData.append("email", applicantEmail);
    formData.append("mobile", applicantMobile);
    formData.append("interestedRole", selectedJob.title);
    formData.append("cv", selectedFile);

    setSubmittingApplication(true);
    try {
      const res = await apiClient.post("/careers/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data?.success) {
        toast.success("Application submitted successfully!");
        setApplicantName("");
        setApplicantEmail("");
        setApplicantMobile("");
        setSelectedFile(null);
        setSelectedJob(null);
        if (isAdmin) fetchApplications();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit application");
    } finally {
      setSubmittingApplication(false);
    }
  };

  // Admin: Delete application
  const handleDeleteApplication = (id) => {
    setConfirmDeleteAppId(id);
  };

  const executeDeleteApplication = async (id) => {
    try {
      const res = await apiClient.delete(`/careers/applications/${id}`);
      if (res.data?.success) {
        toast.success("Application deleted");
        fetchApplications();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete application");
    }
  };

  // Admin: Download CV
  const handleDownloadCV = (resumeUrl) => {
    if (!resumeUrl) {
      toast.error("No CV file available for this application.");
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const fullUrl = resumeUrl.startsWith("/") ? `${API_URL}${resumeUrl}` : resumeUrl;
    window.open(fullUrl, "_blank");
  };

  // Admin: Export application list to Google Sheet (CSV format)
  const handleDownloadCSV = () => {
    if (applications.length === 0) {
      toast.info("No candidate applications to download.");
      return;
    }

    const headers = ["Name", "Email", "Mobile", "Interested Role", "Submission Date", "CV Download Url"];
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

    const rows = applications.map((app) => [
      app.name || "",
      app.email || "",
      app.mobile || "",
      app.interestedRole || "",
      app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "",
      app.resumeUrl ? (app.resumeUrl.startsWith("/") ? `${API_URL}${app.resumeUrl}` : app.resumeUrl) : ""
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
    link.setAttribute("download", `job_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Google Sheets (CSV) downloaded successfully!");
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Navigation customLinks={navLinks} config={config} />

      <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Careers Division</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-glow">
            Build the <span className="text-primary">Future</span> With Us
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore our open roles and apply to join a multidisciplinary team developing advanced drone technology, premium software systems, and educational incubators.
          </p>

          {isAdmin && (
            <div className="pt-4 flex justify-center">
              <Button onClick={openAddJobModal} className="bg-primary text-black font-bold hover:bg-primary/90 flex items-center gap-1.5 rounded-full px-6 shadow-lg shadow-primary/10">
                <Plus className="h-4 w-4" /> Add Career Position
              </Button>
            </div>
          )}
        </div>

        {/* Listings Section (List Display) */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold border-b border-border/40 pb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Open Positions</span>
          </h2>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground animate-pulse">Loading open listings...</div>
          ) : careers.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border/45 rounded-3xl space-y-4 shadow-xl">
              <Clock className="w-12 h-12 text-primary mx-auto animate-pulse" />
              <h3 className="text-2xl font-bold text-foreground">Coming Soon!</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                We are currently preparing new career positions. Stay tuned and check back soon to join our innovation division!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  layout
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg transition-smooth flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                        <Calendar className="w-3 h-3" />
                        Deadline: {job.deadline}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {!isAdmin && (
                      <Button
                        onClick={() => setSelectedJob(job)}
                        className="bg-primary text-black font-bold hover:bg-primary/95 rounded-xl px-5"
                      >
                        Apply Now
                      </Button>
                    )}
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditJobModal(job)}
                          className="text-blue-400 hover:bg-blue-400/10 rounded-xl"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteJob(job._id || job.id)}
                          className="text-red-500 hover:bg-red-500/10 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Admin Section: Applications Submissions (Only visible to Admins) */}
        {isAdmin && (
          <div className="space-y-6 max-w-6xl mx-auto pt-8 border-t border-border/40">
            <div className="flex items-center justify-between border-b border-border/40 pb-3 flex-wrap gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <span>Applicant Submissions ({applications.length})</span>
              </h2>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleDownloadCSV}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs gap-1.5 rounded-xl px-4 py-2"
                >
                  <Download className="w-3.5 h-3.5" /> Download Google Sheet (CSV)
                </Button>
                <Button variant="outline" size="sm" onClick={fetchApplications} className="text-xs border-white/10 hover:bg-white/5 h-9 rounded-xl px-4">
                  Refresh Submissions
                </Button>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 bg-card/50 border border-border/20 rounded-3xl text-muted-foreground italic">
                No job applications received yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-border/40 bg-card">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-border/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="p-4">Applicant</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Applied Position</th>
                      <th className="p-4">Date Submissions</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-sm">
                    {applications.map((app) => (
                      <tr key={app._id || app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-foreground">{app.name}</td>
                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{app.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{app.mobile}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                            {app.interestedRole}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleDownloadCV(app.resumeUrl)}
                            className="bg-white/5 hover:bg-white/10 text-xs font-bold gap-1 rounded-lg"
                          >
                            <Download className="w-3 h-3" /> CV
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteApplication(app._id || app.id)}
                            className="text-red-500 hover:bg-red-500/10 rounded-lg p-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin Modal: Create/Edit Job */}
      <AnimatePresence>
        {isAddJobOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddJobOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span>{editingJob ? "Edit Career Listing" : "Create Career Listing"}</span>
                </h3>
                <button onClick={() => setIsAddJobOpen(false)} className="p-1 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Job Title</label>
                  <Input
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Drone Mechanical Engineer"
                    className="bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Application Deadline</label>
                  <Input
                    required
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    placeholder="e.g. 2026-06-30"
                    className="bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                  <Textarea
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Describe the job roles, qualifications, and responsibilities"
                    rows={4}
                    className="bg-white/5 border-white/10 text-white rounded-xl resize-y"
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-3 justify-end mt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsAddJobOpen(false)} className="hover:bg-white/5 text-white rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submittingJob} className="bg-primary text-black font-bold hover:bg-primary/90 rounded-xl px-6">
                    {submittingJob ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Listing"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Modal: Apply for Job */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  <span>Apply for {selectedJob.title}</span>
                </h3>
                <button onClick={() => setSelectedJob(null)} className="p-1 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <Input
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <Input
                      required
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                    <Input
                      required
                      value={applicantMobile}
                      onChange={(e) => setApplicantMobile(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Upload Resume / CV (PDF/DOC)</label>
                  <div className="flex gap-3 items-center">
                    <div className="relative flex-1">
                      <Input
                        readOnly
                        value={selectedFile ? selectedFile.name : ""}
                        placeholder="Choose file..."
                        className="bg-white/5 border-white/10 text-xs text-white rounded-xl cursor-default"
                      />
                    </div>
                    <input
                      type="file"
                      id="candidate-cv-upload"
                      required
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="candidate-cv-upload"
                      className="cursor-pointer bg-primary text-black font-semibold h-10 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs hover:bg-primary/90 transition-all flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 rotate-180" />
                      <span>Select CV</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-3 justify-end mt-4">
                  <Button type="button" variant="ghost" onClick={() => setSelectedJob(null)} className="hover:bg-white/5 text-white rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submittingApplication} className="bg-primary text-black font-bold hover:bg-primary/90 rounded-xl px-6">
                    {submittingApplication ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={confirmDeleteJobId !== null}
        onClose={() => setConfirmDeleteJobId(null)}
        onConfirm={() => executeDeleteJob(confirmDeleteJobId)}
        title="Delete Job Opening"
        message="Are you sure you want to delete this job listing? This position will be removed from the Careers page immediately."
      />

      <ConfirmationModal
        isOpen={confirmDeleteAppId !== null}
        onClose={() => setConfirmDeleteAppId(null)}
        onConfirm={() => executeDeleteApplication(confirmDeleteAppId)}
        title="Reject & Delete Candidate"
        message="Are you sure you want to reject and delete this application? This candidate profile and CV link will be permanently removed."
      />

      <Footer config={config} />
    </main>
  );
}