import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Users,
  Compass,
  Sliders,
  ChevronRight,
  RefreshCw,
  Layers,
  MapPin,
  Clock,
  Radar as RadarIcon,
  Briefcase
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { MOCK_INSIGHTS, MOCK_EMPLOYEES, AIInsight } from "../data/mockData";
import { LiveTelemetryTicker } from "../components/LiveTelemetryTicker";
import { sound } from "../utils/sound";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [distributionFilter, setDistributionFilter] = useState<"department" | "location" | "experience" | "skill" | "employment">("department");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Exact 6 categories requested in the prompt
  const radarData = [
    { subject: "Attrition", Engineering: 78, Operations: 45, Product: 25, DataAI: 35, fullMark: 100 },
    { subject: "Burnout", Engineering: 92, Operations: 88, Product: 62, DataAI: 74, fullMark: 100 },
    { subject: "Skill Gap", Engineering: 64, Operations: 72, Product: 40, DataAI: 82, fullMark: 100 },
    { subject: "Absenteeism", Engineering: 18, Operations: 24, Product: 12, DataAI: 15, fullMark: 100 },
    { subject: "Productivity", Engineering: 82, Operations: 79, Product: 89, DataAI: 94, fullMark: 100 },
    { subject: "Compliance", Engineering: 98, Operations: 96, Product: 99, DataAI: 97, fullMark: 100 },
  ];

  const filteredInsights = MOCK_INSIGHTS.filter((insight) => {
    if (selectedSeverity === "ALL") return true;
    return insight.severity === selectedSeverity;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Exact 6 factors requested in the prompt: Retention, Productivity, Engagement, Skills, Workload, Attendance
  const contributoryFactors = [
    { label: "Retention Health", score: 92, status: "Stable", color: "from-emerald-500 to-cyan-400" },
    { label: "Productivity Yield", score: 95, status: "Optimal", color: "from-blue-500 to-cyan-400" },
    { label: "Engagement Index", score: 86, status: "Normal", color: "from-blue-600 to-cyan-400" },
    { label: "Skills Coverage", score: 88, status: "Good", color: "from-sky-500 to-indigo-500" },
    { label: "Workload Balance", score: 78, status: "Overloaded", color: "from-amber-500 to-rose-500" },
    { label: "Attendance Reliability", score: 98, status: "Optimal", color: "from-cyan-500 to-emerald-400" },
  ];

  // Workforce Distribution Data by 5 dimensions
  const distributionData = {
    department: [
      { name: "Engineering", count: 5420, percent: 43.4, color: "bg-cyan-400" },
      { name: "Product & Design", count: 2840, percent: 22.8, color: "bg-blue-500" },
      { name: "Operations & SRE", count: 2140, percent: 17.1, color: "bg-sky-400" },
      { name: "Data & Applied AI", count: 2082, percent: 16.7, color: "bg-indigo-400" },
    ],
    location: [
      { name: "Bengaluru HQ (Tier-1 Core)", count: 5420, percent: 43.4, color: "bg-cyan-400" },
      { name: "Gurugram Tech Hub", count: 3890, percent: 31.2, color: "bg-blue-500" },
      { name: "Hyderabad Systems Lab", count: 1840, percent: 14.7, color: "bg-sky-400" },
      { name: "Distributed Remote (Global)", count: 1332, percent: 10.7, color: "bg-indigo-400" },
    ],
    experience: [
      { name: "Senior / Principal (5+ Yrs)", count: 4890, percent: 39.2, color: "bg-cyan-400" },
      { name: "Mid-Level (2-5 Yrs)", count: 5120, percent: 41.0, color: "bg-blue-500" },
      { name: "Junior / Associate (<2 Yrs)", count: 2472, percent: 19.8, color: "bg-sky-400" },
    ],
    skill: [
      { name: "Advanced / Expert", count: 4230, percent: 33.9, color: "bg-cyan-400" },
      { name: "Proficient Core", count: 5910, percent: 47.3, color: "bg-blue-500" },
      { name: "Foundational / Upskilling", count: 2342, percent: 18.8, color: "bg-amber-400" },
    ],
    employment: [
      { name: "Regular Full-Time", count: 11140, percent: 89.2, color: "bg-cyan-400" },
      { name: "Contract / Specialized Pod", count: 980, percent: 7.9, color: "bg-blue-500" },
      { name: "Apprentices & Interns", count: 362, percent: 2.9, color: "bg-sky-400" },
    ]
  };

  const teamHealthData = [
    {
      name: "Engineering Core",
      headcount: "5,420 talent",
      sprintLoad: 92,
      riskScore: 78,
      lead: "Aarav Sharma",
      status: "High Stress",
      color: "border-rose-900/60 bg-[#0c1224] text-rose-300"
    },
    {
      name: "Operations & SRE",
      headcount: "2,140 talent",
      sprintLoad: 88,
      riskScore: 45,
      lead: "Rahul Verma",
      status: "Elevated",
      color: "border-amber-900/60 bg-[#0c1224] text-amber-300"
    },
    {
      name: "Data & Applied AI",
      headcount: "2,082 talent",
      sprintLoad: 74,
      riskScore: 35,
      lead: "Priya Patel",
      status: "Optimal",
      color: "border-emerald-900/60 bg-[#0c1224] text-emerald-300"
    },
    {
      name: "Product & Design",
      headcount: "2,840 talent",
      sprintLoad: 62,
      riskScore: 25,
      lead: "Vikram Malhotra",
      status: "Balanced",
      color: "border-blue-900/60 bg-[#0c1224] text-blue-300"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Real-time Live Telemetry Ticker */}
      <LiveTelemetryTicker />

      {/* 2. Top Banner Ticker with Telemetry Indicators */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                AI COMMAND CENTER
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                12,482 NODES MONITORED
              </span>
            </div>
            <div className="text-sm font-bold text-white tracking-tight">
              Enterprise Continuous Workforce Telemetry & Risk Mitigation
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              handleRefresh();
            }}
            className={`p-2 rounded-xl bg-[#0a142c] border border-[#172750] text-slate-300 hover:text-cyan-400 transition-all ${
              isRefreshing ? "animate-spin text-cyan-400" : ""
            }`}
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              navigate("/app/scenarios");
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate 'What If'</span>
          </button>
        </div>
      </div>

      {/* 3. Team Health & Sprint Load Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamHealthData.map((team, idx) => (
          <div
            key={idx}
            onClick={() => {
              sound.playClick();
              navigate("/app/employees");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-cyan-500/50 hover:scale-[1.02] shadow-lg ${team.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">{team.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-current">
                {team.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mb-2">
              Lead: <span className="text-slate-200">{team.lead}</span> • {team.headcount}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Sprint Load:</span>
                <span className="text-white font-bold">{team.sprintLoad}%</span>
              </div>
              <div className="w-full bg-[#060a16] h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    team.sprintLoad > 90 ? "bg-rose-500" : team.sprintLoad > 80 ? "bg-amber-500" : "bg-cyan-400"
                  }`}
                  style={{ width: `${team.sprintLoad}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Row: Circular Health Score & 6 Contributory Factors + Risk Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Circular Health Score & 6 Contributory Factors */}
        <div className="lg:col-span-7 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Workforce Health Score</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  REAL-TIME
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated Bayesian score synthesized across 6 organizational health factors.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
              Healthy (94.7)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* SVG Circular Radial Progress */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="#0b1736"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="url(#healthGrad)"
                    strokeWidth="10"
                    strokeDasharray="326.7"
                    strokeDashoffset="17.3"
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#00f0ff" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black font-mono text-white tracking-tight">
                    94.7
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                    HEALTHY
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                    Target: &gt;90.0
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Contributory Factors breakdown bars */}
            <div className="sm:col-span-7 space-y-2.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider mb-2">
                HEALTH FACTORS BREAKDOWN
              </div>

              {contributoryFactors.map((f, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{f.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 font-bold text-xs">{f.score}%</span>
                      <span className={`text-[9px] font-mono px-1 rounded ${
                        f.score < 80 ? "text-amber-400 bg-amber-950" : "text-slate-400"
                      }`}>
                        {f.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[#0b1736] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${f.color} rounded-full transition-all duration-700`}
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Real-time Multi-Axis Risk Radar */}
        <div id="radar" className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Workforce Risk Radar</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Hover category to inspect multi-axis organizational stress indicators.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              HIGH EXPOSURE
            </span>
          </div>

          {/* Recharts Radar with exact 6 categories: Attrition, Burnout, Skill Gap, Absenteeism, Productivity, Compliance */}
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#152342" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#475569", fontSize: 9 }}
                  stroke="#152342"
                />
                <Radar
                  name="Engineering"
                  dataKey="Engineering"
                  stroke="#00f0ff"
                  fill="#00f0ff"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Operations"
                  dataKey="Operations"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-[#132042] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Engineering (Active)
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Operations
              </span>
            </div>
            <button
              onClick={() => navigate("/app/decisions")}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Remediate</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Row: AI Insights Stream & Filterable Workforce Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Insights Feed */}
        <div id="insights" className="lg:col-span-8 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142345] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  AI-Generated Insight Feed
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time signals detected by neural graph analysis requiring manager review.
              </p>
            </div>

            {/* Severity Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#040815] p-1 rounded-xl border border-[#142345] text-xs font-mono">
              {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-bold text-[10px] ${
                    selectedSeverity === sev
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Insights List */}
          <div className="space-y-3.5">
            {filteredInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl bg-[#091228] border border-[#162752] hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-black tracking-wider border ${
                        insight.severity === "CRITICAL"
                          ? "bg-rose-950 text-rose-300 border-rose-800"
                          : insight.severity === "HIGH"
                          ? "bg-amber-950 text-amber-300 border-amber-800"
                          : "bg-blue-950 text-blue-300 border-blue-800"
                      }`}
                    >
                      {insight.severity}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {insight.department} • {insight.affectedGroup}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {insight.confidence}% Confidence
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {insight.timestamp}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {insight.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {insight.summary}
                </p>

                {/* Key Drivers */}
                <div className="mb-3 p-2.5 rounded-lg bg-[#060b19] border border-[#121f3d]">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Telemetry Risk Drivers</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {insight.drivers.map((d, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#0e1b3d] text-slate-200 border border-[#1a2f66]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Impact & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#132042]">
                  <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Expected: {insight.expectedOutcome}</span>
                  </div>

                  <button
                    onClick={() => navigate(insight.actionUrl)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-md hover:shadow-cyan-500/20 text-white text-xs font-bold transition-all shrink-0"
                  >
                    <span>View Details & Remediate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Filterable Workforce Distribution (Department, Location, Experience, Skill, Employment Type) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Workforce Distribution</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">12,482 Total</span>
            </div>

            {/* 5 Filter Tabs: Department, Location, Experience, Skill level, Employment type */}
            <div className="flex flex-wrap gap-1 bg-[#050917] p-1 rounded-xl border border-[#142345] mb-4 text-[10px] font-mono">
              {(["department", "location", "experience", "skill", "employment"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDistributionFilter(tab)}
                  className={`px-2 py-1 rounded-lg capitalize transition-colors ${
                    distributionFilter === tab
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "skill" ? "Skill Level" : tab === "employment" ? "Employment Type" : tab}
                </button>
              ))}
            </div>

            {/* Dynamic Bars for Selected Dimension */}
            <div className="space-y-3.5 text-xs">
              {distributionData[distributionFilter].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium truncate max-w-[200px]">{item.name}</span>
                    <span className="font-mono text-slate-200 font-bold">{item.count.toLocaleString()} ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0b1736] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#132042] flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Telemetry Sample: <strong className="text-white">100% Core</strong></span>
              <span>Updated: <strong className="text-cyan-400">Real-time</strong></span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0b1633] to-[#070e24] border border-cyan-500/30 p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Autonomous Decision Shortcuts</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Direct access into high-impact simulation and governance workflows.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => navigate("/app/employees")}
                className="w-full p-2.5 rounded-xl bg-[#091228] hover:bg-[#101e42] border border-[#162752] text-left flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold text-white">Employee Dossier Drawer</div>
                  <div className="text-slate-400 text-[10px]">Inspect Aarav Sharma & Rahul Verma flight risk</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => navigate("/app/scenarios")}
                className="w-full p-2.5 rounded-xl bg-[#091228] hover:bg-[#101e42] border border-[#162752] text-left flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold text-white">Scenario Simulator</div>
                  <div className="text-slate-400 text-[10px]">Test salary & remote work before budget commitment</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => navigate("/app/decisions")}
                className="w-full p-2.5 rounded-xl bg-[#091228] hover:bg-[#101e42] border border-[#162752] text-left flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold text-white">7-Step Autonomous Loop</div>
                  <div className="text-slate-400 text-[10px]">Sign off pending retention intervention</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
