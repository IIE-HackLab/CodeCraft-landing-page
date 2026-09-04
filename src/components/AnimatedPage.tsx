import name from "../assets/images/name.png";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimelineItem {
  title: string;
  date: string;
  isoDate: string;
  icon: string;
  desc: string;
  tone: string;
  row: number;
  slot: number;
}

interface Organizer {
  name: string;
  init: string;
  github: string;
  linkedin: string;
  role: string;
  imageUrl: string;
}

interface Prize {
  place: string;
  amount: string;
  emoji: string;
  rank: number;
}

interface Rule {
  text: string;
  icon: string;
}

interface SubmissionReq {
  title: string;
  desc: string;
  icon: string;
  tag: string;
  color: string;
}

interface Feature {
  icon: string;
  num: string;
  title: string;
  desc: string;
}

interface Props {
  logoSrc: string;
  timelineStops: TimelineItem[];
  organizers: Organizer[];
  prizes: Prize[];
  rules: Rule[];
  submissionRequirements: SubmissionReq[];
  features: Feature[];
}

// ─── Themes Data ─────────────────────────────────────────────────────────────
const themes = [
  {
    num: "01",
    code: "TRACK // 01",
    title: "Open Innovation",
    desc: "Build anything. Pick a problem, any problem, and solve it.",
    icon: "💡",
    tag: "OPEN TRACK",
    color: "cyan",
  },
  {
    num: "02",
    code: "TRACK // 02",
    title: "FinTech",
    desc: "Payments, lending, trading, financial inclusion.",
    icon: "💳",
    tag: "FINANCE",
    color: "gold",
  },
  {
    num: "03",
    code: "TRACK // 03",
    title: "Health Tech",
    desc: "Diagnostics, telemedicine, patient access, health data.",
    icon: "🩺",
    tag: "HEALTHCARE",
    color: "red",
  },
  {
    num: "04",
    code: "TRACK // 04",
    title: "Web 3.0",
    desc: "Decentralized apps, smart contracts, on-chain identity.",
    icon: "⛓️",
    tag: "WEB3 & CRYPTO",
    color: "purple",
  },
  {
    num: "05",
    code: "TRACK // 05",
    title: "Green Tech",
    desc: "Sustainability, energy efficiency, carbon tracking.",
    icon: "🌱",
    tag: "SUSTAINABILITY",
    color: "green",
  },
  {
    num: "06",
    code: "TRACK // 06",
    title: "EdTech",
    desc: "Learning tools, assessment, access to education.",
    icon: "🎓",
    tag: "EDUCATION",
    color: "blue",
  },
  {
    num: "07",
    code: "TRACK // 07",
    title: "Smart Automation",
    desc: "Intelligent workflows, robotics, process optimization & smart control.",
    icon: "⚡",
    tag: "AUTOMATION",
    color: "orange",
  },
  {
    num: "08",
    code: "TRACK // 08",
    title: "Agentic AI",
    desc: "Autonomous AI agents that plan and execute tasks.",
    icon: "🧠",
    tag: "AUTONOMOUS AI",
    color: "cyan",
  },
  {
    num: "09",
    code: "TRACK // 09",
    title: "Hardware",
    desc: "Physical computing, IoT, embedded systems, robotics.",
    icon: "🤖",
    tag: "CIRCUITS & IOT",
    color: "gold",
  },
];

// ─── Spring configs ───────────────────────────────────────────────────────────
const springSnappy = { type: "spring" as const, stiffness: 260, damping: 20 };
const springSmooth = { type: "spring" as const, stiffness: 100, damping: 18 };
const springBouncy = { type: "spring" as const, stiffness: 400, damping: 15 };

// ─── Shared variants ─────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSmooth },
  },
};

// ─── System Protocols Data ───────────────────────────────────────────────────
const systemProtocols = [
  {
    num: "01",
    code: "TEAM_STRUCTURE",
    title: "Team Formation & College Eligibility",
    status: "ENFORCED",
    summary:
      "2–4 members per node from any study year (1st–4th). Cross-year squads authorized.",
    rules: [
      "Team size: 2–4 members from any year (1st–4th)",
      "All team members must be from the college campus",
    ],
  },
  {
    num: "02",
    code: "SUBMISSION_SPECS",
    title: "Deliverables & Media Uplink",
    status: "MANDATORY",
    summary:
      "Presentation slides submitted before deadline; project demo uploaded to YouTube.",
    rules: [
      "Teams must submit PPT before the deadline (10–20 Sept)",
      "The demo video/MVP video must be uploaded to YouTube and the link shared",
      "Repository must be pushed to GitHub before the deadline",
    ],
  },
  {
    num: "03",
    code: "INTEGRITY_STANDARDS",
    title: "Originality & Anti-Plagiarism",
    status: "STRICT",
    summary:
      "Zero tolerance for code cloning or pre-fabricated commercial solutions.",
    rules: [
      "Ideas must be original and not copied from existing projects",
      "Plagiarism of code, circuitry, or core logic will lead to instant DQ",
    ],
  },
  {
    num: "04",
    code: "STACK_PERMISSIONS",
    title: "Open-Source Tools & Libraries",
    status: "AUTHORIZED",
    summary:
      "Full authorization to leverage open-source packages, firmware SDKs, and APIs.",
    rules: [
      "Teams can freely use open-source libraries, packages, and frameworks",
      "Proper architectural attribution and custom integration are required",
    ],
  },
  {
    num: "05",
    code: "LIVE_DEMONSTRATION",
    title: "Live Physical & Software Evaluation",
    status: "FINAL_GATE",
    summary:
      "Every qualifying team must demonstrate their working prototype live to the judges.",
    rules: [
      "Final project must be demonstrated live during Event Day (26 Sept)",
      "Both software execution and hardware integration must be operational",
    ],
  },
];

