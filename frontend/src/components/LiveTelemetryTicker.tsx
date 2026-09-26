import React, { useState, useEffect } from "react";
import { Activity, Play, Pause, Volume2, VolumeX, ShieldAlert, ArrowRight, Zap } from "lucide-react";
import { apiClient, TelemetrySignal } from "../services/api";
import { sound } from "../utils/sound";
import { useNavigate } from "react-router-dom";

export const LiveTelemetryTicker: React.FC = () => {
  const navigate = useNavigate();
  const [signals, setSignals] = useState<TelemetrySignal[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  // Load initial signals
  useEffect(() => {
    apiClient.getTelemetrySignals().then((data) => {
      setSignals(data);
    });
  }, []);

  // Rolling ticker effect
  useEffect(() => {
    if (!isPlaying || signals.length === 0) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % signals.length);
      // Optional subtle ping when advancing
      if (sound.isEnabled()) {
        sound.playPing();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, signals.length]);

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const current = signals[activeIdx];
  if (!current) return null;

  const severityBadge = {
    CRITICAL: "bg-rose-950/80 text-rose-300 border-rose-800",
    HIGH: "bg-amber-950/80 text-amber-300 border-amber-800",
    MEDIUM: "bg-sky-950/80 text-sky-300 border-sky-800",
    OPTIMAL: "bg-emerald-950/80 text-emerald-300 border-emerald-800"
  }[current.severity] || "bg-cyan-950 text-cyan-300 border-cyan-800";

  return (
    <div className="w-full bg-[#050b18]/90 backdrop-blur-md border border-[#142347] rounded-2xl p-2.5 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-black/40 mb-6 relative overflow-hidden group">
      {/* Background cyber accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Left: Stream Indicator & Control */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-wider font-bold">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 ${!isPlaying && "hidden"}`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span>LIVE TELEMETRY</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setIsPlaying(!isPlaying);
          }}
          className="p-1 rounded-md bg-[#0a1329] text-slate-400 hover:text-white border border-[#16264e] transition-colors"
          title={isPlaying ? "Pause Stream" : "Resume Stream"}
        >
          {isPlaying ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
        </button>

        <button
          onClick={toggleSound}
          className="p-1 rounded-md bg-[#0a1329] text-slate-400 hover:text-white border border-[#16264e] transition-colors"
          title={soundEnabled ? "Mute Telemetry Audio" : "Enable Telemetry Audio"}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
        </button>
      </div>

      {/* Center: Live Signal Message */}
      <div className="flex-1 min-w-[240px] flex items-center gap-2.5 text-xs overflow-hidden">
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold border ${severityBadge}`}>
          {current.severity}
        </span>
        <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
          [{current.source}]
        </span>
        <span className="font-semibold text-white truncate max-w-md">
          {current.title}
        </span>
        <span className="text-slate-400 text-[11px] truncate hidden lg:inline">
          — {current.detail}
        </span>
      </div>

      {/* Right: Quick Action & Counter */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-[#091530] border border-[#132857]">
          {current.metric}
        </span>

        <button
          onClick={() => {
            sound.playClick();
            if (current.severity === "CRITICAL") {
              navigate("/app/employees");
            } else {
              navigate("/app/scenarios");
            }
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-cyan-400 px-2 py-1 rounded-lg bg-[#0c1630] hover:bg-[#132450] border border-[#172b5c] transition-all"
        >
          <span>Inspect</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <span className="text-[10px] font-mono text-slate-500 ml-1">
          {activeIdx + 1}/{signals.length}
        </span>
      </div>
    </div>
  );
};
