const mongoose = require("mongoose");

const communityHelperSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    area: { type: String, required: true },
    service: { type: String, required: true },
  },
  { _id: false }
);

module.exports = mongoose.model(
  "CommunityHelper",
  communityHelperSchema,
  "communityHelpers"
);
