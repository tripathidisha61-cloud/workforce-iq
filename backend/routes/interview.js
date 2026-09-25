const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { orchestrate } = require("../services/aiOrchestrator");

// POST Generate Interview Questions
router.post("/generate", async (req, res) => {
  try {
    const { candidate_id, job_id, candidate, job, skill_gaps } = req.body;

    let targetCandidate = candidate;
    if (!targetCandidate && candidate_id) {
      targetCandidate = await db.getCandidateById(candidate_id);
    }
    if (!targetCandidate) {
      targetCandidate = (await db.getCandidates())[0];
    }

    let targetJob = job;
    if (!targetJob && job_id) {
      targetJob = await db.getJobById(job_id);
    }
    if (!targetJob) {
      targetJob = (await db.getJobs())[0];
    }

    const orchestrationResult = await orchestrate("interview", {
      candidate: targetCandidate,
      job: targetJob,
      skill_gaps: skill_gaps || targetCandidate.skill_gaps || [],
      action: "generate"
    });

    res.json({
      success: true,
      orchestration: orchestrationResult
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Evaluate Interview
router.post("/evaluate", async (req, res) => {
  try {
    const { candidate_id, answers } = req.body;

    const orchestrationResult = await orchestrate("interview", {
      action: "evaluate",
      answers: answers || {
        technical: 82,
        communication: 90,
        problem_solving: 74
      }
    });

    // Optionally update candidate status
    if (candidate_id) {
      await db.updateCandidate(candidate_id, {
        status: "Interview Evaluated"
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
