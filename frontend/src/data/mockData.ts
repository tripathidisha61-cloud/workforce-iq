// Enterprise Data Layer for WorkforceIQ Autonomous Platform

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  avatar: string;
  experienceYears: number;
  performance: number; // 0-100
  engagement: number; // 0-100
  workload: number; // 0-100
  attritionRisk: "LOW" | "MEDIUM" | "HIGH";
  riskScore: number; // 0-100
  skillMatch: number; // 0-100
  compensationRatio: number; // e.g. 0.92 = 92% of market
  keySkills: { name: string; level: number }[];
  drivers: string[];
  aiRecommendation: string;
  recommendedAction: string;
  expectedImpact: string;
  confidence: number;
  tenureMonths: number;
  attendanceRate: number;
  history: { month: string; performance: number; workload: number; engagement: number }[];
  projects: { name: string; role: string; impact: string }[];
  learningProgress: { course: string; completion: number; status: string }[];
}

export interface AIInsight {
  id: string;
  type: "attrition" | "workload" | "skill_gap" | "hiring" | "succession";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "OPTIMIZATION";
  title: string;
  department: string;
  confidence: number;
  changeRate?: string;
  summary: string;
  drivers: string[];
  recommendedAction: string;
  expectedOutcome: string;
  targetCount: number;
  affectedGroup: string;
  timestamp: string;
  actionUrl: string;
}

export interface SkillMatrixItem {
  department: string;
  headcount: number;
  skills: { [skillName: string]: { current: number; required: number; gap: number; trainedCount: number } };
}

export interface DecisionStep {
  step: number;
  id: string;
  title: string;
  status: "Completed" | "Active" | "Pending";
  timestamp: string;
  metric: string;
  details: string;
  evidence: string[];
  actionPrompt: string;
  buttons: { label: string; action: string; primary?: boolean }[];
}

