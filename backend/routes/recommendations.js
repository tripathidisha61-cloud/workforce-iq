const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET All Recommendations
router.get("/", async (req, res) => {
  try {
    let recs = await db.getRecommendations();
    const { status, target_type } = req.query;

    if (status && status !== "All") {
      recs = recs.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }

    if (target_type && target_type !== "All") {
      recs = recs.filter(r => r.target_type.toLowerCase() === target_type.toLowerCase());
    }

    res.json({ success: true, count: recs.length, data: recs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Create Recommendation
router.post("/", async (req, res) => {
  try {
    const { target_type, target_id, target_name, candidate_score, recommendation_type, finding, reason, action } = req.body;
    
    if (!target_name || !action) {
      return res.status(400).json({ success: false, message: "target_name and action are required." });
    }

    const newRec = await db.createRecommendation({
      target_type: target_type || "candidate",
      target_id: target_id || 1,
      target_name,
      candidate_score: candidate_score || null,
      recommendation_type: recommendation_type || "Recommended Action",
      finding: finding || "AI pattern detected requiring human review",
      reason: reason || "Synthesized cross-source signals",
      action
    });

    res.status(201).json({ success: true, data: newRec });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Approve Recommendation
router.post("/:id/approve", async (req, res) => {
  try {
    const { notes, reviewer } = req.body;
    const updated = await db.updateRecommendationStatus(
      req.params.id, 
      "Approved", 
      notes || "Approved as aligned with talent policy.", 
      reviewer || "HR Admin"
    );

    if (!updated) return res.status(404).json({ success: false, message: "Recommendation not found" });

    res.json({
      success: true,
      message: `Recommendation #${req.params.id} has been Approved and routed for HR execution.`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Reject Recommendation
router.post("/:id/reject", async (req, res) => {
  try {
    const { notes, reviewer } = req.body;
    const updated = await db.updateRecommendationStatus(
      req.params.id, 
      "Rejected", 
      notes || "Decision modified by HRBP based on operational context.", 
      reviewer || "HR Admin"
    );

    if (!updated) return res.status(404).json({ success: false, message: "Recommendation not found" });

    res.json({
      success: true,
      message: `Recommendation #${req.params.id} has been marked as Rejected by HR review.`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Review / Note Update
router.post("/:id/review", async (req, res) => {
  try {
    const { notes, reviewer, status } = req.body;
    const updated = await db.updateRecommendationStatus(
      req.params.id, 
      status || "Under HR Review", 
      notes || "Review in progress.", 
      reviewer || "HR Admin"
    );

    if (!updated) return res.status(404).json({ success: false, message: "Recommendation not found" });

    res.json({
      success: true,
      message: `Recommendation #${req.params.id} updated with review notes.`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
