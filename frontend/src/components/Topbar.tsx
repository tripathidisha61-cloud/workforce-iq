import React, { useState } from "react";
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Menu,
  Shield,
  Activity,
  Layers,
  CheckCircle2,
  X
} from "lucide-react";
import { MOCK_NOTIFICATIONS } from "../data/mockData";

interface TopbarProps {
  onToggleSidebar?: () => void;
  onOpenCopilot?: () => void;
  onOpenNotifications?: () => void;
  pageTitle?: string;
  pageSubtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  onOpenCopilot,
  onOpenNotifications,
  pageTitle = "Autonomous Workforce Intelligence",
  pageSubtitle = "Real-time organizational telemetry & continuous decision loops"
}) => {
  const [selectedOrg, setSelectedOrg] = useState("Global Tech Corp (India & Remote)");
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const orgs = [
    "Global Tech Corp (India & Remote)",
    "EMEA Platform Engineering",
    "North America Product Labs",
    "APAC Operations Group"
  ];

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[#030712]/80 backdrop-blur-xl border-b border-[#152342] px-4 lg:px-8 flex items-center justify-between">
        {/* Left Section: Mobile toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-[#0b1429] text-slate-300 hover:text-cyan-400 hover:bg-[#122045] lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-sm lg:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{pageTitle}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                TELEMETRY LIVE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden md:block">
              {pageSubtitle}
            </p>
          </div>
        </div>

        {/* Center / Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs text-slate-400 hover:text-slate-200 hover:border-cyan-500/40 transition-all shadow-sm w-44 lg:w-60 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search talent, skills, risks...</span>
            </div>
            <kbd className="text-[10px] font-mono bg-[#111d3d] px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Org Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs text-slate-300 hover:border-cyan-500/30 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium max-w-[180px] truncate">{selectedOrg}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isOrgDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#091124] border border-[#172554] rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[10px] font-mono uppercase text-slate-400 font-bold border-b border-[#152342]">
                  Select Scope Unit
                </div>
                {orgs.map((org) => (
                  <button
                    key={org}
                    onClick={() => {
                      setSelectedOrg(org);
                      setIsOrgDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                      selectedOrg === org
                        ? "bg-cyan-950/60 text-cyan-300 font-semibold"
                        : "text-slate-300 hover:bg-[#111e40]"
                    }`}
                  >
                    <span className="truncate">{org}</span>
                    {selectedOrg === org && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copilot Launcher CTA */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/35 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-spin-slow" />
            <span className="hidden sm:inline">Ask Copilot</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#091124] border border-[#172554] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="Telemetry Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-mono font-bold text-white rounded-full flex items-center justify-center border-2 border-[#030712]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#080e21] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#172554] flex items-center gap-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search employees, skills, risk signals, or simulated scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  High Risk Alerts
                </div>
                <div className="space-y-1.5">
                  <div
                    onClick={() => {
                      setSearchModalOpen(false);
                      window.location.href = "/app/employees";
                    }}
                    className="p-2.5 rounded-xl bg-[#0e1a38] hover:bg-[#142552] border border-[#1b2f66] cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-rose-300">Rahul Verma (78/100 Attrition Risk)</div>
                      <div className="text-slate-400 text-[11px]">Engineering • Senior Backend • 93% Workload</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      CRITICAL
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Suggested Actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSearchModalOpen(false);
                      window.location.href = "/app/scenarios";
                    }}
                    className="p-3 rounded-xl bg-[#0a1329] hover:bg-[#101f42] border border-[#152342] text-left text-xs"
                  >
                    <div className="font-bold text-cyan-300">Workforce Simulator</div>
                    <div className="text-slate-400 text-[11px]">Test Q4 salary & remote work balance</div>
                  </button>
                  <button
                    onClick={() => {
                      setSearchModalOpen(false);
                      window.location.href = "/app/decisions";
                    }}
                    className="p-3 rounded-xl bg-[#0a1329] hover:bg-[#101f42] border border-[#152342] text-left text-xs"
                  >
                    <div className="font-bold text-cyan-300">7-Step Autonomous Loop</div>
                    <div className="text-slate-400 text-[11px]">Review pending engineering retention action</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#050917] border-t border-[#172554] flex items-center justify-between text-[11px] text-slate-400">
              <span>Press <kbd className="font-mono bg-slate-800 px-1 rounded text-slate-300">ESC</kbd> to exit</span>
              <span className="font-mono text-cyan-400">Autonomous Index Ready</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
