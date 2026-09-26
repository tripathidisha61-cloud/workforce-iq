import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Users,
  Search,
  Zap,
  Layers,
  ChevronRight,
  X
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { SKILLS_HEATMAP_DATA, SkillMatrixItem } from "../data/mockData";

export const SkillsIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCell, setSelectedCell] = useState<{
    dept: string;
    skill: string;
    current: number;
    required: number;
    gap: number;
    trainedCount: number;
  }>({
    dept: "Engineering",
    skill: "Cloud & DevOps",
    current: 74,
    required: 88,
    gap: -14,
    trainedCount: 22
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const skillList = [
    "Python / AI",
    "Distributed Go",
    "Cloud & DevOps",
    "Cybersecurity",
    "System Design",
    "Data Analytics",
    "Leadership"
  ];

  // Forecast trajectory data (Q4 2026 - Q3 2027)
  const forecastData = [
    { quarter: "Q4 2026", VectorAI: 65, CloudDevOps: 72, DistGo: 78, Security: 80 },
    { quarter: "Q1 2027", VectorAI: 78, CloudDevOps: 80, DistGo: 83, Security: 84 },
    { quarter: "Q2 2027", VectorAI: 89, CloudDevOps: 88, DistGo: 87, Security: 88 },
    { quarter: "Q3 2027", VectorAI: 96, CloudDevOps: 94, DistGo: 92, Security: 91 },
  ];

  const handleEnrollCohort = () => {
    setToastMessage(`Enrolled cohort into Adaptive 4-Week ${selectedCell.skill} Program. Learning track provisioned.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const getGapColor = (gap: number) => {
    if (gap >= 0) return "bg-emerald-950/70 text-emerald-300 border-emerald-800/60";
    if (gap >= -7) return "bg-amber-950/70 text-amber-300 border-amber-800/60";
    return "bg-rose-950/70 text-rose-300 border-rose-800/60";
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-[#071328] border border-emerald-500/50 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-emerald-300">Cohort Activated</div>
            <div className="text-slate-300">{toastMessage}</div>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              SKILLS INTELLIGENCE & CAPABILITY GRAPH
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              35 SKILL DOMAINS MONITORED
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Departmental Competency Matrix, Capability Gaps & Strategic Upskilling Pathways
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/planning")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workforce Planning</span>
          </button>
          <button
            onClick={handleEnrollCohort}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Launch Upskilling Cohort</span>
          </button>
        </div>
      </div>

      {/* Top Section: Interactive Skills Heatmap Matrix */}
      <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142345] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Department × Skill Competency Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current proficiency vs required capability. Click any cell to inspect cohort and launch targeted upskilling.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500" /> Meets Requirement (&gt;=0%)
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/30 border border-amber-500" /> Moderate Deficit (1-7%)
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500" /> Critical Gap (&gt;7%)
            </span>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#142345] text-[10px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-2 text-center">Headcount</th>
                {skillList.map((skill) => (
                  <th key={skill} className="py-2.5 px-2 text-center">
                    {skill}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f1b38]">
              {SKILLS_HEATMAP_DATA.map((row) => (
                <tr key={row.department} className="hover:bg-[#091228] transition-colors">
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                    {row.department}
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-slate-400">
                    {row.headcount}
                  </td>
                  {skillList.map((skill) => {
                    const data = row.skills[skill] || { current: 75, required: 80, gap: -5, trainedCount: 10 };
                    const isSelected = selectedCell.dept === row.department && selectedCell.skill === skill;
                    return (
                      <td key={skill} className="py-2 px-1.5 text-center">
                        <button
                          onClick={() =>
                            setSelectedCell({
                              dept: row.department,
                              skill,
                              current: data.current,
                              required: data.required,
                              gap: data.gap,
                              trainedCount: data.trainedCount
                            })
                          }
                          className={`w-full py-1.5 px-2 rounded-lg border font-mono text-xs transition-all ${getGapColor(
                            data.gap
                          )} ${
                            isSelected
                              ? "ring-2 ring-cyan-400 scale-105 shadow-md shadow-cyan-950 font-black"
                              : "hover:scale-102"
                          }`}
                        >
                          <div className="font-bold">{data.current}%</div>
                          <div className="text-[9px] opacity-80">
                            {data.gap >= 0 ? `+${data.gap}%` : `${data.gap}%`}
                          </div>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Row: Cell Deep-Dive Card & Emerging Skills Demand Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Selected Skill Cell Deep-Dive */}
        <div className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-cyan-500/40 p-5 shadow-xl space-y-4">
          <div className="border-b border-[#142345] pb-3 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                FOCUSED CAPABILITY COHORT
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                {selectedCell.skill} • {selectedCell.dept}
              </h4>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${getGapColor(
                selectedCell.gap
              )}`}
            >
              {selectedCell.gap >= 0 ? "TARGET MET" : "CAPABILITY DEFICIT"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
              <div className="text-[10px] font-mono text-slate-400">Current Level</div>
              <div className="text-lg font-black font-mono text-white mt-0.5">
                {selectedCell.current}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
              <div className="text-[10px] font-mono text-slate-400">Target Standard</div>
              <div className="text-lg font-black font-mono text-cyan-300 mt-0.5">
                {selectedCell.required}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
              <div className="text-[10px] font-mono text-slate-400">Net Gap</div>
              <div className={`text-lg font-black font-mono mt-0.5 ${
                selectedCell.gap < 0 ? "text-rose-400" : "text-emerald-400"
              }`}>
                {selectedCell.gap > 0 ? `+${selectedCell.gap}%` : `${selectedCell.gap}%`}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050917] border border-[#132042] text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-1">Autonomous Diagnosis:</strong>
            {selectedCell.gap < 0
              ? `Identified ${selectedCell.trainedCount} practitioners within ${selectedCell.dept} primed for acceleration. Bridging this ${Math.abs(
                  selectedCell.gap
                )}% gap prevents projected Q1 sprint delivery delays.`
              : `${selectedCell.dept} exhibits healthy capability depth in ${selectedCell.skill}. Available to mentor adjacent cohorts.`}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleEnrollCohort}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-cyan-200" />
              <span>Enroll {selectedCell.trainedCount} Employees in 4-Week Cohort</span>
            </button>

            <button
              onClick={() => navigate("/app/employees")}
              className="w-full py-2 px-3 rounded-xl bg-[#0a142c] hover:bg-[#12224d] text-cyan-300 border border-[#162752] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Individual Skill Scores in Employee Drawer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Emerging Skills Demand Trajectory (Q4 2026 - Q3 2027) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#142345] pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Quarterly Skill Demand Trajectory (Q4 2026 – Q3 2027)</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Predictive roadmap requirements: High-velocity demand shifts towards Vector AI & Cloud SRE.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              SURGE PREDICTED
            </span>
          </div>

          {/* Area Chart */}
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="vectorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#121e3d" />
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
                />
                <Area
                  type="monotone"
                  dataKey="VectorAI"
                  name="Vector DBs & LLMs"
                  stroke="#00f0ff"
                  fillOpacity={1}
                  fill="url(#vectorGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="CloudDevOps"
                  name="Cloud & SRE"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#cloudGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-[#132042] flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Vector DBs (+48%)
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Cloud & SRE (+31%)
              </span>
            </div>
            <button
              onClick={() => navigate("/app/planning")}
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline flex items-center gap-1 font-sans"
            >
              <span>Capacity Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