// ─── Protocol Accordion Card (controlled) ───────────────────────────────────
function ProtocolCard({
  proto,
  index,
  isOpen,
  onToggle,
}: {
  proto: (typeof systemProtocols)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={`protocol-card${isOpen ? " is-expanded" : ""}`}
      data-proto-idx={index}
      variants={cardVariant}
      whileHover={!isOpen ? { boxShadow: "0 0 24px rgba(0,242,254,0.12)" } : {}}
      transition={springSnappy}
    >
      <button
        type="button"
        className="protocol-trigger"
        aria-expanded={isOpen}
        aria-controls={`proto-panel-${index}`}
        id={`proto-btn-${index}`}
        onClick={onToggle}
      >
        <div className="proto-header-left">
          <span className="proto-idx">{proto.num}</span>
          <div className="proto-titles">
            <span className="proto-code">// {proto.code}</span>
            <span className="proto-name">{proto.title}</span>
          </div>
        </div>
        <div className="proto-header-right">
          <span className={`proto-status status-${proto.status.toLowerCase()}`}>
            [{proto.status}]
          </span>
          <motion.span
            className="proto-chevron"
            aria-hidden="true"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            ›
          </motion.span>
        </div>
      </button>

      <motion.div
        className="protocol-panel"
        id={`proto-panel-${index}`}
        role="region"
        aria-labelledby={`proto-btn-${index}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="protocol-panel-inner">
          <p className="proto-summary">
            &gt; Directive Summary: {proto.summary}
          </p>
          <ul className="proto-rules-list">
            {proto.rules.map((ruleText, ri) => (
              <li key={ri} className="proto-rule-item">
                <span className="rule-bullet">■</span>
                <span className="rule-text">{ruleText}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Protocols Accordion (shared open-index state) ───────────────────────────
function ProtocolsAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const handleToggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <motion.div
      className="protocols-accordion"
      id="protocols-accordion"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {systemProtocols.map((proto, index) => (
        <ProtocolCard
          key={index}
          proto={proto}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </motion.div>
  );
}

// ─── Counter hook ─────────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 18 });
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>{0 + suffix}</span>;
}

// ─── Word-reveal heading ──────────────────────────────────────────────────────
function WordRevealHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 32, rotateX: -25 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { ...springSmooth },
    },
  };
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      style={{ display: "inline-block", perspective: "600px" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{
            display: "inline-block",
            marginRight: "0.3em",
            transformOrigin: "bottom",
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Floating ambient orbs ────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div
      className="ambient-bg"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      {[
        { bg: "#4facfe", top: "-100px", left: "-200px", delay: 0, dur: 8 },
        { bg: "#8e2de2", bottom: "-100px", right: "-150px", delay: 3, dur: 10 },
        { bg: "#00f2fe", top: "40%", left: "55%", delay: 1.5, dur: 12 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: i === 2 ? "500px" : "700px",
            height: i === 2 ? "500px" : "700px",
            background: orb.bg,
            borderRadius: "50%",
            filter: "blur(140px)",
            opacity: 0,
            ...(orb.top !== undefined ? { top: orb.top } : {}),
            ...(orb.bottom !== undefined
              ? { bottom: (orb as any).bottom }
              : {}),
            ...(orb.left !== undefined ? { left: orb.left } : {}),
            ...(orb.right !== undefined ? { right: (orb as any).right } : {}),
            ...(i === 2 ? { transform: "translate(-50%,-50%)" } : {}),
          }}
          animate={{
            opacity: [
              i === 2 ? 0.04 : 0.06,
              i === 2 ? 0.07 : 0.1,
              i === 2 ? 0.04 : 0.06,
            ],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="branch-wire left" />
      <div className="hardware-node" />
      <div className="branch-wire right" />
    </motion.div>
  );
}

// ─── Section header with word-reveal ─────────────────────────────────────────
function SectionHeader({
  kicker,
  title,
  sub,
  id,
}: {
  kicker: string;
  title: string;
  sub: string;
  id: string;
}) {
  return (
    <div className="section-header">
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {kicker}
      </motion.p>
      <h2 className="section-title" id={id} style={{ overflow: "hidden" }}>
        <WordRevealHeading text={title} />
      </h2>
      <motion.p
        className="section-sub"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {sub}
      </motion.p>
    </div>
  );
}

// ─── Main AnimatedPage component ──────────────────────────────────────────────
export default function AnimatedPage({
  logoSrc,
  timelineStops,
  organizers,
  prizes,
  rules,
  submissionRequirements,
  features,
}: Props) {
  // ── Countdown state ───────────────────────────────────────────────────────
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--",
  });

  useEffect(() => {
    const target = new Date("2026-09-26T09:00:00+05:30");
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      const s = Math.floor(diff / 1000);
      setCountdown({
        days: pad(Math.floor(s / 86400)),
        hours: pad(Math.floor((s % 86400) / 3600)),
        mins: pad(Math.floor((s % 3600) / 60)),
        secs: pad(s % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Terminal state ────────────────────────────────────────────────────────
  const [termLines, setTermLines] = useState<{ text: string; type: string }[]>([
    { text: "./init_hardware.sh", type: "cmd" },
    { text: "[ OK ] Booting neural subsystem...", type: "proc" },
    { text: "[ OK ] Linking code to logic gates...", type: "proc" },
    { text: "[ OK ] Hardware synced successfully!", type: "proc" },
    { text: "execute_hackathon.exe", type: "cmd" },
    { text: ">> COMPILING INNOVATION...", type: "success" },
  ]);
  const [termInput, setTermInput] = useState("");
  const [isOverclocked, setIsOverclocked] = useState(false);
  const termBodyRef = useRef<HTMLDivElement>(null);

  // ── HUD state ─────────────────────────────────────────────────────────────
  const [hudLatency, setHudLatency] = useState("12ms");
  const [hudState, setHudState] = useState("OPTIMAL");
  const [hudStateColor, setHudStateColor] = useState("#00f2fe");

  useEffect(() => {
    const id = setInterval(
      () => {
        if (isOverclocked) {
          setHudLatency(`${Math.floor(Math.random() * 4 + 1)}ms`);
          setHudState("OVERCLOCKED");
          setHudStateColor("#ff2a00");
        } else {
          setHudLatency(`${Math.floor(Math.random() * 20 + 8)}ms`);
          if (Math.random() > 0.8) {
            setHudState("SYNCING");
            setHudStateColor("#ffbd2e");
            setTimeout(() => {
              setHudState("OPTIMAL");
              setHudStateColor("#00f2fe");
            }, 800);
          }
        }
      },
      isOverclocked ? 150 : 2000,
    );
    return () => clearInterval(id);
  }, [isOverclocked]);

  // Scroll term body to bottom
  useEffect(() => {
    if (termBodyRef.current)
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
  }, [termLines]);

  // ── Workbench interactive controller ─────────────────────────────────────
  useEffect(() => {
    const stage = document.getElementById("workbench-stage");
    const codeCol = document.getElementById("wb-software");
    const coreCol = document.getElementById("wb-core");
    const hwCol = document.getElementById("wb-hardware");
    const coreChassis = document.getElementById("core-chassis");
    const hwRxLed = document.querySelector<HTMLElement>(".led-rx");
    const hwPinTag = document.querySelector<HTMLElement>(".pin-tag.active");

    // 1. Subtle Mouse Parallax (Desktop Only)
    let rafId: number;
    let mouseX = 0,
      mouseY = 0;
    let curX = 0,
      curY = 0;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    if (stage && !isCoarse) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = stage.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX = (e.clientX - centerX) / (rect.width / 2);
        mouseY = (e.clientY - centerY) / (rect.height / 2);
      };

      const renderParallax = () => {
        curX += (mouseX - curX) * 0.06;
        curY += (mouseY - curY) * 0.06;
        if (codeCol)
          codeCol.style.transform = `translate3d(${-curX * 6}px, ${-curY * 4}px, 0)`;
        if (coreCol)
          coreCol.style.transform = `translate3d(${curX * 8}px, ${curY * 6}px, 0)`;
        if (hwCol)
          hwCol.style.transform = `translate3d(${curX * 6}px, ${-curY * 4}px, 0)`;
        rafId = requestAnimationFrame(renderParallax);
      };

      window.addEventListener("mousemove", onMouseMove);
      rafId = requestAnimationFrame(renderParallax);
    }

    // 2. Continuous Convergence Cycle
    const bo1 = document.getElementById("bo-line-1");
    const bo2 = document.getElementById("bo-line-2");
    const bo3 = document.getElementById("bo-line-3");
    const hwPort = document.querySelector<HTMLElement>(".hw-bus-port");
    const cpPort = document.querySelector<HTMLElement>(".cp-bus-port");

    let cycleStep = 0;
    const cycleId = setInterval(() => {
      cycleStep = (cycleStep + 1) % 3;

      if (cycleStep === 0) {
        if (bo1) bo1.style.color = "#00f2fe";
        if (bo2) bo2.style.color = "#94a3b8";
        if (bo3) bo3.style.color = "#94a3b8";
        if (hwRxLed) {
          hwRxLed.style.boxShadow = "0 0 14px #fbbf24";
          setTimeout(() => {
            if (hwRxLed) hwRxLed.style.boxShadow = "";
          }, 300);
        }
      } else if (cycleStep === 1) {
        if (bo2) bo2.style.color = "#00f2fe";
        if (bo3) bo3.style.color = "#2ed573";
        if (cpPort) cpPort.style.boxShadow = "0 0 16px rgba(0, 242, 254, 0.9)";
        if (hwPort) hwPort.style.boxShadow = "0 0 16px rgba(251, 191, 36, 0.9)";
        setTimeout(() => {
          if (cpPort) cpPort.style.boxShadow = "";
          if (hwPort) hwPort.style.boxShadow = "";
        }, 500);
      } else if (cycleStep === 2) {
        if (coreChassis) {
          coreChassis.style.boxShadow =
            "0 0 65px rgba(0, 242, 254, 0.8), 0 0 65px rgba(251, 191, 36, 0.55), inset 0 0 35px rgba(0, 242, 254, 0.4)";
          coreChassis.style.borderColor = "#ffffff";
          setTimeout(() => {
            if (coreChassis) {
              coreChassis.style.boxShadow = "";
              coreChassis.style.borderColor = "";
            }
          }, 600);
        }
        if (hwPinTag) {
          hwPinTag.textContent =
            Math.random() > 0.5 ? "IO_01 [SYNC]" : "IO_01 [CORE]";
        }
      }
    }, 1300);

    // 3. Ambient background mouse follow
    const onAmbientMouseMove = (e: MouseEvent) => {
      const bgOrbs = document.querySelector<HTMLElement>(".ambient-bg");
      if (bgOrbs) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        bgOrbs.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
      }
    };
    window.addEventListener("mousemove", onAmbientMouseMove);

    return () => {
      clearInterval(cycleId);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onAmbientMouseMove);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <AmbientOrbs />

      <main id="main-content">
        {/* ══════════════════════════════════════════════ HERO ══ */}
        <section
          className="hero-workbench"
          id="home"
          aria-label="CODECRAFT: From Code to Circuit"
        >
          {/* Spacious Engineering Environment Background */}
          <div className="workbench-bg" aria-hidden="true">
            <div className="wb-grid"></div>
            <div className="wb-pcb-traces"></div>
            <div className="wb-glow glow-center"></div>
            <div className="wb-glow glow-left"></div>
            <div className="wb-glow glow-right"></div>
          </div>

          <div className="wrap hero-wrap">
            {/* Top Narrative & Branding Header */}
            <header className="hero-header">
              <div className="hero-institution">
                <span className="inst-text">
                  IIE HACKLAB • IDEAL INSTITUTE OF ENGINEERING
                </span>
              </div>

              <h1 className="hero-title" aria-label="CODECRAFT">
                <img
                  src={name.src}
                  alt="CODECRAFT"
                  className="hero-title-img"
                  width="540"
                  height="120"
                />
              </h1>

              <p className="hero-subtitle">WHERE SOFTWARE MEETS HARDWARE</p>

              <p className="hero-desc">
                Bridge the gap between virtual logic and physical circuits. Join
                the ultimate hackathon where raw code meets real engineering.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-hero-primary"
                  id="hero-register-btn"
                  onClick={() => {
                    window.open("https://iiehacklab.vercel.app/", "_blank");
                  }}
                  data-cursor="[ENTER]"
                >
                  <span>ENTER CODECRAFT</span>
                  <svg
                    className="hero-btn-arrow"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h12M12 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn-hero-secondary"
                  onClick={() =>
                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  id="hero-learn-btn"
                  data-cursor="[EXPLORE]"
                >
                  <span>EXPLORE STACK ↓</span>
                </button>
              </div>
            </header>

            {/* The Central Engineering Workbench: SOFTWARE → CORE → HARDWARE */}
            <div className="workbench-stage" id="workbench-stage">
              {/* ═══════════ LEFT: SOFTWARE / DEVELOPER CODE PANEL ═══════════ */}
              <div className="wb-col wb-col-software" id="wb-software">
                <div className="wb-panel code-panel" data-cursor="[CODE]">
                  {/* Terminal Header */}
                  <div className="cp-header">
                    <div className="cp-dots" aria-hidden="true">
                      <span className="dot-r"></span>
                      <span className="dot-y"></span>
                      <span className="dot-g"></span>
                    </div>
                    <span className="cp-file">firmware.ts</span>
                    <span className="cp-status-tag">
                      <span className="cp-status-dot"></span>
                      <span>LIVE</span>
                    </span>
                  </div>

                  {/* Code Window */}
                  <div className="cp-code-body">
                    <div className="code-line">
                      <span className="ln">01</span>
                      <span className="kw">const</span>{" "}
                      <span className="id">system</span> ={" "}
                      <span className="fn">initialize</span>();
                    </div>
                    <div className="code-line">
                      <span className="ln">02</span>
                      <span className="fn">connectHardware</span>();
                    </div>
                    <div className="code-line hl-line">
                      <span className="ln">03</span>
                      <span className="fn">compileInnovation</span>();
                    </div>
                  </div>

                  {/* Live Build Terminal Output */}
                  <div className="cp-build-output">
                    <div className="bo-line" id="bo-line-1">
                      <span className="bo-chevron">&gt;</span>{" "}
                      <span className="bo-txt">BUILDING BINARY...</span>
                    </div>
                    <div className="bo-line" id="bo-line-2">
                      <span className="bo-chevron">&gt;</span>{" "}
                      <span className="bo-txt">SYNCING LOGIC GATES...</span>
                    </div>
                    <div className="bo-line bo-ready" id="bo-line-3">
                      <span className="bo-chevron">&gt;</span>{" "}
                      <span className="bo-txt">TRANSMITTING DATA [OK]</span>
                      <span className="bo-cursor" aria-hidden="true">
                        _
                      </span>
                    </div>
                  </div>

                  {/* Bus Port Left Output */}
                  <div className="cp-bus-port" title="DATA_BUS_OUT">
                    <span className="port-label">BUS_OUT</span>
                    <span className="port-node"></span>
                  </div>
                </div>
              </div>

              {/* ═══════════ BUS 1: DATA TRANSMISSION CONDUIT (CODE → CORE) ═══════════ */}
              <div className="wb-conduit conduit-left" aria-hidden="true">
                <svg
                  className="conduit-svg"
                  viewBox="0 0 120 80"
                  preserveAspectRatio="none"
                >
                  {/* Multi-lane circuit traces */}
                  <path
                    className="conduit-path-bg"
                    d="M 0,20 L 50,20 L 70,40 L 120,40"
                  />
                  <path
                    className="conduit-path-bg"
                    d="M 0,40 L 40,40 L 60,40 L 120,40"
                  />
                  <path
                    className="conduit-path-bg"
                    d="M 0,60 L 50,60 L 70,40 L 120,40"
                  />

                  <path
                    className="conduit-path-active p-left-1"
                    d="M 0,20 L 50,20 L 70,40 L 120,40"
                  />
                  <path
                    className="conduit-path-active p-left-2"
                    d="M 0,40 L 40,40 L 60,40 L 120,40"
                  />
                  <path
                    className="conduit-path-active p-left-3"
                    d="M 0,60 L 50,60 L 70,40 L 120,40"
                  />

                  {/* Traveling Data Packets */}
                  <circle className="data-packet pkt-1" r="3">
                    <animateMotion
                      dur="1.8s"
                      repeatCount="indefinite"
                      path="M 0,20 L 50,20 L 70,40 L 120,40"
                    />
                  </circle>
                  <circle className="data-packet pkt-2" r="2.5">
                    <animateMotion
                      dur="2.2s"
                      begin="0.6s"
                      repeatCount="indefinite"
                      path="M 0,40 L 40,40 L 60,40 L 120,40"
                    />
                  </circle>
                  <circle className="data-packet pkt-3" r="3">
                    <animateMotion
                      dur="2.5s"
                      begin="1.2s"
                      repeatCount="indefinite"
                      path="M 0,60 L 50,60 L 70,40 L 120,40"
                    />
                  </circle>
                </svg>
                <div className="conduit-label">DATA BUS // TX &rarr;</div>
              </div>

              {/* ═══════════ CENTER: CODECRAFT CORE (ENGINEERING CENTERPIECE) ═══════════ */}
              <div className="wb-col wb-col-core" id="wb-core">
                <div
                  className="core-assembly"
                  id="core-assembly"
                  data-cursor="[CORE]"
                >
                  {/* Ambient Core Aura */}
                  <div className="core-aura" aria-hidden="true"></div>

                  {/* Rotating Outer Technical Rings */}
                  <svg
                    className="core-tech-ring ring-outer"
                    viewBox="0 0 280 280"
                    aria-hidden="true"
                  >
                    <circle cx="140" cy="140" r="134" className="ring-track" />
                    <circle cx="140" cy="140" r="134" className="ring-dashes" />
                    <circle
                      cx="140"
                      cy="140"
                      r="126"
                      className="ring-reticle"
                    />
                  </svg>

                  {/* Counter-rotating Inner Gear Ring */}
                  <svg
                    className="core-tech-ring ring-inner"
                    viewBox="0 0 240 240"
                    aria-hidden="true"
                  >
                    <circle cx="120" cy="120" r="112" className="ring-track" />
                    <circle
                      cx="120"
                      cy="120"
                      r="112"
                      className="ring-gear-teeth"
                    />
                  </svg>

                  {/* Core Chassis with CODECRAFT Emblem */}
                  <div className="core-chassis" id="core-chassis">
                    <div className="chassis-inner">
                      <img
                        src={logoSrc}
                        alt="CODECRAFT Core Emblem"
                        className="core-logo-img"
                        width="84"
                        height="84"
                        loading="eager"
                      />
                      <div
                        className="core-energy-flare"
                        aria-hidden="true"
                      ></div>
                    </div>
                    {/* Technical Node Pins on Core */}
                    <div className="core-pin pin-left" aria-hidden="true"></div>
                    <div
                      className="core-pin pin-right"
                      aria-hidden="true"
                    ></div>
                    <div className="core-pin pin-top" aria-hidden="true"></div>
                    <div
                      className="core-pin pin-bottom"
                      aria-hidden="true"
                    ></div>
                  </div>

                  {/* Center Identity & Telemetry Tag */}
                  <div className="core-telemetry">
                    <span className="tele-dot"></span>
                    <span className="tele-text">CODECRAFT_CORE</span>
                  </div>
                </div>
              </div>

              {/* ═══════════ BUS 2: CIRCUIT TRACE CONDUIT (HARDWARE → CORE) ═══════════ */}
              <div className="wb-conduit conduit-right" aria-hidden="true">
                <svg
                  className="conduit-svg"
                  viewBox="0 0 120 80"
                  preserveAspectRatio="none"
                >
                  {/* Multi-lane circuit traces converging inward from hardware (120) to center core (0,40) */}
                  <path
                    className="conduit-path-bg gold"
                    d="M 120,20 L 70,20 L 50,40 L 0,40"
                  />
                  <path
                    className="conduit-path-bg gold"
                    d="M 120,40 L 80,40 L 60,40 L 0,40"
                  />
                  <path
                    className="conduit-path-bg gold"
                    d="M 120,60 L 70,60 L 50,40 L 0,40"
                  />

                  <path
                    className="conduit-path-active gold p-right-1"
                    d="M 120,20 L 70,20 L 50,40 L 0,40"
                  />
                  <path
                    className="conduit-path-active gold p-right-2"
                    d="M 120,40 L 80,40 L 60,40 L 0,40"
                  />
                  <path
                    className="conduit-path-active gold p-right-3"
                    d="M 120,60 L 70,60 L 50,40 L 0,40"
                  />

                  {/* Traveling Circuit Electric Pulses flowing inward to center core */}
                  <circle className="circuit-pulse cp-1" r="3">
                    <animateMotion
                      dur="1.8s"
                      repeatCount="indefinite"
                      path="M 120,20 L 70,20 L 50,40 L 0,40"
                    />
                  </circle>
                  <circle className="circuit-pulse cp-2" r="2.5">
                    <animateMotion
                      dur="2.2s"
                      begin="0.6s"
                      repeatCount="indefinite"
                      path="M 120,40 L 80,40 L 60,40 L 0,40"
                    />
                  </circle>
                  <circle className="circuit-pulse cp-3" r="3">
                    <animateMotion
                      dur="2.5s"
                      begin="1.2s"
                      repeatCount="indefinite"
                      path="M 120,60 L 70,60 L 50,40 L 0,40"
                    />
                  </circle>
                </svg>
                <div className="conduit-label">&larr; CIRCUIT BUS // TX</div>
              </div>

              {/* ═══════════ RIGHT: PHYSICAL HARDWARE / MCU MODULE ═══════════ */}
              <div className="wb-col wb-col-hardware" id="wb-hardware">
                <div
                  className="wb-panel hardware-module"
                  data-cursor="[CIRCUIT]"
                >
                  {/* Bus Port Output (Towards Center Core) */}
                  <div className="hw-bus-port" title="CIRCUIT_BUS_OUT">
                    <span className="port-node gold"></span>
                    <span className="port-label gold">BUS_OUT</span>
                  </div>

                  {/* PCB Header */}
                  <div className="hw-header-bar">
                    <span className="hw-pcb-label">PCB // HARDWARE_SYS</span>
                    <div className="hw-header-leds">
                      <span
                        className="hw-led led-pwr"
                        title="Power: 3.3V [ACTIVE]"
                      ></span>
                      <span className="hw-led led-tx" title="TX Bus"></span>
                      <span className="hw-led led-rx" title="RX Bus"></span>
                    </div>
                  </div>

                  {/* Microcontroller IC Architecture */}
                  <div className="mcu-chip-wrapper">
                    {/* Perimeter IC Pins */}
                    <div className="ic-pins pins-top" aria-hidden="true">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="ic-pins pins-bottom" aria-hidden="true">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="ic-pins pins-left" aria-hidden="true">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="ic-pins pins-right" aria-hidden="true">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>

                    {/* Central Silicon Package */}
                    <div className="mcu-package">
                      <div className="mcu-silicon-index"></div>
                      <div className="mcu-engraving">
                        <span className="engrave-mfr">ARM CORTEX-M4</span>
                        <span className="engrave-model">CC-2026-MCU</span>
                        <span className="engrave-clock">240MHz // 512KB</span>
                      </div>
                    </div>
                  </div>

                  {/* SMD Components & PCB Geometry */}
                  <div className="pcb-components" aria-hidden="true">
                    {/* Crystal Oscillator */}
                    <div className="smd-crystal">
                      <span>16.000</span>
                    </div>
                    {/* Decoupling Capacitors & Resistors */}
                    <div className="smd-cap cap-1"></div>
                    <div className="smd-cap cap-2"></div>
                    <div className="smd-res res-1">
                      <span>103</span>
                    </div>
                    {/* Test Pads */}
                    <div className="test-pad tp-1" title="TP_GPIO"></div>
                    <div className="test-pad tp-2" title="TP_CLK"></div>
                  </div>

                  {/* Pinout Footer */}
                  <div className="hw-pinout-bar">
                    <span className="pin-tag">3V3</span>
                    <span className="pin-tag">GND</span>
                    <span className="pin-tag">SDA</span>
                    <span className="pin-tag">SCL</span>
                    <span className="pin-tag active">IO_01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <motion.div
          className="stats-bar"
          role="region"
          aria-label="Event stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="wrap stats-bar-inner">
            {[
              { target: 3500, suffix: "₹", label: "Prize Pool" },
              { target: 4, suffix: "", label: "Max Team Size" },
              { target: 26, suffix: " Days", label: "Event Duration" },
              { target: null, display: "100%", label: "Live Demo Required" },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="stat-divider" aria-hidden="true" />}
                <motion.div
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.1, ...springSmooth }}
                >
                  <span className="stat-value">
                    {stat.target !== null ? (
                      <>
                        {stat.suffix === "₹" ? "₹" : ""}
                        <AnimatedCounter
                          target={stat.target}
                          suffix={stat.suffix === "₹" ? "" : stat.suffix}
                        />
                      </>
                    ) : (
                      stat.display
                    )}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <SectionDivider />

        {/* ══════════════════════ ABOUT ══ */}
        <section className="section" id="about" aria-labelledby="about-title">
          <div className="wrap">
            <SectionHeader
              kicker="What is CODECRAFT?"
              title="Build. Integrate. Innovate."
              sub="A hackathon where software meets hardware — teams build real, working projects that blend code with circuits."
              id="about-title"
            />

            <motion.div
              className="core-modules-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="core-module"
                  data-index={i + 1}
                  variants={cardVariant}
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    boxShadow: "0 12px 40px rgba(0,242,254,0.15)",
                    borderColor: "rgba(0,242,254,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                  style={{ cursor: "default" }}
                >
                  <div className="cm-glow" />
                  <div className="cm-border-top" />
                  <div className="cm-border-bottom" />
                  <div className="cm-header">
                    <span className="cm-id">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="cm-status">ONLINE</span>
                  </div>
                  <div className="cm-body">
                    <div className="cm-icon-box">
                      <motion.span
                        className="cm-icon"
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 3.5,
                          delay: i * 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {f.icon}
                      </motion.span>
                    </div>
                    <div className="cm-content">
                      <h3 className="cm-title">{f.title}</h3>
                      <p className="cm-desc">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ THEMES ══ */}
        <section
          className="section themes-section"
          id="themes"
          aria-labelledby="themes-title"
        >
          <div className="wrap">
            <SectionHeader
              kicker="[ DOMAINS // HACKATHON TRACKS ]"
              title="HACKATHON THEMES"
              sub="Choose your track. Build cutting-edge software, hardware, or hybrid prototypes across 9 specialized domains."
              id="themes-title"
            />

            <motion.div
              className="themes-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {themes.map((t, i) => (
                <motion.div
                  key={i}
                  className={`theme-card theme-${t.color}`}
                  data-cursor="[THEME]"
                  variants={cardVariant}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow:
                      t.color === "cyan"
                        ? "0 16px 36px -10px rgba(0, 242, 254, 0.35), 0 0 25px rgba(0, 242, 254, 0.15)"
                        : t.color === "gold"
                          ? "0 16px 36px -10px rgba(251, 191, 36, 0.3), 0 0 25px rgba(251, 191, 36, 0.15)"
                          : t.color === "red"
                            ? "0 16px 36px -10px rgba(239, 68, 68, 0.3), 0 0 25px rgba(239, 68, 68, 0.15)"
                            : t.color === "purple"
                              ? "0 16px 36px -10px rgba(168, 85, 247, 0.3), 0 0 25px rgba(168, 85, 247, 0.15)"
                              : t.color === "green"
                                ? "0 16px 36px -10px rgba(46, 213, 115, 0.3), 0 0 25px rgba(46, 213, 115, 0.15)"
                                : t.color === "blue"
                                  ? "0 16px 36px -10px rgba(59, 130, 246, 0.3), 0 0 25px rgba(59, 130, 246, 0.15)"
                                  : "0 16px 36px -10px rgba(249, 115, 22, 0.3), 0 0 25px rgba(249, 115, 22, 0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                >
                  {/* Corner circuit brackets */}
                  <div className="tc-corner tc-corner-tl" aria-hidden="true" />
                  <div className="tc-corner tc-corner-tr" aria-hidden="true" />
                  <div className="tc-corner tc-corner-bl" aria-hidden="true" />
                  <div className="tc-corner tc-corner-br" aria-hidden="true" />

                  {/* Top scanline accent */}
                  <div className="tc-scanline" aria-hidden="true" />

                  <div className="tc-header">
                    <span className="tc-code">{t.code}</span>
                    <span className={`tc-tag tag-${t.color}`}>[{t.tag}]</span>
                  </div>

                  <div className="tc-body">
                    <div className="tc-icon-wrap">
                      <motion.span
                        className="tc-icon"
                        animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.08, 1] }}
                        transition={{
                          duration: 3,
                          delay: i * 0.25,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {t.icon}
                      </motion.span>
                      <div className="tc-icon-glow" aria-hidden="true" />
                    </div>
                    <div className="tc-text-content">
                      <h3 className="tc-title">{t.title}</h3>
                      <p className="tc-desc">{t.desc}</p>
                    </div>
                  </div>

                  <div className="tc-footer">
                    <span className="tc-status-dot"></span>
                    <span className="tc-status-text">
                      TRACK ACTIVE // ACCEPTING SUBMISSIONS
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ PRIZES ══ */}
        <section className="section" id="prizes" aria-labelledby="prizes-title">
          <div className="wrap">
            <SectionHeader
              kicker="Rewards"
              title="Prize Pool"
              sub="Total Prize Pool: ₹3,500 + Certificates for all participants"
              id="prizes-title"
            />

            <motion.div
              className="bounty-podium"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {prizes.map((p) => (
                <motion.div
                  key={p.rank}
                  className={`bounty-card rank-${p.rank}`}
                  data-rank={p.rank}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 40 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        ...springBouncy,
                        delay: (p.rank - 1) * 0.12,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow:
                      p.rank === 1
                        ? "0 20px 60px rgba(251,191,36,0.3)"
                        : p.rank === 2
                          ? "0 20px 60px rgba(148,163,184,0.3)"
                          : "0 20px 60px rgba(180,83,9,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  <div className="bc-glitch-layer" aria-hidden="true" />
                  <div className="bc-content">
                    <motion.div
                      className="bc-rank-badge"
                      initial={{ rotateY: -90 }}
                      whileInView={{ rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (p.rank - 1) * 0.2 + 0.3,
                        ...springBouncy,
                      }}
                    >
                      0{p.rank}
                    </motion.div>
                    <motion.div
                      className="bc-medal"
                      animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
                      transition={{
                        duration: 3 + p.rank * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {p.emoji}
                    </motion.div>
                    <div className="bc-place">{p.place} BOUNTY</div>
                    <div className="bc-amount">{p.amount}</div>
                    <div className="bc-hex-bg" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              style={{
                textAlign: "center",
                color: "var(--c-muted)",
                fontSize: "0.9rem",
                marginTop: "2rem",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              🏆 All participants receive digital certificates of participation
            </motion.p>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ TIMELINE ══ */}
        <RoadTimeline timelineStops={timelineStops} />

        <SectionDivider />

        {/* ══════════════════════ RULES ══ */}
        <section className="section" id="rules" aria-labelledby="rules-title">
          <div className="wrap">
            <SectionHeader
              kicker="Compliance // Operational Standards"
              title="System Protocols"
              sub="Official regulatory directives. All registered engineering nodes must adhere to maintain validation."
              id="rules-title"
            />

            <ProtocolsAccordion />
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ SUBMISSION ══ */}
        <section
          className="section"
          id="submission"
          aria-labelledby="submission-title"
        >
          <div className="wrap">
            <SectionHeader
              kicker="Deliverables"
              title="Submission Requirements"
              sub="Submit between 10–20 September. Include all mandatory materials."
              id="submission-title"
            />

            <motion.div
              className="payload-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {submissionRequirements.map((req, i) => (
                <motion.div
                  key={i}
                  className={`payload-card pc-${req.color}`}
                  variants={cardVariant}
                  whileHover={{
                    scale: 1.04,
                    y: -5,
                    boxShadow:
                      req.color === "orange"
                        ? "0 12px 40px rgba(255,140,66,0.2)"
                        : "0 12px 40px rgba(79,172,254,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  <div className="pc-accents">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="pc-top">
                    <span className={`pc-tag ptag-${req.tag.toLowerCase()}`}>
                      [{req.tag}]
                    </span>
                    <motion.span
                      className="pc-icon"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {req.icon}
                    </motion.span>
                  </div>
                  <h3 className="pc-title">{req.title}</h3>
                  <p className="pc-desc">{req.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="payload-tips"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, ...springSmooth }}
            >
              <div className="pt-block">
                <div className="pt-head">
                  <span className="pt-icon">📝</span>
                  <span className="pt-title">FORMAT_REQ // PPT</span>
                </div>
                <div className="pt-list">
                  {[
                    "Maximum 15 slides",
                    "Include problem statement & solution",
                    "Add team member details",
                    "Showcase hardware-software integration",
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      className="pt-item"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, ...springSmooth }}
                    >
                      <span className="pt-bullet">&gt;</span> {tip}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="pt-block">
                <div className="pt-head">
                  <span className="pt-icon">💡</span>
                  <span className="pt-title">SYS_TIPS // PRO</span>
                </div>
                <div className="pt-list">
                  {[
                    "Clearly explain your innovation",
                    "Include diagrams and flowcharts",
                    "Mention technologies used",
                    "Highlight real-world applications",
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      className="pt-item"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, ...springSmooth }}
                    >
                      <span className="pt-bullet">&gt;</span> {tip}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ ORGANIZERS ══ */}
        <section
          className="section org-section-wrap"
          id="organizers"
          aria-labelledby="organizers-title"
        >
          {/* Subtle technical background grid */}
          <div className="org-bg-grid" aria-hidden="true" />

          <div className="wrap">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={springSmooth}
            >
              <div className="org-header-badge">
                <span className="ohb-decor left" aria-hidden="true" />
                <p className="section-kicker">[ THE MINDS BEHIND CODECRAFT ]</p>
                <span className="ohb-decor right" aria-hidden="true" />
              </div>
              <h2 className="section-title" id="organizers-title">
                OUR CORE TEAM
              </h2>
              <p className="section-sub">
                Driven by passion. Built for impact.
              </p>
            </motion.div>

            <motion.div
              className="org-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {organizers.map((org, i) => (
                <motion.div
                  key={i}
                  className={`org-card${i === 0 ? " is-lead" : ""}`}
                  style={{ ["--i" as string]: i }}
                  data-cursor="[PROFILE]"
                  variants={cardVariant}
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 16px 40px -8px rgba(0,242,254,0.25), 0 0 28px rgba(0,242,254,0.12)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                >
                  {/* Corner circuit ticks */}
                  <div
                    className="org-corner org-corner-tl"
                    aria-hidden="true"
                  />
                  <div
                    className="org-corner org-corner-tr"
                    aria-hidden="true"
                  />
                  <div
                    className="org-corner org-corner-bl"
                    aria-hidden="true"
                  />
                  <div
                    className="org-corner org-corner-br"
                    aria-hidden="true"
                  />

                  {/* Scanline */}
                  <div className="org-scanline" aria-hidden="true" />

                  {/* Portrait */}
                  <div className="org-portrait-wrap">
                    <div
                      className="org-portrait-spotlight"
                      aria-hidden="true"
                    />

                    {/* Animated cyber ring */}
                    <svg
                      className="org-portrait-ring"
                      viewBox="0 0 160 160"
                      aria-hidden="true"
                    >
                      <circle cx="80" cy="80" r="74" className="ring-track" />
                      <circle cx="80" cy="80" r="74" className="ring-segment" />
                      <circle
                        cx="80"
                        cy="80"
                        r="69"
                        className="ring-inner-ticks"
                      />
                    </svg>

                    {/* Cardinal reticle ticks */}
                    <div
                      className="org-reticle-tick tick-top"
                      aria-hidden="true"
                    />
                    <div
                      className="org-reticle-tick tick-bottom"
                      aria-hidden="true"
                    />
                    <div
                      className="org-reticle-tick tick-left"
                      aria-hidden="true"
                    />
                    <div
                      className="org-reticle-tick tick-right"
                      aria-hidden="true"
                    />

                    {/* Photo frame */}
                    <div className="org-portrait-frame">
                      {org.imageUrl ? (
                        <img
                          src={
                            typeof org.imageUrl === "string"
                              ? org.imageUrl
                              : (org.imageUrl as { src: string }).src
                          }
                          alt={org.name}
                          className="org-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="org-init">{org.init}</div>
                      )}
                    </div>
                  </div>

                  {/* Identity details */}
                  <div className="org-details">
                    <p className="org-role-label">Organizer</p>
                    <h3 className="org-name">{org.name}</h3>
                    <div className="org-divider">
                      <span className="org-divider-line" />
                      <span className="org-divider-node" />
                      <span className="org-divider-line" />
                    </div>
                  </div>

                  {/* Social buttons */}
                  <div className="org-socials">
                    <motion.a
                      href={org.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${org.name} GitHub`}
                      className="org-social-btn"
                      whileHover={{
                        y: -2,
                        boxShadow: "0 0 14px rgba(0,242,254,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={springSnappy}
                    >
                      <span className="org-btn-text">GitHub</span>
                    </motion.a>
                    <motion.a
                      href={org.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${org.name} LinkedIn`}
                      className="org-social-btn"
                      whileHover={{
                        y: -2,
                        boxShadow: "0 0 14px rgba(0,242,254,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={springSnappy}
                    >
                      <span className="org-btn-text">LinkedIn</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom system message */}
            <motion.div
              className="org-system-message"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...springSmooth, delay: 0.3 }}
            >
              <div className="osm-line osm-left" aria-hidden="true" />
              <div className="osm-badge">
                <span className="osm-bracket">&#123;</span>
                <span className="osm-text">
                  TOGETHER WE CODE. TOGETHER WE CREATE.
                </span>
                <span className="osm-bracket">&#125;</span>
              </div>
              <div className="osm-line osm-right" aria-hidden="true" />
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════ CONTACT ══ */}
        <section
          className="section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap">
            <motion.div
              className="support-terminal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springSmooth }}
            >
              <div className="st-header">
                <span className="st-dot r" />
                <span className="st-dot y" />
                <span className="st-dot g" />
                <span className="st-title">COMM_LINK // SECURE_CHANNEL</span>
              </div>

              <div className="st-body">
                <div className="st-left">
                  <motion.p
                    className="st-prompt"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    &gt; ping --support_protocol...
                  </motion.p>
                  <h2 className="st-heading" id="contact-title">
                    SYSTEM SUPPORT
                  </h2>
                  <p className="st-desc">
                    Direct uplink established to lead architects. Initiate voice
                    protocol if assistance is required.
                  </p>
                  <div className="st-status">
                    <span className="status-indicator" />
                    NODE ONLINE
                  </div>
                </div>

                <div className="st-right">
                  {[
                    {
                      tel: "+918473868464",
                      name: "Ayush Choudhary",
                      num: "+91 8473 868 464",
                    },
                    {
                      tel: "+919382770196",
                      name: "Debankan Dutta",
                      num: "+91 9382 770 196",
                    },
                    {
                      tel: "+919832577462",
                      name: "Rahidul Khan",
                      num: "+91 9832 577 462",
                    },
                  ].map((contact, i) => (
                    <motion.a
                      key={i}
                      href={`tel:${contact.tel}`}
                      className="comm-link"
                      aria-label={`Call ${contact.name}`}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.15, ...springSmooth }}
                      whileHover={{
                        x: 8,
                        backgroundColor: "rgba(0,242,254,0.06)",
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="comm-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="comm-data">
                        <span className="comm-name">{contact.name}</span>
                      </div>
                      <div className="comm-action">
                        <span>CONNECT</span>
                        <svg
                          viewBox="0 0 16 16"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

// ─── Road Timeline (winding-road SVG, date-driven) ──────────────────────────
function RoadTimeline({ timelineStops }: { timelineStops: TimelineItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealElements = sectionRef.current
      ? Array.from(
          sectionRef.current.querySelectorAll<HTMLElement>(
            ".reveal, .reveal-stagger",
          ),
        )
      : [];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealElements.forEach((element) => revealObserver.observe(element));

    const TL_EVENTS = timelineStops.map(({ title, isoDate }) => ({
      title,
      date: `${isoDate}T00:00:00+05:30`,
    }));
    const TL_COUNT = TL_EVENTS.length;
    const EVENT_MS = TL_EVENTS.map((e) => new Date(e.date).getTime());
    const START_MS = EVENT_MS[0];
    const END_MS = EVENT_MS[TL_COUNT - 1];

    const roadSvg = document.getElementById("road-svg") as SVGSVGElement | null;
    const roadDone = document.getElementById("road-done");
    const roadCarGroup = document.getElementById("road-car-group");
    const roadCarChassis = document.getElementById("road-car");
    const carLiveDateVal = document.getElementById("car-live-date-val");
    const rpbFill = document.getElementById("rpb-fill");
    const rpbPct = document.getElementById("rpb-pct");
    const rpbStatus = document.getElementById("rpb-mission-status");
    const cpGroups = roadSvg
      ? Array.from(roadSvg.querySelectorAll(".road-cp"))
      : [];
    const roadCards = Array.from(
      document.querySelectorAll<HTMLElement>(".road-event-card"),
    );
    const roadPath = document.getElementById(
      "road-base",
    ) as SVGPathElement | null;
    const finishCelebration = document.getElementById("finish-celebration");

    const mcCurrentDate = document.getElementById("mc-current-date");
    const mcTimelineStage = document.getElementById("mc-timeline-stage");
    const mcProgressVal = document.getElementById("mc-progress-val");

    const rpbFillM = document.getElementById("rpb-fill-m");
    const rpbPctM = document.getElementById("rpb-pct-m");
    const rpbStatusM = document.getElementById("rpb-mission-status-m");
    const rmCarWrap = document.querySelector<HTMLElement>(".rm-car-wrap");
    const rmLiveDateVal = document.querySelector(".rm-live-date-val");
    const rmStepEls: any[] = [];
    for (let i = 0; i < TL_COUNT; i++) {
      rmStepEls.push({
        step: document.getElementById(`rm-step-${i}`),
        node: document.getElementById(`rm-node-${i}`),
        card: document.getElementById(`rm-card-${i}`),
        status: document.getElementById(`rm-status-${i}`),
        fill: document.getElementById(`rm-fill-${i}`),
      });
    }

    const CP_FRACTIONS = [0.0845, 0.2646, 0.5209, 0.7539, 0.9437, 1.0];

    function getNow() {
      try {
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get("date") || params.get("testDate");
        if (dateParam) {
          const d = new Date(dateParam);
          if (!isNaN(d.getTime())) return d;
        }
      } catch (_) {}
      return new Date();
    }

    function calcRoadCurveFraction(now = new Date()) {
      const nowMs = now.getTime();
      if (nowMs <= START_MS) return 0.0;
      if (nowMs >= END_MS) return 1.0;

      for (let i = 0; i < TL_COUNT - 1; i++) {
        const segStart = EVENT_MS[i];
        const segEnd = EVENT_MS[i + 1];
        if (nowMs >= segStart && nowMs < segEnd) {
          const segElapsed = nowMs - segStart;
          const segDuration = segEnd - segStart;
          const segFraction = segElapsed / segDuration;
          return (
            CP_FRACTIONS[i] +
            segFraction * (CP_FRACTIONS[i + 1] - CP_FRACTIONS[i])
          );
        }
      }
      return 1.0;
    }

    function calcDisplayProgressPct(now = new Date()) {
      const nowMs = now.getTime();
      if (nowMs <= START_MS) return 0;
      if (nowMs >= END_MS) return 100;
      return Math.max(
        0,
        Math.min(100, ((nowMs - START_MS) / (END_MS - START_MS)) * 100),
      );
    }

    function calcEventStatuses(now = new Date()) {
      const nowMs = now.getTime();
      return TL_EVENTS.map((evt, idx) => {
        const eventStart = EVENT_MS[idx];
        const activeEnd =
          idx < TL_COUNT - 1
            ? EVENT_MS[idx + 1]
            : new Date(
                `${timelineStops[TL_COUNT - 1].isoDate}T23:59:59+05:30`,
              ).getTime();

        if (nowMs >= activeEnd) {
          return { code: "passed", label: "✓ PASSED", icon: "✓" };
        } else if (nowMs >= eventStart && nowMs < activeEnd) {
          return { code: "active", label: "● ACTIVE", icon: "●" };
        } else {
          return {
            code: "upcoming",
            label: "○ UPCOMING",
            icon: String(idx + 1).padStart(2, "0"),
          };
        }
      });
    }

    function updateDesktopCar(t: number) {
      if (!roadPath || !roadCarGroup) return;
      const totalLen = roadPath.getTotalLength();
      const safeT = Math.max(0, Math.min(1, t));
      const pt = roadPath.getPointAtLength(totalLen * safeT);

      const eps = 2.0;
      const ptA = roadPath.getPointAtLength(
        Math.max(0, totalLen * safeT - eps),
      );
      const ptB = roadPath.getPointAtLength(
        Math.min(totalLen, totalLen * safeT + eps),
      );
      const tangentAngle =
        Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x) * (180 / Math.PI);

      roadCarGroup.style.display = "";
      roadCarGroup.setAttribute("transform", `translate(${pt.x},${pt.y})`);
      if (roadCarChassis) {
        roadCarChassis.setAttribute("transform", `rotate(${tangentAngle},0,0)`);
      }

      if (roadDone) {
        const doneLen = totalLen * safeT;
        roadDone.style.strokeDasharray = `${doneLen} ${totalLen}`;
      }
    }

    function positionDesktopElements() {
      if (!roadPath || !roadSvg) return;
      const totalLen = roadPath.getTotalLength();
      const svgRect = roadSvg.getBoundingClientRect();
      const vb = roadSvg.viewBox.baseVal;
      const scaleX = svgRect.width / vb.width;
      const scaleY = svgRect.height / vb.height;

      cpGroups.forEach((g, i) => {
        const pt = roadPath.getPointAtLength(totalLen * CP_FRACTIONS[i]);
        g.setAttribute("transform", `translate(${pt.x},${pt.y})`);
      });

      const container = document.getElementById("road-cards-container");
      if (!container) return;

      roadCards.forEach((card, i) => {
        const pt = roadPath.getPointAtLength(totalLen * CP_FRACTIONS[i]);
        const pxX = pt.x * scaleX;
        const pxY = pt.y * scaleY;
        const isAbove = i === 0 || i === 1 || i === 3 || i === 5;
        const cardH = 92;
        const connH = 34;

        card.style.left = pxX + "px";
        card.style.opacity = "1";

        if (isAbove) {
          const topY = Math.max(12, pxY - cardH - connH);
          card.style.top = topY + "px";
          card.style.transform = "translate(-50%, 0)";
          card.classList.add("card-above-road");
          const conn = card.querySelector<HTMLElement>(".rec-connector");
          if (conn) {
            const actualH = Math.max(16, pxY - (topY + cardH));
            conn.style.height = actualH + "px";
            conn.style.bottom = "-" + actualH + "px";
            conn.style.background =
              "linear-gradient(to top, rgba(0,242,254,0.6), transparent)";
          }
        } else {
          const topY = pxY + connH;
          card.style.top = topY + "px";
          card.style.transform = "translate(-50%, 0)";
          card.classList.add("card-below-road");
          const conn = card.querySelector<HTMLElement>(".rec-connector");
          if (conn) {
            conn.style.height = connH + "px";
            conn.style.top = "-" + connH + "px";
            conn.style.background =
              "linear-gradient(to bottom, rgba(0,242,254,0.6), transparent)";
          }
        }
      });
    }

    function applyDateStates(pct: number, now = new Date()) {
      const statuses = calcEventStatuses(now);
      const isComplete = pct >= 100;
      const statusText = isComplete
        ? "🏁 FINAL MILESTONE REACHED // CODECRAFT COMPLETE"
        : `REAL-TIME DATE PROGRESS · ${Math.round(pct)}% OF JOURNEY ELAPSED`;

      for (let i = 0; i < TL_COUNT; i++) {
        const cp = cpGroups[i];
        const card = roadCards[i];
        const statusEl = card ? card.querySelector(".rec-status") : null;
        const st = statuses[i];

        if (cp) {
          cp.classList.remove("cp-completed", "cp-current", "cp-upcoming");
          const icon = cp.querySelector(".cp-icon");
          if (st.code === "passed") {
            cp.classList.add("cp-completed");
            if (icon) icon.textContent = "✓";
          } else if (st.code === "active") {
            cp.classList.add("cp-current");
            if (icon) icon.textContent = "●";
          } else {
            cp.classList.add("cp-upcoming");
            if (icon) icon.textContent = String(i + 1).padStart(2, "0");
          }
        }

        if (card) {
          card.classList.remove(
            "state-completed",
            "state-current",
            "state-upcoming",
          );
          if (st.code === "passed") card.classList.add("state-completed");
          else if (st.code === "active") card.classList.add("state-current");
          else card.classList.add("state-upcoming");
        }

        if (statusEl) {
          statusEl.classList.remove(
            "status-completed",
            "status-current",
            "status-upcoming",
          );
          statusEl.textContent = st.label;
          if (st.code === "passed") statusEl.classList.add("status-completed");
          else if (st.code === "active")
            statusEl.classList.add("status-current");
          else statusEl.classList.add("status-upcoming");
        }
      }

      if (rpbFill) rpbFill.style.width = `${pct}%`;
      if (rpbPct) rpbPct.textContent = `${Math.round(pct)}%`;
      if (rpbStatus) {
        rpbStatus.textContent = statusText;
        rpbStatus.classList.toggle("mission-complete", isComplete);
      }

      if (finishCelebration) {
        finishCelebration.style.opacity = isComplete ? "1" : "0";
      }

      rmStepEls.forEach(({ node, card, status, fill }, i) => {
        const st = statuses[i];
        if (!node) return;

        node.classList.remove(
          "node-completed",
          "node-current",
          "node-upcoming",
        );
        if (card)
          card.classList.remove(
            "card-completed",
            "card-current",
            "card-upcoming",
          );
        if (status)
          status.classList.remove(
            "status-completed",
            "status-current",
            "status-upcoming",
          );

        if (st.code === "passed") {
          node.classList.add("node-completed");
          if (card) card.classList.add("card-completed");
          if (status) {
            status.textContent = "✓ PASSED";
            status.classList.add("status-completed");
          }
          if (fill) fill.style.height = "100%";
        } else if (st.code === "active") {
          node.classList.add("node-current");
          if (card) card.classList.add("card-current");
          if (status) {
            status.textContent = "● ACTIVE";
            status.classList.add("status-current");
          }
          if (fill) fill.style.height = "50%";
        } else {
          node.classList.add("node-upcoming");
          if (card) card.classList.add("card-upcoming");
          if (status) {
            status.textContent = "○ UPCOMING";
            status.classList.add("status-upcoming");
          }
          if (fill) fill.style.height = "0%";
        }
      });

      if (rmCarWrap) {
        const activeIdx = Math.min(
          TL_COUNT - 1,
          Math.floor((pct / 100) * (TL_COUNT - 0.5)),
        );
        const targetStep = rmStepEls[activeIdx]?.step;
        if (targetStep) {
          const stepRect = targetStep.getBoundingClientRect();
          const parentRect = rmCarWrap.parentElement
            ? rmCarWrap.parentElement.getBoundingClientRect()
            : { top: 0 };
          rmCarWrap.style.transform = `translateY(${
            stepRect.top - parentRect.top - 40
          }px)`;
        }
      }

      if (rpbFillM) rpbFillM.style.width = `${pct}%`;
      if (rpbPctM) rpbPctM.textContent = `${Math.round(pct)}%`;
      if (rpbStatusM) {
        rpbStatusM.textContent = statusText;
        rpbStatusM.classList.toggle("mission-complete", isComplete);
      }
    }

    function updateTelemetryHUD(now = new Date(), pct = 0) {
      const formattedDate = now
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .toUpperCase();
      const shortDate = now
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      if (mcCurrentDate) mcCurrentDate.textContent = `LIVE // ${shortDate}`;
      if (carLiveDateVal) carLiveDateVal.textContent = formattedDate;
      if (rmLiveDateVal) rmLiveDateVal.textContent = formattedDate;

      let stageLabel = "PRE-EVENT // REGISTRATION OPENS 05 SEPT";
      const nowMs = now.getTime();
      if (nowMs < EVENT_MS[0]) {
        const daysToStart = Math.ceil(
          (EVENT_MS[0] - nowMs) / (1000 * 60 * 60 * 24),
        );
        stageLabel = `PRE-EVENT // REGISTRATION OPENS IN ${daysToStart} DAY${
          daysToStart === 1 ? "" : "S"
        }`;
      } else if (nowMs >= EVENT_MS[0] && nowMs < EVENT_MS[1]) {
        stageLabel = "REGISTRATION ACTIVE (UNTIL 20 SEPT)";
      } else if (nowMs >= EVENT_MS[1] && nowMs < EVENT_MS[2]) {
        stageLabel = "PPT SUBMISSIONS & REGISTRATION OPEN";
      } else if (nowMs >= EVENT_MS[2] && nowMs < EVENT_MS[3]) {
        stageLabel = "PPT SUBMISSIONS FINAL WINDOW";
      } else if (nowMs >= EVENT_MS[3] && nowMs < EVENT_MS[4]) {
        stageLabel = "PRE-EVENT CODECRAFT WARMUP";
      } else if (nowMs >= EVENT_MS[4] && nowMs < EVENT_MS[5]) {
        stageLabel = "🔥 EVENT DAY IN SESSION";
      } else if (nowMs >= EVENT_MS[5]) {
        stageLabel = "🏆 AWARD CEREMONY // FINALE";
      }
      if (mcTimelineStage) mcTimelineStage.textContent = stageLabel;
      if (mcProgressVal)
        mcProgressVal.textContent = `DATE PROGRESS: ${Math.round(pct)}%`;
    }

    function processCarTransparency() {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const px = (i / 4) % w;
          const py = Math.floor(i / 4 / w);

          if (r < 32 && g < 32 && b < 32) {
            d[i + 3] = 0;
          }
          if (px > w * 0.78 && py > h * 0.78 && b > 100 && r < 120) {
            d[i + 3] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const transparentUrl = canvas.toDataURL("image/png");
        const carImgs = document.querySelectorAll(
          ".car-image-element, .rm-car-img",
        );
        carImgs.forEach((el: any) => {
          if (el.tagName.toLowerCase() === "image") {
            el.setAttribute("href", transparentUrl);
          } else {
            el.src = transparentUrl;
          }
        });
      };
      img.src = "/timeline-car.png";
    }

    function updateTimeline() {
      const now = getNow();
      const t = calcRoadCurveFraction(now);
      const pct = calcDisplayProgressPct(now);
      updateDesktopCar(t);
      applyDateStates(pct, now);
      updateTelemetryHUD(now, pct);
    }

    let intervalId: ReturnType<typeof setInterval>;
    function init() {
      processCarTransparency();
      positionDesktopElements();
      updateTimeline();
      intervalId = setInterval(updateTimeline, 1000);
    }

    const rafId = requestAnimationFrame(() => requestAnimationFrame(init));
    const handleResize = () => {
      positionDesktopElements();
      updateTimeline();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <section
      className="section tl-section"
      id="timeline"
      aria-labelledby="timeline-title"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="section-header reveal">
          <p className="section-kicker">Schedule // The CODECRAFT Journey</p>
          <h2
            className="section-title glitch-reveal"
            id="timeline-title"
            data-no-scramble
          >
            Event Timeline
          </h2>
          <p className="section-sub">Live Tracking Toward the Award Ceremony</p>
        </div>

        {/* DESKTOP: Winding Road Timeline */}
        <div
          className="road-tl-outer reveal hide-on-mobile"
          id="road-tl-desktop"
          aria-label="Event timeline"
        >
          <svg
            id="road-svg"
            className="road-svg"
            viewBox="0 0 1100 480"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Winding road timeline"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="road-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="car-glow"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="trail-glow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <linearGradient
                id="road-done-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#8e2de2" />
              </linearGradient>
              <linearGradient
                id="headlight-beam-grad"
                x1="0%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#4facfe" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="lamp-cone-down"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="lamp-cone-up"
                x1="0%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ENVIRONMENT LAYER */}
            <g id="road-environment" aria-hidden="true">
              <path
                d="M 20,95 L 60,95 L 65,75 L 110,75 L 115,95 L 180,95 L 190,55 L 240,55 L 250,95 L 390,95 L 400,68 L 440,68 L 450,95 L 610,95 L 620,45 L 680,45 L 690,95 L 840,95 L 850,60 L 900,60 L 910,95 L 1080,95"
                fill="none"
                stroke="rgba(0, 242, 254, 0.09)"
                strokeWidth="1"
              />
              <path
                d="M 260,65 Q 365,115 470,85 Q 570,135 670,80 Q 770,125 870,70"
                fill="none"
                stroke="rgba(0, 242, 254, 0.12)"
                strokeWidth="0.75"
                strokeDasharray="4 6"
              />

              <g transform="translate(260, 50)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="rgba(0,242,254,0.4)"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="3.5" fill="#00f2fe" />
                <polygon
                  points="-12,40 12,40 24,110 -24,110"
                  fill="url(#lamp-cone-down)"
                />
              </g>
              <g transform="translate(470, 430)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-40"
                  stroke="rgba(0,242,254,0.4)"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="3.5" fill="#00f2fe" />
                <polygon
                  points="-12,-40 12,-40 24,-110 -24,-110"
                  fill="url(#lamp-cone-up)"
                />
              </g>
              <g transform="translate(670, 60)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="rgba(0,242,254,0.4)"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="3.5" fill="#00f2fe" />
                <polygon
                  points="-12,40 12,40 24,110 -24,110"
                  fill="url(#lamp-cone-down)"
                />
              </g>
              <g transform="translate(870, 360)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-40"
                  stroke="rgba(0,242,254,0.4)"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="3.5" fill="#00f2fe" />
                <polygon
                  points="-12,-40 12,-40 24,-110 -24,-110"
                  fill="url(#lamp-cone-up)"
                />
              </g>
            </g>

            <path
              d="M 50,240 C 80,240 120,240 170,240 C 270,240 270,100 370,100 C 470,100 470,380 570,380 C 670,380 670,140 770,140 C 870,140 870,300 970,300 C 1000,300 1030,300 1050,300"
              fill="none"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              id="road-base"
              d="M 50,240 C 80,240 120,240 170,240 C 270,240 270,100 370,100 C 470,100 470,380 570,380 C 670,380 670,140 770,140 C 870,140 870,300 970,300 C 1000,300 1030,300 1050,300"
              fill="none"
              stroke="#0f172a"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 50,240 C 80,240 120,240 170,240 C 270,240 270,100 370,100 C 470,100 470,380 570,380 C 670,380 670,140 770,140 C 870,140 870,300 970,300 C 1000,300 1030,300 1050,300"
              fill="none"
              stroke="rgba(0,242,254,0.18)"
              strokeWidth="30"
              strokeLinecap="round"
              filter="url(#road-glow)"
            />
            <path
              id="road-done"
              d="M 50,240 C 80,240 120,240 170,240 C 270,240 270,100 370,100 C 470,100 470,380 570,380 C 670,380 670,140 770,140 C 870,140 870,300 970,300 C 1000,300 1030,300 1050,300"
              fill="none"
              stroke="url(#road-done-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="0 99999"
              opacity="0.95"
              style={{ filter: "drop-shadow(0 0 8px #00f2fe)" }}
            />
            <path
              id="road-dashes"
              d="M 50,240 C 80,240 120,240 170,240 C 270,240 270,100 370,100 C 470,100 470,380 570,380 C 670,380 670,140 770,140 C 870,140 870,300 970,300 C 1000,300 1030,300 1050,300"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="14 16"
            />

            <circle
              cx="50"
              cy="240"
              r="10"
              fill="#0f172a"
              stroke="rgba(0,242,254,0.5)"
              strokeWidth="2"
            />
            <text
              x="50"
              y="270"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              fill="rgba(0,242,254,0.6)"
              letterSpacing="1"
            >
              START
            </text>

            <g id="finish-line">
              <rect
                x="1044"
                y="281"
                width="18"
                height="18"
                rx="2"
                fill="#0f172a"
                stroke="rgba(142,45,226,0.7)"
                strokeWidth="1.5"
              />
              <rect
                x="1044"
                y="281"
                width="9"
                height="9"
                fill="rgba(255,255,255,0.2)"
              />
              <rect
                x="1053"
                y="290"
                width="9"
                height="9"
                fill="rgba(255,255,255,0.2)"
              />
              <text
                x="1053"
                y="322"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="8"
                fill="rgba(142,45,226,0.9)"
                letterSpacing="1"
              >
                FINISH
              </text>
            </g>

            <g
              id="finish-celebration"
              style={{
                opacity: 0,
                transition: "opacity 0.5s ease",
                pointerEvents: "none",
              }}
            >
              <rect
                x="910"
                y="220"
                width="180"
                height="42"
                rx="4"
                fill="rgba(4, 12, 26, 0.95)"
                stroke="#2ed573"
                strokeWidth="1.5"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(46, 213, 115, 0.5))",
                }}
              />
              <text
                x="1000"
                y="238"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="8.5"
                fontWeight="bold"
                fill="#2ed573"
                letterSpacing="0.5"
              >
                🏁 CODECRAFT COMPLETE
              </text>
              <text
                x="1000"
                y="252"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="7"
                fill="#00f2fe"
                letterSpacing="0.5"
              >
                PROCEED TO BOUNTY VAULT ↓
              </text>
            </g>

            <g id="road-checkpoints">
              {timelineStops.map((item, i) => (
                <g
                  key={i}
                  className="road-cp"
                  data-cp-index={i}
                  data-iso-date={item.isoDate}
                  id={`cp-${i}`}
                  style={{ cursor: "pointer" }}
                  data-cursor="[CHECKPOINT]"
                >
                  <circle
                    className="cp-pulse-ring"
                    r="16"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                  <circle
                    className="cp-circle"
                    r="11"
                    fill="#0a1628"
                    stroke="rgba(0,242,254,0.3)"
                    strokeWidth="2"
                  />
                  <text
                    className="cp-icon"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="9"
                    fill="rgba(0,242,254,0.4)"
                    fontFamily="monospace"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}
            </g>

            <g id="road-car-group" style={{ display: "none" }}>
              <ellipse
                id="car-shadow"
                cx="0"
                cy="10"
                rx="40"
                ry="14"
                fill="rgba(0,0,0,0.85)"
                filter="url(#trail-glow)"
              />
              <ellipse
                id="car-trail"
                cx="-8"
                cy="12"
                rx="28"
                ry="9"
                fill="#ff2a00"
                opacity="0.45"
                filter="url(#trail-glow)"
              />

              <g id="road-car" className="road-car-chassis">
                <polygon
                  points="14,-8 100,-60 100,60 14,8"
                  fill="url(#headlight-beam-grad)"
                  opacity="0.6"
                />
                <image
                  href="/timeline-car.png"
                  x="-44"
                  y="-44"
                  width="88"
                  height="88"
                  preserveAspectRatio="xMidYMid meet"
                  className="car-image-element"
                />
              </g>

              <g
                id="car-live-badge"
                className="car-live-badge"
                transform="translate(0, -44)"
              >
                <rect
                  x="-62"
                  y="-12"
                  width="124"
                  height="24"
                  rx="4"
                  fill="rgba(4,12,26,0.95)"
                  stroke="#00f2fe"
                  strokeWidth="1.2"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(0,242,254,0.5))",
                  }}
                />
                <circle cx="-48" cy="-2" r="3" fill="#2ed573">
                  <animate
                    attributeName="opacity"
                    values="1;0.2;1"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="-40"
                  y="0"
                  fontFamily="monospace"
                  fontSize="6.5"
                  fontWeight="bold"
                  fill="#2ed573"
                  letterSpacing="0.8"
                >
                  LIVE NOW
                </text>
                <text
                  id="car-live-date-val"
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="6"
                  fontWeight="bold"
                  fill="#00f2fe"
                  letterSpacing="0.5"
                >
                  02 SEPTEMBER 2026
                </text>
                <polygon points="-4,12 4,12 0,16" fill="#00f2fe" />
              </g>
            </g>
          </svg>

          <div id="road-cards-container" className="road-cards-container">
            {timelineStops.map((item, i) => (
              <div
                key={i}
                className="road-event-card"
                id={`road-card-${i}`}
                data-card-index={i}
                data-iso-date={item.isoDate}
                role="button"
                tabIndex={0}
                aria-label={`${item.date}: ${item.title}`}
                data-cursor="[CHECKPOINT]"
              >
                <div className="rec-connector" id={`rec-conn-${i}`}></div>
                <div className="rec-inner">
                  <div className="rec-top">
                    <span className="rec-date">{item.date}</span>
                    <span className="rec-status" id={`rec-status-${i}`}>
                      UPCOMING
                    </span>
                  </div>
                  <h3 className="rec-title">{item.title}</h3>
                  <p className="rec-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: Vertical Winding Road */}
        <div
          className="road-mobile show-on-mobile"
          id="road-tl-mobile"
          aria-label="Event timeline mobile"
        >
          <div className="rm-car-wrap">
            <div className="rm-live-tag">
              <span className="rm-live-dot">●</span> LIVE NOW:{" "}
              <span className="rm-live-date-val">02 SEPTEMBER 2026</span>
            </div>
            <div className="rm-car" id="rm-car">
              <img
                src="/timeline-car.png"
                alt="Lightning McQueen Timeline Vehicle"
                className="rm-car-img"
                width="54"
                height="54"
              />
            </div>
          </div>
          {timelineStops.map((item, i) => (
            <div
              key={i}
              className="rm-step"
              data-rm-index={i}
              data-iso-date={item.isoDate}
              id={`rm-step-${i}`}
            >
              <div
                className={`rm-road-seg ${
                  i % 2 === 0 ? "seg-right" : "seg-left"
                }`}
              >
                <div className="rm-road-fill" id={`rm-fill-${i}`}></div>
                <div className="rm-road-dash"></div>
              </div>
              <div className="rm-node-wrap">
                <div className="rm-node" id={`rm-node-${i}`}>
                  <span className="rm-node-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rm-node-pulse"></div>
                </div>
              </div>
              <div
                className={`rm-card ${i % 2 === 0 ? "card-r" : "card-l"}`}
                id={`rm-card-${i}`}
              >
                <div className="rm-card-top">
                  <span className="rm-card-date">{item.date}</span>
                  <span className="rm-card-status" id={`rm-status-${i}`}>
                    UPCOMING
                  </span>
                </div>
                <h3 className="rm-card-title">{item.title}</h3>
                <p className="rm-card-desc">{item.desc}</p>
                {i === timelineStops.length - 1 && (
                  <div className="rm-finish">FINISH</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .tl-section { padding-block: clamp(3rem, 8vw, 6rem); overflow: hidden; }
        .road-tl-outer { position: relative; margin-top: 2.5rem; }
        .road-svg { width: 100%; height: auto; display: block; overflow: visible; }
        .road-cards-container { position: absolute; inset: 0; pointer-events: none; }
        @media (prefers-reduced-motion: no-preference) {
          #road-dashes { animation: dash-march 1.5s linear infinite; }
          @keyframes dash-march { to { stroke-dashoffset: -30; } }
        }
        .road-cp .cp-circle { transition: fill 0.4s, stroke 0.4s; }
        .car-image-element {
          filter: drop-shadow(0 4px 12px rgba(255, 42, 0, 0.85));
          pointer-events: none;
          transform-origin: center center;
        }
        .road-car-chassis {
          animation: carEngineIdle 1.2s ease-in-out infinite alternate;
          transform-origin: center center;
        }
        @keyframes carEngineIdle {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0.4px, -0.8px) rotate(0.15deg); }
          100% { transform: translate(-0.4px, 0.4px) rotate(-0.15deg); }
        }
        .rm-car-img {
          width: 54px;
          height: 54px;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(255, 42, 0, 0.85));
          animation: carEngineIdle 1.2s ease-in-out infinite alternate;
        }
        .mc-today-btn {
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          font-weight: 700;
          color: #00f2fe;
          background: rgba(0, 242, 254, 0.1);
          border: 1px solid rgba(0, 242, 254, 0.35);
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.25s ease;
        }
        .mc-today-btn:hover {
          background: rgba(0, 242, 254, 0.25);
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
          color: #fff;
        }
        .mc-today-btn .pulse-icon {
          color: #00f2fe;
          font-size: 0.7rem;
          animation: status-pulse 1.2s infinite;
        }
        .road-cp.cp-completed .cp-circle { fill: rgba(0,242,254,0.15); stroke: #00f2fe; filter: drop-shadow(0 0 6px #00f2fe); }
        .road-cp.cp-current .cp-circle { fill: rgba(0,242,254,0.2); stroke: #00f2fe; stroke-width: 2.5; filter: drop-shadow(0 0 10px #00f2fe); }
        .road-cp.cp-upcoming .cp-circle { fill: #0a1628; stroke: rgba(0,242,254,0.2); }
        .road-cp.cp-completed .cp-icon, .road-cp.cp-current .cp-icon { fill: #00f2fe; }
        .road-cp.cp-upcoming .cp-icon { fill: rgba(148,163,184,0.4); }
        .road-cp.cp-current .cp-pulse-ring { animation: cp-pulse 1.6s ease-out infinite; opacity: 1; }
        @keyframes cp-pulse { 0%{transform:scale(1);opacity:0.9} 100%{transform:scale(2.2);opacity:0} }
        .road-event-card { position:absolute; width:175px; pointer-events:all; cursor:pointer; transform:translate(-50%,0); opacity:0; transition:opacity 0.4s; }
        .road-event-card:focus-visible { outline:1px dashed rgba(0,242,254,0.6); outline-offset:4px; border-radius:4px; }
        .rec-connector { position:absolute; left:50%; width:1px; transform:translateX(-50%); pointer-events:none; }
        .rec-inner { background:rgba(4,10,24,0.92); border:1px solid rgba(0,242,254,0.18); border-radius:5px; padding:0.65rem 0.75rem; backdrop-filter:blur(12px); position:relative; overflow:hidden; transition:border-color 0.3s,box-shadow 0.3s; }
        .rec-inner::before { content:''; position:absolute; top:0; left:0; width:8px; height:8px; border-top:1.5px solid rgba(0,242,254,0.55); border-left:1.5px solid rgba(0,242,254,0.55); }
        .rec-inner::after { content:''; position:absolute; bottom:0; right:0; width:8px; height:8px; border-bottom:1.5px solid rgba(0,242,254,0.2); border-right:1.5px solid rgba(0,242,254,0.2); }
        .rec-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem; gap:4px; }
        .rec-date { font-family:var(--font-mono); font-size:0.67rem; color:rgba(0,242,254,0.75); letter-spacing:0.06em; white-space:nowrap; }
        .rec-status { font-family:var(--font-mono); font-size:0.45rem; letter-spacing:0.1em; padding:1px 4px; border-radius:2px; white-space:nowrap; transition:all 0.4s; }
        .rec-status.status-completed { color:#00f2fe; background:rgba(0,242,254,0.12); }
        .rec-status.status-current { color:#fff; background:rgba(0,242,254,0.3); animation:status-pulse 1.5s ease-in-out infinite; }
        .rec-status.status-upcoming { color:rgba(148,163,184,0.6); background:rgba(148,163,184,0.06); }
        @keyframes status-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .rec-title { font-family:var(--font-mono); font-size:0.62rem; color:#e2e8f0; letter-spacing:0.04em; margin:0 0 0.25rem; text-transform:uppercase; line-height:1.3; }
        .rec-desc { font-size:0.58rem; color:rgba(148,163,184,0.75); line-height:1.5; margin:0; }
        .road-event-card.state-completed .rec-inner { border-color:rgba(0,242,254,0.3); }
        .road-event-card.state-current .rec-inner { border-color:rgba(0,242,254,0.6); box-shadow:0 0 20px rgba(0,242,254,0.2),inset 0 0 15px rgba(0,242,254,0.05); }
        .road-event-card.state-current .rec-title { color:#00f2fe; text-shadow:0 0 8px rgba(0,242,254,0.5); }
        .road-event-card.state-current .rec-date { color:#00f2fe; }
        .road-event-card.state-upcoming .rec-inner { border-color:rgba(0,242,254,0.08); opacity:0.65; }
        .road-event-card.state-upcoming .rec-title { color:rgba(226,232,240,0.55); }
        .road-event-card:hover .rec-inner, .road-event-card.card-selected .rec-inner { border-color:rgba(0,242,254,0.55); box-shadow:0 0 16px rgba(0,242,254,0.15); }
        .road-progress-bar { margin-top:1.5rem; padding:0.75rem 1rem; background:rgba(4,10,24,0.6); border:1px solid rgba(0,242,254,0.12); border-radius:4px; backdrop-filter:blur(8px); }
        .rpb-inner { display:flex; align-items:center; gap:0.75rem; }
        .rpb-label { font-family:var(--font-mono); font-size:0.55rem; color:rgba(0,242,254,0.5); letter-spacing:0.15em; white-space:nowrap; }
        .rpb-track { flex:1; height:4px; background:rgba(0,242,254,0.08); border-radius:2px; overflow:hidden; border:1px solid rgba(0,242,254,0.1); }
        .rpb-fill { height:100%; width:0%; background:linear-gradient(90deg,#00f2fe,#4facfe,#8e2de2); border-radius:2px; transition:width 0.8s cubic-bezier(0.25,1,0.5,1); box-shadow:0 0 8px rgba(0,242,254,0.6); }
        .rpb-pct { font-family:var(--font-mono); font-size:0.7rem; color:#00f2fe; font-weight:700; text-shadow:0 0 8px rgba(0,242,254,0.5); min-width:3em; text-align:right; }
        .rpb-mission-status { margin-top:0.4rem; font-family:var(--font-mono); font-size:0.6rem; color:rgba(0,242,254,0.5); letter-spacing:0.15em; text-align:center; min-height:1em; transition:color 0.4s; }
        .rpb-mission-status.mission-complete { color:#00f2fe; text-shadow:0 0 10px rgba(0,242,254,0.6); animation:status-pulse 2s ease-in-out infinite; }
        .car-live-badge text { pointer-events: none; }
        .road-mobile { display:flex; flex-direction:column; align-items:center; position:relative; padding-bottom:1rem; }
        .rm-car-wrap { display:flex; flex-direction:column; align-items:center; margin-bottom:0.5rem; position:relative; z-index:10; transition:transform 0.8s cubic-bezier(0.25,1,0.5,1); }
        .rm-live-tag { background:rgba(4,10,24,0.95); border:1px solid #00f2fe; padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:0.55rem; color:#00f2fe; margin-bottom:6px; display:flex; align-items:center; gap:4px; white-space:nowrap; box-shadow:0 0 8px rgba(0,242,254,0.4); }
        .rm-live-dot { color:#2ed573; font-size:0.65rem; animation:status-pulse 1.2s infinite; }
        .rm-live-date-val { font-weight:700; color:#fff; }
        .rm-car { filter:drop-shadow(0 0 8px #00f2fe); }
        @media (prefers-reduced-motion: no-preference) { .rm-car { animation:car-bob 2s ease-in-out infinite; } @keyframes car-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} } }
        .rm-step { width:100%; display:grid; grid-template-columns:1fr 44px 1fr; align-items:start; min-height:90px; position:relative; }
        .rm-road-seg { grid-column:2; grid-row:1; width:24px; align-self:stretch; position:relative; background:#0f172a; border-left:1.5px solid rgba(0,242,254,0.2); border-right:1.5px solid rgba(0,242,254,0.2); overflow:visible; }
        .rm-road-fill { position:absolute; top:0; left:0; right:0; height:0%; background:linear-gradient(to bottom,#00f2fe,#4facfe); opacity:0.7; transition:height 0.8s cubic-bezier(0.25,1,0.5,1); box-shadow:0 0 6px rgba(0,242,254,0.5); }
        .rm-road-dash { position:absolute; inset:0; background:repeating-linear-gradient(to bottom,transparent 0px,transparent 8px,rgba(255,255,255,0.18) 8px,rgba(255,255,255,0.18) 14px); }
        @media (prefers-reduced-motion: no-preference) { .rm-road-dash { animation:rm-dash 1.5s linear infinite; } @keyframes rm-dash { to { background-position: 0 -22px; } } }
        .rm-road-seg.seg-right { border-bottom-right-radius:20px; }
        .rm-road-seg.seg-left { border-bottom-left-radius:20px; }
        .rm-node-wrap { grid-column:2; grid-row:1; display:flex; align-items:center; justify-content:center; z-index:3; padding-top:1.5rem; }
        .rm-node { width:36px; height:36px; border-radius:50%; background:#0a1628; border:2px solid rgba(0,242,254,0.25); display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; transition:border-color 0.4s,box-shadow 0.4s; }
        .rm-node-num { font-family:var(--font-mono); font-size:0.55rem; color:rgba(0,242,254,0.4); transition:color 0.4s; }
        .rm-node-pulse { position:absolute; inset:-6px; border-radius:50%; border:1px solid #00f2fe; opacity:0; pointer-events:none; }
        .rm-node.node-completed { border-color:rgba(0,242,254,0.6); background:rgba(0,242,254,0.08); box-shadow:0 0 12px rgba(0,242,254,0.4); }
        .rm-node.node-completed .rm-node-num { color:#00f2fe; }
        .rm-node.node-current { border-color:#00f2fe; background:rgba(0,242,254,0.12); box-shadow:0 0 20px rgba(0,242,254,0.6),inset 0 0 10px rgba(0,242,254,0.1); }
        .rm-node.node-current .rm-node-num { color:#00f2fe; }
        .rm-node.node-current .rm-node-pulse { opacity:1; animation:cp-pulse 1.6s ease-out infinite; }
        .rm-node.node-upcoming { border-color:rgba(0,242,254,0.15); opacity:0.7; }
        .rm-card { padding:0.75rem; border-radius:5px; align-self:center; margin-top:1.25rem; background:rgba(4,10,24,0.85); border:1px solid rgba(0,242,254,0.12); transition:opacity 0.4s,border-color 0.4s; }
        .rm-card.card-r { grid-column:3; grid-row:1; margin-left:0.5rem; }
        .rm-card.card-l { grid-column:1; grid-row:1; margin-right:0.5rem; text-align:right; }
        .rm-card.card-completed { border-color:rgba(0,242,254,0.3); }
        .rm-card.card-current { border-color:rgba(0,242,254,0.6); box-shadow:0 0 16px rgba(0,242,254,0.15); }
        .rm-card.card-upcoming { opacity:0.6; }
        .rm-card-top { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:0.25rem; }
        .rm-card.card-l .rm-card-top { flex-direction:row-reverse; }
        .rm-card-date { font-family:var(--font-mono); font-size:0.55rem; color:rgba(0,242,254,0.7); letter-spacing:0.06em; }
        .rm-card-status { font-family:var(--font-mono); font-size:0.42rem; letter-spacing:0.1em; padding:1px 4px; border-radius:2px; transition:all 0.4s; }
        .rm-card-status.status-completed { color:#00f2fe; background:rgba(0,242,254,0.1); }
        .rm-card-status.status-current { color:#fff; background:rgba(0,242,254,0.28); animation:status-pulse 1.5s ease-in-out infinite; }
        .rm-card-status.status-upcoming { color:rgba(148,163,184,0.5); background:rgba(148,163,184,0.05); }
        .rm-card-title { font-family:var(--font-mono); font-size:0.7rem; color:#e2e8f0; text-transform:uppercase; letter-spacing:0.04em; margin:0 0 0.2rem; line-height:1.3; }
        .rm-card.card-current .rm-card-title { color:#00f2fe; text-shadow:0 0 6px rgba(0,242,254,0.5); }
        .rm-card-desc { font-size:0.62rem; color:rgba(148,163,184,0.7); line-height:1.5; margin:0; }
        .rm-finish { margin-top:0.35rem; font-family:var(--font-mono); font-size:0.6rem; color:rgba(142,45,226,0.8); letter-spacing:0.1em; }
        @media (max-width: 768px) { .hide-on-mobile { display: none !important; } .show-on-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-on-mobile { display: none !important; } .hide-on-mobile { display: block !important; } }
      `}</style>
    </section>
  );
}
