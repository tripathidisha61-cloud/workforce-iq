const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const pdfParse = require("pdf-parse");

const DATA_DIR = path.join(__dirname, "../../data");
const POLICIES_DIR = path.join(DATA_DIR, "policies");
const RESUMES_DIR = path.join(DATA_DIR, "resumes");

if (!fs.existsSync(POLICIES_DIR)) fs.mkdirSync(POLICIES_DIR, { recursive: true });
if (!fs.existsSync(RESUMES_DIR)) fs.mkdirSync(RESUMES_DIR, { recursive: true });

function createPdfFile(filePath, pagesData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    pagesData.forEach((page, index) => {
      if (index > 0) doc.addPage();

      doc.fontSize(20).fillColor("#1e1b4b").text(page.title, { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor("#64748b").text(`Section: ${page.section || "General"} | Page ${index + 1} of ${pagesData.length}`);
      doc.moveDown(1);

      doc.fontSize(12).fillColor("#334155").text(page.content, {
        align: "justify",
        lineGap: 4
      });
    });

    doc.end();
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

async function generateAll() {
  console.log("Generating realistic enterprise HR policy PDFs...");

  // 1. Leave Policy
  await createPdfFile(path.join(POLICIES_DIR, "leave_policy.pdf"), [
    {
      title: "WorkforceIQ Global Leave Policy - Overview & Entitlements",
      section: "Section 1: Annual Leave & Eligibility",
      content: "All full-time employees are entitled to 24 days of paid Annual Leave per calendar year, accrued at the rate of 2 days per completed month of service. A maximum of 10 unused leave days may be carried forward into the subsequent calendar year. Any remaining balance beyond 10 days will lapse on March 31 unless granted exceptional approval by the Department VP and HR Director."
    },
    {
      title: "WorkforceIQ Global Leave Policy - Parental & Maternity Leave",
      section: "Section 2: Maternity & Paternity Provisions",
      content: "According to the company policy, employees meeting the stated eligibility requirements can avail maternity leave of 26 consecutive weeks of fully paid leave for the birth of up to two surviving children. For parents expecting their third child or beyond, 12 weeks of fully paid maternity leave is provided. Expectant mothers may commence maternity leave up to 8 weeks prior to the expected delivery date. Furthermore, partners and secondary caregivers are entitled to 4 weeks of fully paid Paternity / Partner Leave within the first 12 months following birth or legal adoption."
    },
    {
      title: "WorkforceIQ Global Leave Policy - Sick Leave & Wellness",
      section: "Section 3: Medical Leave & Compensatory Off",
      content: "Employees are granted 10 paid Medical/Sick days annually. Medical certificates are required for consecutive sick leaves exceeding 3 business days. Employees required to work during designated company holidays or weekend deployment maintenance windows are entitled to Compensatory Off (Comp-off), valid for utilization within 60 days of the qualifying event upon manager authorization."
    }
  ]);

  // 2. Remote Work Policy
  await createPdfFile(path.join(POLICIES_DIR, "remote_work_policy.pdf"), [
    {
      title: "WorkforceIQ Remote & Hybrid Work Guidelines",
      section: "Section 1: Hybrid Operating Model",
      content: "Employees may work remotely under the conditions specified in the policy. WorkforceIQ operates under an agile hybrid model: employees are requested to collaborate in-person at designated regional tech hubs 3 days per week, with up to 2 days per week eligible for remote work. Core collaboration hours are established between 10:00 AM and 4:00 PM local time to ensure synchronous architectural standups and customer alignments."
    },
    {
      title: "WorkforceIQ Remote & Hybrid Work Guidelines",
      section: "Section 2: Home Office Ergonomics & Equipment Allowance",
      content: "To support effective remote operations, all regular full-time team members are eligible for a one-time Home Office Ergonomics Reimbursement of up to $500 (or local currency equivalent). Qualifying expenses include ergonomic desk chairs, external monitors, laptop docking stations, and noise-canceling headsets. In addition, an internet connectivity stipend of $50 per month is credited via monthly payroll upon submission of active broadband invoices."
    },
    {
      title: "WorkforceIQ Remote & Hybrid Work Guidelines",
      section: "Section 3: International Remote Work & Security",
      content: "Working remotely from outside the employee's country of employment is permitted for up to 30 cumulative business days per calendar year, subject to VP approval, zero-trust VPN compliance, and export control regulations. Employees handling sensitive customer personal data or proprietary AI weights must adhere to hardware-encrypted secure laptops and multi-factor biometric authentication at all times."
    }
  ]);

  // 3. Employee Conduct & Ethics Policy
  await createPdfFile(path.join(POLICIES_DIR, "employee_conduct_policy.pdf"), [
    {
      title: "WorkforceIQ Code of Business Conduct & Ethics",
      section: "Section 1: Mutual Respect & Non-Discrimination",
      content: "WorkforceIQ enforces zero tolerance for harassment, discrimination, or retaliation based on gender, race, age, religion, disability, or sexual orientation. All personnel must complete annual Anti-Harassment and POSH compliance training within 30 days of joining. Violations trigger prompt independent investigation by People Operations and the Ethics Committee."
    },
    {
      title: "WorkforceIQ Code of Business Conduct & Ethics",
      section: "Section 2: Confidentiality, AI Ethics & IP Ownership",
      content: "All intellectual property, proprietary algorithms, client datasets, and internal ML weights developed during employment remain the sole property of WorkforceIQ. Employees must not input confidential company source code or customer PII into unvetted public third-party generative AI services. Whistleblower disclosures regarding safety, financial irregularities, or unethical AI practices are strictly protected with total anonymity."
    }
  ]);

  // 4. Performance Review Policy
  await createPdfFile(path.join(POLICIES_DIR, "performance_review_policy.pdf"), [
    {
      title: "WorkforceIQ Performance Evaluation & Growth Framework",
      section: "Section 1: Bi-Annual Appraisal Cycle",
      content: "Performance evaluations occur bi-annually: the Mid-Year Review cycle in June and the Annual Review cycle in December. Appraisals leverage 360-degree feedback combining peer assessments, direct manager sprint impact evaluations, and cross-functional project deliverables. Key metrics include Technical Delivery, Collaboration, Mentorship, and Alignment with OKRs."
    },
    {
      title: "WorkforceIQ Performance Evaluation & Growth Framework",
      section: "Section 2: Performance Improvement Framework (PIP)",
      content: "When sustained delivery drops below 65% for two consecutive sprint cycles, managers must initiate a structured 60-day Performance Improvement Plan (PIP) in collaboration with HRBP. The PIP outlines clear weekly milestones, dedicated mentorship pairings, and weekly progress check-ins. If performance fails to reach benchmark thresholds upon conclusion, HR will evaluate role reassignment or separation with statutory severance."
    }
  ]);

  // 5. Training and Upskilling Policy
  await createPdfFile(path.join(POLICIES_DIR, "training_policy.pdf"), [
    {
      title: "WorkforceIQ Learning & Continuous Upskilling Policy",
      section: "Section 1: Annual Learning Stipend",
      content: "Every full-time employee is allotted an Annual Learning Stipend of $1,500 (or regional equivalent) to support continuous professional development. Qualifying expenditures encompass industry certifications (e.g. AWS Certified Solutions Architect, CKA Kubernetes Administrator), academic conferences, technical masterclasses, and specialized books."
    },
    {
      title: "WorkforceIQ Learning & Continuous Upskilling Policy",
      section: "Section 2: Internal Hackathons & Upskilling Sprints",
      content: "The company sponsors quarterly AI Hackathons and allocates 10% dedicated innovation time (half day every alternate Friday) for engineers and designers to explore emergent technologies, open-source contributions, and internal tool development. Employees transitioning into newly established roles (such as AI Systems or Cloud DevOps) receive dedicated 4-week internal upskilling cohorts."
    }
  ]);

  // Generate Sample Resume: Priya Sharma (The Demo Hero Candidate)
  await createPdfFile(path.join(RESUMES_DIR, "Priya_Sharma.pdf"), [
    {
      title: "PRIYA SHARMA - BACKEND DEVELOPER",
      section: "Curriculum Vitae",
      content: "Email: priya.sharma@example.com | Phone: +91 98765 43210 | Bengaluru, India\n\nPROFESSIONAL SUMMARY:\nDedicated Backend Developer with 2.5 years of industry experience specializing in high-concurrency RESTful APIs, microservices containerization, and relational database management. Passionate about scalable distributed systems and clean architecture.\n\nTECHNICAL SKILLS:\n• Languages & Frameworks: Python (Advanced), FastAPI (Advanced), Flask, SQL\n• Databases: PostgreSQL (Query tuning, indexing, schema migrations), Redis\n• Containerization & DevOps: Docker, Docker Compose, Git, CI/CD GitHub Actions\n• Cloud Infrastructure: AWS (Basic EC2, S3 bucket storage, IAM user management)\n\nWORK EXPERIENCE:\nJunior Backend Engineer — TechNova Solutions (June 2024 - Present)\n• Designed and maintained 15+ FastAPI endpoints serving 50,000+ daily active users.\n• Migrated legacy monolithic services to containerized Docker microservices, reducing deployment downtime by 35%.\n• Optimized PostgreSQL relational queries and added indexes, lowering average p95 API response times from 420ms to 110ms.\n• Assisted lead DevOps engineers with basic AWS EC2 hosting and automated GitHub Actions builds.\n\nEDUCATION:\nBachelor of Technology (B.Tech) in Computer Science and Engineering\nNational Institute of Technology — GPA: 8.7 / 10.0 (Graduated 2024)"
    }
  ]);

  console.log("All sample policy PDFs and candidate resume generated successfully.");

  // Test verify parsing
  const testParse = await pdfParse(fs.readFileSync(path.join(RESUMES_DIR, "Priya_Sharma.pdf")));
  console.log("Verified Priya_Sharma.pdf parsing:");
  console.log("Extracted text length:", testParse.text.length, "bytes | Pages:", testParse.numpages);
}

generateAll().catch(err => {
  console.error("PDF generation error:", err);
});
