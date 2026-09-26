import React, { useState } from "react";
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
  ChevronDown,
  X,
  Compass
} from "lucide-react";

interface SidebarProps {
  currentUser?: { name: string; role: string; email: string };
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser = { name: "Sarah Jenkins", role: "HR Admin", email: "sarah.jenkins@workforceiq.ai" },
  onLogout
}) => {
  const navigate = useNavigate();
  const [showPromo, setShowPromo] = useState(true);

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Recruitment AI", path: "/recruitment", icon: Users, badge: "AI MATCH" },
    { label: "Interviews", path: "/interview", icon: Mic, badge: "AGENT" },
    { label: "Employees", path: "/employees", icon: UserCheck },
    { label: "Onboarding", path: "/onboarding", icon: BookOpen },
    { label: "Policy AI", path: "/policy", icon: FileText, badge: "RAG" },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Recommendations", path: "/recommendations", icon: Sparkles },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0d2127] border-r border-[#15353d] flex flex-col h-screen sticky top-0 select-none z-30 text-slate-200 shadow-xl">
      {/* Brand Header with Infinity Logo */}
      <div className="p-4 border-b border-[#163a43] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Badge matching reference: Teal infinity container */}
          <div className="w-10 h-10 rounded-xl bg-[#143e46] border border-[#216773] flex items-center justify-center shadow-inner text-teal-300">
            <svg
              className="w-5 h-5 text-teal-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Infinity Symbol SVG */}
              <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.261-8-12.356-8-5.096 0-5.096 8 0 8 5.095 0 7.261-8 12.356-8z" />
            </svg>
          </div>
          <div>
            <div className="font-black text-sm tracking-tight text-white uppercase">
              WORKFORCE<span className="text-teal-400">IQ</span>
            </div>
            <div className="text-[9px] text-teal-400/90 font-bold tracking-wider uppercase">
              - ORCHESTRATOR ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-teal-100/40">
          CORE WORKFLOWS
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? "bg-[#143941] text-white border border-[#249fa0]/70 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#122c34]"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110 text-teal-300/80 group-hover:text-teal-200" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Turnaround — for the Loop Callout from reference photo */}
      {showPromo && (
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-[#0e2c34]/80 border border-[#1c4b57] text-[11px] text-slate-300 relative shadow-sm">
          <button
            onClick={() => setShowPromo(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Turnaround — for the Loop</span>
          </div>
          <p className="text-[10px] text-teal-100/70 leading-relaxed pr-3">
            Smarter hiring. Happier teams. Powered by AI.
          </p>
        </div>
      )}

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#163a43] bg-[#091b20]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#0f2830] border border-[#1b434f]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center font-black text-xs text-[#091b20] shrink-0 shadow-sm">
              SJ
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-teal-200/70 truncate">{currentUser.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <ChevronDown className="w-4 h-4 cursor-pointer hover:text-white" />
            <button
              onClick={() => {
                if (onLogout) onLogout();
                else navigate("/login");
              }}
              title="Log Out"
              className="p-1 hover:text-rose-400 transition-colors ml-0.5"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
