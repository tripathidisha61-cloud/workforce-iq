import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileBarChart2,
  Download,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Activity,
  Printer,
  Share2,
  Zap,
  X
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

export const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("Executive Workforce Intelligence Summary");
  const [timeframe, setTimeframe] = useState("Q3 2026 (Current Telemetry)");
  const [scopeDept, setScopeDept] = useState("All Departments");
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportToast, setExportToast] = useState<string | null>(null);

  const reportMetrics = [
    { label: "Total Monitored Nodes", value: "12,482", delta: "+4.1%" },
    { label: "Overall Workforce Health", value: "94.7%", delta: "+2.3%" },
    { label: "Prevented Flight Risks", value: "23 Cases", delta: "₹4.8 Cr Saved" },
    { label: "Avg Sprint Utilization", value: "81.4%", delta: "-3.2% (De-stressed)" }
  ];

  const historicalTrends = [
    { month: "May", health: 91.2, attrition: 14.8, productivity: 81.0 },
    { month: "Jun", health: 92.0, attrition: 13.9, productivity: 82.5 },
    { month: "Jul", health: 93.1, attrition: 13.1, productivity: 84.0 },
    { month: "Aug", health: 93.8, attrition: 12.5, productivity: 85.2 },
    { month: "Sep", health: 94.7, attrition: 11.8, productivity: 86.4 }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setExportToast("Report compiled with verified cryptographic telemetry checksum.");
      setTimeout(() => setExportToast(null), 4000);
    }, 800);
  };

  const handleExport = (format: "PDF" | "CSV") => {
    setExportToast(`Exporting WorkforceIQ_${format}_${Date.now()}.${format.toLowerCase()}...`);
    setTimeout(() => {
      setExportToast(`Downloaded WorkforceIQ_${format}_Audit.${format.toLowerCase()} successfully.`);
      setTimeout(() => setExportToast(null), 3500);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {exportToast && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-cyan-950 to-[#071328] border border-cyan-400 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold">{exportToast}</span>
          <button onClick={() => setExportToast(null)} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              EXECUTIVE TELEMETRY & AUDIT REPORTS
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              TAMPER-PROOF LEDGER
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Board-Ready Workforce Intelligence, Compliance Dockets & Scenario Audits
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("CSV")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport("PDF")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF Docket</span>
          </button>
        </div>
      </div>

      {/* Filter / Config Bar */}
      <div className="p-4 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
            Report Template
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option>Executive Workforce Intelligence Summary</option>
            <option>Deep-Dive Attrition & Flight Risk Audit</option>
            <option>Skills Deficit & Upskilling Roadmap Docket</option>
            <option>Autonomous Governance & Execution Ledger</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
            Evaluation Window
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option>Q3 2026 (Current Telemetry)</option>
            <option>Q2 2026 (Historical Baseline)</option>
            <option>Trailing 12-Month Longitudinal</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
            Department Scope
          </label>
          <select
            value={scopeDept}
            onChange={(e) => setScopeDept(e.target.value)}
            className="w-full bg-[#050917] border border-[#142345] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option>All Departments</option>
            <option>Engineering Chapters Only</option>
            <option>Product & Design</option>
            <option>Operations & SRE</option>
          </select>
        </div>

        <div className="pt-4 sm:pt-0">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{isGenerating ? "Compiling Telemetry..." : "Re-compile Report"}</span>
          </button>
        </div>
      </div>

      {/* Main Report Preview Canvas */}
      <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl space-y-6">
        {/* Report Canvas Header */}
        <div className="border-b border-[#142345] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
              OFFICIAL WORKFORCE INTELLIGENCE DOCKET
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{reportType}</h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Scope: {scopeDept} • Window: {timeframe} • Generated by WorkforceIQ Core v2.8
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-[11px] text-slate-400">
            <div>Ledger Verification: <strong className="text-emerald-400">SHA-256 Passed</strong></div>
            <div>Classification: <strong className="text-cyan-300">CONFIDENTIAL (C-Level)</strong></div>
          </div>
        </div>

        {/* 4 Summary High-Level Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {reportMetrics.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#050917] border border-[#132042]">
              <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
              <div className="text-xl font-black font-mono text-white mt-1">{m.value}</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Longitudinal Chart */}
        <div className="p-4 rounded-xl bg-[#050917] border border-[#132042] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">
              Historical 5-Month Trajectory: Health Score vs Attrition
            </span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Health Index
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded bg-rose-400" /> Flight Rate (%)
              </span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#121e3d" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
                />
                <Line
                  type="monotone"
                  dataKey="health"
                  stroke="#00f0ff"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="attrition"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="p-4 rounded-xl bg-[#091228] border border-[#162752] space-y-2 text-xs text-slate-200 leading-relaxed">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Executive Findings & Strategic Mandates</span>
          </div>
          <p>
            1. <strong>Talent Health Stabilization:</strong> Overall enterprise health improved to <strong>94.7%</strong> this cycle. Strategic interventions in the Core Backend tier prevented 23 high-probability flight events, conserving an estimated <strong>₹4.8 Cr</strong> in replacement costs.
          </p>
          <p>
            2. <strong>Workload Normalization:</strong> Sprint overload dropped by 3.2% across engineering squads as Jira automation rebalanced ticket distribution. Sustained overload remains isolated to SRE chapters (88% utilization).
          </p>
          <p>
            3. <strong>Upskilling Imperative:</strong> The transition to Vector DB and AI platforms requires closing a 38% competency gap in Team Alpha by Q1 2027 to avoid reliance on external contract billing.
          </p>
        </div>

        {/* Signatures & Footer */}
        <div className="pt-4 border-t border-[#142345] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Authorized Signatory: <strong className="text-white">Sarah Jenkins (VP People Ops)</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport("PDF")}
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
