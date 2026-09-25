const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../database/db");
const { extractTextFromPdf, parseCandidateFromText } = require("../services/resumeParser");
const { orchestrate } = require("../services/aiOrchestrator");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "_"));
  }
});

const upload = multer({ storage });

// GET Jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await db.getJobs();
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await db.getJobById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Candidates
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await db.getCandidates();
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/candidates/:id", async (req, res) => {
  try {
    const candidate = await db.getCandidateById(req.params.id);
    if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found" });
    res.json({ success: true, data: candidate });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Resume Upload & Parse
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    let filePath = "";
    let originalName = "";
    
    if (req.file) {
      filePath = req.file.path;
      originalName = req.file.originalname;
    } else {
      // Check if sample demo resume was selected
      const samplePath = path.join(__dirname, "../../data/resumes/Priya_Sharma.pdf");
      if (fs.existsSync(samplePath)) {
        filePath = samplePath;
        originalName = "Priya_Sharma.pdf";
      } else {
        return res.status(400).json({ success: false, message: "No resume file uploaded or sample found." });
      }
    }

    const extractedText = await extractTextFromPdf(filePath);
    const parsedData = parseCandidateFromText(extractedText, originalName);

    res.json({
      success: true,
      message: "Resume processed and parsed into structured profile.",
      data: {
        file_name: originalName,
        text_length: extractedText.length,
        candidate_profile: parsedData
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Analyze Candidate Match with Job
router.post("/analyze", async (req, res) => {
  try {
    const { candidate, candidate_id, job_id, job } = req.body;

    let targetJob = job;
    if (!targetJob && job_id) {
      targetJob = await db.getJobById(job_id);
    }
    if (!targetJob) {
      targetJob = (await db.getJobs())[0]; // Default to Backend Developer
    }

    let targetCandidate = candidate;
    if (!targetCandidate && candidate_id) {
      targetCandidate = await db.getCandidateById(candidate_id);
    }
    if (!targetCandidate) {
      targetCandidate = (await db.getCandidates())[0]; // Default to Priya Sharma
    }

    const orchestrationResult = await orchestrate("recruitment", {
      candidate: targetCandidate,
      job: targetJob
    });

    // Update candidate in database if candidate_id was passed
    if (targetCandidate.id) {
      await db.updateCandidate(targetCandidate.id, {
        match_score: orchestrationResult.data.match_score,
        score_breakdown: orchestrationResult.data.score_breakdown,
        strengths: orchestrationResult.data.strengths,
        skill_gaps: orchestrationResult.data.skill_gaps,
        recommendation: orchestrationResult.data.recommendation
      });
    }

    res.json({
      success: true,
      orchestration: orchestrationResult
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