// 1. Initial Mock Employees
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "EMP-101",
    name: "Aarav Sharma",
    role: "Senior Distributed Systems Engineer",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    experienceYears: 6.5,
    performance: 92,
    engagement: 86,
    workload: 74,
    attritionRisk: "LOW",
    riskScore: 18,
    skillMatch: 95,
    compensationRatio: 1.05,
    keySkills: [
      { name: "Go / Microservices", level: 95 },
      { name: "Kafka & Event Streams", level: 92 },
      { name: "Kubernetes & Istio", level: 88 },
      { name: "PostgreSQL Architecture", level: 90 }
    ],
    drivers: ["Strong mentorship rating", "High commit volume", "Competitive compensation"],
    aiRecommendation: "Fast-track to Staff Architect track. Excellent technical leadership index.",
    recommendedAction: "Assign leadership of Q1 Multi-Region Resilience initiative.",
    expectedImpact: "Boosts team architecture throughput by 22%; zero retention risk.",
    confidence: 94,
    tenureMonths: 32,
    attendanceRate: 98,
    history: [
      { month: "May", performance: 88, workload: 70, engagement: 82 },
      { month: "Jun", performance: 90, workload: 72, engagement: 84 },
      { month: "Jul", performance: 91, workload: 76, engagement: 85 },
      { month: "Aug", performance: 92, workload: 75, engagement: 87 },
      { month: "Sep", performance: 92, workload: 74, engagement: 86 }
    ],
    projects: [
      { name: "Global Event Mesh", role: "Lead Architect", impact: "Reduced P99 latency by 38ms" },
      { name: "Zero-Downtime Migration", role: "Technical Lead", impact: "Zero customer disruption" }
    ],
    learningProgress: [
      { course: "Advanced Distributed Raft Consensus", completion: 100, status: "Certified" },
      { course: "AI-Powered Observability", completion: 65, status: "In Progress" }
    ]
  },
  {
    id: "EMP-102",
    name: "Rahul Verma",
    role: "Senior Backend Engineer",
    department: "Engineering",
    location: "Gurugram, India (Remote)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    experienceYears: 5.0,
    performance: 79,
    engagement: 54,
    workload: 93,
    attritionRisk: "HIGH",
    riskScore: 78,
    skillMatch: 88,
    compensationRatio: 0.88,
    keySkills: [
      { name: "Python / FastAPI", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Docker", level: 82 },
      { name: "AWS Cloud Infrastructure", level: 64 }
    ],
    drivers: [
      "Prolonged over-allocation (93% workload for 4 months)",
      "Below-market compensation ratio (0.88)",
      "Unresolved Cloud skill barrier"
    ],
    aiRecommendation: "Urgent retention intervention. Rebalance sprint load and approve Cloud stipend.",
    recommendedAction: "Schedule 1-on-1 career development check-in & enroll in AWS Cohort.",
    expectedImpact: "Mitigates flight probability from 78% down to 24% over 60 days.",
    confidence: 91,
    tenureMonths: 22,
    attendanceRate: 88,
    history: [
      { month: "May", performance: 85, workload: 82, engagement: 74 },
      { month: "Jun", performance: 83, workload: 88, engagement: 68 },
      { month: "Jul", performance: 81, workload: 91, engagement: 61 },
      { month: "Aug", performance: 79, workload: 94, engagement: 56 },
      { month: "Sep", performance: 79, workload: 93, engagement: 54 }
    ],
    projects: [
      { name: "Core Ledger Service", role: "Individual Contributor", impact: "High reliability on legacy engine" }
    ],
    learningProgress: [
      { course: "AWS Cloud Practitioner & Terraform", completion: 28, status: "Active Sprint" }
    ]
  },
  {
    id: "EMP-103",
    name: "Priya Patel",
    role: "Staff AI/ML Engineer",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    experienceYears: 7.2,
    performance: 96,
    engagement: 89,
    workload: 78,
    attritionRisk: "LOW",
    riskScore: 14,
    skillMatch: 98,
    compensationRatio: 1.12,
    keySkills: [
      { name: "PyTorch & Transformers", level: 98 },
      { name: "Vector DBs & Embeddings", level: 94 },
      { name: "LLM Fine-Tuning", level: 96 },
      { name: "MLOps / Triton Server", level: 90 }
    ],
    drivers: ["Lead patent author", "Strong R&D autonomy", "Exceptional stakeholder trust"],
    aiRecommendation: "Elevate to Head of Applied AI / Distinguished Scientist track.",
    recommendedAction: "Grant strategic budget authorization for proprietary domain models.",
    expectedImpact: "Accelerates internal AI capabilities across 4 product suites.",
    confidence: 96,
    tenureMonths: 41,
    attendanceRate: 99,
    history: [
      { month: "May", performance: 94, workload: 76, engagement: 88 },
      { month: "Jun", performance: 95, workload: 77, engagement: 89 },
      { month: "Jul", performance: 96, workload: 79, engagement: 90 },
      { month: "Aug", performance: 96, workload: 80, engagement: 89 },
      { month: "Sep", performance: 96, workload: 78, engagement: 89 }
    ],
    projects: [
      { name: "Cognitive Policy Engine", role: "Principal Investigator", impact: "98.4% grounded semantic search" }
    ],
    learningProgress: [
      { course: "Autonomous Multi-Agent Synthesis", completion: 100, status: "Mastered" }
    ]
  },
  {
    id: "EMP-104",
    name: "Ananya Iyer",
    role: "Principal Product Designer",
    department: "Product & Design",
    location: "Mumbai, India (Hybrid)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    experienceYears: 8.0,
    performance: 94,
    engagement: 88,
    workload: 82,
    attritionRisk: "LOW",
    riskScore: 21,
    skillMatch: 92,
    compensationRatio: 1.02,
    keySkills: [
      { name: "Enterprise Design Systems", level: 96 },
      { name: "Information Architecture", level: 94 },
      { name: "Interactive Prototyping", level: 91 },
      { name: "User Research & Heuristics", level: 89 }
    ],
    drivers: ["Strong cross-functional leadership", "Design system champion", "Consistent sprint delivery"],
    aiRecommendation: "Expand team scope to oversee multi-product Design System governance.",
    recommendedAction: "Allocate 2 junior designers for support on component expansion.",
    expectedImpact: "Reduces frontend development rework by 34%.",
    confidence: 92,
    tenureMonths: 29,
    attendanceRate: 97,
    history: [
      { month: "May", performance: 91, workload: 79, engagement: 86 },
      { month: "Jun", performance: 92, workload: 80, engagement: 87 },
      { month: "Jul", performance: 93, workload: 82, engagement: 88 },
      { month: "Aug", performance: 94, workload: 84, engagement: 89 },
      { month: "Sep", performance: 94, workload: 82, engagement: 88 }
    ],
    projects: [
      { name: "Neon Enterprise System", role: "Lead Designer", impact: "Unified 14 product surfaces" }
    ],
    learningProgress: [
      { course: "Generative UI Interfaces", completion: 80, status: "Active" }
    ]
  },
  {
    id: "EMP-105",
    name: "Vikram Malhotra",
    role: "Lead QA Automation Engineer",
    department: "Quality Engineering",
    location: "Bengaluru, India (Onsite)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    experienceYears: 5.8,
    performance: 76,
    engagement: 62,
    workload: 89,
    attritionRisk: "MEDIUM",
    riskScore: 56,
    skillMatch: 78,
    compensationRatio: 0.91,
    keySkills: [
      { name: "Selenium & Playwright", level: 88 },
      { name: "API Automation", level: 82 },
      { name: "Load / Performance Testing", level: 71 },
      { name: "CI/CD Pipeline Integration", level: 66 }
    ],
    drivers: ["High regression test manual burden", "Lagging CI/CD automation adoption"],
    aiRecommendation: "Pair with DevOps chapter to build automated CI smoke gates.",
    recommendedAction: "Sponsor Playwright + Docker parallelization certification.",
    expectedImpact: "Decreases test cycle duration by 4.5 hours per release.",
    confidence: 88,
    tenureMonths: 19,
    attendanceRate: 91,
    history: [
      { month: "May", performance: 80, workload: 84, engagement: 70 },
      { month: "Jun", performance: 78, workload: 87, engagement: 66 },
      { month: "Jul", performance: 77, workload: 88, engagement: 64 },
      { month: "Aug", performance: 76, workload: 90, engagement: 63 },
      { month: "Sep", performance: 76, workload: 89, engagement: 62 }
    ],
    projects: [
      { name: "E2E Regression Automation", role: "Lead", impact: "Captured 92 pre-release bugs" }
    ],
    learningProgress: [
      { course: "Cloud-Native Test Infrastructure", completion: 45, status: "Active" }
    ]
  },
  {
    id: "EMP-106",
    name: "Sneha Reddy",
    role: "DevOps & Infrastructure Architect",
    department: "Operations",
    location: "Hyderabad, India (Hybrid)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    experienceYears: 6.8,
    performance: 95,
    engagement: 91,
    workload: 72,
    attritionRisk: "LOW",
    riskScore: 12,
    skillMatch: 97,
    compensationRatio: 1.08,
    keySkills: [
      { name: "Terraform / Infrastructure as Code", level: 98 },
      { name: "AWS & GCP Multi-Cloud", level: 95 },
      { name: "Kubernetes Cluster Fleet", level: 94 },
      { name: "Chaos Engineering", level: 88 }
    ],
    drivers: ["Zero P1 cloud outages in 12 months", "High cloud cost efficiency index"],
    aiRecommendation: "Nominate for Org-Wide Architecture Council.",
    recommendedAction: "Lead enterprise FinOps optimization sprint.",
    expectedImpact: "Projected annual infrastructure cost reduction: ₹1.4 Cr.",
    confidence: 97,
    tenureMonths: 36,
    attendanceRate: 98,
    history: [
      { month: "May", performance: 92, workload: 74, engagement: 89 },
      { month: "Jun", performance: 93, workload: 73, engagement: 90 },
      { month: "Jul", performance: 95, workload: 71, engagement: 91 },
      { month: "Aug", performance: 95, workload: 72, engagement: 91 },
      { month: "Sep", performance: 95, workload: 72, engagement: 91 }
    ],
    projects: [
      { name: "FinOps Cloud Guard", role: "Lead Architect", impact: "28% monthly cloud savings" }
    ],
    learningProgress: [
      { course: "Site Reliability Leadership", completion: 100, status: "Mastered" }
    ]
  },
  {
    id: "EMP-107",
    name: "Rohan Gupta",
    role: "Frontend Staff Engineer",
    department: "Engineering",
    location: "Pune, India (Remote)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
    experienceYears: 6.0,
    performance: 89,
    engagement: 81,
    workload: 75,
    attritionRisk: "LOW",
    riskScore: 24,
    skillMatch: 93,
    compensationRatio: 1.01,
    keySkills: [
      { name: "React 19 & Next.js", level: 96 },
      { name: "WebGL / Canvas Visuals", level: 90 },
      { name: "TypeScript Architecture", level: 94 },
      { name: "Web Performance & Core Vitals", level: 92 }
    ],
    drivers: ["Lead on Design System implementation", "Consistently sub-1s load times"],
    aiRecommendation: "Key contributor on core intelligence dashboard rendering engine.",
    recommendedAction: "Assign leadership of Mobile/PWA responsive transformation.",
    expectedImpact: "Elevates user engagement metrics by 18%.",
    confidence: 93,
    tenureMonths: 25,
    attendanceRate: 96,
    history: [
      { month: "May", performance: 87, workload: 73, engagement: 80 },
      { month: "Jun", performance: 88, workload: 74, engagement: 81 },
      { month: "Jul", performance: 89, workload: 76, engagement: 82 },
      { month: "Aug", performance: 89, workload: 75, engagement: 81 },
      { month: "Sep", performance: 89, workload: 75, engagement: 81 }
    ],
    projects: [
      { name: "Real-time Telemetry Dashboard", role: "Lead", impact: "60fps data stream visualization" }
    ],
    learningProgress: [
      { course: "WebGPU Accelerated Computations", completion: 70, status: "Active" }
    ]
  },
  {
    id: "EMP-108",
    name: "Neha Joshi",
    role: "Product Manager — AI Operations",
    department: "Product & Design",
    location: "Bengaluru, India (Hybrid)",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80",
    experienceYears: 5.5,
    performance: 90,
    engagement: 79,
    workload: 85,
    attritionRisk: "MEDIUM",
    riskScore: 48,
    skillMatch: 89,
    compensationRatio: 0.95,
    keySkills: [
      { name: "AI Product Roadmapping", level: 92 },
      { name: "Data-Driven Prioritization", level: 90 },
      { name: "Stakeholder Alignment", level: 86 },
      { name: "UX Analytics", level: 84 }
    ],
    drivers: ["High feature delivery rate", "Increased scope without associate PM support"],
    aiRecommendation: "Provide Associate Product Manager leverage to avert cognitive burnout.",
    recommendedAction: "Open requisition for APM supporting AI Operations stream.",
    expectedImpact: "Prevents attrition of high-velocity product owner.",
    confidence: 90,
    tenureMonths: 20,
    attendanceRate: 95,
    history: [
      { month: "May", performance: 88, workload: 80, engagement: 83 },
      { month: "Jun", performance: 89, workload: 82, engagement: 82 },
      { month: "Jul", performance: 90, workload: 86, engagement: 80 },
      { month: "Aug", performance: 90, workload: 87, engagement: 79 },
      { month: "Sep", performance: 90, workload: 85, engagement: 79 }
    ],
    projects: [
      { name: "Autonomous Decision Dispatcher", role: "Product Lead", impact: "Scaled to 12K active daily users" }
    ],
    learningProgress: [
      { course: "Behavioral Economics in AI Products", completion: 90, status: "Certified" }
    ]
  }
];

