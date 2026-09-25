import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Mic,
  UserCheck,
  BookOpen,
  FileText,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  Brain,
  ShieldCheck,
  Cpu
} from "lucide-react";

interface SidebarProps {
  currentUser?: { name: string; role: string; email: string };
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser = { name: "Sarah Jenkins", role: "HR Director", email: "sarah.jenkins@workforceiq.ai" },
  onLogout
}) => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Recruitment AI", path: "/recruitment", icon: Users, badge: "AI Match" },
    { label: "Interviews", path: "/interview", icon: Mic, badge: "Agent" },
    { label: "Employees", path: "/employees", icon: UserCheck },
    { label: "Onboarding", path: "/onboarding", icon: BookOpen },
    { label: "Policy AI", path: "/policy", icon: FileText, badge: "RAG" },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "AI Recommendations", path: "/recommendations", icon: Sparkles, badge: "Approval" },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 backdrop-blur-xl select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                WORKFORCE<span className="text-indigo-400">IQ</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ORCHESTRATOR ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Core Workflows
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Responsible AI Safeguards Banner */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Human-in-the-Loop</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          AI recommendations are advisory decision-support signals requiring explicit HR verification.
        </p>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-200 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.role}</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (onLogout) onLogout();
              else navigate("/login");
            }}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
