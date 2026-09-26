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
  ShieldCheck
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 select-none z-30 shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 ring-1 ring-blue-700/10">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                WORKFORCE<span className="text-blue-600">IQ</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ORCHESTRATOR ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
                    ? "bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700 border border-blue-200/60">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Responsible AI Safeguards Banner */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Human-in-the-Loop</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-500">
          AI recommendations are advisory decision-support signals requiring explicit human review.
        </p>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{currentUser.role}</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (onLogout) onLogout();
              else navigate("/login");
            }}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
