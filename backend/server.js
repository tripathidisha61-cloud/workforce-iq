const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const db = require("./database/db");
const dashboardRoutes = require("./routes/dashboard");
const recruitmentRoutes = require("./routes/recruitment");
const interviewRoutes = require("./routes/interview");
const employeesRoutes = require("./routes/employees");
const policyRoutes = require("./routes/policy");
const recommendationsRoutes = require("./routes/recommendations");
const onboardingRoutes = require("./routes/onboarding");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static file access for uploads and sample PDFs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/data/policies", express.static(path.join(__dirname, "../data/policies")));
app.use("/data/resumes", express.static(path.join(__dirname, "../data/resumes")));

// API Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    name: "WorkforceIQ AI Orchestration & HR Intelligence Engine",
    status: "ONLINE",
    version: "2.4.0",
    message: "WorkforceIQ Full-Stack Server (Frontend + Backend Unified)",
    database: db.isPgConnected() ? "PostgreSQL (pgvector)" : "High-Performance Embedded Store"
  });
});

// Register Backend API Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recruitment", recruitmentRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/onboarding", onboardingRoutes);

// Serve Built React Frontend (All-in-One Unified Server)
const frontendDistPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // SPA React Router fallback for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "WorkforceIQ API running (Frontend dist not found, run npm run build in frontend)"
    });
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Boot Unified Server
app.listen(PORT, async () => {
  await db.initDb();
  console.log(`=======================================================`);
  console.log(` WorkforceIQ UNIFIED FULL-STACK SERVER RUNNING`);
  console.log(` Open in Browser: http://localhost:${PORT}`);
  console.log(` Frontend UI + Backend API + AI Orchestrator: ACTIVE`);
  console.log(`=======================================================`);
});
