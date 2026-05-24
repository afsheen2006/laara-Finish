import { motion } from "framer-motion";
import { Lightbulb, Target, Rocket } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function VisionSection({ content = {} }) {
  const subtitle = content.subtitle || "Our Vision";
  const title = content.title || "Shaping the [Future] of Technology.";
  const p1 = content.p1 || "Our vision is to build a thriving ecosystem where cutting-edge technological innovation and human potential converge. We strive to push the boundaries of what is possible—from engineering future-facing hardware like drones and robotics to crafting tailored digital software solutions that elevate businesses.";
  const p2 = content.p2 || "But our ultimate goal extends beyond the products we build; it is about the minds we shape. By transforming traditional learning into an immersive, real-world incubator, we are dedicated to cultivating the next generation of engineers.";

  const renderFormattedTitle = (text) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const word = part.slice(1, -1);
        return (
          <span
            key={index}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          >
            {word}
          </span>
        );
      }
      return part;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="vision" className="relative pt-6 pb-12 sm:py-24 border-t border-border/30 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left Column: Text */}
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{subtitle}</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-8 leading-[1.1]">
              {renderFormattedTitle(title)}
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
              <p>{p1}</p>
              <p>{p2}</p>
            </div>
          </motion.div>
          
          {/* Right Column: Dynamic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="sm:mt-12 group">
              <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-sm text-muted-foreground">Pioneering solutions across software and drone technologies.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="p-8 rounded-3xl bg-card border border-border hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-br-full blur-2xl group-hover:bg-secondary/20 transition-all duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Rocket className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Acceleration</h3>
                <p className="text-sm text-muted-foreground">Fast-tracking business growth through powerful digital tools.</p>
              </div>
              
              <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-tl-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Empowerment</h3>
                <p className="text-sm text-muted-foreground">Equipping the next generation with real-world technical skills.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}