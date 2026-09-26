import React, { useState } from "react";
import {
  Search,
  Filter,
  UserCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  X,
  TrendingUp,
  Briefcase,
  Award,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Clock,
  ShieldAlert,
  Sliders
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useNavigate } from "react-router-dom";
import { MOCK_EMPLOYEES, Employee } from "../data/mockData";

export const Employees: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedRisk, setSelectedRisk] = useState("ALL");
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(MOCK_EMPLOYEES[1]); // Rahul Verma initially
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const departments = ["ALL", "Engineering", "Data & AI", "Product & Design", "Quality Engineering", "Operations"];
  const risks = ["ALL", "HIGH", "MEDIUM", "LOW"];

  const filteredEmployees = MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === "ALL" || emp.department === selectedDept;
    const matchesRisk = selectedRisk === "ALL" || emp.attritionRisk === selectedRisk;

    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleExecuteAction = (emp: Employee) => {
    setActionSuccessToast(`Autonomous action initiated for ${emp.name}: Routed to People Ops governance gateway.`);
    setTimeout(() => {
      setActionSuccessToast(null);
    }, 4500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Action Notification Toast */}
      {actionSuccessToast && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-[#071328] border border-emerald-500/50 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-emerald-300">Action Dispatched</div>
            <div className="text-slate-300">{actionSuccessToast}</div>
          </div>
          <button
            onClick={() => setActionSuccessToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Stats Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              EMPLOYEE INTELLIGENCE & DOSSIERS
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">
              8 ACTIVE PROFILES
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Deep-Dive Talent Telemetry, Flight Risk Predictors & Prescriptive Interventions
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/decisions")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Decisions</span>
          </button>
          <button
            onClick={() => navigate("/app/scenarios")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Scenario Simulator</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, ID, or key skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#070e24] border border-[#152342] focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Department Filter Pills */}
        <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#070e24] p-1 rounded-xl border border-[#152342] text-[10px] font-mono overflow-x-auto max-w-full">
            <span className="text-slate-500 px-2 uppercase font-bold">Dept:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2 py-1 rounded-lg transition-colors font-semibold ${
                  selectedDept === dept
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#070e24] p-1 rounded-xl border border-[#152342] text-[10px] font-mono">
            <span className="text-slate-500 px-1 uppercase font-bold">Risk:</span>
            {risks.map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-2 py-1 rounded-lg transition-colors font-bold ${
                  selectedRisk === risk
                    ? risk === "HIGH"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      : risk === "MEDIUM"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Employee Roster Cards + Slide-over Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roster Cards (Column 1-7 or full) */}
        <div className={`${isDrawerOpen && activeEmployee ? "lg:col-span-7" : "lg:col-span-12"} space-y-3`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredEmployees.map((emp) => {
              const isSelected = activeEmployee?.id === emp.id && isDrawerOpen;
              return (
                <div
                  key={emp.id}
                  onClick={() => {
                    setActiveEmployee(emp);
                    setIsDrawerOpen(true);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group relative ${
                    isSelected
                      ? "bg-[#0c1838] border-cyan-500/70 shadow-lg shadow-cyan-950/50"
                      : "bg-[#070e24] border-[#152342] hover:border-cyan-500/30 hover:bg-[#091228]"
                  }`}
                >
                  {/* Top card row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-11 h-11 rounded-xl object-cover border border-[#1b2d5a]"
                      />
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-[160px]">
                          {emp.role}
                        </div>
                      </div>
                    </div>

                    {/* Risk Tag */}
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-black tracking-wider border ${
                        emp.attritionRisk === "HIGH"
                          ? "bg-rose-950/80 text-rose-300 border-rose-800"
                          : emp.attritionRisk === "MEDIUM"
                          ? "bg-amber-950/80 text-amber-300 border-amber-800"
                          : "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                      }`}
                    >
                      {emp.attritionRisk} RISK ({emp.riskScore})
                    </span>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-[#040815] border border-[#111c39] mb-3 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Performance</div>
                      <div className="text-xs font-bold text-white font-mono">{emp.performance}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Workload</div>
                      <div className={`text-xs font-bold font-mono ${
                        emp.workload > 85 ? "text-rose-400" : "text-cyan-300"
                      }`}>
                        {emp.workload}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Comp Ratio</div>
                      <div className="text-xs font-bold text-slate-200 font-mono">
                        {emp.compensationRatio}x
                      </div>
                    </div>
                  </div>

                  {/* Quick AI Prescribed Recommendation */}
                  <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    <strong className="text-cyan-400 font-mono text-[10px]">AI INSIGHT: </strong>
                    {emp.aiRecommendation}
                  </div>

                  {/* Footer tags */}
                  <div className="mt-3 pt-2 border-t border-[#132042] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{emp.department}</span>
                    <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5">
                      View Dossier →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Drawer: Rich Employee Dossier */}
        {isDrawerOpen && activeEmployee && (
          <div className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-cyan-500/40 p-5 shadow-2xl flex flex-col space-y-5 animate-in fade-in duration-200">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-[#142345] pb-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={activeEmployee.avatar}
                  alt={activeEmployee.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-md shadow-cyan-950/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">{activeEmployee.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {activeEmployee.id}
                    </span>
                  </div>
                  <div className="text-xs text-cyan-300 font-medium">{activeEmployee.role}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{activeEmployee.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Flight Risk Callout Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                activeEmployee.attritionRisk === "HIGH"
                  ? "bg-rose-950/40 border-rose-800/60 text-rose-200"
                  : activeEmployee.attritionRisk === "MEDIUM"
                  ? "bg-amber-950/40 border-amber-800/60 text-amber-200"
                  : "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider font-mono">
                    Attrition Flight Risk: {activeEmployee.attritionRisk} ({activeEmployee.riskScore}/100)
                  </div>
                  <div className="text-[11px] opacity-80">
                    Tenure: {activeEmployee.tenureMonths} Months • Attendance: {activeEmployee.attendanceRate}%
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs font-black px-2 py-1 rounded bg-black/40">
                {activeEmployee.confidence}% CONF.
              </span>
            </div>

            {/* Telemetry Root-Cause Drivers */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Primary Risk & Performance Drivers</span>
              </div>
              <div className="space-y-1.5">
                {activeEmployee.drivers.map((driver, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#050917] border border-[#132042] text-xs text-slate-200 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance & Workload Trend Chart */}
            <div className="p-3.5 rounded-xl bg-[#050917] border border-[#132042]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  5-Month Telemetry Trajectory
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Performance
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400" /> Workload
                  </span>
                </div>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeEmployee.history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#101c38" />
                    <XAxis dataKey="month" stroke="#475569" fontSize={9} />
                    <YAxis domain={[50, 100]} stroke="#475569" fontSize={9} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#00f0ff"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="workload"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Skills Proficiency Badges */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center justify-between">
                <span>Verified Technical Skills</span>
                <span className="text-cyan-400 font-mono">{activeEmployee.skillMatch}% Role Match</span>
              </div>
              <div className="space-y-2">
                {activeEmployee.keySkills.map((skill, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="font-mono text-cyan-400 font-bold text-[11px]">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b1736] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent High-Impact Projects */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                Recent Enterprise Impact
              </div>
              <div className="space-y-2">
                {activeEmployee.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#050917] border border-[#132042] text-xs"
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{proj.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{proj.role}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      ✓ Impact: {proj.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Autonomous Action Card */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0b1b3d] to-[#071129] border border-cyan-500/40 space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold tracking-wider">
                  PRESCRIBED AUTONOMOUS INTERVENTION
                </span>
                <p className="text-xs text-white font-medium mt-1 leading-snug">
                  {activeEmployee.recommendedAction}
                </p>
                <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeEmployee.expectedImpact}</span>
                </div>
              </div>

              <button
                onClick={() => handleExecuteAction(activeEmployee)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Execute Prescribed Intervention</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
