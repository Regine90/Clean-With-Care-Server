const express = require("express");
const router = express.Router();
const CommunityHelper = require("../models/communityHelper");

router.get("/", async (req, res) => {
  try {
    const helpers = await CommunityHelper.find({});
    res.json(helpers); // <-- return raw array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
