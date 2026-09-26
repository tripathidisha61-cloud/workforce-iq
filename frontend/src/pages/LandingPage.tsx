import React, { useState } from "react";
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
  Play
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string; health: number; risk: string; desc: string }>({
    id: "eng",
    label: "Core Distributed Systems",
    health: 91,
    risk: "Medium",
    desc: "7 Senior Engineers nearing overload threshold. 93% sprint velocity."
  });

  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const interactiveNodes = [
    { id: "eng", label: "Core Distributed Systems", x: 180, y: 110, health: 91, risk: "Medium", desc: "7 Senior Engineers nearing overload threshold. 93% sprint velocity.", color: "#00f0ff" },
    { id: "ai", label: "Applied AI Research", x: 380, y: 80, health: 97, risk: "Low", desc: "98% skill match. High retention index. 4 publications pending.", color: "#3b82f6" },
    { id: "sre", label: "Site Reliability & Cloud", x: 120, y: 260, health: 78, risk: "Critical", desc: "14.2% flight probability. Compensation lag & on-call burnout.", color: "#f43f5e" },
    { id: "prod", label: "Enterprise Product Org", x: 340, y: 240, health: 93, risk: "Low", desc: "Balanced capacity. Fast roadmap throughput. Zero flight risk.", color: "#10b981" },
    { id: "sec", label: "Security & Governance", x: 260, y: 175, health: 95, risk: "Low", desc: "Central orchestrator node. Tamper-proof audit trails intact.", color: "#a855f7" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Top Background Glow mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-radial-gradient pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Modern Public Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-[#121f3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
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

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
              How It Works
            </a>
            <a href="#intelligence" className="hover:text-cyan-400 transition-colors">
              Intelligence Modules
            </a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">
              Scenario Simulator
            </a>
            <a href="#security" className="hover:text-cyan-400 transition-colors">
              Enterprise Security
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/app")}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Sign In
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
            {/* Left Column: Headline, subheadline, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>Workforce Intelligence 2.0 • Autonomous Decision Engine</span>
              </div>

              {/* Exact required headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Turn Workforce Data Into{" "}
                <span className="text-gradient-cyan">Autonomous Decisions.</span>
              </h1>

              {/* Exact required subheadline */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Predict attrition, balance workloads, uncover hidden skills, and orchestrate talent strategy — before problems impact your business.
              </p>

              {/* Action Buttons */}
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
                  href="#simulator"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#091124] border border-[#1d2e5a] hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all"
                >
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Explore Intelligence</span>
                </a>
              </div>

              {/* Trust Callout */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Survey Fatigue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Real-time Telemetry Ingestion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Human-in-the-Loop Governance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Interactive Workforce Intelligence Node Graph */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-[#060c1d]/90 border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl overflow-hidden">
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-4 border-b border-[#132247] pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-slate-200">
                      LIVE ORGANIZATIONAL TOPOLOGY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    5 Chapter Nodes
                  </span>
                </div>

                {/* SVG Graph Canvas */}
                <div className="relative h-72 w-full bg-[#030713] rounded-xl border border-[#0f1b39] overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 350">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Node Connecting lines */}
                    <line x1="260" y1="175" x2="180" y2="110" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                    <line x1="260" y1="175" x2="380" y2="80" stroke="url(#lineGrad)" strokeWidth="2" />
                    <line x1="260" y1="175" x2="120" y2="260" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="260" y1="175" x2="340" y2="240" stroke="url(#lineGrad)" strokeWidth="2" />
                    <line x1="180" y1="110" x2="120" y2="260" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" />

                    {/* Nodes */}
                    {interactiveNodes.map((node) => {
                      const isSelected = selectedNode.id === node.id;
                      return (
                        <g
                          key={node.id}
                          className="cursor-pointer transition-transform hover:scale-110"
                          onClick={() => setSelectedNode(node)}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isSelected ? 20 : 16}
                            fill="#0b1736"
                            stroke={node.color}
                            strokeWidth={isSelected ? 3 : 2}
                            className="transition-all duration-300"
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isSelected ? 8 : 6}
                            fill={node.color}
                          />
                          <text
                            x={node.x}
                            y={node.y + 30}
                            fill="#94a3b8"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {node.label.split(" ")[0]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Node Inspection Card below */}
                <div className="mt-4 p-3 rounded-xl bg-[#091228] border border-[#162752] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{selectedNode.label}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                        selectedNode.risk === "Critical"
                          ? "bg-rose-950 text-rose-300 border border-rose-800"
                          : selectedNode.risk === "Medium"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      }`}
                    >
                      {selectedNode.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">{selectedNode.desc}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Node Health Index: <strong className="text-cyan-400">{selectedNode.health}%</strong></span>
                    <button
                      onClick={() => navigate("/app/employees")}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-sans font-semibold"
                    >
                      <span>Drilldown</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE METRIC TICKERS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">12,482</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Employees Monitored</div>
              <div className="text-[9px] text-cyan-400 font-mono mt-0.5">● Live Telemetry</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">94.7%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Workforce Health</div>
              <div className="text-[9px] text-emerald-400 font-mono mt-0.5">↑ +2.3% this quarter</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">87</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Active AI Signals</div>
              <div className="text-[9px] text-slate-500 font-mono mt-0.5">Continuous ingestion</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">23</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Flight Risks Prevented</div>
              <div className="text-[9px] text-rose-300 font-mono mt-0.5">₹4.8 Cr saved</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#081024]/80 border border-[#152342] text-center col-span-2 md:col-span-1 hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono tracking-tight">91%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Decision Confidence</div>
              <div className="text-[9px] text-sky-300 font-mono mt-0.5">Bayesian validation</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED ENTERPRISE LOGOS */}
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

      {/* 3. THE PROBLEM: TRADITIONAL HR VS WORKFORCEIQ */}
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
            {/* Legacy Approach */}
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
                    Low 34% response rates with high survey fatigue; results arrive 90 days too late to stop key resignations.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <div>
                    <strong className="text-white block">Reactive Exit Interviews:</strong>
                    Discovering compensation mismatch and burnout only after the senior architect has signed with a competitor.
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

            {/* WorkforceIQ Approach */}
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

      {/* 4. HOW THE AI ENGINE WORKS */}
      <section id="how-it-works" className="py-20 border-t border-[#121f3d] bg-[#040815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              ARCHITECTURE & PIPELINE
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
              {
                step: "01",
                title: "Passive Ingestion",
                desc: "Ingests 40+ signals across HRIS, sprint trackers, and communications with strict zero-PII privacy encodings.",
                tag: "Real-time Telemetry"
              },
              {
                step: "02",
                title: "Neural Modeling",
                desc: "Maps talent nodes in a high-dimensional graph, correlating workload burnout with market compensation ratios.",
                tag: "Bayesian Risk Radar"
              },
              {
                step: "03",
                title: "Scenario Simulation",
                desc: "Runs Monte Carlo 'What If' projections to test cost vs retention balance across proposed organizational changes.",
                tag: "Deterministic Optimizer"
              },
              {
                step: "04",
                title: "Governed Orchestration",
                desc: "Delivers vetted 1-click execution workflows to People Ops directors with complete audit trail logging.",
                tag: "Human Authorization"
              }
            ].map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-2xl bg-[#070e24] border border-[#142347] hover:border-cyan-500/40 transition-all duration-300 relative group"
              >
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

      {/* 5. LIVE SIMULATOR PREVIEW BANNER */}
      <section id="simulator" className="py-20 bg-[#060c1d] border-t border-[#121f3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#091533] via-[#0b1c45] to-[#071129] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono border border-cyan-800">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Interactive 'What If' Simulator</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Test Strategic Workforce Decisions Before Spending Millions
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Adjust hiring rates, salary bands, remote work policies, and training budgets. Watch how attrition drops, productivity climbs, and annual capital requirements shift in real time.
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
                  <span>Scenario: Q4 Flex & Retention</span>
                  <span className="text-emerald-400 font-mono">+5% Salary / 50% Remote</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Projected Attrition</span>
                      <span className="font-mono text-emerald-400 font-bold">12.4% → 7.8% (-4.6%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Productivity Yield</span>
                      <span className="font-mono text-cyan-400 font-bold">82.0% → 89.2% (+7.2%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[89%]" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#142345] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Net Cost Impact</span>
                    <span className="text-cyan-300 font-bold">+₹1.2 Cr (ROI 4.8x)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ENTERPRISE SECURITY & PRIVACY */}
      <section id="security" className="py-20 border-t border-[#121f3d] bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              ENTERPRISE COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Institutional-Grade Security & Zero-PII Privacy
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Built from the ground up for strict global compliance, role-based governance, and immutable audit logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-cyan-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">SOC 2 Type II & ISO 27001</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audited controls, end-to-end TLS 1.3 in transit, and AES-256 encryption at rest with customer-managed KMS keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">GDPR & DPDP Indian Privacy Act</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algorithmic de-identification ensures sentiment modeling cannot read individual private messages or violate labor rights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070e24] border border-[#142347]">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Tamper-Proof Audit Trails</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every AI decision recommendation, human sign-off, and configuration change is logged with cryptographic SHA-256 verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 border-t border-[#121f3d] bg-[#040815]">
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
                q: "How does WorkforceIQ predict flight risk without snooping on employee private chats?",
                a: "WorkforceIQ operates on structural organizational metadata, not message content. It correlates sprint velocity over-allocation, calendar meeting density, compensation ratios against market medians, and voluntary code review intervals — completely anonymized."
              },
              {
                q: "Can the AI execute autonomous salary increases or role transfers without human approval?",
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
              <div
                key={idx}
                className="rounded-2xl bg-[#070e24] border border-[#152342] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      faqOpen[idx] ? "rotate-180" : ""
                    }`}
                  />
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

      {/* 8. FINAL CTA BANNER */}
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
                <span>Launch WorkforceIQ Now</span>
                <ArrowRight className="w-4 h-4" />
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
            <span>© 2026 Autonomous HR Intelligence Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a href="#security" className="hover:text-cyan-400">Security & Trust</a>
            <a href="#faq" className="hover:text-cyan-400">Documentation</a>
            <span className="text-emerald-400">● Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
