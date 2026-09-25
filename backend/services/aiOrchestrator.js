/**
 * WorkforceIQ AI Orchestrator & Reasoning Engine
 * Dispatches domain workflows to specialized agents and synthesizes
 * explainable recommendations for human-in-the-loop HR approval.
 */

const { analyzeCandidateMatch } = require("./recruitmentAI");
const { generateInterviewQuestions, evaluateInterview } = require("./interviewAI");
const { calculateEmployeeRisk } = require("./riskEngine");
const { queryPolicyRAG } = require("./ragService");

async function orchestrate(agentType, payload) {
  const timestamp = new Date().toISOString();

  switch (agentType) {
    case "recruitment": {
      const { candidate, job } = payload;
      const analysis = analyzeCandidateMatch(candidate, job);
      return {
        agent: "RecruitmentAI",
        version: "2.4.0",
        timestamp,
        status: "COMPLETED",
        data: analysis,
        reasoning_summary: `Calculated ${analysis.match_score}% candidate match using formula: ${analysis.score_breakdown.formula}. ${analysis.skill_gaps.length} skill gap(s) identified.`
      };
    }

    case "interview": {
      const { candidate, job, skill_gaps, action, answers } = payload;
      if (action === "evaluate") {
        const evaluation = evaluateInterview(answers);
        return {
          agent: "InterviewAI",
          version: "2.4.0",
          timestamp,
          status: "EVALUATED",
          data: evaluation,
          reasoning_summary: `Synthesized multi-dimensional score (${evaluation.overall_score}%) with structured actionable feedback.`
        };
      } else {
        const questions = generateInterviewQuestions(candidate, job, skill_gaps);
        return {
          agent: "InterviewAI",
          version: "2.4.0",
          timestamp,
          status: "QUESTIONS_GENERATED",
          data: questions,
          reasoning_summary: `Synthesized ${questions.total_questions} role-specific and gap-targeted interview questions.`
        };
      }
    }

    case "employee": {
      const { employee } = payload;
      const riskAnalysis = calculateEmployeeRisk(employee);
      return {
        agent: "EmployeeAI",
        version: "2.4.0",
        timestamp,
        status: "RISK_EVALUATED",
        data: riskAnalysis,
        reasoning_summary: `Computed risk score of ${riskAnalysis.risk_score} (${riskAnalysis.risk_level}) across 4 weighted telemetry dimensions.`
      };
    }

    case "policy": {
      const { question } = payload;
      const ragResult = await queryPolicyRAG(question);
      return {
        agent: "PolicyRAG",
        version: "2.4.0",
        timestamp,
        status: "GROUNDED_RESPONSE_READY",
        data: ragResult,
        reasoning_summary: `Retrieved top policy chunk from ${ragResult.primary_source.document} (${ragResult.primary_source.section}) with ${(ragResult.primary_source.similarity_score * 100).toFixed(1)}% confidence.`
      };
    }

    default:
      throw new Error(`Unsupported agent type in AI Orchestrator: ${agentType}`);
  }
}

module.exports = {
  orchestrate
};
