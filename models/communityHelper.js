const mongoose = require("mongoose");

const communityHelperSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  area: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("CommunityHelper", communityHelperSchema);