// 2. High-Level AI Insights Feed
export const MOCK_INSIGHTS: AIInsight[] = [
  {
    id: "INS-001",
    type: "attrition",
    severity: "CRITICAL",
    title: "Engineering Attrition Probability Spike Detected",
    department: "Engineering",
    confidence: 91,
    changeRate: "+8.4%",
    summary: "Elevated flight risk identified across 7 senior engineers primarily driven by sustained workload overload (>90%) and compensation lag vs market benchmark.",
    drivers: ["Workload +18% over 90 days", "Below market comp ratio (0.88-0.92)", "Delayed technical promotion cycles"],
    recommendedAction: "Execute focused retention packages and workload redistribution for identified cohort.",
    expectedOutcome: "Mitigates estimated attrition from 14.2% to 6.8%, safeguarding ₹2.8 Cr in hiring & institutional knowledge replacement costs.",
    targetCount: 7,
    affectedGroup: "Senior Backend & Infrastructure Engineers",
    timestamp: "8 minutes ago",
    actionUrl: "/app/scenarios"
  },
  {
    id: "INS-002",
    type: "workload",
    severity: "HIGH",
    title: "Workload Compression Anomaly in Core Infrastructure",
    department: "Operations",
    confidence: 89,
    changeRate: "+14.2%",
    summary: "12 engineers are currently carrying >92% sprint capacity for 3 consecutive bi-weekly cycles, creating acute burnout and regression risk.",
    drivers: ["Parallel migration deadlines", "Unfilled senior SRE backfills", "High on-call incident volume"],
    recommendedAction: "Rebalance sprint priorities; offload secondary backlog items to offshore pods.",
    expectedOutcome: "Restores sustainable 76% workload target and reduces release defects by 29%.",
    targetCount: 12,
    affectedGroup: "DevOps & SRE Chapters",
    timestamp: "24 minutes ago",
    actionUrl: "/app/employees"
  },
  {
    id: "INS-003",
    type: "skill_gap",
    severity: "HIGH",
    title: "Critical Cloud-Native & AI Skill Deficit in Team Alpha",
    department: "Engineering",
    confidence: 93,
    summary: "Emerging architectural transition to Vector DBs and Terraform reveals a 38% skill coverage deficit required for Q1 roadmap delivery.",
    drivers: ["Rapid platform evolution", "Lack of structured enterprise sandbox training"],
    recommendedAction: "Enroll 16 core developers in the 4-week Cloud Acceleration & Vector Cohort.",
    expectedOutcome: "Accelerates roadmap delivery by 6 weeks; prevents costly external contractor dependency.",
    targetCount: 16,
    affectedGroup: "Team Alpha & Platform Core",
    timestamp: "1 hour ago",
    actionUrl: "/app/skills"
  },
  {
    id: "INS-004",
    type: "hiring",
    severity: "MEDIUM",
    title: "Forecasted Engineering Capacity Deficit (+18 Headcount)",
    department: "Engineering",
    confidence: 94,
    summary: "Autonomous capacity modeling projects an 18-engineer deficit by Q1 2027 based on planned product expansion and organic attrition.",
    drivers: ["New enterprise multi-tenant rollout", "Anticipated 6.5% baseline attrition"],
    recommendedAction: "Authorize early pipeline screening for Staff Backend and AI Systems roles.",
    expectedOutcome: "Zero project delay; saves 35 days in average time-to-hire through proactive talent pipelines.",
    targetCount: 18,
    affectedGroup: "Fullstack, Cloud & Applied AI",
    timestamp: "3 hours ago",
    actionUrl: "/app/planning"
  }
];

