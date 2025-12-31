const express = require("express");
const router = express.Router();   // ✅ THIS WAS MISSING
const Report = require("../models/Report");

// POST: create report
router.post("/", async (req, res) => {
  const { name, location, details } = req.body;

  if (!name || !location || !details) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const report = new Report({ name, location, details });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET: fetch all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
