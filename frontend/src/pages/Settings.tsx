import React from "react";
import { Settings as SettingsIcon, ShieldCheck, Cpu, Database, CheckCircle2 } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <span>Platform Architecture & AI Governance Settings</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure AI Orchestrator weights, vector database bindings, and Responsible AI guardrails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <Cpu className="w-4 h-4 text-teal-600" />
            <span>AI Orchestrator Scoring Weights</span>
          </div>
          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <span className="font-medium text-slate-700">Skill Match Weight</span>
              <strong className="text-teal-800 font-bold bg-teal-100/70 px-2 py-0.5 rounded-lg border border-teal-200">50%</strong>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <span className="font-medium text-slate-700">Semantic / Contextual Match Weight</span>
              <strong className="text-teal-800 font-bold bg-teal-100/70 px-2 py-0.5 rounded-lg border border-teal-200">30%</strong>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <span className="font-medium text-slate-700">Experience Match Weight</span>
              <strong className="text-teal-800 font-bold bg-teal-100/70 px-2 py-0.5 rounded-lg border border-teal-200">20%</strong>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Responsible AI Safeguards</span>
          </div>
          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Human-in-the-loop required for all candidate & employee actions</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demographic PII anonymized prior to candidate matching</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f7faf9] border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Audit trail logging enabled for all HR reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
