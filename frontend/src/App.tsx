import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { AIChat } from "./components/AIChat";
import { NotificationCenter } from "./components/NotificationCenter";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { DecisionEngine } from "./pages/DecisionEngine";
import { ScenarioSimulator } from "./pages/ScenarioSimulator";
import { SkillsIntelligence } from "./pages/SkillsIntelligence";
import { WorkforcePlanning } from "./pages/WorkforcePlanning";
import { Recommendations } from "./pages/Recommendations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

// App Shell Layout for /app/*
const PlatformLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Derive dynamic breadcrumbs
  const getPageMeta = () => {
    const path = location.pathname;
    if (path.includes("/app/employees")) {
      return { title: "Employee Intelligence", subtitle: "Deep-dive talent dossiers, risk predictors & interventions" };
    }
    if (path.includes("/app/decisions")) {
      return { title: "Autonomous Decision Engine", subtitle: "7-step signal-to-action human-governed execution loop" };
    }
    if (path.includes("/app/scenarios")) {
      return { title: "Workforce Scenario Simulator", subtitle: "Predictive 'What If' Monte Carlo modeling & stress testing" };
    }
    if (path.includes("/app/skills")) {
      return { title: "Skills Intelligence Matrix", subtitle: "Departmental competency heatmap & demand trajectory" };
    }
    if (path.includes("/app/planning")) {
      return { title: "Workforce Capacity Planning", subtitle: "4-quarter demand forecast & open requisition direct injection" };
    }
    if (path.includes("/app/recommendations")) {
      return { title: "AI Recommendation Center", subtitle: "Prescriptive interventions with Human-in-the-Loop governance" };
    }
    if (path.includes("/app/reports")) {
      return { title: "Executive Telemetry & Reports", subtitle: "Board-ready audits, longitudinal trends & PDF exports" };
    }
    if (path.includes("/app/settings")) {
      return { title: "System Architecture & Settings", subtitle: "Neural sensitivity tuning & Responsible AI compliance" };
    }
    return { title: "AI Command Center", subtitle: "Real-time organizational telemetry & continuous decision loops" };
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenCopilot={() => setCopilotOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          pageTitle={meta.title}
          pageSubtitle={meta.subtitle}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 lg:p-8 bg-[#030712] bg-grid-pattern relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<Employees />} />
            <Route path="/decisions" element={<DecisionEngine />} />
            <Route path="/scenarios" element={<ScenarioSimulator />} />
            <Route path="/skills" element={<SkillsIntelligence />} />
            <Route path="/planning" element={<WorkforcePlanning />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </main>
      </div>

      {/* Persistent AI Copilot Floating Drawer */}
      <AIChat
        isOpen={copilotOpen}
        onToggle={() => setCopilotOpen(!copilotOpen)}
      />

      {/* Slide-over Notifications Center */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Enterprise Platform Application */}
        <Route path="/app/*" element={<PlatformLayout />} />

        {/* Backward Compatibility Redirects */}
        <Route path="/dashboard" element={<Navigate to="/app" replace />} />
        <Route path="/employees/*" element={<Navigate to="/app/employees" replace />} />
        <Route path="/recruitment" element={<Navigate to="/app/planning" replace />} />
        <Route path="/analytics" element={<Navigate to="/app/reports" replace />} />
        <Route path="/recommendations" element={<Navigate to="/app/recommendations" replace />} />
        <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
        <Route path="/policy" element={<Navigate to="/app/settings" replace />} />
        <Route path="/interview" element={<Navigate to="/app/employees" replace />} />
        <Route path="/onboarding" element={<Navigate to="/app/skills" replace />} />

        {/* Fallback to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
