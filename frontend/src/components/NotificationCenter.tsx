import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Info,
  ArrowRight,
  BellRing,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_NOTIFICATIONS, AlertNotification } from "../data/mockData";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AlertNotification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "critical" | "warning">("all");

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((n) => {
    if (filter === "critical") return n.type === "critical";
    if (filter === "warning") return n.type === "warning";
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertOctagon className="w-4 h-4 text-rose-400" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-rose-950/80 text-rose-300 border-rose-800/60";
      case "warning":
        return "bg-amber-950/80 text-amber-300 border-amber-800/60";
      case "success":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
      default:
        return "bg-cyan-950/80 text-cyan-300 border-cyan-800/60";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-[#070d1e] border-l border-[#152342] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-[#152342] flex items-center justify-between bg-[#040814]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Live Telemetry Alerts</h2>
              <div className="text-[10px] text-slate-400 font-mono">
                {notifications.filter((n) => !n.read).length} Unresolved Signals
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded hover:bg-cyan-950/40"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-[#152342] bg-[#070e24] flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${
              filter === "all"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Signals ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("critical")}
            className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${
              filter === "critical"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilter("warning")}
            className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${
              filter === "warning"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Warnings
          </button>
        </div>

        {/* List of alerts */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              No alerts in this category. System signals nominal.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all duration-200 group ${
                  item.read
                    ? "bg-[#0a1226]/50 border-[#131f3d] opacity-75"
                    : "bg-[#0b1530] border-cyan-500/30 shadow-lg shadow-cyan-950/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {getIcon(item.type)}
                    <span className="font-bold text-xs text-white leading-tight">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">{item.timestamp}</span>
                    <button
                      onClick={() => clearNotification(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {item.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#132042]">
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${getBadgeStyle(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>

                  <button
                    onClick={() => {
                      onClose();
                      navigate(item.link);
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>Investigate</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#152342] bg-[#040814] flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono">Engine: Active Polling</span>
          <span className="text-cyan-400 font-mono">0 Unresolved P0s</span>
        </div>
      </div>
    </div>
  );
};
