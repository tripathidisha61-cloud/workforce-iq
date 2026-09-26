import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp = true,
  accentColor = "blue",
  onClick,
}) => {
  const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      ring: "border-blue-200",
      glow: "hover:border-blue-300",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      ring: "border-indigo-200",
      glow: "hover:border-indigo-300",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      ring: "border-rose-200",
      glow: "hover:border-rose-300",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "border-emerald-200",
      glow: "hover:border-emerald-300",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      ring: "border-amber-200",
      glow: "hover:border-amber-300",
    },
  };

  const scheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${scheme.glow} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.ring} border`}>
          <Icon className={`w-5 h-5 ${scheme.text}`} />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
              trendUp ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60" : "text-rose-700 bg-rose-50 border border-rose-200/60"
            }`}
          >
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>}
    </div>
  );
};
