import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  ArrowRight,
  Zap,
  Lock,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Check,
  X
} from "lucide-react";
import { MOCK_RECOMMENDATIONS, RecommendationAction } from "../data/mockData";

export const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationAction[]>(MOCK_RECOMMENDATIONS);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [approvalModalItem, setApprovalModalItem] = useState<RecommendationAction | null>(null);
  const [approvalNote, setApprovalNote] = useState("Authorized based on Q4 flight risk mitigation plan.");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApproveAction = (item: RecommendationAction) => {
    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? {
              ...r,
              status: "Approved",
              approvedBy: "Sarah Jenkins (VP People Ops)",
              approvedAt: "Just now"
            }
          : r
      )
    );
    setApprovalModalItem(null);
    setToastMessage(`Authorized ${item.title}. Dispatched to HRIS & Orchestration webhooks.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDeclineAction = (item: RecommendationAction) => {
    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? {
              ...r,
              status: "Declined"
            }
          : r
      )
    );
    setApprovalModalItem(null);
  };

  const filtered = recommendations.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const matchesCat = categoryFilter === "ALL" || r.category === categoryFilter;
    return matchesStatus && matchesCat;
  });

  const pendingCount = recommendations.filter((r) => r.status === "Pending").length;
  const approvedCount = recommendations.filter((r) => r.status === "Approved").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-[#071328] border border-emerald-500/50 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-emerald-300">Governance Gateway Approved</div>
            <div className="text-slate-300">{toastMessage}</div>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1533] via-[#091129] to-[#070e24] border border-[#162752] flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              AI RECOMMENDATION CENTER
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-bold">
              HUMAN-IN-THE-LOOP (HITL)
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
            Prescriptive Interventions: Review, Authorize & Orchestrate Autonomous Strategy
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800">
              {pendingCount} Pending Sign-off
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              {approvedCount} Authorized
            </span>
          </div>

          <button
            onClick={() => navigate("/app/decisions")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Pipeline</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#070e24] border border-[#152342]">
        <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
          <span className="text-slate-500 uppercase font-bold px-1">Category:</span>
          {["ALL", "Retention", "Hiring", "Training", "Mobility", "Succession"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                categoryFilter === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="text-slate-500 uppercase font-bold px-1">Status:</span>
          {["ALL", "Pending", "Approved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                statusFilter === st
                  ? "bg-blue-500/20 text-cyan-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Action Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.status === "Approved"
                ? "bg-[#070e24]/70 border-emerald-950/60"
                : "bg-[#070e24] border-cyan-500/30 shadow-xl shadow-black/40"
            }`}
          >
            {/* Top Row: Meta Tags & Status */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded font-black tracking-wider uppercase border ${
                    item.category === "Retention"
                      ? "bg-rose-950 text-rose-300 border-rose-800"
                      : item.category === "Training"
                      ? "bg-sky-950 text-sky-300 border-sky-800"
                      : item.category === "Hiring"
                      ? "bg-blue-950 text-blue-300 border-blue-800"
                      : "bg-purple-950 text-purple-300 border-purple-800"
                  }`}
                >
                  {item.category}
                </span>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold border ${
                    item.priority === "CRITICAL"
                      ? "bg-rose-950/80 text-rose-300 border-rose-800"
                      : "bg-amber-950/80 text-amber-300 border-amber-800"
                  }`}
                >
                  {item.priority} PRIORITY
                </span>

                <span className="text-[10px] font-mono text-slate-400">
                  {item.department} • Target Cohort: {item.targetCount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                  {item.confidence}% Confidence
                </span>

                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 border ${
                    item.status === "Approved"
                      ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                      : item.status === "Declined"
                      ? "bg-slate-900 text-slate-500 border-slate-700"
                      : "bg-amber-950 text-amber-300 border-amber-800"
                  }`}
                >
                  {item.status === "Approved" ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-400" />
                  )}
                  <span>{item.status}</span>
                </span>
              </div>
            </div>

            {/* Title & Rationale */}
            <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.rationale}</p>

            {/* Telemetry Drivers & Execution Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Telemetry Risk Drivers</span>
                </div>
                <ul className="space-y-1">
                  {item.drivers.map((d, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#050917] border border-[#132042]">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Proposed Execution Actions</span>
                </div>
                <ul className="space-y-1">
                  {item.executionPlan.map((step, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Row: Cost, ROI & Action Gateway */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#132042]">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">
                  Est. Cost: <strong className="text-white">{item.estimatedCost}</strong>
                </span>
                <span className="text-emerald-400 font-bold">
                  ROI: {item.projectedROI}
                </span>
              </div>

              {item.status === "Pending" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeclineAction(item)}
                    className="px-3 py-1.5 rounded-lg bg-[#050917] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#142345] text-xs font-semibold transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setApprovalModalItem(item)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Approve & Authorize</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs text-emerald-300 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    Authorized by {item.approvedBy} ({item.approvedAt})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Human Governance Approval Modal */}
      {approvalModalItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#070e24] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-[#142345] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Governance Sign-Off Authorization
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Responsible AI & Audit Trail Protocol
                  </div>
                </div>
              </div>
              <button
                onClick={() => setApprovalModalItem(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white">{approvalModalItem.title}</div>
              <div className="text-slate-300">{approvalModalItem.rationale}</div>
              <div className="p-2.5 rounded-lg bg-[#050917] border border-[#132042] text-[11px] text-cyan-300 font-mono">
                Projected Impact: {approvalModalItem.projectedROI}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Executive Authorization Note (Saved to SHA-256 Ledger)
              </label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                rows={2}
                className="w-full bg-[#050917] border border-[#142345] focus:border-cyan-500/50 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#142345]">
              <button
                onClick={() => setApprovalModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApproveAction(approvalModalItem)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Execute</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
