const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: String,
  location: String,
  details: String,
  status: { type: String, default: "Pending" },
  userEmail: String
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
