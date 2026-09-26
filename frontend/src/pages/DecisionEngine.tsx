import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles,
  Lock,
  RotateCcw,
  Sliders,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { DECISION_WORKFLOW_STEPS, DecisionStep } from "../data/mockData";

export const DecisionEngine: React.FC = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<DecisionStep[]>(DECISION_WORKFLOW_STEPS);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Step 4 (index 3) is active
  const [isApproving, setIsApproving] = useState(false);
  const [approvalSignature, setApprovalSignature] = useState<string | null>(null);

  const activeStep = steps[activeStepIndex];

  const handleAuthorizeWorkflow = () => {
    setIsApproving(true);
    setTimeout(() => {
      const updated = [...steps];
      // Step 4 (index 3) completed
      updated[3] = { ...updated[3], status: "Completed" };
      // Step 5 (index 4) approved
      updated[4] = {
        ...updated[4],
        status: "Completed",
        timestamp: "Authorized Just Now",
        details: "Signed off by Sarah Jenkins (VP People Ops) & VP Engineering. SHA-256 Ledger: #a78f...92d1"
      };
      // Step 6 (index 5) executed
      updated[5] = {
        ...updated[5],
        status: "Completed",
        timestamp: "Executed Just Now",
        details: "Dispatched webhooks to Workday (Comp Revisions), Jira (Sprint Load Redistribution), and Google Calendar (1-on-1s)."
      };
      // Step 7 (index 6) becomes Active
      updated[6] = {
        ...updated[6],
        status: "Active",
        timestamp: "Telemetry Tracking Active"
      };

      setSteps(updated);
      setIsApproving(false);
      setApprovalSignature("SHA-256: 9b2d8819a84ec7102e3b2c159820f188374a2b91c8491029e847c");
      setActiveStepIndex(5); // Jump to execution view
    }, 900);
  };

  const handleResetWorkflow = () => {
    setSteps(DECISION_WORKFLOW_STEPS);
    setActiveStepIndex(3);
    setApprovalSignature(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              AUTONOMOUS DECISION ORCHESTRATOR
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">
              7-STEP CLOSED LOOP
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Signal-to-Action Pipeline: Human-Governed Autonomous Workforce Interventions
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetWorkflow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Loop</span>
          </button>
          <button
            onClick={() => navigate("/app/scenarios")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs font-semibold text-cyan-300 hover:border-cyan-500/40 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate Alternatives</span>
          </button>
        </div>
      </div>

      {/* 7-Step Interactive Progress Stepper Bar */}
      <div className="p-4 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[750px] relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#142345] -z-0" />

          {steps.map((st, idx) => {
            const isCompleted = st.status === "Completed";
            const isActive = idx === activeStepIndex;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStepIndex(idx)}
                className="flex flex-col items-center cursor-pointer group relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-500/60 shadow-lg shadow-emerald-950"
                      : isActive
                      ? "bg-cyan-500 text-slate-950 border-2 border-white shadow-xl shadow-cyan-500/40 scale-110"
                      : "bg-[#0a1329] text-slate-500 border border-[#152342] group-hover:text-slate-300"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${st.step}`}
                </div>

                <div className="mt-2 text-center max-w-[100px]">
                  <div
                    className={`text-[11px] font-bold truncate ${
                      isActive ? "text-cyan-300" : isCompleted ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {st.title.split(" ")[0]} {st.title.split(" ")[1] || ""}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    {st.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deep Step Dossier */}
        <div className="lg:col-span-8 rounded-2xl bg-[#070e24] border border-[#152342] p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-[#142345] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  STEP 0{activeStep.step} OF 07
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    activeStep.status === "Completed"
                      ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                      : activeStep.status === "Active"
                      ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                      : "bg-slate-900 text-slate-400 border-slate-700"
                  }`}
                >
                  {activeStep.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{activeStep.title}</h3>
              <div className="text-xs text-cyan-300 font-mono mt-0.5">{activeStep.metric}</div>
            </div>

            <div className="text-right text-xs font-mono text-slate-400">
              <div>Telemetry Timestamp</div>
              <div className="text-white font-bold">{activeStep.timestamp}</div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-[#050917] border border-[#132042] text-xs text-slate-200 leading-relaxed">
            {activeStep.details}
          </div>

          {/* Evidence Dossier */}
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verifiable Telemetry Evidence</span>
            </div>
            <div className="space-y-2">
              {activeStep.evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#091228] border border-[#162752] text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Prompt */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#091636] to-[#060e22] border border-cyan-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold">
                Platform Action Gateway
              </div>
              <div className="text-xs text-white font-medium mt-0.5">
                {activeStep.actionPrompt}
              </div>
            </div>

            {/* If activeStepIndex is 3 (Step 4 recommendation) or 4 (Step 5 governance) and not yet authorized */}
            {(activeStepIndex === 3 || activeStepIndex === 4) && steps[4].status === "Pending" && (
              <button
                onClick={handleAuthorizeWorkflow}
                disabled={isApproving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all shrink-0"
              >
                <Lock className="w-4 h-4" />
                <span>{isApproving ? "Verifying Ledger..." : "Sign Off & Authorize"}</span>
              </button>
            )}
          </div>

          {/* Cryptographic Signature if approved */}
          {approvalSignature && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Governance Sign-Off Authenticated: {approvalSignature}</span>
              </div>
              <span className="text-[10px] text-emerald-400/80">Tamper-Proof Ledger</span>
            </div>
          )}
        </div>

        {/* Right Column: Workflow Context & Active Integrations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Affected Personnel Dossier */}
          <div className="p-5 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Target Incident Scope</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#132042]">
                <span className="text-slate-400">Incident ID</span>
                <span className="font-mono text-cyan-300 font-bold">ORD-9281-ENG</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#132042]">
                <span className="text-slate-400">Target Group</span>
                <span className="font-medium text-white">7 Senior Backend Engineers</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#132042]">
                <span className="text-slate-400">Primary Representative</span>
                <span
                  onClick={() => navigate("/app/employees")}
                  className="font-medium text-cyan-400 hover:underline cursor-pointer"
                >
                  Rahul Verma (EMP-102) →
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#132042]">
                <span className="text-slate-400">Financial Exposure</span>
                <span className="font-mono text-rose-300 font-bold">₹2.41 Cr Cost Avoidance</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Expected Resolution</span>
                <span className="font-mono text-emerald-400 font-bold">14.2% → 5.8% Attrition</span>
              </div>
            </div>
          </div>

          {/* Active Enterprise Connectors */}
          <div className="p-5 rounded-2xl bg-[#070e24] border border-[#152342] shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Orchestrated Connectors</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { name: "Workday HRIS", status: "Webhook Ready", action: "Draft comp revision (+7.5%)" },
                { name: "Jira Enterprise", status: "Connected", action: "Reassign 25% sprint backlog items" },
                { name: "Google Calendar", status: "Connected", action: "Schedule VP retention 1-on-1s" },
                { name: "Slack Enterprise", status: "Connected", action: "Send discrete manager notification" },
              ].map((conn, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#091228] border border-[#142345] text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{conn.name}</div>
                    <div className="text-[10px] text-slate-400">{conn.action}</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {conn.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
