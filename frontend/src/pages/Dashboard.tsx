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
  Clock
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

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const radarData = [
    { subject: "Flight Risk", Engineering: 78, Operations: 45, Product: 25, DataAI: 35, fullMark: 100 },
    { subject: "Workload Overload", Engineering: 92, Operations: 88, Product: 62, DataAI: 74, fullMark: 100 },
    { subject: "Skill Coverage Deficit", Engineering: 64, Operations: 72, Product: 40, DataAI: 82, fullMark: 100 },
    { subject: "Compensation Disparity", Engineering: 82, Operations: 54, Product: 42, DataAI: 60, fullMark: 100 },
    { subject: "Single Point Failure", Engineering: 88, Operations: 65, Product: 38, DataAI: 48, fullMark: 100 },
  ];

  const filteredInsights = MOCK_INSIGHTS.filter((insight) => {
    if (selectedSeverity === "ALL") return true;
    return insight.severity === selectedSeverity;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const contributoryFactors = [
    { label: "Performance Velocity", score: 95, status: "Optimal", color: "from-blue-500 to-cyan-400" },
    { label: "Retention Health Index", score: 92, status: "Stable", color: "from-emerald-500 to-cyan-400" },
    { label: "Compensation Parity", score: 91, status: "Healthy", color: "from-cyan-500 to-blue-600" },
    { label: "Skill Alignment", score: 88, status: "Good", color: "from-sky-500 to-indigo-500" },
    { label: "Sentiment Equilibrium", score: 86, status: "Normal", color: "from-blue-600 to-cyan-400" },
    { label: "Workload Balance", score: 78, status: "Overloaded", color: "from-amber-500 to-rose-500" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Ticker with Telemetry Indicators */}
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
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-[#0a142c] border border-[#172750] text-slate-300 hover:text-cyan-400 transition-all ${
              isRefreshing ? "animate-spin text-cyan-400" : ""
            }`}
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate("/app/scenarios")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate 'What If'</span>
          </button>
        </div>
      </div>

      {/* Primary Row: Circular Health Score & Contributory Factors + Risk Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Circular Health Score & 6 Contributory Factors */}
        <div className="lg:col-span-7 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Autonomous Workforce Health Index</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  REAL-TIME
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated Bayesian score synthesized across 6 organizational indicators.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
              ↑ +2.3% this quarter
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* SVG Circular Radial Progress */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Track circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="#0b1736"
                    strokeWidth="10"
                    fill="none"
                  />
                  {/* Progress circle (94.7% of 2*PI*52 ≈ 326.7) */}
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

                {/* Score centered in circle */}
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
                CONTRIBUTORY WEIGHT FACTORS
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
        <div className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Multi-Axis Risk Radar</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Stress testing 5 systemic failure modes across engineering.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              HIGH EXPOSURE
            </span>
          </div>

          {/* Recharts Radar */}
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

      {/* Secondary Row: AI Insights Stream & Workforce Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Insights Feed */}
        <div className="lg:col-span-8 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142345] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Autonomous AI Insights & Actions
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Proactive signals detected by neural graph analysis requiring manager or HR review.
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
                    <span>Telemetry Drivers</span>
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
                    <span>Execute Action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Workforce Distribution & Node Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          {/* Distribution card */}
          <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Workforce Hub Distribution</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">12,482 Total</span>
            </div>

            <div className="space-y-3.5 text-xs">
              {[
                { name: "Bengaluru HQ (Tier-1 Core)", count: 5420, percent: 43.4, color: "bg-cyan-400" },
                { name: "Gurugram Tech Hub", count: 3890, percent: 31.2, color: "bg-blue-500" },
                { name: "Hyderabad Systems Lab", count: 1840, percent: 14.7, color: "bg-sky-400" },
                { name: "Distributed Remote (Global)", count: 1332, percent: 10.7, color: "bg-indigo-400" },
              ].map((hub, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{hub.name}</span>
                    <span className="font-mono text-slate-200 font-bold">{hub.count.toLocaleString()} ({hub.percent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0b1736] rounded-full overflow-hidden">
                    <div className={`h-full ${hub.color} rounded-full`} style={{ width: `${hub.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#132042] flex items-center justify-between text-[11px] text-slate-400">
              <span>Diversity Index: <strong className="text-white">38.4%</strong></span>
              <span>Remote Flex: <strong className="text-cyan-400">54.2%</strong></span>
            </div>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0b1633] to-[#070e24] border border-cyan-500/30 p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Autonomous Quick Actions</span>
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
                  <div className="text-slate-400 text-[10px]">Inspect 8 high-velocity performers & flight risks</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => navigate("/app/decisions")}
                className="w-full p-2.5 rounded-xl bg-[#091228] hover:bg-[#101e42] border border-[#162752] text-left flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold text-white">7-Step Autonomous Loop</div>
                  <div className="text-slate-400 text-[10px]">Verify pending Engineering Retention approval</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => navigate("/app/skills")}
                className="w-full p-2.5 rounded-xl bg-[#091228] hover:bg-[#101e42] border border-[#162752] text-left flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold text-white">Skills Matrix & Heatmap</div>
                  <div className="text-slate-400 text-[10px]">Close 38% Vector DB gap in Team Alpha</div>
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