// 3. Skills Intelligence Heatmap Matrix
export const SKILLS_HEATMAP_DATA: SkillMatrixItem[] = [
  {
    department: "Engineering",
    headcount: 52,
    skills: {
      "Python / AI": { current: 88, required: 92, gap: -4, trainedCount: 42 },
      "Distributed Go": { current: 82, required: 90, gap: -8, trainedCount: 28 },
      "Cloud & DevOps": { current: 74, required: 88, gap: -14, trainedCount: 22 },
      "Cybersecurity": { current: 71, required: 85, gap: -14, trainedCount: 18 },
      "System Design": { current: 86, required: 85, gap: +1, trainedCount: 36 },
      "Data Analytics": { current: 79, required: 82, gap: -3, trainedCount: 25 },
      "Leadership": { current: 78, required: 80, gap: -2, trainedCount: 19 }
    }
  },
  {
    department: "Product & Design",
    headcount: 24,
    skills: {
      "Python / AI": { current: 62, required: 70, gap: -8, trainedCount: 9 },
      "Distributed Go": { current: 40, required: 45, gap: -5, trainedCount: 3 },
      "Cloud & DevOps": { current: 55, required: 60, gap: -5, trainedCount: 6 },
      "Cybersecurity": { current: 68, required: 75, gap: -7, trainedCount: 8 },
      "System Design": { current: 82, required: 80, gap: +2, trainedCount: 18 },
      "Data Analytics": { current: 91, required: 88, gap: +3, trainedCount: 22 },
      "Leadership": { current: 89, required: 85, gap: +4, trainedCount: 17 }
    }
  },
  {
    department: "Quality Engineering",
    headcount: 18,
    skills: {
      "Python / AI": { current: 72, required: 80, gap: -8, trainedCount: 11 },
      "Distributed Go": { current: 58, required: 65, gap: -7, trainedCount: 6 },
      "Cloud & DevOps": { current: 65, required: 82, gap: -17, trainedCount: 7 },
      "Cybersecurity": { current: 76, required: 85, gap: -9, trainedCount: 8 },
      "System Design": { current: 74, required: 78, gap: -4, trainedCount: 10 },
      "Data Analytics": { current: 80, required: 80, gap: 0, trainedCount: 12 },
      "Leadership": { current: 72, required: 75, gap: -3, trainedCount: 7 }
    }
  },
  {
    department: "Operations",
    headcount: 16,
    skills: {
      "Python / AI": { current: 64, required: 75, gap: -11, trainedCount: 6 },
      "Distributed Go": { current: 68, required: 70, gap: -2, trainedCount: 8 },
      "Cloud & DevOps": { current: 95, required: 92, gap: +3, trainedCount: 15 },
      "Cybersecurity": { current: 92, required: 90, gap: +2, trainedCount: 14 },
      "System Design": { current: 85, required: 85, gap: 0, trainedCount: 11 },
      "Data Analytics": { current: 84, required: 82, gap: +2, trainedCount: 12 },
      "Leadership": { current: 83, required: 80, gap: +3, trainedCount: 9 }
    }
  }
];

