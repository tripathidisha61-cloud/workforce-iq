import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Briefcase,
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileText
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { StatCard } from "../components/StatCard";
import { dashboardApi } from "../services/api";

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getMetrics()
      .then((res) => setData(res))
      .catch((err) => console.error("Error loading dashboard metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading && !data) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-bold">Orchestrating Workforce Intelligence...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    total_candidates: 124,
    total_employees: 38,
    high_risk_count: 12,
    open_jobs_count: 7
  };

  const insights = data?.insights || [];
  const pipeline = data?.pipeline || [];
  const workforceHealth = data?.workforce_health || [];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner - Rich Corporate Blue */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-200">
              Autonomous HR Intelligence
            </span>
            <span className="text-blue-300">?</span>
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Live Telemetry Active
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
            Good Morning, HR Team ??
          </h2>
          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
            AI reasoning engines synthesized 124 active candidates, 38 internal profiles, and 5 HR policy corpora. 3 recommendations await human review.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-md shadow-black/10 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Review AI Approvals</span>
          </Link>
          <Link
            to="/policy"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white text-xs font-semibold border border-blue-400/40 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-200" />
            <span>Ask Policy AI</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics in Clean White Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Candidates"
          value={stats.total_candidates}
          subtitle="Screened across open positions"
          icon={Users}
          trend="+18% this month"
          accentColor="blue"
        />
        <StatCard
          title="Employees"
          value={stats.total_employees}
          subtitle="Tracked with telemetry & OKRs"
          icon={UserCheck}
          trend="96% retention rate"
          accentColor="emerald"
        />
        <StatCard
          title="High Risk Signals"
          value={stats.high_risk_count}
          subtitle="Attrition & disengagement alerts"
          icon={AlertTriangle}
          trend="Action required"
          trendUp={false}
          accentColor="rose"
        />
        <StatCard
          title="Open Jobs"
          value={stats.open_jobs_count}
          subtitle="Active recruitment requisitions"
          icon={Briefcase}
          trend="2 priority roles"
          accentColor="amber"
        />
      </div>

      {/* AI Workforce Insights Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">AI Workforce Insights</h3>
              <p className="text-xs text-slate-500 font-medium">Cross-source signals synthesized by WorkforceIQ Orchestrator</p>
            </div>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold font-mono">
            Reasoning Engine v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {insights.map((ins: any) => (
            <Link
              key={ins.id}
              to={ins.action_link}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{ins.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    {ins.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">
                  {ins.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{ins.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-blue-700 font-bold">
                <span>{ins.primary_target}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Section: Hiring Pipeline & Workforce Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hiring Pipeline Funnel */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Hiring Pipeline Funnel</h3>
              <p className="text-xs text-slate-500 font-medium">Applications to final candidate selections</p>
            </div>
            <Link to="/recruitment" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View Requisitions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipeline} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#0f172a", fontWeight: "bold" }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            {pipeline.map((p: any, idx: number) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{p.stage}</div>
                <div className="text-base font-extrabold text-slate-900">{p.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workforce Health Dimensions */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Workforce Health Radar</h3>
              <p className="text-xs text-slate-500 font-medium">Telemetry across performance, attendance, engagement, growth</p>
            </div>
            <Link to="/employees" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>Employee Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={workforceHealth}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={11} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                <Radar name="Current Score" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                <Radar name="Benchmark Target" dataKey="target" stroke="#059669" fill="#059669" fillOpacity={0.15} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#0f172a" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            {workforceHealth.map((wh: any, idx: number) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{wh.metric}</div>
                <div className={`text-base font-extrabold ${wh.score < 70 ? "text-amber-600" : "text-slate-900"}`}>
                  {wh.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Hero Shortcuts in White & Blue */}
      <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200/80 space-y-3">
        <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Interactive Demo Verification Pathways (Hackathon Evaluation)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            to="/recruitment/candidate/1"
            className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between shadow-2xs"
          >
            <div>
              <div className="text-xs font-bold text-slate-900">Hero Candidate: Priya Sharma</div>
              <div className="text-[11px] text-blue-700 font-medium">87% Match ? Skill Breakdown ? Interview Generation</div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
          <Link
            to="/employees/1"
            className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 transition-all flex items-center justify-between shadow-2xs"
          >
            <div>
              <div className="text-xs font-bold text-slate-900">Hero Employee: Rahul Verma</div>
              <div className="text-[11px] text-rose-700 font-medium">HIGH RISK (68) ? Contributing Factors ? Upskilling</div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </Link>
          <Link
            to="/policy"
            className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between shadow-2xs"
          >
            <div>
              <div className="text-xs font-bold text-slate-900">Policy RAG: Remote Work & Leave</div>
              <div className="text-[11px] text-indigo-700 font-medium">Grounded Answers ? Source Citations ? Page References</div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};
