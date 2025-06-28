const mongoose = require("mongoose");

const communityHelperSchema = new mongoose.Schema({
  firstName: String,
  area: String,
  service: String,
});

module.exports = mongoose.model(
  "CommunityHelper",
  communityHelperSchema,
  "communityHelpers"
);
