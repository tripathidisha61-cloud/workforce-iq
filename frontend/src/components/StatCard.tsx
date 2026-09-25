import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string; // e.g. "indigo", "rose", "emerald", "amber"
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp = true,
  accentColor = "indigo",
  onClick,
}) => {
  const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
    indigo: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      ring: "border-indigo-500/30",
      glow: "hover:shadow-indigo-500/10",
    },
    rose: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      ring: "border-rose-500/30",
      glow: "hover:shadow-rose-500/10",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "border-emerald-500/30",
      glow: "hover:shadow-emerald-500/10",
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      ring: "border-amber-500/30",
      glow: "hover:shadow-amber-500/10",
    },
  };

  const scheme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 shadow-lg ${scheme.glow} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.ring} border`}>
          <Icon className={`w-5 h-5 ${scheme.text}`} />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
              trendUp ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
            }`}
          >
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 mt-2 font-medium">{subtitle}</p>}
    </div>
  );
};
