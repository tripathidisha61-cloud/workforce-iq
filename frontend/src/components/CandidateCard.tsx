import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export interface CandidateProps {
  id: number;
  name: string;
  email: string;
  job_title: string;
  experience: number;
  education?: string;
  match_score: number;
  skills: Array<{ name: string; level: string; score?: number }>;
  skill_gaps?: Array<{ skill: string; severity: string; note?: string }>;
  strengths?: string[];
  recommendation?: string;
}

export const CandidateCard: React.FC<{ candidate: CandidateProps; onSelect?: () => void }> = ({
  candidate,
}) => {
  const getBadgeColor = (score: number) => {
    if (score >= 85) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 70) return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-amber-50 text-amber-800 border-amber-200";
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {candidate.name}
              </h3>
              {candidate.name.toLowerCase().includes("priya") && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">
                  Demo Hero
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                {candidate.job_title}
              </span>
              <span>?</span>
              <span>{candidate.experience}y exp</span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-xl border text-sm font-extrabold flex items-center gap-1 shadow-2xs ${getBadgeColor(
              candidate.match_score
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{candidate.match_score}%</span>
          </div>
        </div>

        {/* Education */}
        {candidate.education && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mb-3 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{candidate.education}</span>
          </div>
        )}

        {/* Skill Badges */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Skill Evaluation
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 5).map((s, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${
                  s.level === "Strong"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : s.level === "Good"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : s.level === "Basic"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {s.level === "Strong" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                {s.level === "Basic" && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                {s.level === "Missing" && <XCircle className="w-3 h-3 text-rose-600" />}
                <span>{s.name}</span>
                <span className="text-[9px] opacity-75 font-mono">({s.level})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Gaps Snippet */}
        {candidate.skill_gaps && candidate.skill_gaps.length > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Skill Gap Identified</span>
            </div>
            <p className="text-[11px] text-amber-900/90 leading-snug">
              {candidate.skill_gaps[0].skill}: {candidate.skill_gaps[0].note || "Needs further cloud evaluation."}
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/recruitment/candidate/${candidate.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs shadow-blue-500/20 transition-colors"
        >
          <span>View Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/interview?candidate_id=${candidate.id}`}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
          title="Launch Interview Agent"
        >
          Interview
        </Link>
      </div>
    </div>
  );
};
