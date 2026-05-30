import { Navigation } from "@/components/navigation";
import { DroneShowcase } from "@/components/drone-showcase";
import { ResearchRepository } from "@/components/research-repository";
import { ProjectTimeline } from "@/components/project-timeline";
import { CoursesSection } from "@/components/courses-section";
import { getNavLinks, getSystemConfig, getBlocks } from "@/lib/cms-helpers";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-store";
import { LiveCMSOverlay } from "@/components/admin/live-cms-overlay";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DroneRDPage() {
  const [blocks, setBlocks] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const refreshPageData = () => {
    Promise.all([getNavLinks(), getSystemConfig(), getBlocks()]).then(([navLinksData, configData, blocksData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setBlocks(blocksData || []);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      getNavLinks(),
      getSystemConfig(),
      getBlocks()
    ]).then(([navLinksData, configData, blocksData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setBlocks(blocksData || []);
      setLoading(false);
    });
  }, []);

  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "MASTER";

  const researchBlock = blocks.find(b => b.type === "RESEARCH_PAGE");
  const researchContent = researchBlock ? JSON.parse(researchBlock.content) : {
    subtitle: "R&D Division",
    title: "Propeller [Innovation]",
    desc: "Pushing the boundaries of drone propulsion through computational design, advanced materials science, and rigorous aerodynamic testing."
  };

  const papersBlock = blocks.find(b => b.type === "RESEARCH_PAPERS");
  const initialPapers = papersBlock ? JSON.parse(papersBlock.content) : [];

  const milestonesBlock = blocks.find(b => b.type === "PROJECT_MILESTONES");
  const initialMilestones = milestonesBlock ? JSON.parse(milestonesBlock.content) : [];

  const researchFields = [
    { key: "subtitle", label: "Section Subtitle", type: "text", defaultValue: "R&D Division" },
    { key: "title", label: "Main Title (use [word] for green/teal gradient styling)", type: "text", defaultValue: "Propeller [Innovation]" },
    { key: "desc", label: "Section Description", type: "textarea", defaultValue: "" },
  ];

  const handleSavePapers = async (newPapers) => {
    if (!papersBlock) {
      try {
        const response = await apiClient.post("/cms/blocks", {
          type: "RESEARCH_PAPERS",
          title: "Research Papers",
          content: JSON.stringify(newPapers),
          order: 10
        });
        if (response.data?.success) {
          toast.success("Research Repository initialized and updated!");
          refreshPageData();
        } else {
          toast.error("Failed to initialize papers");
        }
      } catch (e) {
        toast.error("An error occurred: " + (e.message || "Unknown error"));
      }
      return;
    }

    try {
      const response = await apiClient.put(`/cms/blocks/${papersBlock._id || papersBlock.id}`, {
        content: JSON.stringify(newPapers),
      });
      if (response.data?.success) {
        toast.success("Research Repository updated successfully!");
        refreshPageData();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update papers: " + e.message);
    }
  };

  const handleSaveMilestones = async (newMilestones) => {
    if (!milestonesBlock) return;
    try {
      const response = await apiClient.put(`/cms/blocks/${milestonesBlock._id || milestonesBlock.id}`, {
        content: JSON.stringify(newMilestones),
      });
      if (response.data?.success) {
        toast.success("Project Milestones updated successfully!");
        refreshPageData();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update milestones: " + e.message);
    }
  };

  const renderFormattedTitle = (text) => {
    if (!text) return "";
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const word = part.slice(1, -1);
        return (
          <span
            key={index}
            className="text-primary ml-1"
          >
            {word}
          </span>
        );
      }
      return part;
    });
  };

  const coursesBlock = blocks.find(b => b.type === "COURSES_CONFIGURATION");

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} loading={loading} />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative group/research">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              ) : null}
              <span className="text-sm font-medium text-primary">
                {loading ? "Syncing R&D..." : (researchContent.subtitle || "R&D Division")}
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              {renderFormattedTitle(researchContent.title || "Propeller [Innovation]")}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
              {researchContent.desc || "Pushing the boundaries of drone propulsion through computational design, advanced materials science, and rigorous aerodynamic testing."}
            </p>
          </div>
        </div>
      </section>

      <section id="research" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <DroneShowcase />
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-[2rem] min-h-[300px] w-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                <span className="text-xs text-muted-foreground animate-pulse">Syncing research papers...</span>
              </div>
            ) : (
              <ResearchRepository papers={initialPapers} isAdmin={isAdmin} onSave={handleSavePapers} />
            )}
          </div>
        </div>
      </section>

      <section id="milestones" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Project Milestones</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Track our research progress from concept to prototype</p>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 min-h-[200px] w-full">
              <Loader2 className="w-8 h-8 animate-spin text-secondary mb-2" />
              <span className="text-xs text-muted-foreground animate-pulse">Syncing milestones...</span>
            </div>
          ) : (
            <ProjectTimeline milestones={initialMilestones} isAdmin={isAdmin} onSave={handleSaveMilestones} />
          )}
        </div>
      </section>

      <section id="courses" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 min-h-[200px] w-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <span className="text-xs text-muted-foreground animate-pulse">Syncing courses...</span>
            </div>
          ) : (
            <CoursesSection coursesBlock={coursesBlock} isAdmin={isAdmin} onSave={refreshPageData} />
          )}
        </div>
      </section>
    </main>
  );
}