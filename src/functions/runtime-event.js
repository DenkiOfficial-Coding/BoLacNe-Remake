const { MessageEmbed } = require("discord.js");
async function runTime(client) {
  client.on("ready", () => {
    setInterval(async () => {
      client.emit("runTime")
    }, 1000);
  })
}
module.exports = runTime;
