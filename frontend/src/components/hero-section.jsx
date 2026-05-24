import { motion } from "framer-motion";
import React, { Suspense, lazy } from "react";
import { ChevronDown } from "lucide-react";

const DroneViewer = lazy(() =>
  import("./drone-viewer").then((mod) => ({ default: mod.DroneViewer }))
);

export function HeroSection({ content = {} }) {
  const title1 = content.title1 || "LAARA";
  const title2 = content.title2 || "INNOVATIONS";

  const mouse = React.useRef([0, 0]);

  React.useEffect(() => {
    const handleMouseMoveGlobal = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = [x, y];
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
    };
  }, []);

  const scrollToNext = () => {
    const next =
      document.getElementById("vision") ||
      document.querySelector("section:nth-of-type(2)");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-8 sm:min-h-screen bg-background text-foreground overflow-hidden sm:flex sm:items-center sm:pt-0 sm:pb-0"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* Drone canvas layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-0" />
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,168,128,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(21,229,196,0.03)_0%,transparent_70%)]">
            <Suspense fallback={null}>
              <DroneViewer mouse={mouse} isHero={true} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Hero text */}
      <div className="relative z-20 container mx-auto px-6 sm:px-10 lg:px-24 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto sm:mx-0"
        >
          <motion.h1 className="font-black tracking-[-0.02em] leading-none text-center sm:text-left flex flex-col items-center sm:items-start font-oxanium">
            <span className="inline-block pb-2 sm:pb-6 pt-1 sm:pt-2 pr-2 sm:pr-10 text-3xl sm:text-7xl md:text-9xl lg:text-[10rem] whitespace-nowrap">
              {title1.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-1"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="inline-block pb-2 sm:pb-6 pt-1 sm:pt-2 pr-2 sm:pr-10 relative text-xl sm:text-5xl md:text-7xl lg:text-[7rem] whitespace-nowrap">
              {title2.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(21,229,196,0.3)] px-1"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── Scroll Down Indicator ──────────────────────────────────────────── */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto"
      >
        {/* Label */}
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary transition-colors duration-300">
          Scroll
        </span>

        {/* Mouse scroll pill */}
        <div className="relative w-8 h-12 rounded-full border-2 border-muted-foreground/40 group-hover:border-primary/60 transition-colors duration-300 flex items-start justify-center pt-2 overflow-hidden">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(0,168,128,0.8)]"
          />
        </div>

        {/* Bouncing chevron */}
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}