// 4. Decision Engine Visual Workflow
export const DECISION_WORKFLOW_STEPS: DecisionStep[] = [
  {
    step: 1,
    id: "step-1",
    title: "Organizational Signal Detected",
    status: "Completed",
    timestamp: "10:14 AM",
    metric: "Telemetry Anomaly: Engineering Burnout Index",
    details: "Automated telemetry ingest captured abnormal commit timestamps (>2:00 AM) and an 18% spike in weekly active task volume across 7 backend engineers.",
    evidence: [
      "Jira sprint velocity exceeded 118% nominal capacity",
      "Git commit timestamp clusters shifted 3.4 hours past normal work window",
      "Pulse check engagement sentiment dipped from 78% to 54%"
    ],
    actionPrompt: "Signal confirmed with 94.6% statistical significance.",
    buttons: [{ label: "View Signal Telemetry", action: "signal" }]
  },
  {
    step: 2,
    id: "step-2",
    title: "Multi-Source Context Synthesis",
    status: "Completed",
    timestamp: "10:15 AM",
    metric: "Cross-Correlation: Workload + Comp + Tenure",
    details: "AI reasoning engine cross-referenced HRIS compensation data, market salary benchmarks (0.88-0.91 ratio), and historical exit interviews from similar tenure cohorts.",
    evidence: [
      "Target cohort average tenure: 21 months (peak attrition window)",
      "Market compensation gap: ₹4.2L below current regional median",
      "No promotion or title advancement in prior 18 months"
    ],
    actionPrompt: "Root cause isolation: Workload burnout compounded by compensation lag.",
    buttons: [{ label: "Inspect Market Gap", action: "market" }]
  },
  {
    step: 3,
    id: "step-3",
    title: "Flight Risk Probability Calculation",
    status: "Completed",
    timestamp: "10:16 AM",
    metric: "78% Projected Probability of Exit in 90 Days",
    details: "Predictive model calculates an aggregate flight probability of 78% for the cohort within 90 days if left unaddressed, representing an estimated knowledge loss of ₹2.8 Cr.",
    evidence: [
      "Model: Gradient Boosted Survival Analysis v2.4",
      "Historic cohort accuracy on similar signals: 91.2%",
      "Predicted impact: Core Ledger Service velocity delayed by 3 months"
    ],
    actionPrompt: "Urgent intervention recommended before passive recruitment outreach converts.",
    buttons: [{ label: "Review Risk Matrix", action: "risk" }]
  },
  {
    step: 4,
    id: "step-4",
    title: "Autonomous Recommendation Generated",
    status: "Active",
    timestamp: "10:17 AM",
    metric: "Targeted 3-Point Retention & Workload Action Plan",
    details: "AI orchestrator synthesizes an optimized, non-punitive mitigation plan: 1) Immediate 8% retention adjustment, 2) Offload 20% sprint burden to shared platform pods, 3) Enroll in Cloud Architect track.",
    evidence: [
      "Cost of proposed action: ₹38.4L annualized",
      "Expected cost avoidance (recruitment + downtime): ₹2.41 Cr",
      "Estimated ROI of action: 6.27x"
    ],
    actionPrompt: "Human Authorization Required: Ready for People Ops & Engineering Director Sign-Off.",
    buttons: [
      { label: "Authorize Recommendation", action: "approve", primary: true },
      { label: "Simulate Alternatives", action: "simulate" },
      { label: "Modify Parameters", action: "modify" }
    ]
  },
  {
    step: 5,
    id: "step-5",
    title: "Human Governance Authorization",
    status: "Pending",
    timestamp: "Awaiting Input",
    metric: "Human-in-the-Loop Gateway",
    details: "Responsible AI safeguard: Autonomous actions cannot execute salary adjustments or re-assignment without explicit manager signature.",
    evidence: [
      "Required approvals: Sarah Jenkins (HR Admin) & VP Engineering",
      "Audit trail logging: Enabled with SHA-256 tamper-proof ledger"
    ],
    actionPrompt: "Pending authorization click on Step 4.",
    buttons: [{ label: "Sign Off with Audit Note", action: "sign" }]
  },
  {
    step: 6,
    id: "step-6",
    title: "Automated Orchestration & Execution",
    status: "Pending",
    timestamp: "Queued",
    metric: "HRIS & Sprint Rebalancing Automation",
    details: "Upon approval, platform automatically triggers: 1) HRIS compensation revision draft, 2) Jira backlog re-distribution, 3) Automated 1-on-1 calendar invites.",
    evidence: ["Integrations: Workday, Jira, Slack, Google Calendar"],
    actionPrompt: "Executes in <30 seconds following human authorization.",
    buttons: [{ label: "View Integration Webhooks", action: "webhooks" }]
  },
  {
    step: 7,
    id: "step-7",
    title: "Continuous Outcome Measurement",
    status: "Pending",
    timestamp: "Scheduled (+30 Days)",
    metric: "Projected Attrition Reduction: -14.2% -> 5.8%",
    details: "Post-intervention telemetry will monitor engagement recovery, workload normalization, and 60-day sentiment trajectory.",
    evidence: ["Continuous telemetry verification active"],
    actionPrompt: "Closed-loop feedback verifies true impact vs predicted model.",
    buttons: [{ label: "Set Milestone Alert", action: "alert" }]
  }
];

