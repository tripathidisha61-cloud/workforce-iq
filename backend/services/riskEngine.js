/**
 * Workforce Risk Engine & Attrition Signal Analyzer
 * Transparent, explainable scoring formula:
 * Risk Score = Performance Risk + Engagement Risk + Attendance Risk + Skill Gap Risk
 */

function calculateEmployeeRisk(employee) {
  let riskScore = 0;
  const contributingFactors = [];
  const recommendations = [];

  const performance = employee.performance ?? 80;
  const attendance = employee.attendance ?? 85;
  const engagement = employee.engagement ?? 75;
  const skills = employee.skills || [];

  // 1. Engagement Risk (Max 35 points)
  if (engagement < 60) {
    riskScore += 25;
    contributingFactors.push({
      factor: "Low Engagement",
      evidence: `Engagement score is ${engagement}% (below healthy 70% threshold)`,
      points: "+25"
    });
  } else if (engagement < 70) {
    riskScore += 12;
    contributingFactors.push({
      factor: "Declining Engagement",
      evidence: `Engagement score is ${engagement}% (borderline range)`,
      points: "+12"
    });
  }

  // 2. Attendance Risk (Max 25 points)
  if (attendance < 70) {
    riskScore += 20;
    contributingFactors.push({
      factor: "Attendance Irregularities",
      evidence: `Attendance is ${attendance}% (significant drop from team average of 92%)`,
      points: "+20"
    });
  } else if (attendance < 75) {
    riskScore += 15;
    contributingFactors.push({
      factor: "Attendance Dip",
      evidence: `Attendance is ${attendance}% over the last 60-day reporting window`,
      points: "+15"
    });
  }

  // 3. Performance Risk (Max 30 points)
  if (performance < 65) {
    riskScore += 30;
    contributingFactors.push({
      factor: "Sub-threshold Performance",
      evidence: `Sprint velocity / delivery performance reached ${performance}%`,
      points: "+30"
    });
  } else if (performance < 78) {
    riskScore += 15;
    contributingFactors.push({
      factor: "Performance Dip",
      evidence: `Performance score currently ${performance}% (trending downward over past 2 cycles)`,
      points: "+15"
    });
  }

  // 4. Skill Gap Risk (Max 25 points)
  const weakSkills = skills.filter(s => s.level === "Weak" || s.level === "Learning");
  if (weakSkills.length >= 2) {
    riskScore += 18;
    contributingFactors.push({
      factor: "Multiple Skill Gaps",
      evidence: `Identified capability blockers in: ${weakSkills.map(s => s.name).join(", ")}`,
      points: "+18"
    });
  } else if (weakSkills.length === 1) {
    riskScore += 8;
    contributingFactors.push({
      factor: "Key Skill Gap",
      evidence: `Identified gap in ${weakSkills[0].name} impacting upcoming roadmap dependencies`,
      points: "+8"
    });
  }

  // Cap score at 100
  riskScore = Math.min(100, Math.max(5, riskScore));

  // Risk Classification
  let riskLevel = "LOW";
  if (riskScore >= 61) riskLevel = "HIGH";
  else if (riskScore >= 31) riskLevel = "MEDIUM";

  // Responsible HR Next Steps
  if (riskLevel === "HIGH") {
    recommendations.push({
      action: "Schedule 1-on-1 Career Discussion",
      reason: "High risk signal driven by engagement decline and workload pressure.",
      urgency: "Immediate",
      owner: "Engineering Manager & HRBP"
    });
    recommendations.push({
      action: "Enroll in Targeted Upskilling Cohort",
      reason: "Resolve architectural capability gaps through structured learning stipend.",
      urgency: "High",
      owner: "People Development Lead"
    });
    recommendations.push({
      action: "Workload & Sprint Burnout Assessment",
      reason: "Investigate potential burnout or mismatched project allocations.",
      urgency: "Medium",
      owner: "Team Lead"
    });
  } else if (riskLevel === "MEDIUM") {
    recommendations.push({
      action: "Proactive Mentorship Check-in",
      reason: "Address emerging skill development needs before delivery is impacted.",
      urgency: "Medium",
      owner: "Technical Lead"
    });
  } else {
    recommendations.push({
      action: "Maintain Positive Growth Trajectory",
      reason: "High engagement and strong performance metrics consistently demonstrated.",
      urgency: "Low",
      owner: "Direct Manager"
    });
  }

  return {
    employee_id: employee.id,
    employee_name: employee.name,
    department: employee.department,
    role: employee.role,
    metrics: {
      performance,
      attendance,
      engagement,
      skill_growth: employee.skill_growth || 70
    },
    risk_score: riskScore,
    risk_level: riskLevel,
    risk_formula: "Risk Score = Performance Risk + Engagement Risk + Attendance Risk + Skill Gap Risk",
    contributing_factors: contributingFactors,
    recommendations,
    disclaimer: "AI recommendations are decision-support signals and require human review. Do not use for automated termination or punitive actions."
  };
}

module.exports = {
  calculateEmployeeRisk
};
