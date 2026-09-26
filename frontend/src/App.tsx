import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Recruitment } from "./pages/Recruitment";
import { CandidateDetails } from "./pages/CandidateDetails";
import { Interview } from "./pages/Interview";
import { Employees } from "./pages/Employees";
import { Onboarding } from "./pages/Onboarding";
import { PolicyAI } from "./pages/PolicyAI";
import { Analytics } from "./pages/Analytics";
import { Recommendations } from "./pages/Recommendations";
import { Settings } from "./pages/Settings";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState({
    name: "Sarah Jenkins",
    role: "HR Director",
    email: "sarah.jenkins@workforceiq.ai",
  });

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar currentUser={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          userRole={user.role}
          onRoleChange={(r) => setUser({ ...user, role: r })}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/recruitment/candidate/:id" element={<CandidateDetails />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<Employees />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/policy" element={<PolicyAI />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