// 5. Scenario Simulation Utility Function
export interface SimulationParams {
  hiringCount: number; // 0, 10, 25, 50
  salaryAdjustmentPercent: number; // 0, 5, 10
  remoteWorkforcePercent: number; // 0, 25, 50, 75
  trainingInvestment: "Low" | "Medium" | "High";
  workloadChangePercent: number; // 0, -10, -20
}

export interface SimulationResult {
  projectedAttrition: number; // %
  projectedProductivity: number; // %
  annualCostCr: number; // in Crores
  skillCoverage: number; // %
  employeeSatisfaction: number; // %
  hiringRequirement: number; // count
  baseline: {
    attrition: number;
    productivity: number;
    annualCostCr: number;
    skillCoverage: number;
    satisfaction: number;
    hiringRequirement: number;
  };
  aiRecommendation: string;
}

export function runWorkforceSimulation(params: SimulationParams): SimulationResult {
  const BASELINE = {
    attrition: 12.4,
    productivity: 82.0,
    annualCostCr: 48.2,
    skillCoverage: 76.0,
    satisfaction: 74.0,
    hiringRequirement: 28
  };

  // 1. Calculate Attrition reduction
  let attrition = BASELINE.attrition;
  attrition -= params.salaryAdjustmentPercent * 0.42; // Salary raises reduce flight risk
  attrition -= (params.remoteWorkforcePercent / 25) * 0.8; // Flexibility reduces attrition
  attrition -= (params.workloadChangePercent / -10) * 1.1; // Less workload reduces burnout
  if (params.trainingInvestment === "High") attrition -= 1.4;
  else if (params.trainingInvestment === "Medium") attrition -= 0.7;
  attrition = Math.max(4.5, Math.min(18.0, Number(attrition.toFixed(1))));

  // 2. Calculate Productivity
  let productivity = BASELINE.productivity;
  productivity += (params.workloadChangePercent / -10) * 2.8; // Reduced burnout increases quality
  productivity += (params.remoteWorkforcePercent / 25) * 1.5;
  if (params.trainingInvestment === "High") productivity += 5.2;
  else if (params.trainingInvestment === "Medium") productivity += 2.6;
  productivity -= params.hiringCount * 0.08; // Onboarding ramp overhead
  productivity = Math.max(65.0, Math.min(97.0, Number(productivity.toFixed(1))));

  // 3. Calculate Annual Cost (₹ Crores)
  let cost = BASELINE.annualCostCr;
  // Hiring cost: ~₹18L per hire on average = 0.18 Cr
  cost += (params.hiringCount * 0.18);
  // Salary adjustment applied across workforce
  cost += (cost * (params.salaryAdjustmentPercent / 100));
  // Training budget
  if (params.trainingInvestment === "High") cost += 1.2;
  else if (params.trainingInvestment === "Medium") cost += 0.6;
  // Remote work savings (real estate & operational)
  cost -= (params.remoteWorkforcePercent / 100) * 2.1;
  cost = Number(cost.toFixed(1));

  // 4. Skill Coverage
  let skillCoverage = BASELINE.skillCoverage;
  if (params.trainingInvestment === "High") skillCoverage += 12;
  else if (params.trainingInvestment === "Medium") skillCoverage += 6;
  skillCoverage += (params.hiringCount / 10) * 2.2;
  skillCoverage = Math.max(60, Math.min(96, Number(skillCoverage.toFixed(0))));

  // 5. Satisfaction
  let satisfaction = BASELINE.satisfaction;
  satisfaction += params.salaryAdjustmentPercent * 1.2;
  satisfaction += (params.remoteWorkforcePercent / 25) * 2.4;
  satisfaction += (params.workloadChangePercent / -10) * 3.1;
  if (params.trainingInvestment === "High") satisfaction += 4.0;
  satisfaction = Math.max(50, Math.min(98, Number(satisfaction.toFixed(0))));

  // 6. Net Hiring Requirement
  let hiringReq = Math.max(0, BASELINE.hiringRequirement - params.hiringCount + Math.round((attrition - BASELINE.attrition) * 1.2));

  // AI Recommendation Synthesis
  let aiRecommendation = "";
  if (params.salaryAdjustmentPercent >= 5 && params.remoteWorkforcePercent >= 50 && params.workloadChangePercent <= -10) {
    aiRecommendation = "Optimal Equilibrium Detected: Balanced compensation adjustment (+5%) combined with flexible remote tiers delivers maximum productivity (89%) and reduces flight probability by 3.7% while conserving ₹1.8 Cr in real-estate overhead.";
  } else if (params.workloadChangePercent === 0 && params.salaryAdjustmentPercent === 0) {
    aiRecommendation = "Warning: Maintaining current zero-adjustment baseline risks critical talent attrition of up to 14.2% in Q4, yielding an unbudgeted knowledge replacement deficit.";
  } else {
    aiRecommendation = `Scenario Viable: Yields a ${Math.abs(Number((attrition - BASELINE.attrition).toFixed(1)))}% reduction in attrition. Consider pairing with High Training investment to close the Q1 cloud infrastructure deficit.`;
  }

  return {
    projectedAttrition: attrition,
    projectedProductivity: productivity,
    annualCostCr: cost,
    skillCoverage,
    employeeSatisfaction: satisfaction,
    hiringRequirement: hiringReq,
    baseline: BASELINE,
    aiRecommendation
  };
}

