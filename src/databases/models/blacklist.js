const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  clientID: String,
  users: [String],
  guilds: [String]
});

module.exports = mongoose.model("blacklists", dataSchema);
