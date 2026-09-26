import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Users,
  Compass,
  Zap,
  BookmarkPlus,
  BarChart2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { runWorkforceSimulation, SimulationParams } from "../data/mockData";

export const ScenarioSimulator: React.FC = () => {
  const navigate = useNavigate();

  // 5 Controls as specified:
  // Hiring: +10, +25, +50
  // Salary adjustment: 0%, +5%, +10%
  // Remote workforce: 0%, 25%, 50%, 75%
  // Training investment: Low, Medium, High
  // Workload: Current, -10%, -20%
  const [params, setParams] = useState<SimulationParams>({
    hiringCount: 10,
    salaryAdjustmentPercent: 5,
    remoteWorkforcePercent: 50,
    trainingInvestment: "Medium",
    workloadChangePercent: -10
  });

  const [savedToast, setSavedToast] = useState<string | null>(null);

  // Compute dynamic simulation result
  const result = useMemo(() => {
    return runWorkforceSimulation(params);
  }, [params]);

  // Preset Configurations
  const applyPreset = (presetName: string) => {
    if (presetName === "growth") {
      setParams({
        hiringCount: 50,
        salaryAdjustmentPercent: 5,
        remoteWorkforcePercent: 25,
        trainingInvestment: "High",
        workloadChangePercent: 0
      });
    } else if (presetName === "retention") {
      setParams({
        hiringCount: 10,
        salaryAdjustmentPercent: 10,
        remoteWorkforcePercent: 50,
        trainingInvestment: "High",
        workloadChangePercent: -20
      });
    } else if (presetName === "cost") {
      setParams({
        hiringCount: 0,
        salaryAdjustmentPercent: 0,
        remoteWorkforcePercent: 75,
        trainingInvestment: "Medium",
        workloadChangePercent: -10
      });
    } else {
      // Balanced
      setParams({
        hiringCount: 25,
        salaryAdjustmentPercent: 5,
        remoteWorkforcePercent: 50,
        trainingInvestment: "Medium",
        workloadChangePercent: -10
      });
    }
  };

  const resetToBaseline = () => {
    setParams({
      hiringCount: 0,
      salaryAdjustmentPercent: 0,
      remoteWorkforcePercent: 25,
      trainingInvestment: "Low",
      workloadChangePercent: 0
    });
  };

  const handleSaveScenario = () => {
    setSavedToast("Scenario successfully compiled and dispatched to Autonomous Decision Engine.");
    setTimeout(() => {
      setSavedToast(null);
      navigate("/app/decisions");
    }, 1500);
  };

  const chartComparisonData = [
    {
      metric: "Attrition (%)",
      Baseline: result.baseline.attrition,
      Simulated: result.projectedAttrition
    },
    {
      metric: "Productivity (%)",
      Baseline: result.baseline.productivity,
      Simulated: result.projectedProductivity
    },
    {
      metric: "Skill Cov. (%)",
      Baseline: result.baseline.skillCoverage,
      Simulated: result.skillCoverage
    },
    {
      metric: "Satisfaction (%)",
      Baseline: result.baseline.satisfaction,
      Simulated: result.employeeSatisfaction
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-400 text-white shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold">{savedToast}</span>
        </div>
      )}

      {/* Header Banner with Exact Requested Title */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              WORKFORCE SCENARIO SIMULATOR
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              PREDICTIVE WHAT IF ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            What happens if we change the workforce?
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dynamically adjust organizational levers to project changes in attrition, productivity, and annual cost.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToBaseline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={handleSaveScenario}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>Save & Route to Decision Loop</span>
          </button>
        </div>
      </div>

      {/* Preset Scenario Quick-Picks */}
      <div className="p-3 rounded-2xl bg-[#070e24] border border-[#152342] flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold px-2">
          Recommended Presets:
        </span>
        <button
          onClick={() => applyPreset("balanced")}
          className="px-3 py-1.5 rounded-xl bg-[#0b1633] hover:bg-[#12224d] text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
        >
          Balanced Retention & Flex (Recommended)
        </button>
        <button
          onClick={() => applyPreset("retention")}
          className="px-3 py-1.5 rounded-xl bg-[#091228] hover:bg-[#101e42] text-slate-300 border border-[#162752] text-xs font-semibold transition-colors"
        >
          Maximum Talent Retention (+10% Comp)
        </button>
        <button
          onClick={() => applyPreset("growth")}
          className="px-3 py-1.5 rounded-xl bg-[#091228] hover:bg-[#101e42] text-slate-300 border border-[#162752] text-xs font-semibold transition-colors"
        >
          Aggressive Headcount Expansion (+50 Hires)
        </button>
        <button
          onClick={() => applyPreset("cost")}
          className="px-3 py-1.5 rounded-xl bg-[#091228] hover:bg-[#101e42] text-slate-300 border border-[#162752] text-xs font-semibold transition-colors"
        >
          Remote First & Capital Conservation
        </button>
      </div>

      {/* Two Column Layout: Controls on Left, Before/After & Visualizations on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Exact Interactive Controls */}
        <div className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-6">
          <div className="border-b border-[#142345] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Interactive Workforce Levers</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click buttons to test discrete scenarios or drag sliders.
            </p>
          </div>

          {/* 1. Hiring: +10, +25, +50 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Hiring Additions</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                +{params.hiringCount} Hires
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 10, 25, 50].map((count) => (
                <button
                  key={count}
                  onClick={() => setParams({ ...params, hiringCount: count })}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    params.hiringCount === count
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      : "bg-[#050917] text-slate-400 hover:text-white border border-[#142345]"
                  }`}
                >
                  {count === 0 ? "0 (Freeze)" : `+${count}`}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Salary adjustment: 0%, +5%, +10% */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Salary Adjustment</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                +{params.salaryAdjustmentPercent}% Comp
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 5, 10].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setParams({ ...params, salaryAdjustmentPercent: pct })}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    params.salaryAdjustmentPercent === pct
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      : "bg-[#050917] text-slate-400 hover:text-white border border-[#142345]"
                  }`}
                >
                  +{pct}%
                </button>
              ))}
            </div>
          </div>

          {/* 3. Remote workforce: 0%, 25%, 50%, 75% */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Remote Workforce</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.remoteWorkforcePercent}% Remote
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 25, 50, 75].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setParams({ ...params, remoteWorkforcePercent: pct })}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    params.remoteWorkforcePercent === pct
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      : "bg-[#050917] text-slate-400 hover:text-white border border-[#142345]"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* 4. Training investment: Low, Medium, High */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Training Investment</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.trainingInvestment} Tier
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["Low", "Medium", "High"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setParams({ ...params, trainingInvestment: tier })}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    params.trainingInvestment === tier
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950"
                      : "bg-[#050917] text-slate-400 hover:text-white border border-[#142345]"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Workload: Current, -10%, -20% */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Workload Target</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.workloadChangePercent === 0 ? "Current Load" : `${params.workloadChangePercent}% Target`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Current", val: 0 },
                { label: "-10%", val: -10 },
                { label: "-20%", val: -20 },
              ].map((wl) => (
                <button
                  key={wl.val}
                  onClick={() => setParams({ ...params, workloadChangePercent: wl.val })}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    params.workloadChangePercent === wl.val
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      : "bg-[#050917] text-slate-400 hover:text-white border border-[#142345]"
                  }`}
                >
                  {wl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Exact CURRENT vs SIMULATED Comparison */}
        <div className="lg:col-span-7 space-y-6">
          {/* Exact Comparison Card Block from Prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CURRENT Baseline */}
            <div className="p-5 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
              <div className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider mb-2">
                CURRENT BASELINE
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Attrition:</span>
                  <span className="font-mono text-base font-bold text-white">12.4%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Productivity:</span>
                  <span className="font-mono text-base font-bold text-white">82%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Annual Cost:</span>
                  <span className="font-mono text-base font-bold text-white">₹48.2 Cr</span>
                </div>
                <div className="pt-2 border-t border-[#132042] flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Skill Coverage: 76%</span>
                  <span>Satisfaction: 74%</span>
                </div>
              </div>
            </div>

            {/* SIMULATED Outcome */}
            <div className="p-5 rounded-2xl bg-[#091533] border border-cyan-500/50 shadow-2xl relative glow-cyan">
              <div className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2 flex items-center justify-between">
                <span>SIMULATED OUTCOME</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  REAL-TIME DELTA
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Projected Attrition:</span>
                  <span className="font-mono text-base font-black text-emerald-400">
                    {result.projectedAttrition}%
                    <span className="text-xs font-normal text-emerald-300 ml-1">
                      ({result.projectedAttrition <= result.baseline.attrition ? "-" : "+"}
                      {Math.abs(Number((result.projectedAttrition - result.baseline.attrition).toFixed(1)))}%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Productivity Yield:</span>
                  <span className="font-mono text-base font-black text-cyan-300">
                    {result.projectedProductivity}%
                    <span className="text-xs font-normal text-cyan-400 ml-1">
                      (+{(result.projectedProductivity - result.baseline.productivity).toFixed(1)}%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Annual Cost:</span>
                  <span className="font-mono text-base font-black text-white">
                    ₹{result.annualCostCr} Cr
                    <span className="text-xs font-normal text-amber-400 ml-1">
                      ({result.annualCostCr >= result.baseline.annualCostCr ? "+" : ""}
                      {(result.annualCostCr - result.baseline.annualCostCr).toFixed(1)} Cr)
                    </span>
                  </span>
                </div>
                <div className="pt-2 border-t border-[#132042] flex justify-between text-[11px] text-cyan-300 font-mono">
                  <span>Skill Coverage: {result.skillCoverage}%</span>
                  <span>Satisfaction: {result.employeeSatisfaction}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Delta Chart */}
          <div className="p-5 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Delta Comparison: Current vs Simulated</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-slate-600" /> Current
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Simulated
                </span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#121e3d" />
                  <XAxis dataKey="metric" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
                  />
                  <Bar dataKey="Baseline" name="Current" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" name="Simulated" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0b1b3d] to-[#071129] border border-cyan-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Recommendation</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                93% CONFIDENCE
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {result.aiRecommendation}
            </p>

            <div className="pt-2 border-t border-[#162752] flex items-center justify-between text-xs">
              <div className="text-slate-400 font-mono text-[11px]">
                Open Requisitions Impact: <strong className="text-white">{result.hiringRequirement} Roles Required</strong>
              </div>
              <button
                onClick={handleSaveScenario}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
              >
                <span>Authorize in Decision Loop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
