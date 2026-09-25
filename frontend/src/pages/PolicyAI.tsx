import React, { useEffect, useState } from "react";
import {
  FileText,
  Search,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Eye,
  Database,
  HelpCircle,
  ExternalLink,
  X
} from "lucide-react";
import { policyApi } from "../services/api";

export const PolicyAI: React.FC = () => {
  const [question, setQuestion] = useState("What is the remote work policy?");
  const [documents, setDocuments] = useState<any[]>([]);
  const [ragResult, setRagResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<any>(null);

  const sampleQuestions = [
    "What is the remote work policy?",
    "What is the maternity leave policy?",
    "What is the annual training and learning stipend?",
    "How does the Performance Improvement Plan (PIP) work?",
    "What are the rules regarding confidentiality and AI ethics?"
  ];

  useEffect(() => {
    policyApi.getDocuments().then((docs) => setDocuments(docs || []));
    handleAsk("What is the remote work policy?");
  }, []);

  const handleAsk = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await policyApi.queryPolicy(q);
      setRagResult(res.orchestration.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>WorkforceIQ Policy AI (RAG Engine)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Retrieval-Augmented Generation grounded strictly on indexed company HR policy PDFs with citations.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Vector Store: <strong className="text-white">5 HR Corpus PDFs Indexed</strong></span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Query Input & RAG Output */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search Input Box */}
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300">
              Ask HR Policy Assistant Anything...
            </label>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  placeholder="e.g., What is the maternity leave policy?"
                  className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={() => handleAsk()}
                disabled={loading}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-2 shrink-0 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? "Retrieving..." : "Ask AI"}</span>
              </button>
            </div>

            {/* Quick Suggested Prompts */}
            <div className="pt-1">
              <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Try a verified policy question:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuestion(sq);
                      handleAsk(sq);
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-200 border border-slate-700/80 hover:border-indigo-500/40 transition-colors"
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grounded AI Answer & Source Citations */}
          {ragResult && (
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-indigo-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Grounded AI Response</h3>
                    <p className="text-[11px] text-slate-400">
                      Synthesized strictly from retrieved policy chunks without hallucination
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                  {(ragResult.primary_source?.similarity_score * 100).toFixed(0)}% Vector Match
                </span>
              </div>

              {/* Answer Text */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 leading-relaxed font-medium">
                {ragResult.answer}
              </div>

              {/* Primary Source Citation Card */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                      Verified Policy Source Citation
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {ragResult.primary_source?.document} ({ragResult.primary_source?.title})
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {ragResult.primary_source?.section} •{" "}
                      <strong className="text-emerald-400">Page {ragResult.primary_source?.page}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedChunk(ragResult.retrieved_chunks?.[0]);
                    setSourceModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 shrink-0 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Source Document</span>
                </button>
              </div>

              {/* Top 3 Retrieved Chunks */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Top 3 Vector Similarity Chunks Retrieved
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(ragResult.citations || []).map((cit: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedChunk(ragResult.retrieved_chunks?.[idx]);
                        setSourceModalOpen(true);
                      }}
                      className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-indigo-400 mb-1">
                          <span>{cit.document}</span>
                          <span className="text-emerald-400">Page {cit.page}</span>
                        </div>
                        <div className="text-xs font-bold text-white mb-1 truncate">{cit.section}</div>
                        <p className="text-[11px] text-slate-400 line-clamp-3">{cit.snippet}</p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Relevance: {cit.relevance}</span>
                        <span className="text-indigo-400 font-semibold">Inspect →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Columns: RAG Pipeline Architecture & Indexed Corpus */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/70 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Indexed HR Policy Corpus</span>
            </h3>
            <p className="text-xs text-slate-400">
              Official PDF policy documents chunked and embedded in vector storage.
            </p>

            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{doc.file_name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{doc.title}</div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{doc.chunk_count} semantic chunks embedded</span>
                    </div>
                  </div>
                  <a
                    href={`http://localhost:5000/data/policies/${doc.file_name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Open PDF"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Pipeline Explainer Box */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              How Policy RAG Works
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2 rounded-lg bg-slate-800/60">1. HR PDFs → Plain Text Extraction</div>
              <div className="p-2 rounded-lg bg-slate-800/60">2. Semantic Chunking + Vector Embeddings</div>
              <div className="p-2 rounded-lg bg-slate-800/60">3. User Question → Cosine Similarity Search</div>
              <div className="p-2 rounded-lg bg-slate-800/60">4. Top 3 Chunks → Grounded LLM Citation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Document Viewer Modal */}
      {sourceModalOpen && selectedChunk && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Verified Source Document Excerpt
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {selectedChunk.file_name} — Page {selectedChunk.page}
                </h4>
                <p className="text-xs text-slate-400">{selectedChunk.section}</p>
              </div>
              <button
                onClick={() => setSourceModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono">
              "{selectedChunk.content}"
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`http://localhost:5000/data/policies/${selectedChunk.file_name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <span>Open Raw PDF File</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSourceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
