import axios from "axios";

const API_BASE = (import.meta as any).env?.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dashboardApi = {
  getMetrics: () => api.get("/dashboard").then((r) => r.data.data),
};

export const recruitmentApi = {
  getJobs: () => api.get("/recruitment/jobs").then((r) => r.data.data),
  getJobById: (id: number | string) => api.get(`/recruitment/jobs/${id}`).then((r) => r.data.data),
  getCandidates: () => api.get("/recruitment/candidates").then((r) => r.data.data),
  getCandidateById: (id: number | string) => api.get(`/recruitment/candidates/${id}`).then((r) => r.data.data),
  uploadResume: (formData: FormData) =>
    api.post("/recruitment/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
  analyzeCandidate: (data: { candidate_id?: number; job_id?: number; candidate?: any; job?: any }) =>
    api.post("/recruitment/analyze", data).then((r) => r.data),
};

export const interviewApi = {
  generateQuestions: (data: { candidate_id?: number; job_id?: number; candidate?: any; job?: any; skill_gaps?: any[] }) =>
    api.post("/interview/generate", data).then((r) => r.data),
  evaluateInterview: (data: { candidate_id?: number; answers?: any }) =>
    api.post("/interview/evaluate", data).then((r) => r.data),
};

export const employeesApi = {
  getEmployees: (params?: { search?: string; department?: string; risk_level?: string }) =>
    api.get("/employees", { params }).then((r) => r.data.data),
  getEmployeeById: (id: number | string) => api.get(`/employees/${id}`).then((r) => r.data.data),
  analyzeRisk: (id: number | string) => api.post(`/employees/${id}/analyze`).then((r) => r.data),
};

export const policyApi = {
  getDocuments: () => api.get("/policy/documents").then((r) => r.data.data),
  queryPolicy: (question: string) => api.post("/policy/query", { question }).then((r) => r.data),
  uploadPolicy: (formData: FormData) =>
    api.post("/policy/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
};

export const recommendationsApi = {
  getAll: (params?: { status?: string; target_type?: string }) =>
    api.get("/recommendations", { params }).then((r) => r.data.data),
  create: (data: any) => api.post("/recommendations", data).then((r) => r.data.data),
  approve: (id: number, notes?: string, reviewer?: string) =>
    api.post(`/recommendations/${id}/approve`, { notes, reviewer }).then((r) => r.data),
  reject: (id: number, notes?: string, reviewer?: string) =>
    api.post(`/recommendations/${id}/reject`, { notes, reviewer }).then((r) => r.data),
  review: (id: number, notes?: string, reviewer?: string, status?: string) =>
    api.post(`/recommendations/${id}/review`, { notes, reviewer, status }).then((r) => r.data),
};

export const onboardingApi = {
  getPlans: () => api.get("/onboarding").then((r) => r.data.data),
  updateStep: (id: number, week: number, completed: boolean) =>
    api.post(`/onboarding/${id}/step`, { week, completed }).then((r) => r.data),
};
