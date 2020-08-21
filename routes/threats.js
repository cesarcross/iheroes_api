const express = require("express");
const router = express.Router();
const Threat = require("../models/Threat");

// getting all
router.get("/", async (req, res) => {
  try {
    const threats = await Threat.find();
    res.json(threats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one
router.get("/:id", getThreat, (req, res) => {
  res.send(res.threat);
});

// creating one
router.post("/", async (req, res) => {
  const threat = new Threat({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    dangerLevel: req.body.dangerLevel,
  });

  try {
    const newThreat = await threat.save();
    res.status(201).json(newThreat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one
// router.patch("/", getThreat, async (req, res) => {
//   if (req.body.name != null) {
//     res.threat.name = req.body.name;
//   }
//   if (req.body.imageUrl != null) {
//     res.threat.imageUrl = req.body.imageUrl;
//   }
//   if (req.body.dangerLevel != null) {
//     res.threat.dangerLevel = req.body.dangerLevel;
//   }

//   try {
//     const updatedThreat = await res.threat.save();
//     res.json(updatedThreat);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// deleting one
router.delete("/:id", getThreat, async (req, res) => {
  try {
    await res.threat.remove();
    res.json({ message: "Threat terminated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getThreat(req, res, next) {
  let threat;
  try {
    threat = await Threat.findById(req.params.id);
    if (threat == null) {
      return res.status(404).json({ message: "Threat not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.threat = threat;
  next();
}

module.exports = router;
