import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Mic,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Send,
  RefreshCw,
  MessageSquare,
  Cpu
} from "lucide-react";
import { interviewApi, recruitmentApi, recommendationsApi } from "../services/api";

export const Interview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCandidateId = Number(searchParams.get("candidate_id")) || 1;

  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number>(initialCandidateId);
  const [questionsData, setQuestionsData] = useState<any>(null);
  const [evaluationData, setEvaluationData] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [customScores, setCustomScores] = useState({
    technical: 82,
    communication: 90,
    problem_solving: 74
  });

  useEffect(() => {
    recruitmentApi.getCandidates().then((res) => {
      setCandidates(res || []);
    });
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setEvaluationData(null);
    try {
      const res = await interviewApi.generateQuestions({
        candidate_id: selectedCandidateId
      });
      setQuestionsData(res.orchestration.data);
    } finally {
      setGenerating(false);
    }
  };

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      const res = await interviewApi.evaluateInterview({
        candidate_id: selectedCandidateId,
        answers: customScores
      });
      setEvaluationData(res.orchestration.data);
    } finally {
      setEvaluating(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [selectedCandidateId]);

  const currentCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || {
      id: 1,
      name: "Priya Sharma",
      job_title: "Backend Developer",
      match_score: 87
    };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Mic className="w-6 h-6 text-indigo-400" />
            <span>Adaptive Interview Agent</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Role-tailored technical questions generated dynamically from candidate resumes and detected skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-xs text-white font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                Candidate: {c.name} ({c.job_title} - {c.match_score}%)
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
            <span>Regenerate Questions</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Generated Questions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Personalized Interview Guide: {currentCandidate.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Target Role: <strong className="text-indigo-300">{currentCandidate.job_title}</strong> • Adaptive Gap Probe:{" "}
                  <strong className="text-amber-300">{questionsData?.adaptive_gap_focus || "AWS Cloud Deployment"}</strong>
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                {questionsData?.questions?.length || 4} Questions
              </span>
            </div>

            <div className="space-y-4">
              {(questionsData?.questions || []).map((q: any, idx: number) => (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Question {idx + 1} • {q.category}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        q.difficulty.includes("Gap")
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white leading-relaxed">{q.question}</p>

                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Expected Evaluation Signals:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(q.expected_competencies || []).map((comp: string, i: number) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          ✓ {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interview Evaluation & AI Feedback */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Interview Evaluation Simulator</h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Real-Time Scoring
              </span>
            </div>

            {/* Interactive Score Sliders */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Technical Knowledge (40%)</span>
                  <span className="text-indigo-400 font-bold">{customScores.technical}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={customScores.technical}
                  onChange={(e) =>
                    setCustomScores({ ...customScores, technical: Number(e.target.value) })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Communication & Clarity (30%)</span>
                  <span className="text-emerald-400 font-bold">{customScores.communication}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={customScores.communication}
                  onChange={(e) =>
                    setCustomScores({ ...customScores, communication: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Problem Solving & Architecture (30%)</span>
                  <span className="text-amber-400 font-bold">{customScores.problem_solving}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={customScores.problem_solving}
                  onChange={(e) =>
                    setCustomScores({ ...customScores, problem_solving: Number(e.target.value) })
                  }
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={evaluating}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{evaluating ? "Synthesizing Evaluation..." : "Compute Interview Evaluation & AI Feedback"}</span>
            </button>

            {evaluationData && (
              <div className="space-y-4 pt-3 border-t border-slate-700/60 animate-fadeIn">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">Overall Composite Rating</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{evaluationData.status}</div>
                  </div>
                  <div className="text-3xl font-black text-white">{evaluationData.overall_score}%</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400">✓ Key Interview Strengths</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {(evaluationData.feedback?.strengths || []).map((st: string, i: number) => (
                      <li key={i}>• {st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400">⚠ Areas for Improvement</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {(evaluationData.feedback?.areas_for_improvement || []).map((imp: string, i: number) => (
                      <li key={i}>• {imp}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                  <strong className="text-white block mb-1">AI Final Recommendation:</strong>
                  {evaluationData.feedback?.recommendation}
                </div>

                <button
                  onClick={() => navigate("/recommendations")}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Proceed to HR Approval Screen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
