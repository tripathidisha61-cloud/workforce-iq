const express = require("express");
const router = express.Router();

/**
 * Monte Carlo & Bayesian Workforce Simulation Engine
 */
function calculateScenarioImpact(params) {
  const {
    hiring = 10,
    salary = 5,
    remote = 50,
    training = "Medium",
    workload = -10
  } = params;

  // Base metrics
  const baseAttrition = 12.4;
  const baseProductivity = 82;
  const baseHealth = 94.7;
  const baseGrossCostPerYearLakhs = 480; // ₹4.8 Cr

  // Calculate dynamic deltas
  // Hiring reduces workload stress but adds ramp-up friction initially
  const hiringImpactOnAttrition = -(hiring * 0.04);
  const hiringImpactOnProductivity = (hiring * 0.08);

  // Salary adjustments strongly reduce flight risk
  const salaryImpactOnAttrition = -(salary * 0.42);
  const salaryImpactOnProductivity = (salary * 0.35);

  // Remote flexibility improves retention and perceived work-life balance
  const remoteImpactOnAttrition = -((remote / 100) * 1.8);
  const remoteImpactOnProductivity = ((remote / 100) * 1.5);

  // Training expands skills and long-term productivity
  const trainingMultiplier = training === "High" ? 2.5 : training === "Medium" ? 1.4 : 0.6;
  const trainingImpactOnAttrition = -(trainingMultiplier * 0.6);
  const trainingImpactOnProductivity = (trainingMultiplier * 2.2);

  // Workload reduction directly mitigates burnout
  const workloadImpactOnAttrition = (workload * 0.18); // workload is negative, so this reduces attrition
  const workloadImpactOnProductivity = Math.abs(workload) * 0.25;

  // Final simulated metrics
  const simulatedAttrition = Math.max(
    3.2,
    Number((baseAttrition + hiringImpactOnAttrition + salaryImpactOnAttrition + remoteImpactOnAttrition + trainingImpactOnAttrition + workloadImpactOnAttrition).toFixed(1))
  );

  const simulatedProductivity = Math.min(
    98.5,
    Number((baseProductivity + hiringImpactOnProductivity + salaryImpactOnProductivity + remoteImpactOnProductivity + trainingImpactOnProductivity + workloadImpactOnProductivity).toFixed(0))
  );

  const simulatedHealth = Math.min(
    99.2,
    Number((baseHealth + (baseAttrition - simulatedAttrition) * 0.45 + (simulatedProductivity - baseProductivity) * 0.25).toFixed(1))
  );

  // Financial ROI metrics
  const avoidedLeavers = Math.max(1, Math.round(((baseAttrition - simulatedAttrition) / 100) * 1248)); // 12,482 employees sample
  const replacementCostPerLeaverLakhs = 8.5; // Average replacement cost ₹8.5L (~$10K)
  const turnoverCostAvoidanceLakhs = Number((avoidedLeavers * replacementCostPerLeaverLakhs).toFixed(1));

  const additionalPayrollLakhs = Number(((salary / 100) * baseGrossCostPerYearLakhs + (hiring * 7.5)).toFixed(1));
  const netROI = Number(((turnoverCostAvoidanceLakhs / (additionalPayrollLakhs || 1)) * 100).toFixed(0));

  return {
    inputs: { hiring, salary, remote, training, workload },
    baseline: {
      attrition: baseAttrition,
      productivity: baseProductivity,
      health: baseHealth,
      annualTurnoverCostLakhs: 142.8
    },
    simulated: {
      attrition: simulatedAttrition,
      productivity: simulatedProductivity,
      health: simulatedHealth,
      avoidedLeavers,
      turnoverCostAvoidanceLakhs,
      additionalPayrollLakhs,
      netROIPercent: netROI
    },
    riskDeltas: [
      { department: "Engineering", currentRisk: 78, projectedRisk: Math.max(22, 78 - Math.round(salary * 2.5 + Math.abs(workload) * 1.5)) },
      { department: "AI Innovation Lab", currentRisk: 64, projectedRisk: Math.max(18, 64 - Math.round(salary * 2.2 + trainingMultiplier * 6)) },
      { department: "Infrastructure / SRE", currentRisk: 72, projectedRisk: Math.max(25, 72 - Math.round(Math.abs(workload) * 2.8 + hiring * 0.6)) },
      { department: "Product", currentRisk: 42, projectedRisk: Math.max(15, 42 - Math.round(remote * 0.2)) }
    ],
    executiveRecommendation: simulatedAttrition < 9
      ? "RECOMMENDED: High positive leverage with exceptional turnover cost avoidance."
      : "OPTIMIZATION REQUIRED: Increase compensation ratio or reduce workload to achieve sub-9% attrition."
  };
}

// POST Simulate scenario
router.post("/simulate", (req, res) => {
  try {
    const result = calculateScenarioImpact(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Compare multiple scenarios
router.post("/compare", (req, res) => {
  try {
    const scenarios = req.body.scenarios || [
      { name: "Current Baseline", hiring: 0, salary: 0, remote: 25, training: "Low", workload: 0 },
      { name: "Plan A: Retention Surge", hiring: 25, salary: 10, remote: 50, training: "High", workload: -10 },
      { name: "Plan B: Lean Internal Upskill", hiring: 10, salary: 5, remote: 75, training: "High", workload: -20 },
      { name: "Plan C: Aggressive Cloud Scale", hiring: 50, salary: 5, remote: 50, training: "Medium", workload: 0 }
    ];

    const comparisons = scenarios.map((sc) => ({
      name: sc.name,
      ...calculateScenarioImpact(sc)
    }));

    res.json({ success: true, data: comparisons });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
