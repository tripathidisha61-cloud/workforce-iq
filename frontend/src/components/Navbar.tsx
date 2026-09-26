import React from "react";
import { Bell, Sparkles, Tv, ChevronDown } from "lucide-react";

interface NavbarProps {
  title?: string;
  subtitle?: string;
  userRole?: string;
  onRoleChange?: (role: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = "HR Intelligence Dashboard",
  subtitle = "Real-time decision intelligence & AI-driven workforce orchestration",
  userRole = "HR Admin",
  onRoleChange,
}) => {
  return (
    <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-20 bg-[#eaf4f4]/85 backdrop-blur-md border-b border-teal-900/10">
      {/* Title & Context */}
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <span>{title}</span>
          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300 font-semibold shadow-xs">
            <Sparkles className="w-3 h-3 text-teal-600" />
            AI Orchestrated
          </span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5 hidden sm:block">{subtitle}</p>
      </div>

      {/* Right Controls matching reference photo */}
      <div className="flex items-center gap-3">
        {/* Projector Mode Button */}
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs transition-colors"
        >
          <Tv className="w-3.5 h-3.5 text-slate-500" />
          <span>Projector</span>
        </button>

        {/* Live RAG Ready Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] text-slate-500 font-medium">RAG</span>
          <span className="text-[11px] text-emerald-700 font-bold">Ready</span>
        </div>

        {/* Notifications with '2' badge */}
        <div className="relative">
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative shadow-xs">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-extrabold text-white flex items-center justify-center shadow-xs">
              2
            </span>
          </button>
        </div>

        {/* HR Role Dropdown Pill */}
        <div className="relative">
          <select
            value={userRole}
            onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl pl-3.5 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs hover:border-slate-300"
          >
            <option value="HR Admin">HR Admin</option>
            <option value="Talent Acquisition Lead">Talent Acquisition Lead</option>
            <option value="People Ops Director">People Ops Director</option>
            <option value="VP Human Resources">VP Human Resources</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
};
