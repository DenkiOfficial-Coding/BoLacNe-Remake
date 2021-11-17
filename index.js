const { Util, Collection, MessageEmbed, Structures } = require("discord.js");
const Client = require("./src/structures/Client");
const client = new Client();
const config = require("./src/assets/json/config.json");

["command", "event", "functions"].forEach((handler) => {
  require(`./src/handlers/${handler}`)(client);
});
process.on('unhandledRejection', (reason, p) => {
  console.error(reason.stack);
})

client.start(config.TOKEN);
|