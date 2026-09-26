import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Cpu,
  Database,
  CheckCircle2,
  Lock,
  Zap,
  Sliders,
  Save,
  RotateCcw,
  Check,
  X
} from "lucide-react";

export const Settings: React.FC = () => {
  const [flightSensitivity, setFlightSensitivity] = useState(85);
  const [workloadThreshold, setWorkloadThreshold] = useState(88);
  const [compParityBuffer, setCompParityBuffer] = useState(90);
  const [hitlStrict, setHitlStrict] = useState(true);
  const [piiAnonymized, setPiiAnonymized] = useState(true);
  const [shaLedger, setShaLedger] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-[#071328] border border-emerald-500/50 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">
            Autonomous governance parameters successfully persisted to enterprise vault.
          </span>
          <button onClick={() => setSavedToast(false)} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              PLATFORM ARCHITECTURE & GOVERNANCE
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              v2.8-EDGE CONFIG
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Neural Sensitivity Calibration, Connector Webhooks & Responsible AI Safeguards
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Persist Configuration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Neural Sensitivity Sliders */}
        <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl space-y-5">
          <div className="border-b border-[#142345] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>AI Anomaly & Risk Threshold Calibration</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tune neural trigger sensitivities across organizational signals.
            </p>
          </div>

          <div className="space-y-4">
            {/* 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Flight Risk Escalation Cutoff</span>
                <span className="font-mono text-cyan-400 font-bold">{flightSensitivity}/100</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={flightSensitivity}
                onChange={(e) => setFlightSensitivity(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>60 (High Alert Noise)</span>
                <span>85 (Recommended)</span>
                <span>95 (Only Severe Flight)</span>
              </div>
            </div>

            {/* 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Workload Burnout Sensitivity</span>
                <span className="font-mono text-cyan-400 font-bold">{workloadThreshold}% Capacity</span>
              </div>
              <input
                type="range"
                min="75"
                max="95"
                value={workloadThreshold}
                onChange={(e) => setWorkloadThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>75% (Strict Limit)</span>
                <span>88% (Nominal Sprints)</span>
                <span>95% (Peak Burst)</span>
              </div>
            </div>

            {/* 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Market Compensation Alert Floor</span>
                <span className="font-mono text-cyan-400 font-bold">{compParityBuffer}% Market Ratio</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                value={compParityBuffer}
                onChange={(e) => setCompParityBuffer(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>80% (Extreme Deficit)</span>
                <span>90% (Industry Standard)</span>
                <span>100% (Full Parity)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Responsible AI Guardrails */}
        <div className="p-6 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl space-y-5">
          <div className="border-b border-[#142345] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Responsible AI Governance & Compliance</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enforced ethical safeguards, human authorization gateways, and privacy protocols.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Toggle 1 */}
            <div className="p-3.5 rounded-xl bg-[#050917] border border-[#132042] flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Human-in-the-Loop Gateway</div>
                <div className="text-slate-400 text-[11px]">
                  Requires designated People Ops signature before executing compensation or backlog changes.
                </div>
              </div>
              <button
                onClick={() => setHitlStrict(!hitlStrict)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  hitlStrict ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                    hitlStrict ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="p-3.5 rounded-xl bg-[#050917] border border-[#132042] flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Zero-PII Anonymization</div>
                <div className="text-slate-400 text-[11px]">
                  Masks personal demographics and communications prior to neural risk scoring.
                </div>
              </div>
              <button
                onClick={() => setPiiAnonymized(!piiAnonymized)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  piiAnonymized ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                    piiAnonymized ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="p-3.5 rounded-xl bg-[#050917] border border-[#132042] flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Cryptographic SHA-256 Ledger</div>
                <div className="text-slate-400 text-[11px]">
                  Immutable audit hashing for every AI recommendation, review, and execution step.
                </div>
              </div>
              <button
                onClick={() => setShaLedger(!shaLedger)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  shaLedger ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                    shaLedger ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
