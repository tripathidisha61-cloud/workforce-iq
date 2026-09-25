const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const DB_FILE = path.join(__dirname, "local_db.json");

let pool = null;
let isPgConnected = false;

// Attempt PostgreSQL connection if configured
if (process.env.DB_HOST && process.env.DB_USER) {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME || "workforceiq",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      connectionTimeoutMillis: 2000
    });

    pool.on("error", (err) => {
      console.warn("PostgreSQL pool error, falling back to local persistent store:", err.message);
      isPgConnected = false;
    });
  } catch (err) {
    console.warn("Could not initialize PostgreSQL pool, using local store:", err.message);
    isPgConnected = false;
  }
}

// Initial Seed Data
const defaultSeed = {
  jobs: [
    {
      id: 1,
      title: "Backend Developer",
      department: "Engineering",
      description: "Design and implement high-throughput REST and streaming APIs, architect microservices, and optimize relational databases.",
      required_skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
      min_experience: 2,
      openings: 2,
      location: "Hybrid (Bengaluru / Remote)"
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      description: "Build reactive, accessible user interfaces using React, TypeScript, and modern state architectures.",
      required_skills: ["React", "TypeScript", "Tailwind CSS", "Redux", "Node.js"],
      min_experience: 3,
      openings: 1,
      location: "Bengaluru, India"
    },
    {
      id: 3,
      title: "AI/ML Engineer",
      department: "AI Innovation Lab",
      description: "Develop generative AI workflows, RAG pipelines, fine-tune models, and deploy production inference endpoints.",
      required_skills: ["Python", "PyTorch", "LLMs", "Vector DB", "RAG", "FastAPI"],
      min_experience: 3,
      openings: 2,
      location: "Hybrid (Bengaluru / Remote)"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      description: "Scale Kubernetes clusters, build CI/CD automation pipelines, maintain cloud infrastructure as code.",
      required_skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "Linux"],
      min_experience: 4,
      openings: 1,
      location: "Remote"
    },
    {
      id: 5,
      title: "Product Manager",
      department: "Product",
      description: "Lead enterprise product roadmap, define feature specs, work with AI researchers and engineering teams.",
      required_skills: ["Agile", "User Research", "Data Analytics", "Roadmapping", "Product Strategy"],
      min_experience: 5,
      openings: 1,
      location: "Bengaluru, India"
    },
    {
      id: 6,
      title: "QA Automation Engineer",
      department: "Quality",
      description: "Automate end-to-end integration tests, regression suites, and load test enterprise workflows.",
      required_skills: ["Cypress", "Playwright", "Python", "API Testing", "CI/CD"],
      min_experience: 2,
      openings: 1,
      location: "Bengaluru, India"
    },
    {
      id: 7,
      title: "Cloud Security Architect",
      department: "Security",
      description: "Oversee zero-trust cloud architecture, compliance posture (SOC2, ISO27001), and vulnerability assessments.",
      required_skills: ["AWS Security", "IAM", "Zero Trust", "CloudTrail", "Compliance"],
      min_experience: 6,
      openings: 1,
      location: "Hybrid (Bengaluru / Remote)"
    }
  ],
  candidates: [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      job_id: 1,
      job_title: "Backend Developer",
      experience: 2.5,
      education: "B.Tech in Computer Science and Engineering",
      resume_text: "Priya Sharma\nB.Tech Computer Science\nSkills: Python, FastAPI, PostgreSQL, Docker, AWS (Basic)\nExperience: 2.5 years as Junior Backend Engineer at TechNova. Designed REST APIs using FastAPI, managed database schemas on PostgreSQL, containerized microservices with Docker, assisted team with AWS EC2 deployments.",
      skills: [
        { name: "Python", level: "Strong", score: 95 },
        { name: "FastAPI", level: "Strong", score: 92 },
        { name: "PostgreSQL", level: "Strong", score: 88 },
        { name: "Docker", level: "Good", score: 78 },
        { name: "AWS", level: "Basic", score: 55 }
      ],
      match_score: 87,
      score_breakdown: {
        skill_match: 90,
        semantic_match: 84,
        experience_match: 85,
        formula: "0.50 * 90 + 0.30 * 84 + 0.20 * 85 = 87.2%"
      },
      strengths: [
        "Relevant backend experience building high-performance REST APIs",
        "Strong core technology match (Python, FastAPI, PostgreSQL)",
        "Proven experience with Dockerized microservices architecture"
      ],
      skill_gaps: [
        { skill: "AWS Deployment", severity: "Moderate", note: "Basic exposure; lacks production cloud deployment and ECS/EKS experience" },
        { skill: "Cloud Infrastructure", severity: "Moderate", note: "Needs guided mentorship on Terraform / IaC and cloud observability" }
      ],
      status: "Screened",
      recommendation: "Proceed to Interview - Focus on cloud deployment and AWS architecture"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 98112 33445",
      job_id: 2,
      job_title: "Frontend Developer",
      experience: 4,
      education: "B.E. Information Technology",
      resume_text: "Rahul Mehta. 4 years frontend engineer. Skills: React, TypeScript, Tailwind CSS, Redux, Node.js, Next.js. Led design system migration and reduced bundle size by 42%.",
      skills: [
        { name: "React", level: "Strong", score: 96 },
        { name: "TypeScript", level: "Strong", score: 92 },
        { name: "Tailwind CSS", level: "Strong", score: 95 },
        { name: "Redux", level: "Good", score: 85 },
        { name: "Node.js", level: "Good", score: 80 }
      ],
      match_score: 92,
      score_breakdown: {
        skill_match: 94,
        semantic_match: 90,
        experience_match: 92,
        formula: "0.50 * 94 + 0.30 * 90 + 0.20 * 92 = 92.4%"
      },
      strengths: [
        "Exceptional modern React & TypeScript craftsmanship",
        "Demonstrated leadership in design systems and web performance optimization",
        "Solid full-stack appreciation with Node.js"
      ],
      skill_gaps: [
        { skill: "GraphQL", severity: "Minor", note: "Has worked mostly with REST endpoints" }
      ],
      status: "Interview",
      recommendation: "Strongly recommended for technical interview round"
    },
    {
      id: 3,
      name: "Ananya Singh",
      email: "ananya.singh@example.com",
      phone: "+91 97234 56789",
      job_id: 3,
      job_title: "AI/ML Engineer",
      experience: 3.5,
      education: "M.Tech Data Science & AI",
      resume_text: "Ananya Singh. M.Tech AI. Skills: Python, PyTorch, Scikit-learn, LLMs, Vector DB, RAG, HuggingFace, FastAPI. Deployed enterprise RAG search system with pgvector and LangChain.",
      skills: [
        { name: "Python", level: "Strong", score: 95 },
        { name: "PyTorch", level: "Strong", score: 90 },
        { name: "LLMs & RAG", level: "Strong", score: 94 },
        { name: "Vector DB", level: "Good", score: 86 },
        { name: "FastAPI", level: "Good", score: 82 }
      ],
      match_score: 89,
      score_breakdown: {
        skill_match: 92,
        semantic_match: 88,
        experience_match: 84,
        formula: "0.50 * 92 + 0.30 * 88 + 0.20 * 84 = 89.2%"
      },
      strengths: [
        "Production hands-on background with LLM orchestration and vector embeddings",
        "Rigorous quantitative ML foundation with PyTorch and Transformers"
      ],
      skill_gaps: [
        { skill: "Distributed ML Training", severity: "Minor", note: "Experience primarily in fine-tuning single-node or API endpoints" }
      ],
      status: "Screened",
      recommendation: "Proceed to Technical Interview - High alignment with GenAI initiatives"
    },
    {
      id: 4,
      name: "Karan Gupta",
      email: "karan.gupta@example.com",
      phone: "+91 96543 21098",
      job_id: 4,
      job_title: "DevOps Engineer",
      experience: 5,
      education: "B.Tech Computer Science",
      resume_text: "Karan Gupta. 5 years DevOps & SRE. Skills: Kubernetes, Terraform, Docker, AWS, CI/CD, Helm, Prometheus. Managed multi-region AWS EKS clusters.",
      skills: [
        { name: "Kubernetes", level: "Strong", score: 94 },
        { name: "Docker", level: "Strong", score: 95 },
        { name: "Terraform", level: "Strong", score: 90 },
        { name: "AWS", level: "Strong", score: 92 },
        { name: "CI/CD", level: "Strong", score: 88 }
      ],
      match_score: 91,
      score_breakdown: {
        skill_match: 93,
        semantic_match: 90,
        experience_match: 90,
        formula: "0.50 * 93 + 0.30 * 90 + 0.20 * 90 = 91.5%"
      },
      strengths: [
        "Extensive infrastructure-as-code and container orchestration experience",
        "Strong production monitoring and high-availability operations"
      ],
      skill_gaps: [
        { skill: "Azure/GCP multi-cloud", severity: "Minor", note: "Primary background is AWS specific" }
      ],
      status: "Interview",
      recommendation: "Advance to Leadership & Architecture Review"
    }
  ],
  employees: [
    {
      id: 1,
      name: "Rahul Verma",
      email: "rahul.verma@company.internal",
      department: "Engineering",
      role: "Backend Software Engineer",
      tenure_months: 18,
      skills: [
        { name: "Python", level: "Strong" },
        { name: "FastAPI", level: "Good" },
        { name: "PostgreSQL", level: "Strong" },
        { name: "Cloud Architecture", level: "Weak" }
      ],
      performance: 76,
      attendance: 72,
      engagement: 54,
      skill_growth: 61,
      risk_score: 68,
      risk_level: "HIGH",
      risk_factors: [
        { factor: "Low engagement (54% vs team baseline 82%)", impact: "+25 pts" },
        { factor: "Attendance dip over last 60 days (72%)", impact: "+20 pts" },
        { factor: "Declining performance sprint velocity (76%)", impact: "+15 pts" },
        { factor: "Skill gap in Cloud Architecture / Microservices", impact: "+8 pts" }
      ],
      recommendations: [
        { action: "Schedule 1-on-1 Career Discussion", urgency: "Immediate", owner: "Engineering Manager" },
        { action: "Enroll in Cloud Architecture Upskilling Sprint", urgency: "High", owner: "L&D Lead" },
        { action: "Workload & Sprint Burnout Assessment", urgency: "Medium", owner: "HR Business Partner" }
      ],
      history: [
        { month: "Apr", performance: 88, engagement: 82, attendance: 95 },
        { month: "May", performance: 84, engagement: 74, attendance: 90 },
        { month: "Jun", performance: 80, engagement: 66, attendance: 82 },
        { month: "Jul", performance: 78, engagement: 58, attendance: 75 },
        { month: "Aug", performance: 76, engagement: 54, attendance: 72 }
      ]
    },
    {
      id: 2,
      name: "Aarav Singh",
      email: "aarav.singh@company.internal",
      department: "Engineering",
      role: "Junior Backend Developer",
      tenure_months: 4,
      skills: [
        { name: "Python", level: "Strong" },
        { name: "Django", level: "Good" },
        { name: "PostgreSQL", level: "Good" },
        { name: "Docker", level: "Learning" },
        { name: "AWS", level: "Learning" },
        { name: "Kubernetes", level: "Pending" }
      ],
      performance: 88,
      attendance: 96,
      engagement: 84,
      skill_growth: 78,
      risk_score: 18,
      risk_level: "LOW",
      risk_factors: [
        { factor: "Positive learning velocity and mentorship check-ins", impact: "Low Risk" }
      ],
      recommendations: [
        { action: "Continue Adaptive Onboarding Cohort Track", urgency: "Normal", owner: "Tech Lead" }
      ],
      history: [
        { month: "May", performance: 82, engagement: 80, attendance: 98 },
        { month: "Jun", performance: 85, engagement: 82, attendance: 96 },
        { month: "Jul", performance: 86, engagement: 84, attendance: 95 },
        { month: "Aug", performance: 88, engagement: 84, attendance: 96 }
      ]
    },
    {
      id: 3,
      name: "Neha Sharma",
      email: "neha.sharma@company.internal",
      department: "Product Design",
      role: "Lead UI/UX Designer",
      tenure_months: 30,
      skills: [
        { name: "Design Systems", level: "Strong" },
        { name: "User Research", level: "Strong" },
        { name: "Figma", level: "Strong" },
        { name: "Prototyping", level: "Strong" }
      ],
      performance: 91,
      attendance: 95,
      engagement: 89,
      skill_growth: 85,
      risk_score: 12,
      risk_level: "LOW",
      risk_factors: [
        { factor: "Consistent top quartile performance & team leadership", impact: "Low Risk" }
      ],
      recommendations: [
        { action: "Nominate for Design Mentorship Leadership Award", urgency: "Low", owner: "Head of Product" }
      ],
      history: [
        { month: "Apr", performance: 90, engagement: 88, attendance: 96 },
        { month: "May", performance: 90, engagement: 89, attendance: 95 },
        { month: "Jun", performance: 92, engagement: 90, attendance: 95 },
        { month: "Jul", performance: 91, engagement: 88, attendance: 94 },
        { month: "Aug", performance: 91, engagement: 89, attendance: 95 }
      ]
    },
    {
      id: 4,
      name: "Riya Gupta",
      email: "riya.gupta@company.internal",
      department: "Quality Engineering",
      role: "QA Test Specialist",
      tenure_months: 22,
      skills: [
        { name: "Manual QA", level: "Strong" },
        { name: "Jira / TestRail", level: "Strong" },
        { name: "API Testing", level: "Good" },
        { name: "Playwright Automation", level: "Weak" }
      ],
      performance: 64,
      attendance: 68,
      engagement: 58,
      skill_growth: 52,
      risk_score: 64,
      risk_level: "HIGH",
      risk_factors: [
        { factor: "Sub-threshold sprint QA throughput (64%)", impact: "+22 pts" },
        { factor: "Attendance irregularities on release days (68%)", impact: "+20 pts" },
        { factor: "Stalled automation transition (Playwright gap)", impact: "+18 pts" },
        { factor: "Expressed dissatisfaction with legacy test duties", impact: "+4 pts" }
      ],
      recommendations: [
        { action: "Pair with Senior Automation Engineer for Playwright upskilling", urgency: "Immediate", owner: "QA Director" },
        { action: "1-on-1 Wellbeing and Alignment Check-in", urgency: "High", owner: "HRBP" }
      ],
      history: [
        { month: "Apr", performance: 78, engagement: 74, attendance: 88 },
        { month: "May", performance: 74, engagement: 68, attendance: 82 },
        { month: "Jun", performance: 70, engagement: 64, attendance: 75 },
        { month: "Jul", performance: 66, engagement: 60, attendance: 70 },
        { month: "Aug", performance: 64, engagement: 58, attendance: 68 }
      ]
    },
    {
      id: 5,
      name: "Vikram Patel",
      email: "vikram.patel@company.internal",
      department: "Engineering",
      role: "Senior Frontend Engineer",
      tenure_months: 26,
      skills: [
        { name: "React", level: "Strong" },
        { name: "TypeScript", level: "Strong" },
        { name: "Next.js", level: "Basic" },
        { name: "Microfrontends", level: "Weak" }
      ],
      performance: 82,
      attendance: 88,
      engagement: 67,
      skill_growth: 65,
      risk_score: 42,
      risk_level: "MEDIUM",
      risk_factors: [
        { factor: "Engagement trending down over last 3 sprints", impact: "+18 pts" },
        { factor: "Skill gap in upcoming Next.js 14 architecture revamp", impact: "+14 pts" },
        { factor: "Moderate workload intensity", impact: "+10 pts" }
      ],
      recommendations: [
        { action: "Assign Next.js App Router architectural spike project", urgency: "Medium", owner: "Staff Engineer" }
      ],
      history: [
        { month: "Apr", performance: 86, engagement: 78, attendance: 92 },
        { month: "May", performance: 85, engagement: 74, attendance: 90 },
        { month: "Jun", performance: 84, engagement: 70, attendance: 88 },
        { month: "Jul", performance: 83, engagement: 68, attendance: 88 },
        { month: "Aug", performance: 82, engagement: 67, attendance: 88 }
      ]
    }
  ],
  recommendations: [
    {
      id: 1,
      target_type: "candidate",
      target_id: 1,
      target_name: "Priya Sharma",
      candidate_score: 87,
      recommendation_type: "Proceed to Interview",
      finding: "Candidate has 87% match for Backend Developer with 2.5y relevant experience, but shows basic AWS skills.",
      reason: "Core backend competencies (Python, FastAPI, PostgreSQL, Docker) are strong. AWS gap can be evaluated and bridged through fast onboarding.",
      action: "Schedule Technical Interview Round 1 with cloud focus questions",
      status: "Pending HR Review",
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      reviewed_by: null,
      review_notes: null
    },
    {
      id: 2,
      target_type: "employee",
      target_id: 1,
      target_name: "Rahul Verma",
      recommendation_type: "Career Discussion & Upskilling",
      finding: "Elevated workforce risk detected (Score 68 / 100 - HIGH RISK).",
      reason: "Tri-factor risk convergence: declining engagement (54%), attendance dip (72%), and cloud architecture skill gap.",
      action: "Schedule HRBP Career Alignment Session & enroll in Cloud Architecture learning track",
      status: "Pending HR Review",
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      reviewed_by: null,
      review_notes: null
    },
    {
      id: 3,
      target_type: "candidate",
      target_id: 2,
      target_name: "Rahul Mehta",
      candidate_score: 92,
      recommendation_type: "Fast-Track Offer Pipeline",
      finding: "Exceptional 92% match for Senior Frontend Developer with proven design system impact.",
      reason: "Surpasses requirements in React, TypeScript, and web performance; minimal gap.",
      action: "Proceed directly to Final Architectural Round",
      status: "Approved",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      reviewed_by: "HR Director Sarah Jenkins",
      review_notes: "Fast-tracked due to competing offers."
    },
    {
      id: 4,
      target_type: "employee",
      target_id: 4,
      target_name: "Riya Gupta",
      recommendation_type: "Upskilling & Mentorship",
      finding: "Risk score 64 (HIGH RISK) due to automation skill transition stall.",
      reason: "Manual QA role evolving towards automation; low attendance and engagement correlate with lack of modern tooling support.",
      action: "Pair with Senior SDET mentor and approve Playwright Pro certification funding",
      status: "Pending HR Review",
      created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      reviewed_by: null,
      review_notes: null
    }
  ],
  onboarding: [
    {
      id: 1,
      employee_id: 2,
      employee_name: "Aarav Singh",
      role: "Backend Developer",
      start_date: "2026-08-01",
      detected_skill_gaps: ["Docker", "AWS", "Kubernetes"],
      overall_progress: 60,
      learning_path: [
        { week: 1, topic: "Docker Basics & Containerization", status: "Completed", score: 92, completed_at: "2026-08-07" },
        { week: 2, topic: "AWS Fundamentals & S3/EC2 Integration", status: "Completed", score: 88, completed_at: "2026-08-14" },
        { week: 3, topic: "Cloud Deployment & CI/CD Pipelines", status: "In Progress", score: null, completed_at: null },
        { week: 4, topic: "Kubernetes Cluster Architecture & Helm", status: "Upcoming", score: null, completed_at: null }
      ]
    },
    {
      id: 2,
      employee_id: 1,
      employee_name: "Rahul Verma",
      role: "Backend Software Engineer",
      start_date: "2026-09-15",
      detected_skill_gaps: ["Cloud Architecture", "Terraform", "Distributed Caching"],
      overall_progress: 25,
      learning_path: [
        { week: 1, topic: "AWS Well-Architected Framework", status: "Completed", score: 85, completed_at: "2026-09-22" },
        { week: 2, topic: "Infrastructure as Code with Terraform", status: "In Progress", score: null, completed_at: null },
        { week: 3, topic: "Distributed Systems & Redis Caching", status: "Upcoming", score: null, completed_at: null },
        { week: 4, topic: "Microservices Resilience & Circuit Breakers", status: "Upcoming", score: null, completed_at: null }
      ]
    }
  ]
};

