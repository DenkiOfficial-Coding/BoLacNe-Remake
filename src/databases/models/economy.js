const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  userID: String,
  username: String,
  money: Number,
  inv: [Object],
  lb: String,
  daily:Number,
  weekly:Number,
  giaobo:Number,
});

module.exports = mongoose.model("economys", dataSchema);
