import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Lock, User } from "lucide-react";

interface LoginProps {
  onLogin: (user: { name: string; role: string; email: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah.jenkins@workforceiq.ai");
  const [password, setPassword] = useState("••••••••••••");

  const demoAccounts = [
    {
      name: "Disha Tripathi",
      role: "Talent Acquisition Lead",
      email: "disha.tripathi@workforceiq.ai",
      desc: "Focus: Recruitment AI, Candidate Matching & Interview Generation"
    },
    {
      name: "Arpita Tyagi",
      role: "People Operations Director",
      email: "arpita.tyagi@workforceiq.ai",
      desc: "Focus: Employee Retention, Risk Signals & Human-in-the-Loop Approvals"
    },
    {
      name: "Devanshi Malik",
      role: "HR Analytics & Policy Specialist",
      email: "devanshi.malik@workforceiq.ai",
      desc: "Focus: Policy RAG Grounding, Vector Embeddings & Workforce Health"
    }
  ];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: "Sarah Jenkins",
      role: "HR Director",
      email: email || "sarah.jenkins@workforceiq.ai"
    });
    navigate("/");
  };

  const handleDemoSelect = (account: typeof demoAccounts[0]) => {
    onLogin({
      name: account.name,
      role: account.role,
      email: account.email
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/30 ring-1 ring-white/20">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                WORKFORCE<span className="text-indigo-400">IQ</span>
              </h1>
              <p className="text-xs text-indigo-300 font-semibold tracking-wide">
                Autonomous HR Intelligence & Multi-Agent Orchestrator
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              Transform raw talent signals into explainable decisions.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unified AI reasoning across candidate resumes, employee telemetry, and HR policies with human-in-the-loop governance.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {[
              "Explainable Candidate Matching with transparent multi-factor scoring",
              "Adaptive Interview Agent generating tailored technical probes",
              "Early Employee Risk Detection & Attrition Signal Modeling",
              "Grounded Policy RAG with citation-backed answers"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Built with Responsible AI safeguards: Decision-support signals requiring human authorization.</span>
          </div>
        </div>

        {/* Right Sign-In / Demo Access Card */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800/90 rounded-3xl p-7 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-1">Select HR Demo Persona</h3>
            <p className="text-xs text-slate-400">
              Instant one-click access configured for judging evaluation.
            </p>
          </div>

          {/* Quick Demo Personas */}
          <div className="space-y-3 mb-6">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleDemoSelect(acc)}
                className="w-full text-left p-3.5 rounded-2xl bg-slate-800/60 hover:bg-indigo-900/30 border border-slate-700/60 hover:border-indigo-500/50 transition-all duration-200 group relative flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                    {acc.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {acc.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{acc.role}</div>
                    <div className="text-[10px] text-indigo-400/80 mt-0.5">{acc.desc}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Or Custom Sign-In
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Work Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all mt-2"
            >
              Sign In to WorkforceIQ Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
