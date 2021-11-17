const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  guildId:String,
  guildName: String,
  logchannel:String,
  ticketchannel:String,
  muterole:String,
  disable:Boolean
});

module.exports = mongoose.model("auditlogs", dataSchema);
