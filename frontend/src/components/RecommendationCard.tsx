import React, { useState } from "react";
import { Check, X, Eye, Sparkles, User, Briefcase, Clock, ShieldCheck } from "lucide-react";

export interface RecommendationProps {
  id: number;
  target_type: "candidate" | "employee";
  target_id: number;
  target_name: string;
  candidate_score?: number;
  recommendation_type: string;
  finding: string;
  reason: string;
  action: string;
  status: "Pending HR Review" | "Approved" | "Rejected" | string;
  created_at: string;
  reviewed_by?: string;
  review_notes?: string;
}

interface CardActionProps {
  rec: RecommendationProps;
  onApprove: (id: number, note: string) => Promise<void>;
  onReject: (id: number, note: string) => Promise<void>;
  onReview: (id: number, note: string) => Promise<void>;
}

export const RecommendationCard: React.FC<CardActionProps> = ({
  rec,
  onApprove,
  onReject,
  onReview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"approve" | "reject" | "review">("approve");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const isPending = rec.status === "Pending HR Review";
  const isApproved = rec.status === "Approved";
  const isRejected = rec.status === "Rejected";

  const handleAction = async () => {
    setLoading(true);
    try {
      if (modalMode === "approve") await onApprove(rec.id, note);
      else if (modalMode === "reject") await onReject(rec.id, note);
      else await onReview(rec.id, note);
      setIsModalOpen(false);
      setNote("");
    } finally {
      setLoading(false);
    }
  };

  const openActionModal = (mode: "approve" | "reject" | "review") => {
    setModalMode(mode);
    setNote(
      mode === "approve"
        ? "Approved by HR review. Proceed with scheduled workflow."
        : mode === "reject"
        ? "Action deferred following internal department alignment."
        : "HRBP noted for upcoming 1-on-1 sprint review."
    );
    setIsModalOpen(true);
  };

  return (
    <div
      className={`p-6 rounded-2xl bg-slate-800/60 border backdrop-blur-sm transition-all duration-200 shadow-xl ${
        isApproved
          ? "border-emerald-500/40 bg-emerald-950/10"
          : isRejected
          ? "border-rose-500/40 bg-rose-950/10"
          : "border-slate-700/80 hover:border-slate-600"
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              rec.target_type === "candidate"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
            }`}
          >
            {rec.target_type === "candidate" ? (
              <Briefcase className="w-4 h-4 text-indigo-400" />
            ) : (
              <User className="w-4 h-4 text-purple-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {rec.target_type === "candidate" ? "Candidate Intelligence" : "Workforce Retention Signal"}
              </span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[11px] text-slate-400">
                {new Date(rec.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>{rec.target_name}</span>
              {rec.candidate_score && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {rec.candidate_score}% Match
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
              isApproved
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : isRejected
                ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{rec.status}</span>
          </span>
        </div>
      </div>

      {/* Main Insights Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Finding & Evidence</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">{rec.finding}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Reasoning</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>
        </div>
      </div>

      {/* Recommended Action Highlight */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 mb-5">
        <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
          Recommended Next Step: {rec.recommendation_type}
        </div>
        <p className="text-sm font-semibold text-white">{rec.action}</p>
      </div>

      {/* Audit Review Details if available */}
      {rec.reviewed_by && (
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 mb-4 flex items-center justify-between">
          <span>Reviewed by: <strong className="text-slate-200">{rec.reviewed_by}</strong></span>
          <span className="italic text-slate-400 text-[11px]">{rec.review_notes}</span>
        </div>
      )}

      {/* Decision Buttons for Human-in-the-Loop HR Approval */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/50">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Human verification required prior to platform execution</span>
        </div>

        {isPending ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openActionModal("approve")}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve Action</span>
            </button>
            <button
              onClick={() => openActionModal("reject")}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
            <button
              onClick={() => openActionModal("review")}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Add Notes</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openActionModal("review")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Modify Audit Notes
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2 capitalize">
              {modalMode === "approve"
                ? "Authorize HR Recommendation"
                : modalMode === "reject"
                ? "Reject Recommendation"
                : "Submit HRBP Review Notes"}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Target: <strong className="text-white">{rec.target_name}</strong> • Action:{" "}
              <strong className="text-indigo-300">{rec.action}</strong>
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Audit Trail / Authorization Note:
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add contextual reasoning for audit compliance..."
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg transition-colors ${
                  modalMode === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : modalMode === "reject"
                    ? "bg-rose-600 hover:bg-rose-500"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {loading ? "Recording..." : "Confirm & Sign Off"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
