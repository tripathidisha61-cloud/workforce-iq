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
  FileText,
  BarChart3
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
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
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

  const insights = data?.insights || [
    {
      id: 1,
      badge: "Urgent Attention",
      badgeColor: "rose",
      title: "3 employees show high-risk signals",
      description: "Elevated attrition indicators in Engineering & QA driven by engagement dips and skill transition barriers.",
      primary_target: "Rahul Verma (Engineering)",
      action_link: "/employees/1"
    },
    {
      id: 2,
      badge: "Capability Gap",
      badgeColor: "amber",
      title: "14 employees have skill gaps",
      description: "Concentrated around Cloud Architecture (AWS/Terraform) and Modern Test Automation frameworks.",
      primary_target: "Cloud & Automation Cohorts",
      action_link: "/onboarding"
    },
    {
      id: 3,
      badge: "Strong Talent Signal",
      badgeColor: "emerald",
      title: "8 candidates strongly match open jobs",
      description: "Priya Sharma (87% match) and Rahul Mehta (92% match) ready for final technical review.",
      primary_target: "Priya Sharma (Backend Developer)",
      action_link: "/recruitment"
    }
  ];

  const pipeline = data?.pipeline || [];
  const workforceHealth = data?.workforce_health || [];

  return (
    <div className="p-6 lg:p-8 space-y-7 max-w-7xl mx-auto">
      {/* Hero Banner matching the Reference Photo: Deep Dark Teal with glowing wave elements */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-7 lg:p-8 rounded-3xl bg-gradient-to-r from-[#0d2a2f] via-[#0f383f] to-[#124b54] text-white shadow-xl relative overflow-hidden">
        {/* Ambient Teal Glow wave */}
        <div className="absolute top-0 right-0 w-[450px] h-full bg-gradient-to-l from-teal-400/15 via-teal-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 right-24 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          {/* Breadcrumb row from reference */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
            <span className="uppercase tracking-wider">AUTONOMOUS HR INTELLIGENCE</span>
            <span>&gt;</span>
            <span className="flex items-center gap-1.5 text-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry Active
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Good Morning, HR Team 👋
          </h2>

          <p className="text-xs text-teal-100/80 max-w-2xl leading-relaxed font-medium">
            AI reasoning engines synthesized 124 active candidates, 38 internal profiles, and 5 HR policy corpora. 3 recommendations await human review.
          </p>
        </div>

        {/* CTA Buttons matching reference photo */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-50 text-xs font-bold shadow-lg transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Review AI Approvals</span>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-1" />
          </Link>

          <Link
            to="/policy"
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 backdrop-blur-xs transition-all hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4 text-teal-200" />
            <span>Ask Policy AI</span>
            <ChevronRight className="w-4 h-4 text-white/50 ml-1" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics: Clean White 3D Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="CANDIDATES"
          value={stats.total_candidates}
          subtitle="Screened across open positions"
          icon={Users}
          trend="↑ 18% this month"
          accentColor="teal"
        />
        <StatCard
          title="EMPLOYEES"
          value={stats.total_employees}
          subtitle="Tracked with telemetry & OKRs"
          icon={UserCheck}
          trend="↑ 96% retention rate"
          accentColor="blue"
        />
        <StatCard
          title="HIGH RISK SIGNALS"
          value={stats.high_risk_count}
          subtitle="Attrition & disengagement alerts"
          icon={AlertTriangle}
          trend="Action required"
          trendUp={false}
          accentColor="rose"
        />
        <StatCard
          title="OPEN JOBS"
          value={stats.open_jobs_count}
          subtitle="Active recruitment requisitions"
          icon={Briefcase}
          trend="↑ 2 priority roles"
          accentColor="teal"
        />
      </div>

      {/* AI Workforce Insights Panel from Reference Photo */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#e6f7f5] text-teal-600">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">AI Workforce Insights</h3>
              <p className="text-xs text-slate-500 font-medium">Cross-source signals synthesized by WorkforceIQ Orchestrator</p>
            </div>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-300/80 font-bold">
            Reasoning Engine v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {insights.map((ins: any) => {
            const isRose = ins.badge?.includes("Urgent") || ins.badgeColor === "rose";
            const isAmber = ins.badge?.includes("Capability") || ins.badgeColor === "amber";

            return (
              <Link
                key={ins.id}
                to={ins.action_link}
                className="p-4 rounded-2xl bg-[#f7faf9] border border-slate-200/80 hover:border-teal-400 hover:bg-white transition-all duration-200 group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isRose ? "bg-rose-500" : isAmber ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                      />
                      <span className={isRose ? "text-rose-700" : isAmber ? "text-amber-800" : "text-emerald-800"}>
                        {ins.badge}
                      </span>
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1">
                    {ins.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{ins.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-teal-700 font-bold">
                  <span>{ins.primary_target}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hiring Pipeline Funnel & Workforce Health Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Funnel */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hiring Pipeline Funnel</h3>
              <p className="text-xs text-slate-500 font-medium">Applications to final candidate selections</p>
            </div>
            <Link to="/recruitment" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <span>View Requisitions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipeline} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2eeed" />
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
                <Bar dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            {pipeline.map((p: any, idx: number) => (
              <div key={idx} className="p-2 rounded-xl bg-[#f7faf9] border border-slate-200/60">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{p.stage}</div>
                <div className="text-base font-black text-slate-900">{p.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workforce Health Dimensions */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Workforce Health Radar</h3>
              <p className="text-xs text-slate-500 font-medium">Telemetry across performance, attendance, engagement, growth</p>
            </div>
            <Link to="/employees" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <span>Employee Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={workforceHealth}>
                <PolarGrid stroke="#e2eeed" />
                <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={11} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                <Radar name="Current Score" dataKey="score" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
                <Radar name="Benchmark Target" dataKey="target" stroke="#0284c7" fill="#0284c7" fillOpacity={0.15} />
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
              <div key={idx} className="p-2 rounded-xl bg-[#f7faf9] border border-slate-200/60">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{wh.metric}</div>
                <div className={`text-base font-black ${wh.score < 70 ? "text-amber-600" : "text-slate-900"}`}>
                  {wh.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
