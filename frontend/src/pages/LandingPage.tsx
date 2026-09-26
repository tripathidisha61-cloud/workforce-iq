import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Cpu,
  BarChart3,
  Sliders,
  GitPullRequest,
  Lock,
  Globe,
  Users,
  Compass,
  FileCheck,
  AlertTriangle,
  Play,
  X,
  Send,
  Eye,
  Radar as RadarIcon,
  Award,
  Clock
} from "lucide-react";

interface TopologyNode {
  id: string;
  label: string;
  type?: string;
  x?: number;
  y?: number;
  color?: string;
  metric: string;
  details: string;
  status: "optimal" | "warning" | "critical";
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Animated Counter State
  const [metrics, setMetrics] = useState({
    employees: 0,
    health: 0,
    signals: 0,
    risks: 0,
    confidence: 0,
  });

  // Animated count-up effect
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const steps = 40;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      setMetrics({
        employees: Math.round(progress * 12482),
        health: Number((progress * 94.7).toFixed(1)),
        signals: Math.round(progress * 87),
        risks: Math.round(progress * 23),
        confidence: Math.round(progress * 91),
      });

      if (start >= steps) {
        clearInterval(timer);
        setMetrics({
          employees: 12482,
          health: 94.7,
          signals: 87,
          risks: 23,
          confidence: 91,
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Interactive Visualization Node State
  const [activeNode, setActiveNode] = useState<TopologyNode>({
    id: "risk",
    label: "Risk Engine",
    type: "Predictive Analytics",
    metric: "23 Flight Risks Prevented",
    details: "Identified high flight risk in senior infrastructure engineers due to 93% workload and market compensation deficit.",
    status: "critical"
  });

  // Request Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", company: "", email: "", role: "VP / HR Leader" });

  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // 8 Required Nodes: Employees, Teams, Skills, Performance, Risk, Workload, Attrition, Productivity
  const topologyNodes: TopologyNode[] = [
    { id: "employees", label: "Employees", type: "Workforce", x: 80, y: 80, color: "#38bdf8", metric: "12,482 Active", details: "Aarav Sharma, Rahul Verma, Priya Patel & 12.4K talent profiles tracked.", status: "optimal" },
    { id: "teams", label: "Teams", type: "Organizational Unit", x: 250, y: 50, color: "#3b82f6", metric: "38 Chapters", details: "Core Distributed Systems, AI Research, SRE & Product chapters.", status: "optimal" },
    { id: "skills", label: "Skills", type: "Capabilities", x: 420, y: 90, color: "#00f0ff", metric: "35 Domains", details: "Vector DBs, Python, Distributed Go, Cloud, Cybersecurity.", status: "optimal" },
    { id: "performance", label: "Performance", type: "Output & Velocity", x: 440, y: 220, color: "#10b981", metric: "94.7% Normal", details: "Velocity tracking across Jira sprints & architectural deliverables.", status: "optimal" },
    { id: "risk", label: "Risk", type: "Predictive Analytics", x: 330, y: 300, color: "#f43f5e", metric: "23 Critical", details: "Predictive flight & burnout probabilities calculated 90 days out.", status: "critical" },
    { id: "workload", label: "Workload", type: "Sprint & Capacity", x: 160, y: 310, color: "#f59e0b", metric: "81.4% Avg", details: "12 engineers flagged for sustained >92% sprint load over 60+ days.", status: "warning" },
    { id: "attrition", label: "Attrition", type: "Retention Horizon", x: 60, y: 210, color: "#ec4899", metric: "8.7% Projected", details: "Avoided ₹4.8 Cr replacement cost via early proactive intervention.", status: "warning" },
    { id: "productivity", label: "Productivity", type: "Synthesis Core", x: 250, y: 175, color: "#a855f7", metric: "89.2% Yield", details: "Central intelligence synthesis node correlating signals in real-time.", status: "optimal" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Gradients & Cyber Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-radial-gradient pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-[#121f3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-[#060b16] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-mono text-lg font-black tracking-tight text-white">
                WORKFORCE<span className="text-cyan-400">IQ</span>
              </span>
              <div className="text-[9px] font-mono text-sky-400 tracking-wider">
                AUTONOMOUS ORCHESTRATOR
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#engine" className="hover:text-cyan-400 transition-colors">AI Engine</a>
            <a href="#radar" className="hover:text-cyan-400 transition-colors">Risk Radar</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">Simulator</a>
            <a href="#security" className="hover:text-cyan-400 transition-colors">Security</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Request Demo
            </button>
            <button
              onClick={() => navigate("/app")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] transition-all"
            >
              <span>Launch WorkforceIQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Required exact headline & subheadline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Telemetry Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>● AI Engine Live • Autonomous Workforce Intelligence</span>
              </div>

              {/* Exact required headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Turn Workforce Data Into{" "}
                <span className="text-gradient-cyan">Autonomous Decisions.</span>
              </h1>

              {/* Exact required subheadline */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                WorkforceIQ continuously analyzes people, performance, skills, workload and organizational signals to identify workforce risks and recommend the next best action.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => navigate("/app")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Launch WorkforceIQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#engine"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#091124] border border-[#1d2e5a] hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all"
                >
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Explore Intelligence</span>
                </a>
              </div>

              {/* Live Signal Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Survey Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>90-Day Predictive Horizon</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Human-in-the-Loop Governance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Animated Visualization showing Employees, Teams, Skills, Performance, Risk, Workload, Attrition, Productivity */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-[#060c1d]/90 border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-3 border-b border-[#132247] pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-slate-200">
                      ORGANIZATIONAL SIGNAL TOPOLOGY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    8 Interconnected Nodes
                  </span>
                </div>

                {/* SVG Visual Canvas with animated data lines */}
                <div className="relative h-80 w-full bg-[#030713] rounded-xl border border-[#0f1b39] overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 370">
                    <defs>
                      <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="roseLine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    {/* Animated Connecting Data Lines between nodes */}
                    <line x1="80" y1="80" x2="250" y2="50" stroke="url(#cyanLine)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                    <line x1="250" y1="50" x2="420" y2="90" stroke="url(#cyanLine)" strokeWidth="2" />
                    <line x1="420" y1="90" x2="440" y2="220" stroke="url(#cyanLine)" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="440" y1="220" x2="330" y2="300" stroke="url(#roseLine)" strokeWidth="2.5" />
                    <line x1="330" y1="300" x2="160" y2="310" stroke="url(#roseLine)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="160" y1="310" x2="60" y2="210" stroke="url(#cyanLine)" strokeWidth="2" />
                    <line x1="60" y1="210" x2="80" y2="80" stroke="url(#cyanLine)" strokeWidth="1.5" />

                    {/* Central Synthesis Lines */}
                    <line x1="250" y1="175" x2="80" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" />
                    <line x1="250" y1="175" x2="250" y2="50" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="250" y1="175" x2="420" y2="90" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="250" y1="175" x2="440" y2="220" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="250" y1="175" x2="330" y2="300" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />
                    <line x1="250" y1="175" x2="160" y2="310" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="250" y1="175" x2="60" y2="210" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.5" />

                    {/* Interactive Topology Nodes */}
                    {topologyNodes.map((n) => {
                      const isSelected = activeNode.id === n.id;
                      return (
                        <g
                          key={n.id}
                          className="cursor-pointer transition-transform hover:scale-110"
                          onClick={() => setActiveNode(n)}
                        >
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={isSelected ? 18 : 14}
                            fill="#0b1736"
                            stroke={n.color}
                            strokeWidth={isSelected ? 3 : 2}
                            className="transition-all duration-300"
                          />
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={isSelected ? 8 : 5}
                            fill={n.color}
                          />
                          <text
                            x={n.x}
                            y={n.y + 24}
                            fill={isSelected ? "#00f0ff" : "#94a3b8"}
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {n.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Node Inspection Card below canvas */}
                <div className="mt-3 p-3 rounded-xl bg-[#091228] border border-[#162752] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{activeNode.label} Node</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold border ${
                        activeNode.status === "critical"
                          ? "bg-rose-950 text-rose-300 border-rose-800"
                          : activeNode.status === "warning"
                          ? "bg-amber-950 text-amber-300 border-amber-800"
                          : "bg-emerald-950 text-emerald-300 border-emerald-800"
                      }`}
                    >
                      {activeNode.metric}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">{activeNode.details}</p>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE-LOOKING METRIC TICKERS (COUNT-UP ANIMATION) */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {metrics.employees.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Employees Monitored</div>
              <div className="text-[9px] text-cyan-400 font-mono mt-0.5">● Telemetry Stream</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                {metrics.health}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Workforce Health</div>
              <div className="text-[9px] text-emerald-400 font-mono mt-0.5">Healthy Standard</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
                {metrics.signals}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Active Signals</div>
              <div className="text-[9px] text-slate-500 font-mono mt-0.5">Continuous ingestion</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">
                {metrics.risks}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Critical Risks Prevented</div>
              <div className="text-[9px] text-rose-300 font-mono mt-0.5">₹4.8 Cr avoided</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center col-span-2 md:col-span-1 hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono tracking-tight">
                {metrics.confidence}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Prediction Confidence</div>
              <div className="text-[9px] text-sky-300 font-mono mt-0.5">Bayesian validation</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED WORKFORCE INTELLIGENCE */}
      <section className="py-12 border-y border-[#121f3d] bg-[#02050e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-6">
            Trusted by People Leaders & Engineering Executives Across Modern Tech
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
            {["STRIPE", "DATADOG", "SNOWFLAKE", "FIGMA", "CONFLUENT", "OPENAI ECOSYSTEM"].map((logo) => (
              <span key={logo} className="font-mono text-sm tracking-widest font-black text-slate-400 hover:text-cyan-400 transition-colors">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE WORKFORCE PROBLEM */}
      <section className="py-20 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              PARADIGM SHIFT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Traditional HR Tools Fail Modern Tech Workforces
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Annual surveys and static spreadsheets capture what happened 6 months ago. WorkforceIQ continuously analyzes real-time telemetry to predict and prevent problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#070d1e]/80 border border-rose-950/50 shadow-xl relative">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold mb-4 font-mono text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>THE LEGACY HR DILEMMA</span>
              </div>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <div>
                    <strong className="text-white block">Annual Employee Pulse Surveys:</strong>
                    Low response rates with high survey fatigue; results arrive 90 days too late to stop key resignations.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <div>
                    <strong className="text-white block">Reactive Exit Interviews:</strong>
                    Discovering compensation mismatch and burnout only after top performers have accepted outside offers.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <div>
                    <strong className="text-white block">Siloed Disconnected Systems:</strong>
                    Jira velocity, Workday records, and Slack sentiment sit in disparate databases with zero predictive synthesis.
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0b1633] to-[#070e24] border border-cyan-500/40 shadow-2xl relative glow-cyan">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold mb-4 font-mono text-sm">
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span>WORKFORCEIQ AUTONOMOUS ORCHESTRATION</span>
              </div>
              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Continuous Multi-Source Telemetry:</strong>
                    Synthesizes commit patterns, sprint over-allocation, and comp ratios automatically with zero survey fatigue.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">90-Day Predictive Attrition Modeling:</strong>
                    Identifies flight risks 3 months in advance and prescribes targeted retention packages before frustration peaks.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Human-in-the-Loop Autonomous Loops:</strong>
                    Generates vetted action workflows with tamper-proof sign-offs, executing in Workday and Jira in &lt;30 seconds.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WORKFORCEIQ WORKS */}
      <section id="how-it-works" className="py-20 border-t border-[#121f3d] bg-[#040815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              OPERATING MODEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              The 4-Stage Autonomous Intelligence Loop
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              How WorkforceIQ converts raw organizational noise into audited, high-confidence strategic decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Passive Ingestion", desc: "Ingests 40+ signals across HRIS, sprint trackers, and communications with strict privacy-first architecture.", tag: "Real-time Telemetry" },
              { step: "02", title: "Neural Modeling", desc: "Maps talent nodes in a high-dimensional graph, correlating workload burnout with market compensation ratios.", tag: "Bayesian Risk Radar" },
              { step: "03", title: "Scenario Simulation", desc: "Runs deterministic 'What If' projections to test cost vs retention balance across proposed organizational changes.", tag: "Decision Optimizer" },
              { step: "04", title: "Governed Orchestration", desc: "Delivers vetted 1-click execution workflows to People Ops directors with complete audit trail logging.", tag: "Human Authorization" }
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-[#070e24] border border-[#142347] hover:border-cyan-500/40 transition-all duration-300 relative group">
                <div className="text-3xl font-black font-mono text-cyan-400/40 group-hover:text-cyan-400 transition-colors mb-3">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI INTELLIGENCE ENGINE */}
      <section id="engine" className="py-20 bg-[#060c1d] border-t border-[#121f3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                CORE CAPABILITY
              </span>
              <h3 className="text-3xl font-extrabold text-white">
                Multi-Signal Neural Graph & Causality Modeling
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                WorkforceIQ doesn't look at metrics in isolation. It detects the invisible connections between sprint velocity spikes, delayed promotions, and market compensation disparity before they manifest as flight risk.
              </p>
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-[#0a142c] border border-[#162752] text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Workload Overload Threshold</span>
                  <span className="text-rose-400 font-mono font-bold">&gt;90% for 3+ sprints</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0a142c] border border-[#162752] text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Market Compensation Alert Floor</span>
                  <span className="text-amber-400 font-mono font-bold">&lt;0.92x Market Median</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0a142c] border border-[#162752] text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Predictive Statistical Confidence</span>
                  <span className="text-cyan-400 font-mono font-bold">91% - 96% Bayesian</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#070e24] border border-cyan-500/40 shadow-2xl">
              <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-3 flex items-center justify-between">
                <span>Active Insight Stream</span>
                <span>● Real-time</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#091228] border border-rose-900/40">
                  <div className="flex justify-between text-xs font-bold text-rose-300 mb-1">
                    <span>Attrition risk increased 8.4% in Engineering.</span>
                    <span className="font-mono text-[10px]">91% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    7 senior backend engineers nearing flight threshold. Driver: Sustained workload overload (&gt;90%).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091228] border border-amber-900/40">
                  <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                    <span>12 employees show signs of workload overload.</span>
                    <span className="font-mono text-[10px]">89% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    DevOps & SRE chapters carrying &gt;92% sprint load for 3 consecutive cycles.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091228] border border-blue-900/40">
                  <div className="flex justify-between text-xs font-bold text-cyan-300 mb-1">
                    <span>Critical backend skill gap detected in Team Alpha.</span>
                    <span className="font-mono text-[10px]">93% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    38% deficit in Cloud & Vector DBs required for Q1 enterprise launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WORKFORCE RISK RADAR & SKILLS INTELLIGENCE */}
      <section id="radar" className="py-20 border-t border-[#121f3d] bg-[#040815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              CONTINUOUS RADAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Workforce Risk Radar & Skills Heatmap
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Multi-dimensional monitoring across Attrition, Burnout, Skill Gap, Absenteeism, Productivity, and Compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Risk Radar Preview */}
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <RadarIcon className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Risk Radar</span>
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Hover to Inspect
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Attrition Risk", score: 78, color: "bg-rose-500", note: "14.2% annualized in Engineering tier" },
                  { name: "Burnout & Overload", score: 92, color: "bg-rose-500", note: "12 engineers at >92% sprint load" },
                  { name: "Skill Gap Deficit", score: 64, color: "bg-amber-500", note: "38% gap in Team Alpha cloud stack" },
                  { name: "Productivity Deceleration", score: 45, color: "bg-cyan-400", note: "Test automation debt causing drag" },
                  { name: "Absenteeism & Attendance", score: 22, color: "bg-emerald-400", note: "Stable across regional tech hubs" },
                  { name: "Compliance & Governance", score: 98, color: "bg-emerald-400", note: "Zero audit non-conformances" },
                ].map((risk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{risk.name}</span>
                      <span className="font-mono text-slate-200 font-bold">{risk.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b1736] rounded-full overflow-hidden">
                      <div className={`h-full ${risk.color} rounded-full`} style={{ width: `${risk.score}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{risk.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Intelligence Preview */}
            <div id="skills" className="p-6 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Skills Intelligence Heatmap</span>
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Capability Depth
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { skill: "Python / AI", current: 88, target: 92, gap: -4, status: "Moderate Deficit" },
                  { skill: "AI / ML & Vector DBs", current: 82, target: 90, gap: -8, status: "Critical Gap" },
                  { skill: "Cloud & Kubernetes", current: 74, target: 88, gap: -14, status: "Critical Gap" },
                  { skill: "Cybersecurity Architecture", current: 71, target: 85, gap: -14, status: "Critical Gap" },
                  { skill: "Leadership & Mentorship", current: 78, target: 80, gap: -2, status: "Target Met" },
                  { skill: "Data Analytics & SQL", current: 79, target: 82, gap: -3, status: "Target Met" },
                  { skill: "Communication & Design", current: 86, target: 85, gap: +1, status: "Target Met" },
                ].map((s, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-[#081024] border border-[#132042] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{s.skill}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Current: {s.current}% • Target: {s.target}%
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold border ${
                        s.gap >= 0
                          ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                          : s.gap > -5
                          ? "bg-amber-950 text-amber-300 border-amber-800"
                          : "bg-rose-950 text-rose-300 border-rose-800"
                      }`}
                    >
                      {s.gap >= 0 ? `+${s.gap}%` : `${s.gap}% Gap`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCENARIO SIMULATOR BANNER */}
      <section id="simulator" className="py-20 bg-[#060c1d] border-t border-[#121f3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#091533] via-[#0b1c45] to-[#071129] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono border border-cyan-800">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Workforce Scenario Simulator</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  What Happens If We Change The Workforce?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Adjust hiring rates (+10, +25, +50), salary adjustments (0%, +5%, +10%), remote tiers (0%, 25%, 50%, 75%), training tiers, and sprint workloads. Watch attrition, productivity, and annual cost update dynamically before committing capital.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate("/app/scenarios")}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all"
                  >
                    <span>Launch Scenario Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#030713]/90 rounded-2xl border border-[#162752] p-5">
                <div className="text-[11px] font-mono text-slate-400 uppercase font-bold mb-3 flex items-center justify-between">
                  <span>Scenario Comparison</span>
                  <span className="text-emerald-400 font-mono">+5% Salary / 50% Remote</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-[#091228] border border-[#142345]">
                    <div className="text-[10px] font-mono uppercase text-slate-500">CURRENT</div>
                    <div className="text-xs text-slate-300 mt-1">Attrition: <strong className="text-white">12.4%</strong></div>
                    <div className="text-xs text-slate-300">Productivity: <strong className="text-white">82%</strong></div>
                    <div className="text-xs text-slate-300">Annual Cost: <strong className="text-white">₹48.2 Cr</strong></div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0c1838] border border-cyan-500/40">
                    <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">SIMULATED</div>
                    <div className="text-xs text-emerald-300 mt-1">Attrition: <strong className="text-emerald-400 font-bold">8.7%</strong></div>
                    <div className="text-xs text-cyan-300">Productivity: <strong className="text-cyan-400 font-bold">89%</strong></div>
                    <div className="text-xs text-slate-200">Annual Cost: <strong className="text-amber-400">₹51.4 Cr</strong></div>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200">
                  <strong className="text-cyan-300 block mb-0.5">AI Recommendation:</strong>
                  Optimal Equilibrium: +5% compensation revision combined with 50% remote flexibility delivers 89% productivity while avoiding ₹2.8 Cr in turnover drag.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AUTONOMOUS DECISION ENGINE PREVIEW */}
      <section className="py-20 border-t border-[#121f3d] bg-[#040815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              CLOSED LOOP ORCHESTRATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              From Insight → Decision → Action
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Every organizational signal flows through a structured 7-step interactive pipeline with human governance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 max-w-5xl mx-auto mb-10">
            {[
              "Signal detected",
              "AI analyzes context",
              "Risk calculated",
              "Recommendation generated",
              "Manager approval",
              "Action executed",
              "Outcome measured"
            ].map((st, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-[#091228] border border-cyan-500/30 text-xs font-mono font-bold text-slate-200">
                  {idx + 1}. {st}
                </div>
                {idx < 6 && <span className="text-cyan-400 text-xs font-bold">→</span>}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342] max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-[#142345] pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Live Execution Case</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Engineering Attrition & Sprint Load Rebalancing</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Awaiting Sign-off
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">1. Signal Detected</div>
                <div className="text-slate-200 mt-1">Engineering attrition risk increased 12%.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">2. AI Context Analysis</div>
                <div className="text-slate-200 mt-1">Primary drivers: workload + compensation gap + promotion delay.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">4. Recommendation</div>
                <div className="text-slate-200 mt-1">Initiate retention review for 7 high-risk employees.</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#132042]">
              <span className="text-xs text-slate-400">Governance Gateway: Ready for Human Authorization</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/app/employees")}
                  className="px-3 py-1.5 rounded-lg bg-[#0a142c] hover:bg-[#12224d] text-slate-300 border border-[#162752] text-xs font-semibold"
                >
                  Review Employees
                </button>
                <button
                  onClick={() => navigate("/app/decisions")}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
                >
                  Authorize Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECURITY & PRIVACY */}
      <section id="security" className="py-20 border-t border-[#121f3d] bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              ENTERPRISE GOVERNANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Security & Privacy Architecture
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Engineered with zero-PII telemetry parsing, role-based controls, and cryptographically audited actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-cyan-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Enterprise-Grade Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Role-based access controls (RBAC), end-to-end data encryption in transit and at rest with customer-managed keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Privacy-First Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algorithmic de-identification ensures sentiment modeling does not access personal private messages or violate individual privacy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Explainable AI & Human-in-the-Loop</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every AI decision contains explicit causal drivers and confidence scores. Autonomous actions cannot execute without designated human approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. USE CASES */}
      <section className="py-20 border-t border-[#121f3d] bg-[#040815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              REAL-WORLD IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Built for Modern Technology Organizations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342]">
              <div className="font-bold text-base text-white mb-2">Fast-Scaling Tech Unicorns</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prevent critical departures during sprint surges, align developer compensation against fast-moving market benchmarks, and balance workloads across microservice teams.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342]">
              <div className="font-bold text-base text-white mb-2">Global Engineering Enterprises</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coordinate capability across regional hubs (Bengaluru, Gurugram, Remote), forecast 4-quarter capacity needs, and automate internal talent mobility.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342]">
              <div className="font-bold text-base text-white mb-2">AI & Platform Innovators</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identify acute skill gaps in emerging technologies (Vector DBs, MLOps, LLMs) and launch proactive internal acceleration cohorts before project roadmaps slip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section id="faq" className="py-20 border-t border-[#121f3d] bg-[#030712]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does WorkforceIQ predict flight risk without reading private messages?",
                a: "WorkforceIQ operates strictly on structural metadata: sprint velocity over-allocation, meeting density, compensation ratios against market medians, and code review intervals — completely anonymized with zero-PII ingestion."
              },
              {
                q: "Can the AI execute autonomous salary increases without manager approval?",
                a: "Never. WorkforceIQ enforces Human-in-the-Loop (HITL) governance. The AI calculates optimal interventions, drafts the workflows, and routes them to designated People Ops & Engineering VP roles for cryptographic sign-off before triggering HRIS webhooks."
              },
              {
                q: "How quickly can WorkforceIQ integrate with our current HR stack?",
                a: "Standard enterprise deployments connect via pre-built connectors for Workday, BambooHR, Jira, GitHub Enterprise, and Slack within 48 to 72 hours, delivering initial telemetry signals immediately."
              },
              {
                q: "What statistical confidence intervals does the predictive engine provide?",
                a: "Every signal, prediction, and scenario projection includes an explicit Bayesian confidence score (typically 88% - 96%). High-risk alerts below 85% confidence are routed to background observational hold."
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-[#070e24] border border-[#152342] overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${faqOpen[idx] ? "rotate-180" : ""}`} />
                </button>
                {faqOpen[idx] && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-[#132042] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA BANNER */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#040815] to-[#02050d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-blue-900/40 via-cyan-950/50 to-blue-900/40 border border-cyan-500/40 shadow-2xl backdrop-blur-xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Make Your Workforce Predictable.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Join enterprise technology leaders who have reduced attrition by 42% and reclaimed 1,200 engineering hours per quarter with autonomous intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/app")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch WorkforceIQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#091124] border border-[#1d2e5a] hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <span>Request Demo</span>
              </button>
            </div>
            <div className="mt-6 text-[11px] font-mono text-slate-400">
              Instant Sandbox Access • No Credit Card Required • Enterprise Ready
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-[#121f3d] bg-[#02040a] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white">WORKFORCE<span className="text-cyan-400">IQ</span></span>
            <span>© 2026 Autonomous HR Intelligence & Decision Orchestrator.</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a href="#security" className="hover:text-cyan-400">Security & Privacy</a>
            <a href="#faq" className="hover:text-cyan-400">Documentation</a>
            <span className="text-emerald-400">● Systems Operational</span>
          </div>
        </div>
      </footer>

      {/* Request Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#070e24] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-[#142345] pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Schedule Executive Demonstration</h3>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">30-Minute Architecture & ROI Walkthrough</div>
              </div>
              <button onClick={() => setDemoModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Demonstration Scheduled</div>
                <p className="text-xs text-slate-300">
                  Our Enterprise Solutions Architect will contact {demoForm.email} within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setDemoSubmitted(false);
                    setDemoModalOpen(false);
                    navigate("/app");
                  }}
                  className="mt-4 px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Explore Live Sandbox Now
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. TechCorp Global"
                    value={demoForm.company}
                    onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                    className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="s.jenkins@techcorp.com"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setDemoSubmitted(true)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25"
                  >
                    Confirm Executive Briefing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
