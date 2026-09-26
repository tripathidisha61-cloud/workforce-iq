import React from "react";
import { LucideIcon } from "lucide-react";

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
  accentColor = "teal",
  onClick,
}) => {
  const colorMap: Record<string, { bg: string; text: string; trendColor: string }> = {
    teal: {
      bg: "bg-[#e8f7f5]",
      text: "text-teal-600",
      trendColor: "text-teal-700",
    },
    blue: {
      bg: "bg-[#ebf5ff]",
      text: "text-blue-600",
      trendColor: "text-blue-700",
    },
    rose: {
      bg: "bg-[#fdf0f0]",
      text: "text-rose-600",
      trendColor: "text-rose-600",
    },
    emerald: {
      bg: "bg-[#ecfdf5]",
      text: "text-emerald-600",
      trendColor: "text-emerald-700",
    },
  };

  const scheme = colorMap[accentColor] || colorMap.teal;

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-2xl ${scheme.bg}`}>
          <Icon className={`w-5 h-5 ${scheme.text}`} />
        </div>
      </div>

      {/* Big Number & Inline Trend */}
      <div className="flex items-baseline gap-2.5">
        <span className="text-3xl font-black text-slate-900 tracking-tight">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold ${trendUp ? "text-emerald-600" : "text-rose-600"}`}>
            {trend}
          </span>
        )}
      </div>

      {/* Subtitle / Footnote */}
      {subtitle && (
        <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};
