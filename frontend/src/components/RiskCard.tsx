import React from "react";
import { AlertCircle, ArrowUpRight, TrendingDown, User, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export interface EmployeeProps {
  id: number;
  name: string;
  department: string;
  role: string;
  performance: number;
  attendance: number;
  engagement: number;
  skill_growth: number;
  risk_score: number;
  risk_level: string; // "HIGH" | "MEDIUM" | "LOW"
  risk_factors?: Array<{ factor: string; impact?: string }>;
  recommendations?: Array<{ action: string; urgency?: string }>;
}

export const RiskCard: React.FC<{ employee: EmployeeProps }> = ({ employee }) => {
  const isHigh = employee.risk_level === "HIGH";
  const isMed = employee.risk_level === "MEDIUM";

  const badgeColor = isHigh
    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
    : isMed
    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

  return (
    <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm transition-all duration-200 hover:border-slate-600 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 border border-slate-600 flex items-center justify-center font-bold text-sm text-white">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                {employee.name}
                {employee.name.includes("Rahul") && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                    Demo Hero
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-400">
                {employee.role} • {employee.department}
              </p>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 ${badgeColor}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{employee.risk_level} RISK</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 my-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400">Perf</div>
            <div className={`text-sm font-extrabold ${employee.performance < 70 ? "text-rose-400" : "text-white"}`}>
              {employee.performance}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400">Attend</div>
            <div className={`text-sm font-extrabold ${employee.attendance < 75 ? "text-amber-400" : "text-white"}`}>
              {employee.attendance}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400">Engage</div>
            <div className={`text-sm font-extrabold ${employee.engagement < 60 ? "text-rose-400" : "text-white"}`}>
              {employee.engagement}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400">Growth</div>
            <div className="text-sm font-extrabold text-white">{employee.skill_growth}%</div>
          </div>
        </div>

        {/* Contributing Factors */}
        {employee.risk_factors && employee.risk_factors.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>AI Risk Signals</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {employee.risk_factors.slice(0, 2).map((rf, idx) => (
                <li key={idx} className="flex items-start gap-1.5 bg-rose-500/5 p-1.5 rounded-lg border border-rose-500/10">
                  <span className="text-rose-400 text-xs">•</span>
                  <span className="text-[11px] text-slate-300">{rf.factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
        <Link
          to={`/employees/${employee.id}`}
          className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          <span>Deep Intelligence & Telemetry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
