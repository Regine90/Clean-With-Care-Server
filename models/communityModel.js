const mongoose = require("mongoose");

const { Schema } = mongoose;

const communitySchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  service: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
