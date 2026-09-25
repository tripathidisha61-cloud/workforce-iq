const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET Dashboard Metrics & AI Signals
router.get("/", async (req, res) => {
  try {
    const metrics = await db.getDashboardMetrics();
    res.json({ success: true, data: metrics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
