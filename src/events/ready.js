const chalk = require("chalk");
const random = require("random-number-csprng");
module.exports = (client) => {
  let botStatus = [`ahelp`,
  `${client.func.laysodep(client.guilds.cache.reduce((c, g) => c + g.memberCount, 0))} Users | ${client.func.laysodep(client.guilds.cache.size)} Servers`];
  setInterval(function () {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, { type: "WATCHING" });
  }, 5000);
  client.user.setStatus("online"); 
  console.log(
    chalk.hex("#E5C3FF")(
      `${client.user.tag} has started, with ${client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} users, in ${client.channels.cache.size} channels of ${
        client.guilds.cache.size
      } guilds.`
    )
  );
};
