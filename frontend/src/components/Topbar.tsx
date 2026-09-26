import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Menu,
  Activity,
  Layers,
  CheckCircle2,
  Volume2,
  VolumeX,
  Tv
} from "lucide-react";
import { MOCK_NOTIFICATIONS } from "../data/mockData";
import { CommandPalette } from "./CommandPalette";
import { sound } from "../utils/sound";

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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const [pitchMode, setPitchMode] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playClick();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const orgs = [
    "Global Tech Corp (India & Remote)",
    "EMEA Platform Engineering",
    "North America Product Labs",
    "APAC Operations Group"
  ];

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <>
      <header className={`sticky top-0 z-30 h-16 backdrop-blur-xl border-b px-4 lg:px-8 flex items-center justify-between transition-colors ${
        pitchMode
          ? "bg-[#020510]/95 border-cyan-500/40 shadow-lg shadow-cyan-950/40"
          : "bg-[#030712]/80 border-[#152342]"
      }`}>
        {/* Left Section: Mobile toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleSidebar?.();
            }}
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
              {pitchMode && (
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold animate-pulse">
                  ★ PITCH / DEMO MODE
                </span>
              )}
            </h1>
            <p className="text-[11px] text-slate-400 hidden md:block">
              {pageSubtitle}
            </p>
          </div>
        </div>

        {/* Center / Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger (Command Palette) */}
          <button
            onClick={() => {
              sound.playClick();
              setCommandPaletteOpen(true);
            }}
            className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#091124] border border-[#172554] text-xs text-slate-400 hover:text-slate-200 hover:border-cyan-500/40 transition-all shadow-sm w-44 lg:w-60 justify-between group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="truncate">Search commands, talent...</span>
            </div>
            <kbd className="text-[10px] font-mono bg-[#111d3d] px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Org Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => {
                sound.playClick();
                setIsOrgDropdownOpen(!isOrgDropdownOpen);
              }}
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
                      sound.playClick();
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

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-[#091124] border border-[#172554] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title={soundEnabled ? "Telemetry Sound Enabled (Click to Mute)" : "Telemetry Sound Muted (Click to Enable)"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Pitch Mode Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setPitchMode(!pitchMode);
            }}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all hidden sm:flex ${
              pitchMode
                ? "bg-indigo-950 text-indigo-300 border-indigo-500/60 shadow-lg shadow-indigo-500/20"
                : "bg-[#091124] border-[#172554] text-slate-400 hover:text-slate-200"
            }`}
            title="Toggle Pitch / Presentation Mode"
          >
            <Tv className="w-4 h-4" />
            <span className="text-[11px] font-semibold hidden md:inline">
              {pitchMode ? "Pitch Mode ON" : "Pitch Mode"}
            </span>
          </button>

          {/* Copilot Launcher CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCopilot?.();
            }}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/35 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-spin-slow" />
            <span className="hidden sm:inline">Ask Copilot</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenNotifications?.();
            }}
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

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
};
