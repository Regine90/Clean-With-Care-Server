const express = require("express");
const router = express.Router();
const CommunityHelper = require("../models/communityHelper");

// Your updated route
router.get("/", async (req, res) => {
  try {
    const helpers = await CommunityHelper.find({});
    res.json({ data: helpers }); // wrapped in { data: ... }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
