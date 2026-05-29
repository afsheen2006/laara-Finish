import React, { useState, useEffect } from "react";
import { BlockRenderer } from "@/components/block-renderer";
import { HeroSection } from "@/components/hero-section";
import { VisionSection } from "@/components/vision-section";
import { EventsSection } from "@/components/events-section";

import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { SegmentsSection } from "@/components/segments-section";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { Navigation } from "@/components/navigation";
import { useSession } from "@/lib/auth-store";
import { LiveCMSOverlay } from "@/components/admin/live-cms-overlay";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace("5000", "5001");

const getBlocks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/blocks`);
    if (!res.ok) throw new Error("Failed to fetch blocks");
    return await res.json();
  } catch (e) {
    console.error("getBlocks error:", e);
    return [];
  }
};

const getSystemConfig = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/config`);
    if (!res.ok) throw new Error("Failed to fetch config");
    return await res.json();
  } catch (e) {
    console.error("getSystemConfig error:", e);
    return {};
  }
};

const getNavLinks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/blocks`);
    if (!res.ok) throw new Error("Failed to fetch blocks");
    const blocks = await res.json();
    const navBlock = blocks.find(b => b.type === "NAV_LINKS");
    return navBlock ? JSON.parse(navBlock.content) : [];
  } catch (e) {
    console.error("getNavLinks error:", e);
    return [];
  }
};

export default function Home() {
  const [blocks, setBlocks] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const refreshPageData = () => {
    Promise.all([getBlocks(), getNavLinks(), getSystemConfig()]).then(([b, n, c]) => {
      setBlocks(b);
      setNavLinks(n);
      setConfig(c);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([getBlocks(), getNavLinks(), getSystemConfig()]).then(([b, n, c]) => {
      setBlocks(b);
      setNavLinks(n);
      setConfig(c);
      setLoading(false);
    });
  }, []);

  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "MASTER";

  // Get Hero Block Data
  const heroBlock = blocks.find(b => b.type === "HERO");
  const heroContent = heroBlock ? JSON.parse(heroBlock.content) : { title1: "LAARA", title2: "INNOVATIONS" };
  const heroFields = [
    { key: "title1", label: "Title Part 1 (First line)", type: "text", defaultValue: "LAARA" },
    { key: "title2", label: "Title Part 2 (Second line)", type: "text", defaultValue: "INNOVATIONS" },
  ];

  // Get Vision Block Data
  const visionBlock = blocks.find(b => b.type === "VISION");
  const visionContent = visionBlock ? JSON.parse(visionBlock.content) : {
    subtitle: "Our Vision",
    title: "Shaping the [Future] of Technology.",
    p1: "Our vision is to build a thriving ecosystem where cutting-edge technological innovation and human potential converge. We strive to push the boundaries of what is possible—from engineering future-facing hardware like drones and robotics to crafting tailored digital software solutions that elevate businesses.",
    p2: "But our ultimate goal extends beyond the products we build; it is about the minds we shape. By transforming traditional learning into an immersive, real-world incubator, we are dedicated to cultivating the next generation of engineers."
  };
  const visionFields = [
    { key: "subtitle", label: "Section Subtitle", type: "text", defaultValue: "Our Vision" },
    { key: "title", label: "Main Title (use [word] for green/teal gradient styling)", type: "text", defaultValue: "Shaping the [Future] of Technology." },
    { key: "p1", label: "First Paragraph", type: "textarea", defaultValue: "" },
    { key: "p2", label: "Second Paragraph", type: "textarea", defaultValue: "" },
  ];

  // Get System Identity Block Data
  const systemConfigBlock = blocks.find(b => b.type === "SYSTEM_CONFIG");
  const systemConfigContent = systemConfigBlock ? JSON.parse(systemConfigBlock.content) : config;
  const systemConfigFields = [
    { key: "siteName", label: "Site Name / Brand", type: "text", defaultValue: "Laara Innovations" },
    { key: "siteLogo", label: "Site Logo Upload", type: "image", defaultValue: "" },
    { key: "contactEmail", label: "Contact/Support Email", type: "text", defaultValue: "info@laarainnovations.com" },
    { key: "yearsOfExperience", label: "Years of Experience (Counters)", type: "number", defaultValue: 3 },
    { key: "clientCountLimit", label: "Global Clients Limit (Counters)", type: "number", defaultValue: 120 },
    { key: "adminEmails", label: "Admin Emails (comma-separated)", type: "textarea", defaultValue: "admin@laarainnovations.com" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Floating Identity & Counter configuration button for Admin (Direct CMS shortcut) */}
      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-50">
          <LiveCMSOverlay
            blockType="SYSTEM_CONFIG"
            blockTitle="Site Config & Counters"
            blockId={systemConfigBlock?._id || systemConfigBlock?.id}
            initialContent={systemConfigContent}
            fields={systemConfigFields}
            onSave={refreshPageData}
          />
        </div>
      )}

      <Navigation customLinks={navLinks} config={config} loading={loading} />

      {/* Hero Section */}
      <div className="relative group/hero">
        <HeroSection content={heroContent} loading={loading} />
      </div>

      {/* Vision Section with Live CMS overlay */}
      <div className="relative group/vision">
        <VisionSection content={visionContent} loading={loading} />
        {isAdmin && (
          <LiveCMSOverlay
            blockType="VISION"
            blockTitle="Vision Section"
            blockId={visionBlock?._id || visionBlock?.id}
            initialContent={visionContent}
            fields={visionFields}
            onSave={refreshPageData}
          />
        )}
      </div>

      <EventsSection />

      <SegmentsSection />
      <PortfolioGrid />

      <section id="contact" className="py-12 sm:py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground mb-4">Let's Build <span className="text-primary">Together</span></h2>
            <p className="text-muted-foreground text-sm sm:text-base">Have a project in mind? Reach out to our team.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer config={config} />
    </main>
  );
}