import React from "react";
import { Settings as SettingsIcon, ShieldCheck, Cpu, Database, CheckCircle2 } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-indigo-400" />
          <span>Platform Architecture & AI Governance Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure AI Orchestrator weights, vector database bindings, and Responsible AI guardrails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>AI Orchestrator Scoring Weights</span>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between p-3 rounded-xl bg-slate-900">
              <span>Skill Match Weight</span>
              <strong className="text-emerald-400">50%</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-900">
              <span>Semantic / Contextual Match Weight</span>
              <strong className="text-indigo-400">30%</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-900">
              <span>Experience Match Weight</span>
              <strong className="text-purple-400">20%</strong>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Responsible AI Safeguards</span>
          </div>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Human-in-the-loop required for all candidate & employee actions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Demographic PII anonymized prior to candidate matching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Audit trail logging enabled for all HR reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
