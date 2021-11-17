const handler = require("../../handlers/command");
module.exports = {
  name: "reload",
  description: "reload command",
  owner: true,
  run: async (client, message, args) => {
    await client.commands.clear();
    await client.aliases.clear();
    handler(client);
    message.channel.send(`Successfully reloaded ${client.user.username}`);
  },
};
