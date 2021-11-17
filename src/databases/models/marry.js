const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  clientID: String,
  couples: [Object]
});

module.exports = mongoose.model("marry", dataSchema);
