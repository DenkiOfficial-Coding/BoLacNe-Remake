const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  clientID: String,
  items: [Object],
  emojis:[Object],
  descriptions:[Object],
  names:[Object]
});

module.exports = mongoose.model("items", dataSchema);
