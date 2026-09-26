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
    await recommendationsApi.approve(id, note, "Sarah Jenkins (HR Admin)");
    await loadRecommendations();
  };

  const handleReject = async (id: number, note: string) => {
    await recommendationsApi.reject(id, note, "Sarah Jenkins (HR Admin)");
    await loadRecommendations();
  };

  const handleReview = async (id: number, note: string) => {
    await recommendationsApi.review(id, note, "Sarah Jenkins (HR Admin)", "Under HR Review");
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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>AI Recommendations & Human Approval</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Human-in-the-Loop governance gateway: Review, authorize, or modify AI-generated talent recommendations.
          </p>
        </div>

        {/* Summary Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingCount} Pending Review</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{approvedCount} Approved</span>
          </div>
        </div>
      </div>

      {/* Responsible AI Safeguard Notice */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center gap-3 text-xs text-teal-950 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
        <div>
          <strong className="text-teal-900">Responsible AI Governance Safeguard:</strong> AI recommendations are decision-support signals and require explicit human review. Sensitive demographic attributes are excluded from scoring models, and no candidate rejection or employee action is executed autonomously.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {["All", "Pending HR Review", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === st
                  ? "bg-teal-600 text-white shadow-xs shadow-teal-500/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Category:</span>
          {["All", "candidate", "employee"].map((tp) => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                typeFilter === tp
                  ? "bg-[#0d2127] text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
