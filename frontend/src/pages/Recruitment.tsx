import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  ArrowRight,
  Cpu,
  Search
} from "lucide-react";
import { recruitmentApi } from "../services/api";
import { CandidateCard } from "../components/CandidateCard";

export const Recruitment: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [useDemoResume, setUseDemoResume] = useState<boolean>(true);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    Promise.all([recruitmentApi.getJobs(), recruitmentApi.getCandidates()]).then(
      ([jobsData, candData]) => {
        setJobs(jobsData || []);
        setCandidates(candData || []);
      }
    );
  }, []);

  const currentJob = jobs.find((j) => j.id === Number(selectedJobId)) || {
    id: 1,
    title: "Backend Developer",
    required_skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    min_experience: 2,
    description: "Design and implement high-throughput REST APIs and microservices."
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      let parsedCandidate = null;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("resume", selectedFile);
        const uploadRes = await recruitmentApi.uploadResume(formData);
        parsedCandidate = uploadRes.data.candidate_profile;
      } else {
        // Upload / parse default sample Priya_Sharma.pdf
        const formData = new FormData();
        const uploadRes = await recruitmentApi.uploadResume(formData);
        parsedCandidate = uploadRes.data.candidate_profile;
      }

      const matchRes = await recruitmentApi.analyzeCandidate({
        candidate_id: 1,
        job_id: currentJob.id,
        candidate: parsedCandidate ? { id: 1, ...parsedCandidate } : undefined,
        job: currentJob
      });

      setAnalysisResult(matchRes.orchestration.data);
      // Refresh candidate list
      const updatedCands = await recruitmentApi.getCandidates();
      setCandidates(updatedCands);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>AI Recruitment Intelligence</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
              Multi-Factor Scoring
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload candidate PDF resumes, parse structured entities, and calculate explainable role alignment.
          </p>
        </div>
      </div>

      {/* Main Top Section: Job Description + Resume Upload + Instant Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Job Description & Resume Uploader */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              1. Select Target Job Requisition
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 text-sm text-white font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.department})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Job Details Box */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                {currentJob.title}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Min {currentJob.min_experience}y Exp
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{currentJob.description}</p>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Required Technical Skills:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(currentJob.required_skills || []).map((sk: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-200 border border-slate-700 font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Upload Resume PDF */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              2. Upload Candidate Resume (PDF)
            </label>

            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-5 text-center transition-colors bg-slate-900/40">
              <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-medium mb-2">
                Drag and drop candidate PDF resume, or choose file
              </p>
              <input
                type="file"
                accept=".pdf"
                id="resume-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                    setUseDemoResume(false);
                  }
                }}
                className="hidden"
              />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Choose PDF File
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setUseDemoResume(true);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                    useDemoResume && !selectedFile
                      ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Use Demo: Priya_Sharma.pdf</span>
                </button>
              </div>

              {(selectedFile || useDemoResume) && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected: {selectedFile ? selectedFile.name : "Priya_Sharma.pdf (Sample Dataset)"}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Extracting PDF & Computing AI Match...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Candidate with AI Orchestrator</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Explainable Match Result Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl flex flex-col justify-between">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Top Result Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    Explainable Candidate Intelligence
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {analysisResult.candidate_name} — {analysisResult.job_title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Composite Match</div>
                    <div className="text-3xl font-black text-emerald-400">{analysisResult.match_score}%</div>
                  </div>
                </div>
              </div>

              {/* Transparent Mathematical Formula Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">
                    Transparent Scoring Formula (Skill 50% + Semantic 30% + Experience 20%)
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {analysisResult.score_breakdown?.formula}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-800/70 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Skill Match (50%)</div>
                    <div className="text-base font-extrabold text-white">
                      {analysisResult.score_breakdown?.skill_match}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/70 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Semantic Match (30%)</div>
                    <div className="text-base font-extrabold text-white">
                      {analysisResult.score_breakdown?.semantic_match}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/70 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Experience (20%)</div>
                    <div className="text-base font-extrabold text-white">
                      {analysisResult.score_breakdown?.experience_match}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown & Strengths/Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skills Verification */}
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Verified Skill Matrix
                  </h4>
                  <div className="space-y-2">
                    {(analysisResult.skills || []).map((sk: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{sk.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                            sk.level === "Strong"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : sk.level === "Good"
                              ? "bg-indigo-500/10 text-indigo-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {sk.level === "Strong" ? "✓ Strong" : sk.level === "Good" ? "✓ Good" : "⚠ Basic"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Skill Gaps */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-emerald-400 mb-1.5">✓ Key Strengths</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {(analysisResult.strengths || []).slice(0, 3).map((st: string, i: number) => (
                        <li key={i} className="truncate">• {st}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                    <h4 className="text-xs font-bold text-amber-400 mb-1.5">⚠ Detected Skill Gaps</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {(analysisResult.skill_gaps || []).map((gap: any, i: number) => (
                        <li key={i}>• <strong>{gap.skill}</strong>: {gap.note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => navigate(`/recruitment/candidate/1`)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                >
                  Open Full Candidate Dossier
                </button>
                <button
                  onClick={() => navigate(`/interview?candidate_id=1`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>Generate Tailored Interview Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1.5">
                <h3 className="text-base font-bold text-white">Ready for Candidate Analysis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select a target role (e.g., <strong>Backend Developer</strong>) and click{" "}
                  <strong>"Analyze Candidate with AI Orchestrator"</strong> to run PDF extraction, skill gap detection, and explainable match calculation on <strong>Priya Sharma</strong>.
                </p>
              </div>
              <button
                onClick={handleAnalyze}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
              >
                Run Demo Analysis on Priya Sharma (87% Match)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Directory Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-white">Screened Talent Pipeline</h3>
            <p className="text-xs text-slate-400">Candidates ranked by explainable AI composite match scores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {candidates.map((cand) => (
            <CandidateCard key={cand.id} candidate={cand} />
          ))}
        </div>
      </div>
    </div>
  );
};
