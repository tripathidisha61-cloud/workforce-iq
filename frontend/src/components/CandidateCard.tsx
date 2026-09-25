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
  onSelect,
}) => {
  const getBadgeColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (score >= 70) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
    return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm transition-all duration-200 hover:border-slate-600 shadow-lg flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {candidate.name}
              </h3>
              {candidate.name.toLowerCase().includes("priya") && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Demo Hero
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {candidate.job_title}
              </span>
              <span>•</span>
              <span>{candidate.experience}y exp</span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-xl border text-sm font-extrabold flex items-center gap-1 ${getBadgeColor(
              candidate.match_score
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{candidate.match_score}%</span>
          </div>
        </div>

        {/* Education */}
        {candidate.education && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3 bg-slate-900/40 px-2.5 py-1 rounded-lg">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{candidate.education}</span>
          </div>
        )}

        {/* Skill Badges */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Skill Evaluation
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 5).map((s, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg border ${
                  s.level === "Strong"
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    : s.level === "Good"
                    ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                    : s.level === "Basic"
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                }`}
              >
                {s.level === "Strong" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {s.level === "Basic" && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                {s.level === "Missing" && <XCircle className="w-3 h-3 text-rose-400" />}
                <span>{s.name}</span>
                <span className="text-[9px] opacity-75 font-mono">({s.level})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Gaps Snippet */}
        {candidate.skill_gaps && candidate.skill_gaps.length > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Skill Gap Identified</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {candidate.skill_gaps[0].skill}: {candidate.skill_gaps[0].note || "Needs further cloud evaluation."}
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between gap-2">
        <Link
          to={`/recruitment/candidate/${candidate.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
        >
          <span>View Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/interview?candidate_id=${candidate.id}`}
          className="px-3 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          title="Launch Interview Agent"
        >
          Interview
        </Link>
      </div>
    </div>
  );
};
