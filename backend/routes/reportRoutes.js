const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin"); // ✅ ADMIN middleware

// ================= USER =================

// ✅ POST: create report (LOGGED‑IN USER)
router.post("/", auth, async (req, res) => {
  const { name, location, details } = req.body;

  if (!name || !location || !details) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ❌ prevent multiple submissions
  const existing = await Report.findOne({ userEmail: req.user.email });
  if (existing) {
    return res.status(400).json({ message: "You have already submitted a report" });
  }

  try {
    const report = new Report({
      name,
      location,
      details,
      userEmail: req.user.email,
      status: "Pending"
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// ================= ADMIN =================

// ✅ GET: fetch all reports (ADMIN ONLY)
router.get("/", auth, admin, async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ PUT: update report status (ADMIN ONLY)
router.put("/:id/status", auth, admin, async (req, res) => {
  const { status } = req.body;

  try {
    await Report.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ GET: logged-in user's own report
router.get("/my", auth, async (req, res) => {
  try {
    const reports = await Report.find({ userEmail: req.user.email });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
