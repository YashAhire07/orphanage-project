const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: String,
  location: String,
  details: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
