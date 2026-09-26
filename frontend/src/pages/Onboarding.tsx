import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Clock, Sparkles, Award, ArrowRight } from "lucide-react";
import { onboardingApi } from "../services/api";

export const Onboarding: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);

  const loadPlans = async () => {
    const res = await onboardingApi.getPlans();
    setPlans(res || []);
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleToggleWeek = async (planId: number, week: number, currentStatus: string) => {
    const isCompleted = currentStatus === "Completed";
    await onboardingApi.updateStep(planId, week, !isCompleted);
    await loadPlans();
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>Adaptive Onboarding & Upskilling Cohorts</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Personalized weekly learning curricula generated automatically from detected candidate and employee skill gaps.
        </p>
      </div>

      {/* Onboarding Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Top Info */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Adaptive Learning Curriculum
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{plan.employee_name}</h3>
                  <p className="text-xs text-slate-500">Role: {plan.role}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-blue-600">{plan.overall_progress}%</div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                    style={{ width: `${plan.overall_progress}%` }}
                  />
                </div>
              </div>

              {/* Detected Skill Gaps Targeted */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Detected Skill Gaps Targeted:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(plan.detected_skill_gaps || []).map((gap: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold shadow-xs"
                    >
                      ⚠ {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Learning Path Weeks */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  4-Week Personalized Sprint Track (Click to Toggle Status)
                </div>
                {(plan.learning_path || []).map((item: any) => {
                  const isDone = item.status === "Completed";
                  const isCurrent = item.status === "In Progress";

                  return (
                    <div
                      key={item.week}
                      onClick={() => handleToggleWeek(plan.id, item.week, item.status)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                        isDone
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                          : isCurrent
                          ? "bg-blue-50/70 border-blue-200 text-blue-900"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isDone
                              ? "bg-emerald-600 text-white"
                              : isCurrent
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isDone ? "✓" : item.week}
                        </div>
                        <div>
                          <div className="text-xs font-bold">
                            Week {item.week} → {item.topic}
                          </div>
                          <div className="text-[10px] opacity-75">
                            {isDone
                              ? `Completed • Quiz Score: ${item.score || 90}%`
                              : isCurrent
                              ? "Active Module In Progress"
                              : "Scheduled Module"}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          isDone
                            ? "bg-emerald-100 text-emerald-800"
                            : isCurrent
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
