// const express = require("express");
// const router = express.Router();
// const Report = require("../models/Report");

// router.post("/", async (req, res) => {
//   try {
//     await Report.create(req.body);
//     res.status(201).json({ message: "Report saved" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get("/", async (req, res) => {
//   console.log("hello");
  
//     const reports = await Report.find();
//   res.json(reports);
// });

// module.exports = router;
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
