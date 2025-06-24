const mongoose = require("mongoose");

const communityHelperSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  area: String,
  service: String,
});

module.exports = mongoose.model(
  "CommunityHelper",
  communityHelperSchema,
  "communityHelpers"
);
// <-- 3rd argument manually tells mongoose the exact collection name!
