import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Layers,
  Calendar,
  BarChart3,
  DollarSign,
  PlusCircle,
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
  Legend
} from "recharts";
import { MOCK_CAPACITY_DATA, CapacityQuarter } from "../data/mockData";

export const WorkforcePlanning: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CapacityQuarter[]>(MOCK_CAPACITY_DATA);
  const [selectedQuarter, setSelectedQuarter] = useState<CapacityQuarter>(MOCK_CAPACITY_DATA[1]); // Q1 2027
  const [reqToast, setReqToast] = useState<string | null>(null);

  const roleRequisitions = [
    { role: "Senior Distributed Systems Engineer", needed: 8, department: "Engineering", timeline: "Q1 2027", priority: "CRITICAL" },
    { role: "Applied MLOps & Vector DB Architect", needed: 5, department: "Data & AI", timeline: "Q1 2027", priority: "HIGH" },
    { role: "Cloud Resilience & SRE Lead", needed: 4, department: "Operations", timeline: "Q2 2027", priority: "HIGH" },
    { role: "Senior Enterprise Product Designer", needed: 3, department: "Product & Design", timeline: "Q2 2027", priority: "MEDIUM" },
  ];

  const handleLaunchRequisition = (role: string) => {
    setReqToast(`Requisition opened for ${role}. Dispatched to Automated Sourcing & Screening Engine.`);
    setTimeout(() => setReqToast(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {reqToast && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-cyan-950 to-[#071328] border border-cyan-400 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-cyan-300">Requisition Dispatched</div>
            <div className="text-slate-300">{reqToast}</div>
          </div>
          <button onClick={() => setReqToast(null)} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              STRATEGIC CAPACITY MODELING
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              4-QUARTER HORIZON
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Workforce Capacity Deficit Projections, Growth Trajectories & Requisition Planning
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/recommendations")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Recommendations</span>
          </button>
          <button
            onClick={() => navigate("/app/scenarios")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Simulate Headcount Impact</span>
          </button>
        </div>
      </div>

      {/* Top 4 Quarter Capacity Horizon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((q) => {
          const isSelected = selectedQuarter.quarter === q.quarter;
          return (
            <div
              key={q.quarter}
              onClick={() => setSelectedQuarter(q)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0b1736] border-cyan-500/70 shadow-lg shadow-cyan-950/60"
                  : "bg-[#070e24] border-[#152342] hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-cyan-400">{q.quarter}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  -{q.deficit} Deficit
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Capacity:</span>
                  <span className="font-mono font-bold text-white">{q.currentCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Projected Demand:</span>
                  <span className="font-mono font-bold text-cyan-300">{q.projectedDemand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Planned Hires:</span>
                  <span className="font-mono text-emerald-400">+{q.plannedHires}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Budget:</span>
                  <span className="font-mono text-amber-400">₹{q.budgetEstCr} Cr</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart: Capacity vs Demand across quarters */}
      <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#142345] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Capacity vs Demand Forecast (Q4 2026 - Q3 2027)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies projected gaps in engineering capacity before roadmap milestones slip.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded bg-slate-600" /> Current Headcount
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Projected Demand
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#121e3d" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={11} domain={[1200, 1450]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
              />
              <Bar dataKey="currentCapacity" name="Capacity" fill="#334155" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projectedDemand" name="Demand" fill="#00f0ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role Requisitions Table */}
      <div className="rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#142345] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Prioritized Open Requisition Directives</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Auto-generated hiring orders aligned to forecasted technical deficits.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            20 Open Requisitions Needed
          </span>
        </div>

        <div className="space-y-2.5">
          {roleRequisitions.map((req, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#091228] border border-[#142345] hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{req.role}</span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-black border ${
                      req.priority === "CRITICAL"
                        ? "bg-rose-950 text-rose-300 border-rose-800"
                        : "bg-amber-950 text-amber-300 border-amber-800"
                    }`}
                  >
                    {req.priority}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {req.department} • Target Onboard: {req.timeline} • Required Headcount: <strong className="text-cyan-300">+{req.needed}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchRequisition(req.role)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Launch Requisition</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
