import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-store";
import { UserAccountNav } from "./user-account-nav";
import { ThemeToggle } from "./theme-toggle";

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/drone-rd", label: "Research" },
  { href: "/software", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

export function Navigation({ customLinks, config }) {
  const links =
    Array.isArray(customLinks) && customLinks.length > 0
      ? customLinks
      : defaultNavLinks;
  const siteName = config?.siteName || "Laara Innovations";
  const siteLogo =
    config?.siteLogo ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "MASTER";
  const resolvedLinks = isAdmin
    ? links.map(link => link.label === "Contact Us" ? { href: "/admin", label: "Admin Portal" } : link)
    : links;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const isAuthenticated = status === "authenticated";

  return (
    <>
      {/* ── Full-screen blur backdrop when mobile menu is open ──────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Nav bar ────────────────────────────────────────────────────────── */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 glass shadow-lg shadow-black/20" : "py-5 bg-transparent"
        }`}
      >
        {/* Desktop nav row */}
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-primary/10 p-1 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={siteLogo}
                  alt="Laara Innovations Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {siteName.split(" ")[0]}
                </span>
                <span className="text-foreground ml-2">
                  {siteName.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-12">
              <div className="flex items-center px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
                {resolvedLinks
                  .filter((l) => l.label !== "Contact Us" && l.label !== "Admin Portal")
                  .map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  ))}
              </div>

              <div className="ml-4 flex items-center gap-3">
                <ThemeToggle />
                {isAdmin ? (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 gap-2 rounded-full px-5 font-bold border border-primary/20"
                    >
                      Admin Portal
                    </Button>
                  </Link>
                ) : (
                  <Link to="/contact">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 gap-2 rounded-full px-5 font-bold border border-primary/20"
                    >
                      Contact Us
                    </Button>
                  </Link>
                )}
                {isAuthenticated ? (
                  <UserAccountNav />
                ) : (
                  <Link to="/login">
                    <Button
                      size="sm"
                      className="bg-primary text-black font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 rounded-full px-6 transition-all hover:scale-105 active:scale-95"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg relative z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 border-t border-border/50 p-4 space-y-4 shadow-2xl shadow-black/30 bg-card/95 backdrop-blur-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              {/* Theme row */}
              <div className="flex items-center justify-between px-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1">
                {resolvedLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-4 text-base font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth footer */}
              <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                {isAuthenticated && session?.user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30">
                        {session?.user?.name?.[0] ||
                          session?.user?.email?.[0] ||
                          "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-foreground truncate">
                          {session?.user?.name || "User"}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {session?.user?.email}
                        </div>
                      </div>
                    </div>
                    {(session.user.role === "ADMIN" || session.user.role === "MASTER") && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 rounded-xl py-5 text-sm font-bold">
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut();
                      }}
                      variant="outline"
                      className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl py-5 text-sm font-bold"
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full bg-primary text-black font-bold rounded-xl py-6 text-base">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}