// 6. AI Copilot Simulated Answers
export const COPILOT_KNOWLEDGE_BASE: { [key: string]: { answer: string; confidence: number; drivers: string[]; action: string; chartType?: string } } = {
  "attrition": {
    answer: "Engineering has the highest attrition risk at 14.2% annualized, concentrated among 7 Senior Backend & Infrastructure engineers. Primary pressure stems from sustained 93% workload over 120 days and a 9% compensation deficit against current Bengaluru tech medians.",
    confidence: 93,
    drivers: ["Workload overload (93% avg)", "Market compensation deficit (0.88 comp ratio)", "Absence of technical leadership advancement"],
    action: "Schedule targeted retention reviews and trigger the Workforce Scenario Simulator to test a +5% adjustment."
  },
  "productivity": {
    answer: "Engineering productivity experienced a 4.2% deceleration this quarter. The root cause is NOT capability, but cognitive context switching: 34% of senior engineering hours are consumed by manual regression test maintenance and legacy database incident triage.",
    confidence: 89,
    drivers: ["Quality automation debt (+18 hrs/week)", "High on-call interruptions (4.8 P1s/month)", "Delayed CI/CD containerization"],
    action: "Authorize the Quality Automation CI Gate sprint to free up 120 engineering hours per release cycle."
  },
  "promotion": {
    answer: "Three high-velocity performers are overdue for promotion based on impact telemetry: 1) Aarav Sharma (Lead Architect track, 92% performance), 2) Priya Patel (Staff AI Scientist track, 96% performance), 3) Ananya Iyer (Design Director track, 94% performance).",
    confidence: 96,
    drivers: ["Consistent 90%+ performance for 4 consecutive quarters", "Zero attrition risk indicators", "High peer collaboration score (94%)"],
    action: "Generate promotion dossiers and route to Q4 Executive Compensation Committee."
  },
  "skills": {
    answer: "The most acute organizational skill deficit is in Cloud-Native & Vector DB Architecture (38% gap in Team Alpha), followed by Advanced Test Automation in QE (24% gap). We currently have 42 employees ready for upskilling.",
    confidence: 94,
    drivers: ["Q1 AI Platform Roadmap transition", "External contractor cost vulnerability (₹62L/quarter)"],
    action: "Enroll the 16 identified engineers into the Adaptive 4-Week Cloud Acceleration Cohort."
  },
  "hiring": {
    answer: "Our capacity planning engine forecasts a net deficit of 18 engineers over the next 2 quarters to support the global multi-tenant enterprise launch. Highest demand: 8 Distributed Systems Engineers, 5 MLOps Specialists, and 5 Fullstack Engineers.",
    confidence: 91,
    drivers: ["Enterprise contract commitments", "6.2% expected baseline attrition buffer"],
    action: "Open prioritized requisition workflows and initiate proactive candidate matching."
  },
  "burnout": {
    answer: "Currently, 12 employees show verified signs of workload overload (>90% capacity for 60+ days). The highest risk is Rahul Verma (93% workload, 54% engagement) and Vikram Malhotra (89% workload, 62% engagement).",
    confidence: 92,
    drivers: ["Consecutive 60+ hour work weeks", "Late night git commit clusters", "Vacation days unused >14 months"],
    action: "Initiate non-punitive workload redistribution and mandate 3-day recovery windows."
  }
};

// 7. Human-in-the-Loop Recommendation Actions
export interface RecommendationAction {
  id: string;
  category: "Retention" | "Hiring" | "Training" | "Mobility" | "Succession";
  title: string;
  department: string;
  targetCount: number;
  confidence: number;
  priority: "CRITICAL" | "HIGH" | "MEDIUM";
  impactScore: number; // 0-100
  estimatedCost: string;
  projectedROI: string;
  status: "Pending" | "Approved" | "Executed" | "Declined";
  rationale: string;
  drivers: string[];
  executionPlan: string[];
  approvedBy?: string;
  approvedAt?: string;
}

