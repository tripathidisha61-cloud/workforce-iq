const express = require("express");
const router = express.Router();

// Real-time telemetry feed buffer
let dynamicSignals = [
  {
    id: "SIG-" + Date.now(),
    source: "Jira / GitHub",
    department: "Engineering",
    severity: "CRITICAL",
    title: "Sustained Sprint Velocity Stress",
    detail: "Team Alpha backend cohort operating at 94.2% workload for 3 consecutive cycles.",
    timestamp: "Just now",
    confidence: 93,
    metric: "94.2% Workload"
  },
  {
    id: "SIG-" + (Date.now() - 34000),
    source: "Market Intelligence",
    department: "AI Innovation Lab",
    severity: "HIGH",
    title: "Compensation Deficit Emergence",
    detail: "Senior LLM and Vector DB engineers trending 14% below external benchmark offerings.",
    timestamp: "34s ago",
    confidence: 89,
    metric: "-14% Market Delta"
  },
  {
    id: "SIG-" + (Date.now() - 85000),
    source: "GitLab / CI",
    department: "Infrastructure / SRE",
    severity: "OPTIMAL",
    title: "Deployment Frequency Surge",
    detail: "Automated test suites passed across all cloud clusters with 99.98% reliability.",
    timestamp: "1m ago",
    confidence: 96,
    metric: "99.98% Uptime"
  },
  {
    id: "SIG-" + (Date.now() - 145000),
    source: "HRIS Signals",
    department: "Product",
    severity: "MEDIUM",
    title: "Skill Transition Barrier Detected",
    detail: "Deficit in enterprise AI product metrics identified in Q4 roadmap kickoff.",
    timestamp: "2m ago",
    confidence: 87,
    metric: "28% Gap"
  }
];

// Potential synthetic stream events
const syntheticPool = [
  {
    source: "Jira Sprints",
    department: "Engineering",
    severity: "CRITICAL",
    title: "Workload Exceedance Flag",
    detail: "DevOps chapter carrying >92% sprint load. Flight probability increased +4.1%.",
    metric: "92% Load"
  },
  {
    source: "HRIS Telemetry",
    department: "Engineering",
    severity: "CRITICAL",
    title: "Aarav Sharma Flight Threshold Alert",
    detail: "Calculated 78/100 attrition risk driven by 93% workload and market deficit.",
    metric: "78 Risk"
  },
  {
    source: "Slack Telemetry",
    department: "Customer Success",
    severity: "MEDIUM",
    title: "Sentiment Drift Detected",
    detail: "Cross-functional response latency elevated 18% during peak APAC hours.",
    metric: "+18% Latency"
  },
  {
    source: "Learning Platform",
    department: "AI Innovation Lab",
    severity: "OPTIMAL",
    title: "Vector DB Certification Surge",
    detail: "8 engineers completed high-throughput embedding course ahead of target.",
    metric: "+8 Certified"
  },
  {
    source: "Autonomous Decision Engine",
    department: "Executive",
    severity: "OPTIMAL",
    title: "Retention Bonus Directive Executed",
    detail: "Approved ₹4.8L retention package for senior backend cohort. Projected savings ₹36L.",
    metric: "₹36L Saved"
  }
];

// GET Real-time signals
router.get("/signals", (req, res) => {
  res.json({
    success: true,
    total_signals_monitored: 87,
    live_count: dynamicSignals.length,
    signals: dynamicSignals,
    system_telemetry: {
      engine_status: "HEALTHY",
      bayesian_confidence_interval: "91% - 96%",
      ingestion_rate: "142 events/sec",
      last_sync: new Date().toISOString()
    }
  });
});

// POST Generate synthetic signal
router.post("/simulate-event", (req, res) => {
  const sample = syntheticPool[Math.floor(Math.random() * syntheticPool.length)];
  const newSignal = {
    id: "SIG-" + Date.now(),
    source: req.body.source || sample.source,
    department: req.body.department || sample.department,
    severity: req.body.severity || sample.severity,
    title: req.body.title || sample.title,
    detail: req.body.detail || sample.detail,
    timestamp: "Just now",
    confidence: Math.floor(Math.random() * 8) + 90,
    metric: req.body.metric || sample.metric
  };

  dynamicSignals.unshift(newSignal);
  if (dynamicSignals.length > 20) {
    dynamicSignals.pop();
  }

  res.json({
    success: true,
    event: newSignal
  });
});

// GET Engine telemetry status
router.get("/status", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE",
    version: "2.4.0",
    inference_latency_ms: 14.2,
    active_neural_models: [
      { name: "Bayesian Attrition Predictor", accuracy: 0.942, status: "Active" },
      { name: "Workload Stress Forecaster", accuracy: 0.918, status: "Active" },
      { name: "Competency Vector Mapper", accuracy: 0.954, status: "Active" },
      { name: "Autonomous Action Synthesizer", accuracy: 0.961, status: "Active" }
    ],
    governance: {
      human_in_the_loop_active: true,
      pending_approvals: 3,
      soc2_audit_trail_valid: true
    }
  });
});

module.exports = router;
