import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  User,
  Sliders,
  AlertTriangle,
  FileText,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  X
} from "lucide-react";
import { MOCK_EMPLOYEES } from "../data/mockData";
import { sound } from "../utils/sound";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Quick Action Items
  const actions = [
    {
      category: "Quick Actions",
      id: "action-retention",
      title: "Run Engineering Retention Simulation",
      subtitle: "+10% salary & workload rebalance scenario",
      icon: <Sliders className="w-4 h-4 text-cyan-400" />,
      action: () => navigate("/app/scenarios")
    },
    {
      category: "Quick Actions",
      id: "action-risks",
      title: "Inspect 23 Critical Flight Risks",
      subtitle: "Filter high-risk employees nearing flight threshold",
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      action: () => navigate("/app/employees")
    },
    {
      category: "Quick Actions",
      id: "action-decisions",
      title: "Open 7-Stage Autonomous Pipeline",
      subtitle: "Review pending manager approvals & audit trail",
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      action: () => navigate("/app/decisions")
    },
    {
      category: "Quick Actions",
      id: "action-sound",
      title: sound.isEnabled() ? "Mute Telemetry Sound Effects" : "Enable Telemetry Sound Effects",
      subtitle: "Browser-native synthesizer feedback",
      icon: sound.isEnabled() ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />,
      action: () => {
        sound.toggle();
      }
    },
    {
      category: "Quick Actions",
      id: "action-report",
      title: "Generate Executive Workforce Report",
      subtitle: "Download board-ready PDF audit dossier",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => navigate("/app/reports")
    }
  ];

  // Navigation Items
  const navigationItems = [
    { id: "nav-overview", title: "AI Command Center (Overview)", path: "/app", icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { id: "nav-employees", title: "Talent Roster & Dossiers", path: "/app/employees", icon: <User className="w-4 h-4 text-sky-400" /> },
    { id: "nav-scenarios", title: "Scenario Simulator (What-If)", path: "/app/scenarios", icon: <Sliders className="w-4 h-4 text-blue-400" /> },
    { id: "nav-skills", title: "Skills Intelligence Matrix", path: "/app/skills", icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: "nav-decisions", title: "Autonomous Decision Engine", path: "/app/decisions", icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { id: "nav-reports", title: "Executive Reports & Audit", path: "/app/reports", icon: <FileText className="w-4 h-4 text-emerald-400" /> }
  ];

  // Filtered employees
  const filteredEmployees = MOCK_EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.role.toLowerCase().includes(query.toLowerCase()) ||
      e.department.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  // Filtered actions
  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  // Filtered nav items
  const filteredNav = navigationItems.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase())
  );

  // Combined flat list for keyboard navigation
  const allResults = [
    ...filteredActions.map((item) => ({ type: "action", ...item })),
    ...filteredEmployees.map((emp) => ({
      type: "employee",
      id: emp.id,
      title: `${emp.name} (${emp.id})`,
      subtitle: `${emp.role} • ${emp.department} • Risk: ${emp.riskScore}/100`,
      icon: <User className="w-4 h-4 text-cyan-400" />,
      action: () => navigate("/app/employees")
    })),
    ...filteredNav.map((nav) => ({
      type: "nav",
      id: nav.id,
      title: nav.title,
      subtitle: `Jump to ${nav.path}`,
      icon: nav.icon,
      action: () => navigate(nav.path)
    }))
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (allResults.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (allResults.length || 1)) % (allResults.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = allResults[selectedIndex];
        if (selected) {
          sound.playClick();
          selected.action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, allResults, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#070d1e] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col">
        {/* Input Header */}
        <div className="p-4 border-b border-[#142347] flex items-center gap-3 bg-[#0a1226]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, employee name, or jump to page..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {allResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching commands or employees found for "{query}".
            </div>
          ) : (
            allResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-950/90 to-cyan-950/70 border border-cyan-500/40 text-white"
                      : "text-slate-300 hover:bg-[#0b1429]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#0e1a38] border border-[#1b2f66] shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && (
                      <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#040814] border-t border-[#142347] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-[#0c1630] px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="font-mono bg-[#0c1630] px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">↵</kbd> Execute
            </span>
            <span>
              <kbd className="font-mono bg-[#0c1630] px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">ESC</kbd> Close
            </span>
          </div>
          <span className="font-mono text-cyan-400 text-[10px]">● Neural Command Ready</span>
        </div>
      </div>
    </div>
  );
};