export const MOCK_RECOMMENDATIONS: RecommendationAction[] = [
  {
    id: "REC-101",
    category: "Retention",
    title: "Proactive Retention Package & Sprint Rebalance for Senior Backend Tier",
    department: "Engineering",
    targetCount: 7,
    confidence: 94,
    priority: "CRITICAL",
    impactScore: 92,
    estimatedCost: "₹38.5 Lakhs",
    projectedROI: "6.2x cost avoidance (₹2.41 Cr)",
    status: "Pending",
    rationale: "Elevated flight probability (78%) detected across 7 pivotal infrastructure engineers driven by continuous 92%+ workload and 11% market compensation lag.",
    drivers: ["Workload >90% for 3+ sprints", "Compensation ratio < 0.92", "3 recruiter interview signal spikes"],
    executionPlan: [
      "Targeted compensation adjustment (+7.5%) aligned to Bengaluru P75 benchmark",
      "Offload 25% of sprint backlog tickets to cross-functional support pods",
      "Schedule confidential career roadmap session with Engineering VP"
    ]
  },
  {
    id: "REC-102",
    category: "Training",
    title: "Enroll Platform Chapter in Cloud-Native & Vector DB Acceleration Cohort",
    department: "Data & AI",
    targetCount: 16,
    confidence: 91,
    priority: "HIGH",
    impactScore: 88,
    estimatedCost: "₹18.0 Lakhs",
    projectedROI: "Accelerates roadmap by 6 weeks",
    status: "Pending",
    rationale: "Q1 roadmap delivery requires 88% capability in Vector Pipelines and Distributed Go. Current coverage is 64%, creating bottleneck vulnerabilities.",
    drivers: ["New LLM enterprise integration roadmap", "External vendor dependency cost ₹62L"],
    executionPlan: [
      "4-week blended cohort with certified Cloud Architecture mentors",
      "Dedicate 6 protected hours/week per participant",
      "Hands-on sandbox migration capstone project"
    ]
  },
  {
    id: "REC-103",
    category: "Hiring",
    title: "Fast-Track Requisition: 8 Distributed Systems Engineers for Global Expansion",
    department: "Engineering",
    targetCount: 8,
    confidence: 93,
    priority: "HIGH",
    impactScore: 85,
    estimatedCost: "₹1.44 Cr (Annualized)",
    projectedROI: "Prevents ₹4.8 Cr platform downtime penalty",
    status: "Approved",
    approvedBy: "Sarah Jenkins (People Ops Director)",
    approvedAt: "Today, 09:30 AM",
    rationale: "Projected Q1-Q2 workloads exceed maximum engineering capacity buffer by 18.4% due to 3 enterprise multi-tenant launches.",
    drivers: ["New enterprise SLAs requiring 99.99% uptime", "Organic attrition buffer replacement"],
    executionPlan: [
      "Open automated talent pool sourcing across APAC & India hubs",
      "Deploy AI technical screening challenges for top 5% candidate pre-qualification",
      "Accelerate interview pipeline with automated technical interview scoring"
    ]
  },
  {
    id: "REC-104",
    category: "Mobility",
    title: "Internal Rotation: 4 Senior Analysts to Applied AI Solutions Engineering",
    department: "Product & Design",
    targetCount: 4,
    confidence: 89,
    priority: "MEDIUM",
    impactScore: 81,
    estimatedCost: "₹6.5 Lakhs",
    projectedROI: "Saves ₹32L external recruitment fees",
    status: "Pending",
    rationale: "Internal assessment identifies 4 senior analysts with 94%+ SQL and Python capabilities seeking product engineering cross-training.",
    drivers: ["Internal career mobility index high", "Customer-facing AI engineering gap"],
    executionPlan: [
      "3-month paired apprenticeship with Senior Staff AI Engineers",
      "Gradual project handover over 30 days"
    ]
  },
  {
    id: "REC-105",
    category: "Succession",
    title: "Succession Designate: Aarav Sharma for Staff Distributed Architect Role",
    department: "Engineering",
    targetCount: 1,
    confidence: 96,
    priority: "HIGH",
    impactScore: 94,
    estimatedCost: "₹12.0 Lakhs",
    projectedROI: "Zero critical architecture knowledge gap",
    status: "Pending",
    rationale: "Aarav Sharma has demonstrated consistent top-tier delivery (92% performance, 98% skill fit) and holds 94% peer mentorship ratings.",
    drivers: ["Single point of failure on Event Mesh system", "High leadership readiness score (91%)"],
    executionPlan: [
      "Formalize promotion dossier with CTO sign-off",
      "Transition architecture review sign-off authority"
    ]
  }
];

// 8. Notifications Data
export interface AlertNotification {
  id: string;
  title: string;
  type: "critical" | "warning" | "success" | "info";
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

export const MOCK_NOTIFICATIONS: AlertNotification[] = [
  {
    id: "notif-1",
    title: "Flight Risk Alert Triggered",
    type: "critical",
    message: "Rahul Verma (Senior Backend) attrition risk escalated to HIGH (78/100).",
    timestamp: "5m ago",
    read: false,
    link: "/app/employees"
  },
  {
    id: "notif-2",
    title: "Autonomous Decision Pending Approval",
    type: "warning",
    message: "Decision #ORD-9281: Engineering Retention & Load Rebalance requires governance sign-off.",
    timestamp: "24m ago",
    read: false,
    link: "/app/decisions"
  },
  {
    id: "notif-3",
    title: "Skills Gap Threshold Exceeded",
    type: "warning",
    message: "Cloud & DevOps deficit in Team Alpha reached 38%. Upskilling cohort recommended.",
    timestamp: "1h ago",
    read: false,
    link: "/app/skills"
  },
  {
    id: "notif-4",
    title: "Workforce Simulator Result Ready",
    type: "info",
    message: "Scenario 'Flex & Retention Q4' computed: Projected attrition drops to 7.8%.",
    timestamp: "3h ago",
    read: true,
    link: "/app/scenarios"
  },
  {
    id: "notif-5",
    title: "Executive Report Generated",
    type: "success",
    message: "Workforce IQ Executive Telemetry Q3 2026 compiled successfully.",
    timestamp: "5h ago",
    read: true,
    link: "/app/reports"
  }
];

// 9. Workforce Capacity Planning Matrix
export interface CapacityQuarter {
  quarter: string;
  currentCapacity: number;
  projectedDemand: number;
  deficit: number;
  plannedHires: number;
  forecastTurnover: number;
  budgetEstCr: number;
}

export const MOCK_CAPACITY_DATA: CapacityQuarter[] = [
  { quarter: "Q4 2026", currentCapacity: 1248, projectedDemand: 1280, deficit: 32, plannedHires: 18, forecastTurnover: 14, budgetEstCr: 3.2 },
  { quarter: "Q1 2027", currentCapacity: 1252, projectedDemand: 1320, deficit: 68, plannedHires: 35, forecastTurnover: 16, budgetEstCr: 5.8 },
  { quarter: "Q2 2027", currentCapacity: 1271, projectedDemand: 1365, deficit: 94, plannedHires: 42, forecastTurnover: 15, budgetEstCr: 7.1 },
  { quarter: "Q3 2027", currentCapacity: 1298, projectedDemand: 1410, deficit: 112, plannedHires: 48, forecastTurnover: 17, budgetEstCr: 8.4 }
];
