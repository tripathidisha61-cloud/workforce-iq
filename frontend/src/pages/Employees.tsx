import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  AlertTriangle,
  ShieldAlert,
  TrendingDown,
  UserCheck,
  Sparkles,
  Send,
  Filter,
  Cpu,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { employeesApi, recommendationsApi } from "../services/api";

export const Employees: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedEmp, setSelectedEmp] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [riskResult, setRiskResult] = useState<any>(null);
  const [sentToApproval, setSentToApproval] = useState(false);

  useEffect(() => {
    employeesApi.getEmployees().then((res) => {
      const list = res || [];
      setEmployees(list);
      if (id) {
        const found = list.find((e: any) => e.id === Number(id));
        if (found) setSelectedEmp(found);
      } else if (list.length > 0) {
        setSelectedEmp(list[0]);
      }
    });
  }, [id]);

  const handleRunRiskEngine = async (empId: number) => {
    setAnalyzing(true);
    setSentToApproval(false);
    try {
      const res = await employeesApi.analyzeRisk(empId);
      setRiskResult(res.orchestration.data);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (selectedEmp) {
      handleRunRiskEngine(selectedEmp.id);
    }
  }, [selectedEmp?.id]);

  const handleSendToApproval = async () => {
    if (!selectedEmp) return;
    await recommendationsApi.create({
      target_type: "employee",
      target_id: selectedEmp.id,
      target_name: selectedEmp.name,
      recommendation_type: "Career Discussion & Upskilling",
      finding: `High workforce risk signal detected (Risk Score: ${selectedEmp.risk_score}/100 - ${selectedEmp.risk_level}).`,
      reason: `Low engagement (${selectedEmp.engagement}%) combined with attendance dip (${selectedEmp.attendance}%) and skill gap.`,
      action: `Schedule 1-on-1 Career Discussion & Enroll ${selectedEmp.name} in Cloud Upskilling`
    });
    setSentToApproval(true);
  };

  const filteredEmployees = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter === "All" || e.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <span>Employee Intelligence & Risk Detection</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Transparent multi-factor telemetry analysis for proactive retention and capability growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="bg-white border border-slate-200 text-xs text-slate-900 font-medium rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs w-56"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-800 font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Quality Engineering">Quality Engineering</option>
          </select>
        </div>
      </div>

      {/* Main Split View: Left Directory List, Right Deep Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Directory List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Organization Roster ({filteredEmployees.length} Tracked)
          </div>
          {filteredEmployees.map((emp) => {
            const isSelected = selectedEmp?.id === emp.id;
            const isHigh = emp.risk_level === "HIGH";
            const isMed = emp.risk_level === "MEDIUM";

            return (
              <div
                key={emp.id}
                onClick={() => setSelectedEmp(emp)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-500 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{emp.name}</span>
                        {emp.name.includes("Rahul") && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                            Demo Hero
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {emp.department} • {emp.role}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                      isHigh
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : isMed
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    Risk: {emp.risk_level}
                  </span>
                </div>

                {/* Mini Telemetry Bar */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Performance</span>
                    <strong className="text-slate-800">{emp.performance}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Attendance</span>
                    <strong className="text-slate-800">{emp.attendance}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Engagement</span>
                    <strong className={emp.engagement < 60 ? "text-rose-600 font-bold" : "text-slate-800"}>
                      {emp.engagement}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Skill Growth</span>
                    <strong className="text-slate-800">{emp.skill_growth}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Deep-Dive Intelligence View */}
        <div className="lg:col-span-7">
          {selectedEmp && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Top Profile Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Employee Intelligence Dossier
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{selectedEmp.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedEmp.role} • {selectedEmp.department} • Tenure: {selectedEmp.tenure_months} months
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-center min-w-[140px] ${
                    selectedEmp.risk_level === "HIGH"
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : selectedEmp.risk_level === "MEDIUM"
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider">AI Risk Signal</div>
                  <div className="text-2xl font-extrabold mt-0.5">
                    {selectedEmp.risk_level === "HIGH" ? "🔴 HIGH" : selectedEmp.risk_level === "MEDIUM" ? "🟡 MED" : "🟢 LOW"}
                  </div>
                  <div className="text-[11px] opacity-80 font-mono font-semibold">
                    Score: {riskResult?.risk_score || selectedEmp.risk_score}/100
                  </div>
                </div>
              </div>

              {/* 4 Key Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-semibold">Performance</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{selectedEmp.performance}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-semibold">Attendance</div>
                  <div className="text-xl font-bold text-amber-700 mt-1">{selectedEmp.attendance}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-semibold">Engagement</div>
                  <div className="text-xl font-bold text-rose-600 mt-1">{selectedEmp.engagement}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-semibold">Skill Growth</div>
                  <div className="text-xl font-bold text-blue-600 mt-1">{selectedEmp.skill_growth}%</div>
                </div>
              </div>

              {/* Transparent Risk Formula & Contributing Factors */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Explainable Risk Engine Breakdown</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Risk = Perf + Engage + Attend + Skill Gap
                  </span>
                </div>

                <div className="space-y-2">
                  {(riskResult?.contributing_factors || selectedEmp.risk_factors || []).map(
                    (cf: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs"
                      >
                        <div className="text-slate-800">
                          <strong className="text-slate-900">{cf.factor}:</strong>{" "}
                          <span className="text-slate-600">{cf.evidence || ""}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold text-[11px] shrink-0">
                          {cf.points || cf.impact}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* 5-Month Historical Telemetry Chart */}
              {selectedEmp.history && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">5-Month Telemetry Trajectory</div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedEmp.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                        <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "10px",
                            fontSize: "11px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line type="monotone" dataKey="performance" stroke="#2563eb" strokeWidth={2} name="Performance" />
                        <Line type="monotone" dataKey="engagement" stroke="#e11d48" strokeWidth={2} name="Engagement" />
                        <Line type="monotone" dataKey="attendance" stroke="#059669" strokeWidth={2} name="Attendance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Recommended Actions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Recommended Supportive Actions (Non-Punitive HR Design)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(riskResult?.recommendations || selectedEmp.recommendations || []).map(
                    (rec: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                            {rec.urgency || "Action"}
                          </span>
                          <div className="text-xs font-bold text-slate-900 mt-2">→ {rec.action}</div>
                          {rec.reason && (
                            <p className="text-[11px] text-slate-600 mt-1">{rec.reason}</p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Signals require human review. Avoid automated penalties.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendToApproval}
                    disabled={sentToApproval}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {sentToApproval ? "Submitted to HR Approval ✓" : "Route to HR Approval Queue"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
