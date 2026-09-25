import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Send,
  Briefcase,
  Mail,
  Phone,
  GraduationCap,
  Cpu
} from "lucide-react";
import { recruitmentApi, recommendationsApi } from "../services/api";

export const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [recCreated, setRecCreated] = useState(false);

  useEffect(() => {
    recruitmentApi
      .getCandidateById(id || 1)
      .then((res) => setCandidate(res))
      .catch((err) => console.error(err));
  }, [id]);

  if (!candidate) {
    return (
      <div className="p-8 text-center text-slate-400">Loading Candidate Intelligence...</div>
    );
  }

  const handleCreateRecommendation = async () => {
    setSubmitting(true);
    try {
      await recommendationsApi.create({
        target_type: "candidate",
        target_id: candidate.id,
        target_name: candidate.name,
        candidate_score: candidate.match_score,
        recommendation_type: "Proceed to Interview",
        finding: `${candidate.name} scored ${candidate.match_score}% match for ${candidate.job_title}.`,
        reason: `Strong core skills in ${candidate.skills?.slice(0, 3).map((s: any) => s.name).join(", ")}. Identified gap in ${candidate.skill_gaps?.[0]?.skill || "Cloud"} can be probed in interview.`,
        action: `Schedule Technical Interview Round 1 for ${candidate.name}`
      });
      setRecCreated(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/recruitment"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Recruitment AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/interview?candidate_id=${candidate.id}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Generate Interview Questions</span>
          </button>
          <button
            onClick={handleCreateRecommendation}
            disabled={submitting || recCreated}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{recCreated ? "Sent to HR Approval ✓" : "Send to HR Approval"}</span>
          </button>
        </div>
      </div>

      {/* Candidate Profile Header */}
      <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white">{candidate.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {candidate.status || "Screened"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              {candidate.job_title} ({candidate.experience} Years Experience)
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {candidate.email}
            </span>
            {candidate.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {candidate.phone}
              </span>
            )}
          </div>
          {candidate.education && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{candidate.education}</span>
            </div>
          )}
        </div>

        {/* Score Circle */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center min-w-[160px]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Candidate Match
          </div>
          <div className="text-4xl font-black text-emerald-400 my-1">{candidate.match_score}%</div>
          <div className="text-[10px] text-emerald-300/80 font-semibold">High Alignment</div>
        </div>
      </div>

      {/* Explainable Scoring Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Explainable AI Match Calculation
            </h3>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-500/30">
            Formula: {candidate.score_breakdown?.formula || "0.50 × 90 + 0.30 × 84 + 0.20 × 85 = 87.2%"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Skill Match (Weight: 50%)</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {candidate.score_breakdown?.skill_match || 90}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Direct alignment with Python, FastAPI, PostgreSQL, and Docker.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Semantic Match (Weight: 30%)</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {candidate.score_breakdown?.semantic_match || 84}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              High domain cosine similarity on REST API design & containerization.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Experience Match (Weight: 20%)</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {candidate.score_breakdown?.experience_match || 85}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {candidate.experience} years exceeds the 2.0 year minimum requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Skills, Strengths & Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skills Matrix */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 space-y-4">
          <h3 className="text-base font-bold text-white">Verified Skills Evaluation</h3>
          <div className="space-y-3">
            {(candidate.skills || []).map((sk: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{sk.name}</span>
                  <span
                    className={`font-bold ${
                      sk.level === "Strong"
                        ? "text-emerald-400"
                        : sk.level === "Good"
                        ? "text-indigo-400"
                        : "text-amber-400"
                    }`}
                  >
                    {sk.level === "Strong" ? "✓ Strong" : sk.level === "Good" ? "✓ Good" : "⚠ Basic"} ({sk.score || 75}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sk.level === "Strong"
                        ? "bg-emerald-500"
                        : sk.level === "Good"
                        ? "bg-indigo-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${sk.score || 75}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Skill Gaps */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-emerald-500/20 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Candidate Strengths</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {(candidate.strengths || []).map((str: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/60 border border-amber-500/20 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Detected Skill Gaps</span>
            </h3>
            <div className="space-y-2.5">
              {(candidate.skill_gaps || []).map((gap: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs">
                  <div className="font-bold text-amber-300">⚠ {gap.skill} ({gap.severity})</div>
                  <p className="text-slate-300 mt-0.5">{gap.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
