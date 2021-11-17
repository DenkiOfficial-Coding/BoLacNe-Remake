const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  userID: String,
  username: String,
  times: Number,
  counts: Number,
  totalCounts: Number,
});

module.exports = mongoose.model("captcha", dataSchema);
