import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/admin-layout";
import apiClient from "@/lib/api-client";
import { jsx as _jsx } from "react/jsx-runtime";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read session from localStorage (set by Google auth flow)
    let user = null;
    try {
      const raw = localStorage.getItem("user");
      if (raw) user = JSON.parse(raw);
    } catch (_) {}

    if (!user) {
      navigate("/login");
      return;
    }

    // Check role — must be ADMIN or MASTER
    if (user.role !== "ADMIN" && user.role !== "MASTER") {
      navigate("/");
      return;
    }

    setSession({ user });

    const refreshBlocks = () => {
      apiClient.get("/cms/blocks")
        .then(r => setBlocks(Array.isArray(r.data) ? r.data : []))
        .catch(() => setBlocks([]));
    };

    // Fetch CMS blocks from backend
    refreshBlocks();

    // Fetch users (RBAC)
    apiClient.get("/auth/users")
      .then(r => setUsers(r.data))
      .catch((e) => {
        console.error("Failed to fetch users:", e);
        setUsers([]);
      });

    // Fetch queries (leads)
    apiClient.get("/leads")
      .then(r => setLeads(r.data || []))
      .catch(() => setLeads([]));

    // Fetch applications
    apiClient.get("/careers/applications")
      .then(r => setApplications(r.data || []))
      .catch((e) => {
        console.error("Failed to fetch applications:", e);
        setApplications([]);
      });

    setLoading(false);
  }, [navigate]);

  const refreshUsers = () => {
    apiClient.get("/auth/users")
      .then(r => setUsers(r.data))
      .catch(() => setUsers([]));
  };

  const refreshBlocks = () => {
    apiClient.get("/cms/blocks")
      .then(r => setBlocks(Array.isArray(r.data) ? r.data : []))
      .catch(() => setBlocks([]));
  };

  const refreshLeads = () => {
    apiClient.get("/leads")
      .then(r => setLeads(r.data || []))
      .catch(() => setLeads([]));
  };

  const refreshApplications = () => {
    apiClient.get("/careers/applications")
      .then(r => setApplications(r.data || []))
      .catch(() => setApplications([]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading Admin Dashboard...</p>
      </div>
    );
  }

  const userRole = session?.user?.role;
  const configBlock = blocks.find(b => b.type === "SYSTEM_CONFIG");
  const navBlock = blocks.find(b => b.type === "NAV_LINKS");
  const eventsBlock = blocks.find(
    b => b.type === "TEXT_BLOCK" && b.title === "Global Events Configuration"
  );
  const forms = blocks.filter(b => b.type === "FORM_BUILDER");

  return _jsx(AdminLayout, {
    users,
    auditLogs,
    leads,
    applications,
    configBlock,
    navBlock,
    eventsBlock,
    forms,
    submissions,
    currentUserId: session?.user?.id || session?.user?._id,
    currentUserRole: userRole,
    onUsersRefresh: refreshUsers,
    onBlocksRefresh: refreshBlocks,
    onLeadsRefresh: refreshLeads,
    onApplicationsRefresh: refreshApplications,
  });
}