const express = require("express");
const router = express.Router();
const CommunityHelper = require("../models/communityHelper");

router.get("/", async (req, res) => {
  try {
    const helpers = await CommunityHelper.find();
    res.json(helpers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
