const mongoose = require("mongoose");

const ThreatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  dangerLevel: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("threats", ThreatSchema);
