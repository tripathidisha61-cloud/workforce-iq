import React, { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";
import { recommendationsApi } from "../services/api";
import { RecommendationCard, RecommendationProps } from "../components/RecommendationCard";

export const Recommendations: React.FC = () => {
  const [recs, setRecs] = useState<RecommendationProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const loadRecommendations = async () => {
    const data = await recommendationsApi.getAll();
    setRecs(data || []);
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleApprove = async (id: number, note: string) => {
    await recommendationsApi.approve(id, note, "Sarah Jenkins (HR Director)");
    await loadRecommendations();
  };

  const handleReject = async (id: number, note: string) => {
    await recommendationsApi.reject(id, note, "Sarah Jenkins (HR Director)");
    await loadRecommendations();
  };

  const handleReview = async (id: number, note: string) => {
    await recommendationsApi.review(id, note, "Sarah Jenkins (HR Director)", "Under HR Review");
    await loadRecommendations();
  };

  const filtered = recs.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchType = typeFilter === "All" || r.target_type === typeFilter;
    return matchStatus && matchType;
  });

  const pendingCount = recs.filter((r) => r.status === "Pending HR Review").length;
  const approvedCount = recs.filter((r) => r.status === "Approved").length;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>AI Recommendations & Human Approval</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-Loop governance gateway: Review, authorize, or modify AI-generated talent recommendations.
          </p>
        </div>

        {/* Summary Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingCount} Pending Review</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{approvedCount} Approved</span>
          </div>
        </div>
      </div>

      {/* Responsible AI Safeguard Notice */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center gap-3 text-xs text-indigo-200">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <strong className="text-white">Responsible AI Governance Safeguard:</strong> AI recommendations are decision-support signals and require explicit human review. Sensitive demographic attributes are excluded from scoring models, and no candidate rejection or employee action is executed autonomously.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {["All", "Pending HR Review", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === st
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-800/70 text-slate-400 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Category:</span>
          {["All", "candidate", "employee"].map((tp) => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                typeFilter === tp
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              {tp === "All" ? "All Signals" : `${tp}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Cards List */}
      <div className="space-y-5">
        {filtered.map((rec) => (
          <RecommendationCard
            key={rec.id}
            rec={rec}
            onApprove={handleApprove}
            onReject={handleReject}
            onReview={handleReview}
          />
        ))}
      </div>
    </div>
  );
};
