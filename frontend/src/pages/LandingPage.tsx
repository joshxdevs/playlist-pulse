import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    label: "Import any playlist",
    description:
      "Paste a YouTube URL. Playlist Pulse fetches every video, title, and duration automatically — no manual entry required.",
  },
  {
    label: "Track what you have watched",
    description:
      "Check off videos as you complete them. Your progress is saved instantly and persists across every device.",
  },
  {
    label: "See exactly how much is left",
    description:
      "Total playlist duration updates in real-time as you complete videos. Know precisely how many hours remain before you finish.",
  },
  {
    label: "Pick up where you left off",
    description:
      "Continue Learning scrolls directly to your next unwatched video without any hunting through long lists.",
  },
  {
    label: "Manage multiple playlists",
    description:
      "Add, rename, or remove any number of playlists concurrently. Your entire learning library in one place.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={0}
    >
      {children}
    </motion.div>
  );
}

// ── Theme helpers ────────────────────────────────────────────────────────────
function getStoredTheme(): "light" | "dark" {
  try {
    return (localStorage.getItem("landing-theme") as "light" | "dark") ?? "light";
  } catch {
    return "light";
  }
}

// ── Sun icon ─────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// ── Moon icon ────────────────────────────────────────────────────────────────
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme);

  const isDark = theme === "dark";

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("landing-theme", next); } catch { /* noop */ }
  }

  // ── Theme tokens ─────────────────────────────────────────────────────────
  const bg        = isDark ? "#0a0a0a" : "#ffffff";
  const text       = isDark ? "#ededed" : "#111111";
  const muted      = isDark ? "#888888" : "#555555";
  const subtle     = isDark ? "#555555" : "#999999";
  const divider    = isDark ? "#222222" : "#ebebeb";
  const navBg      = isDark ? "rgba(10,10,10,0.88)" : "rgba(255,255,255,0.90)";
  const pillBg     = isDark ? "#ededed" : "#111111";
  const pillText   = isDark ? "#111111" : "#ffffff";
  const pillHover  = isDark ? "#ffffff" : "#333333";
  const toggleBg   = isDark ? "#1e1e1e" : "#f4f4f4";

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ background: navBg, backdropFilter: "blur(12px)", transition: "background 0.3s" }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 h-14"
      >
        <span style={{ color: text }} className="text-sm font-semibold tracking-tight">
          Playlist Pulse
        </span>
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ background: toggleBg, color: muted, transition: "background 0.3s, color 0.2s" }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link
            to="/login"
            style={{ color: muted }}
            className="text-sm hover:opacity-80 transition-opacity duration-150"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            style={{ background: pillBg, color: pillText, transition: "background 0.15s" }}
            className="text-xs font-medium px-4 py-1.5 rounded-full"
            onMouseEnter={e => (e.currentTarget.style.background = pillHover)}
            onMouseLeave={e => (e.currentTarget.style.background = pillBg)}
          >
            Get started
          </Link>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="pt-36 pb-28 px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ color: subtle }}
          className="text-xs font-semibold uppercase tracking-widest mb-6"
        >
          YouTube Learning Tracker
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: text }}
          className="text-[3.5rem] leading-[1.1] font-bold tracking-[-0.04em] mb-7"
        >
          Stop losing your place
          <br />
          in long playlists.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          style={{ color: muted }}
          className="text-lg leading-relaxed mb-10 max-w-lg"
        >
          Playlist Pulse turns any YouTube playlist into a structured checklist,
          tracking your progress, remaining time, and next video — automatically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/register"
            style={{ background: pillBg, color: pillText, transition: "background 0.15s" }}
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-full active:scale-[0.97] transition-transform duration-150"
            onMouseEnter={e => (e.currentTarget.style.background = pillHover)}
            onMouseLeave={e => (e.currentTarget.style.background = pillBg)}
          >
            Start for free
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/login"
            style={{ color: muted, textDecorationColor: divider }}
            className="text-sm hover:opacity-80 transition-opacity underline underline-offset-4"
          >
            Sign in to existing account
          </Link>
        </motion.div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ background: divider, transition: "background 0.3s" }} className="h-px max-w-3xl mx-auto" />

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <AnimatedSection>
          <p style={{ color: subtle }} className="text-xs font-semibold uppercase tracking-widest mb-16">
            How it works
          </p>
        </AnimatedSection>

        <div className="flex flex-col">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              style={{ borderColor: divider, transition: "border-color 0.3s" }}
              className="grid grid-cols-[1fr_2fr] gap-8 py-10 border-b last:border-0"
            >
              <p style={{ color: text }} className="text-sm font-semibold leading-snug pt-0.5">
                {f.label}
              </p>
              <p style={{ color: muted }} className="text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ background: divider, transition: "background 0.3s" }} className="h-px max-w-3xl mx-auto" />

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div style={{ borderColor: divider }} className="grid grid-cols-3 gap-0 divide-x">
          {[
            { n: "100%", desc: "Free to use" },
            { n: "Real-time", desc: "Progress sync" },
            { n: "Any length", desc: "Playlist supported" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center text-center px-6 py-2"
            >
              <span style={{ color: text }} className="text-[2rem] font-bold tracking-tight mb-1">
                {s.n}
              </span>
              <span style={{ color: subtle }} className="text-xs">{s.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ background: divider, transition: "background 0.3s" }} className="h-px max-w-3xl mx-auto" />

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <h2 style={{ letterSpacing: "-0.03em", color: text }} className="text-[2.5rem] font-bold tracking-tight mb-5">
            Ready to learn with focus?
          </h2>
          <p style={{ color: muted }} className="text-base mb-9 max-w-md mx-auto leading-relaxed">
            Create a free account and add your first playlist in under a minute.
            No credit card required.
          </p>
          <Link
            to="/register"
            style={{ background: pillBg, color: pillText, transition: "background 0.15s" }}
            className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3 rounded-full active:scale-[0.97] transition-transform duration-150"
            onMouseEnter={e => (e.currentTarget.style.background = pillHover)}
            onMouseLeave={e => (e.currentTarget.style.background = pillBg)}
          >
            Create free account
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{ borderColor: divider, color: subtle, transition: "border-color 0.3s" }} className="border-t py-8 px-8 flex items-center justify-between text-xs">
        <span>Playlist Pulse</span>
        <button
          onClick={toggleTheme}
          style={{ color: subtle }}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