// Local JSON File Database Implementation
function loadDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      saveDb(defaultSeed);
      return JSON.parse(JSON.stringify(defaultSeed));
    }
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local db file, resetting to default seed:", err);
    return JSON.parse(JSON.stringify(defaultSeed));
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local db file:", err);
  }
}

// Ensure database file exists upon boot
let dbMemory = loadDb();

const db = {
  isPgConnected: () => isPgConnected,
  
  async initDb() {
    if (pool) {
      try {
        const client = await pool.connect();
        isPgConnected = true;
        console.log("PostgreSQL connection successfully established.");
        client.release();
      } catch (err) {
        console.warn("PostgreSQL not accessible (" + err.message + "). Operating with high-speed local persistent store.");
        isPgConnected = false;
      }
    } else {
      console.log("Using local persistent JSON store for WorkforceIQ prototype.");
    }
  },

  // Candidates
  async getCandidates() {
    dbMemory = loadDb();
    return dbMemory.candidates;
  },

  async getCandidateById(id) {
    dbMemory = loadDb();
    return dbMemory.candidates.find((c) => c.id === parseInt(id));
  },

  async createCandidate(candidateData) {
    dbMemory = loadDb();
    const newId = dbMemory.candidates.length > 0 
      ? Math.max(...dbMemory.candidates.map(c => c.id)) + 1 
      : 1;
    const newCandidate = {
      id: newId,
      ...candidateData,
      status: candidateData.status || "Screened",
      created_at: new Date().toISOString()
    };
    dbMemory.candidates.unshift(newCandidate);
    saveDb(dbMemory);
    return newCandidate;
  },

  async updateCandidate(id, updateData) {
    dbMemory = loadDb();
    const index = dbMemory.candidates.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;
    dbMemory.candidates[index] = { ...dbMemory.candidates[index], ...updateData };
    saveDb(dbMemory);
    return dbMemory.candidates[index];
  },

  // Jobs
  async getJobs() {
    dbMemory = loadDb();
    return dbMemory.jobs;
  },

  async getJobById(id) {
    dbMemory = loadDb();
    return dbMemory.jobs.find(j => j.id === parseInt(id));
  },

  // Employees
  async getEmployees() {
    dbMemory = loadDb();
    return dbMemory.employees;
  },

  async getEmployeeById(id) {
    dbMemory = loadDb();
    return dbMemory.employees.find(e => e.id === parseInt(id));
  },

  async updateEmployee(id, updateData) {
    dbMemory = loadDb();
    const index = dbMemory.employees.findIndex(e => e.id === parseInt(id));
    if (index === -1) return null;
    dbMemory.employees[index] = { ...dbMemory.employees[index], ...updateData };
    saveDb(dbMemory);
    return dbMemory.employees[index];
  },

  // Recommendations
  async getRecommendations() {
    dbMemory = loadDb();
    return dbMemory.recommendations;
  },

  async createRecommendation(recData) {
    dbMemory = loadDb();
    const newId = dbMemory.recommendations.length > 0 
      ? Math.max(...dbMemory.recommendations.map(r => r.id)) + 1 
      : 1;
    const newRec = {
      id: newId,
      status: "Pending HR Review",
      created_at: new Date().toISOString(),
      reviewed_by: null,
      review_notes: null,
      ...recData
    };
    dbMemory.recommendations.unshift(newRec);
    saveDb(dbMemory);
    return newRec;
  },

  async updateRecommendationStatus(id, status, notes = "", reviewer = "HR Admin") {
    dbMemory = loadDb();
    const index = dbMemory.recommendations.findIndex(r => r.id === parseInt(id));
    if (index === -1) return null;
    dbMemory.recommendations[index].status = status;
    dbMemory.recommendations[index].review_notes = notes;
    dbMemory.recommendations[index].reviewed_by = reviewer;
    dbMemory.recommendations[index].reviewed_at = new Date().toISOString();
    saveDb(dbMemory);
    return dbMemory.recommendations[index];
  },

  // Onboarding
  async getOnboardingPlans() {
    dbMemory = loadDb();
    return dbMemory.onboarding || [];
  },

  async updateOnboardingProgress(planId, weekNumber, completed) {
    dbMemory = loadDb();
    const plan = dbMemory.onboarding.find(p => p.id === parseInt(planId));
    if (!plan) return null;
    const item = plan.learning_path.find(w => w.week === parseInt(weekNumber));
    if (item) {
      item.status = completed ? "Completed" : "In Progress";
      item.completed_at = completed ? new Date().toISOString() : null;
    }
    const completedCount = plan.learning_path.filter(w => w.status === "Completed").length;
    plan.overall_progress = Math.round((completedCount / plan.learning_path.length) * 100);
    saveDb(dbMemory);
    return plan;
  },

  // Dashboard Aggregates
  async getDashboardMetrics() {
    dbMemory = loadDb();
    const highRiskEmployees = dbMemory.employees.filter(e => e.risk_level === "HIGH");
    const skillGapEmployees = dbMemory.employees.filter(e => e.skills.some(s => s.level === "Weak" || s.level === "Basic"));
    const strongCandidates = dbMemory.candidates.filter(c => c.match_score >= 85);
    const pendingRecs = dbMemory.recommendations.filter(r => r.status === "Pending HR Review");

    return {
      stats: {
        total_candidates: 124, // Display aggregate pool
        active_candidates_screened: dbMemory.candidates.length,
        total_employees: 38,   // Display organization pool
        active_tracked_employees: dbMemory.employees.length,
        high_risk_count: 12,    // Organization high-risk signals
        active_high_risk_tracked: highRiskEmployees.length,
        open_jobs_count: 7,
        pending_approvals: pendingRecs.length
      },
      insights: [
        {
          id: 1,
          type: "risk",
          icon: "🔴",
          badge: "Urgent Attention",
          title: "3 employees show high-risk signals",
          description: "Elevated attrition indicators in Engineering & QA driven by engagement dips and skill transition barriers.",
          primary_target: "Rahul Verma (Engineering)",
          action_link: "/employees/1"
        },
        {
          id: 2,
          type: "skill_gap",
          icon: "🟡",
          badge: "Capability Gap",
          title: "14 employees have skill gaps",
          description: "Concentrated around Cloud Architecture (AWS/Terraform) and Modern Test Automation frameworks.",
          primary_target: "Cloud & Automation Cohorts",
          action_link: "/onboarding"
        },
        {
          id: 3,
          type: "candidate_match",
          icon: "🟢",
          badge: "Strong Talent Signal",
          title: "8 candidates strongly match open jobs",
          description: "Priya Sharma (87% match) and Rahul Mehta (92% match) ready for final technical review.",
          primary_target: "Priya Sharma (Backend Developer)",
          action_link: "/recruitment"
        }
      ],
      pipeline: [
        { stage: "Applications", count: 124, color: "#6366f1" },
        { stage: "Screened", count: 68, color: "#8b5cf6" },
        { stage: "Interview", count: 24, color: "#ec4899" },
        { stage: "Selected", count: 8, color: "#10b981" }
      ],
      workforce_health: [
        { metric: "Performance", score: 81, target: 85 },
        { metric: "Attendance", score: 84, target: 90 },
        { metric: "Engagement", score: 68, target: 80 },
        { metric: "Skill Growth", score: 72, target: 75 }
      ],
      department_risks: [
        { department: "Engineering", headcount: 18, high_risk: 2, avg_score: 79 },
        { department: "Quality", headcount: 6, high_risk: 1, avg_score: 71 },
        { department: "Product", headcount: 8, high_risk: 0, avg_score: 88 },
        { department: "Infrastructure", headcount: 6, high_risk: 0, avg_score: 86 }
      ]
    };
  }
};

module.exports = db;
