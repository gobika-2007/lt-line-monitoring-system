const mongoose = require("mongoose");

const FaultSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  voltage: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fault", FaultSchema);