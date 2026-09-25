const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET Onboarding Plans
router.get("/", async (req, res) => {
  try {
    const plans = await db.getOnboardingPlans();
    res.json({ success: true, count: plans.length, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Update Week Step Progress
router.post("/:id/step", async (req, res) => {
  try {
    const { week, completed } = req.body;
    const updated = await db.updateOnboardingProgress(req.params.id, week, completed);
    if (!updated) return res.status(404).json({ success: false, message: "Onboarding plan not found" });

    res.json({
      success: true,
      message: `Week ${week} status updated to ${completed ? "Completed" : "In Progress"}`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
