const express = require("express");
const router = express.Router();
const Fault = require("../models/Fault");

// =============================
// Add a New Fault
// =============================
router.post("/", async (req, res) => {
  try {
    console.log("Received Fault:", req.body);

    const fault = new Fault({
      location: req.body.location,
      voltage: req.body.voltage,
      current: req.body.current,
      status: req.body.status,
    });

    const savedFault = await fault.save();

    console.log("Saved Successfully:", savedFault);

    res.status(201).json(savedFault);
  } catch (error) {
    console.error("Error Saving Fault:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// Get All Faults
// =============================
router.get("/", async (req, res) => {
  try {
    const faults = await Fault.find().sort({ timestamp: -1 });

    res.status(200).json(faults);
  } catch (error) {
    console.error("Error Fetching Faults:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// Get Single Fault
// =============================
router.get("/:id", async (req, res) => {
  try {
    const fault = await Fault.findById(req.params.id);

    if (!fault) {
      return res.status(404).json({
        message: "Fault not found",
      });
    }

    res.json(fault);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =============================
// Delete Fault
// =============================
router.delete("/:id", async (req, res) => {
  try {
    await Fault.findByIdAndDelete(req.params.id);

    res.json({
      message: "Fault deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;



// Delete Fault
router.delete("/:id", async (req, res) => {
  try {
    const deletedFault = await Fault.findByIdAndDelete(req.params.id);

    if (!deletedFault) {
      return res.status(404).json({
        message: "Fault not found",
      });
    }

    res.json({
      message: "Fault deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});