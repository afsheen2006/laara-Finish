import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Target, Users, Zap, Globe } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { OdometerCounter } from "@/components/odometer-counter";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

export default function AboutPage() {
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure navigation scrolls to top immediately on mount
    window.scrollTo(0, 0);

    Promise.all([
      getNavLinks(),
      getSystemConfig()
    ]).then(([navLinksData, configData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  const subtitle = "Our Company";
  const title = "About Us";
  const missionTitle = "Our Mission to Innovate";
  const desc = "At Laara Innovations, we believe technology should be accessible, impactful, and visionary. We are a multidisciplinary team dedicated to solving complex problems through smart software and empowering education.";

  const yearsOfExperience = 3;
  const clientCountLimit = 120;

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Navigation customLinks={navLinks} config={config} loading={loading} />

      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-32 relative group/about">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {subtitle}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-glow">
              {title.split(" ").map((word, i) => {
                if (i === title.split(" ").length - 1) {
                  return <span key={i} className="text-primary ml-1">{word}</span>;
                }
                return <span key={i}>{word} </span>;
              })}
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-muted-foreground">{missionTitle}</h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-8 sm:mb-12">{desc}</p>
            
            <div className="relative group/counters p-6 border border-transparent hover:border-primary/20 rounded-3xl transition-all duration-300 bg-white/[0.01]">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-12">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter value={yearsOfExperience} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
                </div>
                
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">
                    <OdometerCounter value={clientCountLimit} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Global Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-white/5 border-y border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AboutCard
              icon={<Target className="text-primary" />}
              title="Precision"
              desc="Meticulous attention to detail in every line of code and every drone flight."
            />
            <AboutCard
              icon={<Users className="text-secondary" />}
              title="Community"
              desc="Building platforms that connect and empower users worldwide."
            />
            <AboutCard
              icon={<Zap className="text-accent" />}
              title="Agility"
              desc="Adapting to the fast-paced tech landscape with rapid prototyping."
            />
            <AboutCard
              icon={<Globe className="text-primary" />}
              title="Vision"
              desc="Seeing beyond the immediate to build the infrastructure of tomorrow."
            />
          </div>
        </section>
      </div>

      <Footer config={config} />
    </main>
  );
}

function AboutCard({ icon, title, desc }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-all", children: [/*#__PURE__*/
      _jsx("div", { className: "w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6", children:
        icon }
      ), /*#__PURE__*/
      _jsx("h3", { className: "text-xl font-bold mb-4", children: title }), /*#__PURE__*/
      _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: desc })] }
    ));
}