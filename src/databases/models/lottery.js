const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  clientID: String,
  money: Number,
  datas: [Object],
  winners: [Object]
});

module.exports = mongoose.model("lotery", dataSchema);
