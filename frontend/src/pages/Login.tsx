import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowRight, CheckCircle2, Lock, User, ShieldCheck } from "lucide-react";

interface LoginProps {
  onLogin: (user: { name: string; role: string; email: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah.jenkins@workforceiq.ai");
  const [password, setPassword] = useState("????????????");

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-100/60 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-100/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-blue-700/10">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                WORKFORCE<span className="text-blue-600">IQ</span>
              </h1>
              <p className="text-xs text-blue-700 font-bold tracking-wide">
                Autonomous HR Intelligence & Multi-Agent Orchestrator
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Transform raw talent signals into explainable decisions.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
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
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Built with Responsible AI safeguards: Decision-support signals requiring human authorization.</span>
          </div>
        </div>

        {/* Right Sign-In / Demo Access Card */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xl">
          <div className="mb-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Select HR Demo Persona</h3>
            <p className="text-xs text-slate-500 font-medium">
              Instant one-click access configured for judging evaluation.
            </p>
          </div>

          {/* Quick Demo Personas */}
          <div className="space-y-3 mb-6">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleDemoSelect(acc)}
                className="w-full text-left p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 transition-all duration-200 group relative flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                    {acc.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {acc.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{acc.role}</div>
                    <div className="text-[10px] text-blue-600 font-medium mt-0.5">{acc.desc}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Or Custom Sign-In
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Work Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all mt-2"
            >
              Sign In to WorkforceIQ Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
