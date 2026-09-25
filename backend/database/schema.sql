-- WorkforceIQ PostgreSQL Schema
-- Includes pgvector extension definition and core tables

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50),
    job_id INTEGER,
    job_title VARCHAR(150),
    resume_text TEXT,
    skills JSONB,
    experience NUMERIC,
    match_score NUMERIC,
    score_breakdown JSONB,
    strengths JSONB,
    skill_gaps JSONB,
    status VARCHAR(50) DEFAULT 'Screened',
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    description TEXT,
    required_skills JSONB,
    min_experience NUMERIC,
    openings INTEGER DEFAULT 1,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    department VARCHAR(100),
    role VARCHAR(150),
    tenure_months INTEGER,
    skills JSONB,
    performance NUMERIC,
    attendance NUMERIC,
    engagement NUMERIC,
    skill_growth NUMERIC,
    risk_score NUMERIC,
    risk_level VARCHAR(50),
    risk_factors JSONB,
    recommendations JSONB,
    history JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Policies Table with Vector Embeddings
CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    source VARCHAR(300),
    content TEXT,
    page_number INTEGER,
    chunk_index INTEGER,
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Recommendations Table (Human-in-the-Loop)
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    target_type VARCHAR(50), -- 'candidate' or 'employee'
    target_id INTEGER,
    target_name VARCHAR(150),
    candidate_score NUMERIC,
    recommendation_type VARCHAR(100),
    finding TEXT,
    reason TEXT,
    action TEXT,
    status VARCHAR(50) DEFAULT 'Pending HR Review', -- 'Pending HR Review', 'Approved', 'Rejected'
    review_notes TEXT,
    reviewed_by VARCHAR(100),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Onboarding Plans Table
CREATE TABLE IF NOT EXISTS onboarding_plans (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    employee_name VARCHAR(150),
    role VARCHAR(150),
    start_date DATE,
    detected_skill_gaps JSONB,
    overall_progress INTEGER DEFAULT 0,
    learning_path JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
