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

  // 5 Interactive Slider Controls
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

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              WORKFORCE SCENARIO SIMULATOR
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">
              MONTE CARLO ENGINE
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Predictive 'What If' Modeling: Stress-Test Strategic Levers Before Budget Commitments
          </h2>
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
        {/* Left Column: 5 Interactive Slider Controls */}
        <div className="lg:col-span-5 rounded-2xl bg-[#070e24] border border-[#152342] p-5 shadow-xl space-y-6">
          <div className="border-b border-[#142345] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Scenario Levers & Parameters</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Adjust variables to simulate continuous workforce dynamics.
            </p>
          </div>

          {/* 1. Hiring Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Planned Hiring Additions</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                +{params.hiringCount} Employees
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={params.hiringCount}
              onChange={(e) => setParams({ ...params, hiringCount: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 (Freeze)</span>
              <span>25 Hires</span>
              <span>50 Hires (Surge)</span>
            </div>
          </div>

          {/* 2. Salary Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Base Compensation Adjustment</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                +{params.salaryAdjustmentPercent}% Market Parity
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={params.salaryAdjustmentPercent}
              onChange={(e) => setParams({ ...params, salaryAdjustmentPercent: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Status Quo)</span>
              <span>+5%</span>
              <span>+15% (Aggressive)</span>
            </div>
          </div>

          {/* 3. Remote Workforce % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Remote / Flexible Ratio</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.remoteWorkforcePercent}% Distributed
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={params.remoteWorkforcePercent}
              onChange={(e) => setParams({ ...params, remoteWorkforcePercent: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Full Office)</span>
              <span>50% (Hybrid)</span>
              <span>100% (Remote)</span>
            </div>
          </div>

          {/* 4. Training Investment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Skills & Training Tier</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.trainingInvestment} Tier
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["Low", "Medium", "High"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setParams({ ...params, trainingInvestment: tier })}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
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

          {/* 5. Workload Change */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-semibold">Sprint Workload Rebalancing</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {params.workloadChangePercent}% Load Target
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="0"
              step="5"
              value={params.workloadChangePercent}
              onChange={(e) => setParams({ ...params, workloadChangePercent: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20% (De-compress)</span>
              <span>-10%</span>
              <span>0% (Peak Capacity)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Before / After Comparisons & Projections */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dynamic Metric Comparison Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* 1. Attrition */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Projected Attrition</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-1">
                {result.projectedAttrition}%
              </div>
              <div className="text-[11px] font-mono mt-1 flex items-center gap-1 text-slate-400">
                <span>Baseline: {result.baseline.attrition}%</span>
                <span className={`font-bold ${result.projectedAttrition < result.baseline.attrition ? "text-emerald-400" : "text-rose-400"}`}>
                  ({result.projectedAttrition < result.baseline.attrition ? "-" : "+"}
                  {Math.abs(Number((result.projectedAttrition - result.baseline.attrition).toFixed(1)))}%)
                </span>
              </div>
            </div>

            {/* 2. Productivity */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Productivity Index</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-cyan-300 mt-1">
                {result.projectedProductivity}%
              </div>
              <div className="text-[11px] font-mono mt-1 flex items-center gap-1 text-slate-400">
                <span>Baseline: {result.baseline.productivity}%</span>
                <span className="text-cyan-400 font-bold">
                  (+{(result.projectedProductivity - result.baseline.productivity).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* 3. Annual Cost */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Annualized Cost</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                ₹{result.annualCostCr} Cr
              </div>
              <div className="text-[11px] font-mono mt-1 flex items-center gap-1 text-slate-400">
                <span>Baseline: ₹{result.baseline.annualCostCr} Cr</span>
                <span className="text-amber-400 font-bold">
                  ({result.annualCostCr >= result.baseline.annualCostCr ? "+" : ""}
                  {(result.annualCostCr - result.baseline.annualCostCr).toFixed(1)} Cr)
                </span>
              </div>
            </div>

            {/* 4. Skill Coverage */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Skill Coverage</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-sky-400 mt-1">
                {result.skillCoverage}%
              </div>
              <div className="text-[11px] font-mono mt-1 text-slate-400">
                Baseline: {result.baseline.skillCoverage}% ({result.skillCoverage - result.baseline.skillCoverage >= 0 ? "+" : ""}
                {result.skillCoverage - result.baseline.skillCoverage}%)
              </div>
            </div>

            {/* 5. Satisfaction */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Talent Satisfaction</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-1">
                {result.employeeSatisfaction}%
              </div>
              <div className="text-[11px] font-mono mt-1 text-slate-400">
                Baseline: {result.baseline.satisfaction}% (+{result.employeeSatisfaction - result.baseline.satisfaction}%)
              </div>
            </div>

            {/* 6. Hiring Requirement */}
            <div className="p-4 rounded-xl bg-[#070e24] border border-[#152342] shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Net Open Requisitions</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                {result.hiringRequirement} Roles
              </div>
              <div className="text-[11px] font-mono mt-1 text-slate-400">
                Baseline: {result.baseline.hiringRequirement} Roles
              </div>
            </div>
          </div>

          {/* Recharts Bar Chart: Baseline vs Simulated */}
          <div className="p-5 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Telemetry Delta: Baseline vs Simulated Scenario</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-slate-600" /> Baseline
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Simulated
                </span>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#121e3d" />
                  <XAxis dataKey="metric" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#060b16", borderColor: "#172554", fontSize: "11px" }}
                  />
                  <Bar dataKey="Baseline" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Autonomous Synthesis Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0b1b3d] to-[#071129] border border-cyan-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Autonomous Synthesis & Policy Recommendation</span>
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
                Target ROI Avoidance: <strong className="text-emerald-400">₹2.8 Cr in Attrition Overhead</strong>
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
