import React, { useEffect, useState } from "react";
import { BarChart3, PieChart, TrendingUp, Layers, Cpu } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { dashboardApi } from "../services/api";

export const Analytics: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    dashboardApi.getMetrics().then((res) => setData(res));
  }, []);

  const deptRisks = data?.department_risks || [
    { department: "Engineering", headcount: 18, high_risk: 2, avg_score: 79 },
    { department: "Quality", headcount: 6, high_risk: 1, avg_score: 71 },
    { department: "Product", headcount: 8, high_risk: 0, avg_score: 88 },
    { department: "Infrastructure", headcount: 6, high_risk: 0, avg_score: 86 }
  ];

  const matchDistribution = [
    { range: "90-100% (Top Tier)", candidates: 8 },
    { range: "80-89% (Strong)", candidates: 24 },
    { range: "70-79% (Moderate)", candidates: 42 },
    { range: "<70% (Gaps Detected)", candidates: 50 }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          <span>Workforce & Talent Analytics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Cross-departmental performance benchmarks, match score distributions, and skill gap density.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance & Headcount */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Department Health & Headcount</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptRisks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "10px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar name="Avg Health Score (%)" dataKey="avg_score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar name="Headcount" dataKey="headcount" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Candidate Match Distribution */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Candidate Match Score Distribution (n=124)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="range" type="category" stroke="#94a3b8" fontSize={11} width={140} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "10px" }}
                />
                <Bar name="Candidates" dataKey="candidates" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
