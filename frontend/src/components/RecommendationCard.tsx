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
      className={`p-6 rounded-2xl bg-white border transition-all duration-200 shadow-xs hover:shadow-md ${
        isApproved
          ? "border-emerald-300 bg-emerald-50/20"
          : isRejected
          ? "border-rose-300 bg-rose-50/20"
          : "border-slate-200 hover:border-blue-200"
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              rec.target_type === "candidate"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
            }`}
          >
            {rec.target_type === "candidate" ? (
              <Briefcase className="w-4 h-4 text-blue-600" />
            ) : (
              <User className="w-4 h-4 text-indigo-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {rec.target_type === "candidate" ? "Candidate Intelligence" : "Workforce Retention Signal"}
              </span>
              <span className="text-[10px] text-slate-300">?</span>
              <span className="text-[11px] text-slate-500 font-medium">
                {new Date(rec.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>{rec.target_name}</span>
              {rec.candidate_score && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
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
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isRejected
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{rec.status}</span>
          </span>
        </div>
      </div>

      {/* Main Insights Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Finding & Evidence</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">{rec.finding}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Reasoning</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{rec.reason}</p>
        </div>
      </div>

      {/* Recommended Action Highlight */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 mb-5">
        <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
          Recommended Next Step: {rec.recommendation_type}
        </div>
        <p className="text-sm font-bold text-blue-950">{rec.action}</p>
      </div>

      {/* Audit Review Details if available */}
      {rec.reviewed_by && (
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-4 flex items-center justify-between">
          <span>Reviewed by: <strong className="text-slate-900">{rec.reviewed_by}</strong></span>
          <span className="italic text-slate-500 text-[11px]">{rec.review_notes}</span>
        </div>
      )}

      {/* Decision Buttons for Human-in-the-Loop HR Approval */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Human verification required prior to platform execution</span>
        </div>

        {isPending ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openActionModal("approve")}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve Action</span>
            </button>
            <button
              onClick={() => openActionModal("reject")}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
            <button
              onClick={() => openActionModal("review")}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Add Notes</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openActionModal("review")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              Modify Audit Notes
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h4 className="text-base font-bold text-slate-900 mb-2 capitalize">
              {modalMode === "approve"
                ? "Authorize HR Recommendation"
                : modalMode === "reject"
                ? "Reject Recommendation"
                : "Submit HRBP Review Notes"}
            </h4>
            <p className="text-xs text-slate-600 mb-4 font-medium">
              Target: <strong className="text-slate-900">{rec.target_name}</strong> ? Action:{" "}
              <strong className="text-blue-700">{rec.action}</strong>
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Audit Trail / Authorization Note:
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="Add contextual reasoning for audit compliance..."
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-colors ${
                  modalMode === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : modalMode === "reject"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-blue-600 hover:bg-blue-700"
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
