const express = require("express");
const router = express.Router();

let activeDecisions = [
  {
    id: "DEC-202",
    title: "Senior Backend Retention Intervention",
    target: "Engineering Chapter (Rahul Verma & Senior Cohort)",
    trigger: "Workload >92% and Attrition Score 78/100",
    recommendation: "Issue ₹4.8L retention bonus & reallocate 20% sprint load to contractors",
    impact: "Avoid ₹36.8L replacement cost, reduce flight probability from 78% to 18%",
    status: "PENDING_APPROVAL",
    confidence: 94,
    currentStep: 5, // 5 = Manager Approval
    steps: [
      { step: 1, name: "Signal Detected", status: "Completed", time: "2 hours ago" },
      { step: 2, name: "AI Context Analysis", status: "Completed", time: "1 hour ago" },
      { step: 3, name: "Risk Calculated (78/100)", status: "Completed", time: "45 mins ago" },
      { step: 4, name: "Recommendation Generated", status: "Completed", time: "30 mins ago" },
      { step: 5, name: "Manager Approval", status: "Active", time: "Pending Sign-off" },
      { step: 6, name: "Action Executed", status: "Pending", time: "--" },
      { step: 7, name: "Outcome Measured", status: "Pending", time: "--" }
    ],
    auditLog: [
      { timestamp: "2026-09-26T20:12:00Z", actor: "TelemetryIngestionEngine", event: "Workload stress signal ingested from Jira sprint 44." },
      { timestamp: "2026-09-26T20:45:00Z", actor: "BayesianRiskPredictor", event: "Attrition probability calculated at 78.4%." },
      { timestamp: "2026-09-26T21:00:00Z", actor: "AutonomousRecommendationSynthesizer", event: "Generated ₹4.8L retention package & sprint load rebalance directive." }
    ]
  },
  {
    id: "DEC-203",
    title: "Vector DB & Cloud Upskilling Program",
    target: "AI Innovation Lab Cohort",
    trigger: "38% Skill Deficit in Vector Search for Q1 Release",
    recommendation: "Enroll 6 backend engineers in accelerated 4-week Milvus/Pinecone cohort",
    impact: "Closes 38% deficit in 30 days, saves ₹18L in external hiring fees",
    status: "APPROVED",
    confidence: 96,
    currentStep: 6, // 6 = Action Executed
    steps: [
      { step: 1, name: "Signal Detected", status: "Completed", time: "1 day ago" },
      { step: 2, name: "AI Context Analysis", status: "Completed", time: "18 hours ago" },
      { step: 3, name: "Risk Calculated", status: "Completed", time: "16 hours ago" },
      { step: 4, name: "Recommendation Generated", status: "Completed", time: "12 hours ago" },
      { step: 5, name: "Manager Approval", status: "Completed", time: "4 hours ago" },
      { step: 6, name: "Action Executed", status: "Active", time: "In Progress" },
      { step: 7, name: "Outcome Measured", status: "Pending", time: "--" }
    ],
    auditLog: [
      { timestamp: "2026-09-25T14:00:00Z", actor: "CompetencyMatrixScanner", event: "Identified 38% gap in Vector DB skills." },
      { timestamp: "2026-09-26T16:00:00Z", actor: "VP of Engineering", event: "Approved upskilling curriculum directive." }
    ]
  }
];

// GET All pipeline decisions
router.get("/pipeline", (req, res) => {
  res.json({
    success: true,
    total: activeDecisions.length,
    decisions: activeDecisions
  });
});

// POST Approve decision (Human-in-the-loop)
router.post("/:id/approve", (req, res) => {
  const { id } = req.params;
  const decision = activeDecisions.find((d) => d.id === id);

  if (!decision) {
    return res.status(404).json({ success: false, message: "Decision not found" });
  }

  decision.status = "APPROVED";
  decision.currentStep = 6;
  decision.steps[4].status = "Completed";
  decision.steps[5].status = "Active";
  decision.auditLog.push({
    timestamp: new Date().toISOString(),
    actor: req.body.approver || "PeopleOps Leader (Human-in-the-Loop)",
    event: `Approved autonomous intervention for ${decision.target}. Execution dispatched.`
  });

  res.json({
    success: true,
    message: `Decision ${id} approved successfully!`,
    decision
  });
});

// POST Execute decision
router.post("/:id/execute", (req, res) => {
  const { id } = req.params;
  const decision = activeDecisions.find((d) => d.id === id);

  if (!decision) {
    return res.status(404).json({ success: false, message: "Decision not found" });
  }

  decision.status = "EXECUTED";
  decision.currentStep = 7;
  decision.steps[5].status = "Completed";
  decision.steps[6].status = "Active";
  decision.auditLog.push({
    timestamp: new Date().toISOString(),
    actor: "WorkforceIQ Execution Orchestrator",
    event: `Executed automated payroll adjustment & Jira sprint rebalance. Telemetry tracking active.`
  });

  res.json({
    success: true,
    message: `Decision ${id} executed across HRIS and Jira.`,
    decision
  });
});

module.exports = router;
