# WorkforceIQ — Autonomous HR Intelligence & Multi-Agent Orchestrator

WorkforceIQ is an AI-driven enterprise HR Decision-Support Platform that unifies candidate resumes, job requisitions, employee performance/engagement telemetry, and company HR policy PDFs through an **AI Orchestrator**, **Reasoning Engine**, **Explainable Insights**, and **Human-in-the-Loop HR Approval**.

---

## Architecture Overview

```
                         ┌──────────────────────┐
                         │      WORKFORCEIQ     │
                         │     React + TS       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Node / Express    │
                         │      REST APIs       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   AI ORCHESTRATOR    │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │ Recruitment │       │  Interview  │       │  Policy RAG │
      │    Agent    │       │    Agent    │       │    Agent    │
      └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
             │                     │                     │
             └─────────────────────┼─────────────────────┘
                                   ▼
                         ┌──────────────────────┐
                         │  REASONING ENGINE    │
                         │                      │
                         │ Skill Gaps           │
                         │ Risk Detection       │
                         │ Recommendations      │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  ▼                 ▼                 ▼
           PostgreSQL          pgvector             LLM
                  │                 │                 │
                  └─────────────────┼─────────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │ EXPLAINABLE INSIGHT  │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │    HR APPROVAL       │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │      HR ACTION       │
                         └──────────────────────┘
```

---

## Core Modules & End-to-End Demo Walkthrough

1. **HR Intelligence Dashboard (`/`)**:
   - Real-time KPIs: **124 Candidates**, **38 Employees**, **12 High-Risk Signals**, **7 Open Jobs**.
   - **AI Workforce Insights**: Alerts for high-risk signals (`Rahul Verma`), skill gaps (`14 employees`), and strong candidate matches (`Priya Sharma - 87%`).
   - Interactive Recharts visualizations: **Hiring Pipeline Funnel** & **Workforce Health Radar**.

2. **Recruitment AI (`/recruitment` & `/recruitment/candidate/1`)**:
   - Upload PDF resumes (or test with sample `Priya_Sharma.pdf`) and match against open requisitions (`Backend Developer`).
   - **Transparent Match Formula**: `0.50 × Skill Match (90%) + 0.30 × Semantic Match (84%) + 0.20 × Experience Match (85%) = 87.2%`.
   - Detailed skill tags (`Python ✓ Strong`, `FastAPI ✓ Strong`, `PostgreSQL ✓ Strong`, `Docker ✓ Good`, `AWS ⚠ Basic`) and **Skill Gap Detection** (`AWS Deployment`).

3. **Adaptive Interview Agent (`/interview`)**:
   - Dynamically generates tailored questions targeting the candidate's background and detected skill gaps (`FastAPI scaling`, `Docker multi-stage builds`, `PostgreSQL query plans`, `AWS ECS deployment`).
   - Real-time **Interview Evaluation Simulator** calculating Technical, Communication, and Problem Solving ratings with structured AI feedback.

4. **Employee Intelligence & Risk Engine (`/employees` & `/employees/1`)**:
   - Tracks internal employees (`Rahul Verma`, `Aarav Singh`, `Neha Sharma`, `Riya Gupta`).
   - **Transparent Risk Formula**: Evaluates Engagement (`54%`), Attendance (`72%`), Performance (`76%`), and Skill Growth (`61%`) to flag **HIGH RISK** with contributing factors and non-punitive upskilling/career discussion recommendations.

5. **Policy AI RAG (`/policy`)**:
   - Retrieval-Augmented Generation grounded on 5 HR policy PDFs (`leave_policy.pdf`, `remote_work_policy.pdf`, `employee_conduct_policy.pdf`, `performance_review_policy.pdf`, `training_policy.pdf`).
   - Returns accurate answers with **Source Citations** (Document Name, Section, Page Number) and an interactive **Source Document Chunk Viewer**.

6. **Human-in-the-Loop HR Approval (`/recommendations`)**:
   - Central approval queue where HR leaders can **Approve**, **Reject**, or **Review with Audit Notes** any AI recommendation.
   - Enforces **Responsible AI Safeguards**: AI provides decision-support signals only; humans hold final decision authority.

7. **Adaptive Onboarding (`/onboarding`)**:
   - Personalized 4-week learning paths (`Docker` → `AWS Fundamentals` → `Deployment` → `Kubernetes`) automatically tailored to bridge detected skill gaps (`Aarav Singh - 60% progress`).

---

## Running the Project

### 1. Start the Backend Server (Port 5000)
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend Application (Port 3000)
```bash
cd frontend
npm install
npm run dev
```
