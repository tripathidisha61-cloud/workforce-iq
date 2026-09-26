import React from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
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
  risk_level: string;
  risk_factors?: Array<{ factor: string; impact?: string }>;
  recommendations?: Array<{ action: string; urgency?: string }>;
}

export const RiskCard: React.FC<{ employee: EmployeeProps }> = ({ employee }) => {
  const isHigh = employee.risk_level === "HIGH";
  const isMed = employee.risk_level === "MEDIUM";

  const badgeColor = isHigh
    ? "bg-rose-50 text-rose-700 border-rose-200"
    : isMed
    ? "bg-amber-50 text-amber-800 border-amber-200"
    : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm shadow-2xs">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                {employee.name}
                {employee.name.includes("Rahul") && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                    Demo Hero
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {employee.role} ? {employee.department}
              </p>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 ${badgeColor}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{employee.risk_level} RISK</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 my-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Perf</div>
            <div className={`text-sm font-extrabold ${employee.performance < 70 ? "text-rose-600" : "text-slate-900"}`}>
              {employee.performance}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Attend</div>
            <div className={`text-sm font-extrabold ${employee.attendance < 75 ? "text-amber-700" : "text-slate-900"}`}>
              {employee.attendance}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Engage</div>
            <div className={`text-sm font-extrabold ${employee.engagement < 60 ? "text-rose-600" : "text-slate-900"}`}>
              {employee.engagement}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Growth</div>
            <div className="text-sm font-extrabold text-blue-600">{employee.skill_growth}%</div>
          </div>
        </div>

        {/* Contributing Factors */}
        {employee.risk_factors && employee.risk_factors.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>AI Risk Signals</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-700">
              {employee.risk_factors.slice(0, 2).map((rf, idx) => (
                <li key={idx} className="flex items-start gap-1.5 bg-rose-50/60 p-1.5 rounded-lg border border-rose-100">
                  <span className="text-rose-600 text-xs font-bold">?</span>
                  <span className="text-[11px] text-slate-700 font-medium">{rf.factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/employees/${employee.id}`}
          className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs font-bold transition-all"
        >
          <span>Deep Intelligence & Telemetry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
