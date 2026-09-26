import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Radar as RadarIcon,
  Cpu,
  TrendingUp,
  BarChart3,
  Sliders,
  FileBarChart2,
  Settings,
  LogOut,
  GitPullRequest,
  ShieldCheck,
  Zap,
  Globe,
  Award
} from "lucide-react";

interface SidebarProps {
  currentUser?: { name: string; role: string; email: string };
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser = { name: "Sarah Jenkins", role: "VP of People Operations", email: "sarah.j@enterprise.ai" },
  onLogout,
  isOpen = true,
  onClose
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // All 11 navigation items specified in user prompt:
  // Overview, Workforce, AI Insights, Risk Radar, Skills Intelligence, Performance, Workforce Planning, Recommendations, Scenarios, Reports, Settings
  const primaryNavItems = [
    { label: "Overview", path: "/app", icon: LayoutDashboard, badge: "LIVE" },
    { label: "Workforce", path: "/app/employees", icon: Users, count: "12.4K" },
    { label: "AI Insights", path: "/app/decisions", icon: Sparkles, badge: "SIGNALS" },
    { label: "Risk Radar", path: "/app#radar", icon: RadarIcon, badge: "RADAR" },
    { label: "Skills Intelligence", path: "/app/skills", icon: Cpu, badge: "MATRIX" },
    { label: "Performance", path: "/app/reports", icon: Award },
    { label: "Workforce Planning", path: "/app/planning", icon: TrendingUp },
    { label: "Recommendations", path: "/app/recommendations", icon: GitPullRequest, count: "5" },
    { label: "Scenarios", path: "/app/scenarios", icon: Sliders, badge: "WHAT IF" },
    { label: "Reports", path: "/app/reports", icon: FileBarChart2 },
  ];

  const secondaryNavItems = [
    { label: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#060b16] border-r border-[#152342] flex flex-col select-none transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#152342] bg-[#030712]/60">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate("/app")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
                <div className="w-full h-full bg-[#060b16] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 transition-transform group-hover:scale-110" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#060b16] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white font-mono">
                    WORKFORCE<span className="text-cyan-400 font-black">IQ</span>
                  </span>
                </div>
                <div className="text-[10px] text-sky-400/80 font-mono tracking-wider flex items-center gap-1">
                  <span>ORCHESTRATOR</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-semibold">● AI Engine Live</span>
                </div>
              </div>
            </div>

            <NavLink
              to="/"
              title="View Public Portal"
              className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-[#0c1936] transition-colors"
            >
              <Globe className="w-4 h-4" />
            </NavLink>
          </div>
        </div>

        {/* Navigation scrollable */}
        <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>INTELLIGENCE MODULES</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                AUTONOMOUS
              </span>
            </div>

            <div className="space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === "/app"
                    ? location.pathname === "/app"
                    : location.pathname.startsWith(item.path.split("#")[0]);

                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end={item.path === "/app"}
                    className={({ isActive: linkActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                        linkActive || isActive
                          ? "bg-gradient-to-r from-blue-900/60 to-cyan-950/40 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-950/50"
                          : "text-slate-400 hover:text-slate-100 hover:bg-[#0c1836]/60 border border-transparent"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-[#0b1429] text-slate-400 group-hover:text-cyan-400 group-hover:bg-[#122045]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold tracking-wide">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                            isActive
                              ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/30"
                              : "bg-blue-950/80 text-blue-300 border border-blue-800/40"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {item.count}
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00f0ff]" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Configuration */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              PLATFORM CONTROLS
            </div>
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-900/40 text-cyan-300 border border-cyan-500/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-[#0c1836]/60 border border-transparent"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0b1429] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-[#122045]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold tracking-wide">{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* AI Telemetry Engine Status Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0b1736] to-[#070e24] border border-blue-900/40 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="text-[11px] font-bold text-slate-200 font-mono">
                  ● AI Engine Live
                </span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">
                14ms latency
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Monitoring <strong className="text-slate-200">12,482 nodes</strong> across Bengaluru, Gurugram & Remote.
            </p>
            <div className="mt-2.5 pt-2 border-t border-blue-950 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Confidence Index</span>
              <span className="font-bold text-cyan-400">91% Normal</span>
            </div>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-[#152342] bg-[#030712]/90">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#091124] border border-[#172554]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-xs text-[#030712] shrink-0 shadow-md">
                SJ
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 truncate font-mono">
                  {currentUser.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onLogout) onLogout();
                else navigate("/login");
              }}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
