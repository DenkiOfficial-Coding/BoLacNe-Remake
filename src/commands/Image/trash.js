const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "trash",
  aliases: ["trash"],
  category: "🖼 IMAGE",
  description: "rác",
  usage: "<PREFIX>trash [user]",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const Embed = new Discord.MessageEmbed()
      .setColor(client.config.botcolor)
      .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
      .setTitle("Trash")
      .setImage(
        encodeURI(
          `https://api.devs-hub.xyz/trash?image=${Member.user.displayAvatarURL({
            format: "png",
          })}`
        )
      )
      .setTimestamp();

    return message.channel.send({ embeds: [Embed] });
  },
};
