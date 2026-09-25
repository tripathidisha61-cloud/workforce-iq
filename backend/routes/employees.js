const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { orchestrate } = require("../services/aiOrchestrator");

// GET Employees with optional search & filter
router.get("/", async (req, res) => {
  try {
    let employees = await db.getEmployees();
    const { search, department, risk_level } = req.query;

    if (search) {
      const q = search.toLowerCase();
      employees = employees.filter(e => 
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
      );
    }

    if (department && department !== "All") {
      employees = employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
    }

    if (risk_level && risk_level !== "All") {
      employees = employees.filter(e => e.risk_level.toLowerCase() === risk_level.toLowerCase());
    }

    res.json({ success: true, count: employees.length, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Single Employee Details
router.get("/:id", async (req, res) => {
  try {
    const employee = await db.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, data: employee });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Analyze Employee Risk
router.post("/:id/analyze", async (req, res) => {
  try {
    const employee = await db.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    const orchestrationResult = await orchestrate("employee", { employee });

    // Update risk data in employee record
    await db.updateEmployee(employee.id, {
      risk_score: orchestrationResult.data.risk_score,
      risk_level: orchestrationResult.data.risk_level,
      risk_factors: orchestrationResult.data.contributing_factors.map(f => ({
        factor: `${f.factor}: ${f.evidence}`,
        impact: f.points
      })),
      recommendations: orchestrationResult.data.recommendations
    });

    res.json({
      success: true,
      orchestration: orchestrationResult
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
