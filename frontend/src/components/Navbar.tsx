import React from "react";
import { Bell, Sparkles, Database, CheckCircle2, ChevronDown } from "lucide-react";

interface NavbarProps {
  title?: string;
  subtitle?: string;
  userRole?: string;
  onRoleChange?: (role: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = "HR Intelligence Dashboard",
  subtitle = "Real-time decision intelligence & multi-agent workforce orchestration",
  userRole = "HR Admin",
  onRoleChange,
}) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Title & Context */}
      <div>
        <h1 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>{title}</span>
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            <Sparkles className="w-3 h-3 text-blue-600" />
            AI Orchestrated
          </span>
        </h1>
        <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Database & Orchestrator Telemetry Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-mono text-slate-500">pgvector + RAG:</span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ready
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative shadow-xs">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
        </div>

        {/* HR Role Dropdown */}
        <div className="relative">
          <select
            value={userRole}
            onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs hover:border-slate-300"
          >
            <option value="HR Admin">HR Admin ?</option>
            <option value="Talent Acquisition Lead">Talent Acquisition Lead ?</option>
            <option value="People Ops Director">People Ops Director ?</option>
            <option value="VP Human Resources">VP Human Resources ?</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
};
