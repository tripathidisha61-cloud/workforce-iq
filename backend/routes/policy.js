const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { orchestrate } = require("../services/aiOrchestrator");
const { getIndexedDocuments, buildVectorIndex } = require("../services/ragService");

const policiesUploadDir = path.join(__dirname, "../../data/policies");
const upload = multer({ dest: policiesUploadDir });

// GET List of Indexed Policy Documents
router.get("/documents", async (req, res) => {
  try {
    const docs = getIndexedDocuments();
    res.json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Query Policy RAG
router.post("/query", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || question.trim() === "") {
      return res.status(400).json({ success: false, message: "A question query is required." });
    }

    const orchestrationResult = await orchestrate("policy", { question });

    res.json({
      success: true,
      orchestration: orchestrationResult
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Upload Additional Policy Document
router.post("/upload", upload.single("policy_pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No PDF file provided." });
    }

    // Rebuild index to include updates
    buildVectorIndex();

    res.json({
      success: true,
      message: `Document ${req.file.originalname} uploaded and re-indexed into pgvector knowledge base.`,
      file_name: req.file.originalname
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
