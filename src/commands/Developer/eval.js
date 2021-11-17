const { inspect } = require("util");
const { post } = require("../../util/post");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  aliases: [],
  usage: "",
  description: "evallllllll",
  owner: true,
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Type code");
    try {
      const start = process.hrtime();
      let output = eval(args.join(" "));
      const difference = process.hrtime(start);
      if (typeof output !== "string") output = inspect(output, { depth: 2 });
      return message.channel.send(
        `\`\`\`js\n${
          output.length > 1950 ? await post(output) : output
        }\n\`\`\``
      );
    } catch (err) {
      return message.channel.send(`Error:\n\`${err.stack}\``);
    }
  },
};
