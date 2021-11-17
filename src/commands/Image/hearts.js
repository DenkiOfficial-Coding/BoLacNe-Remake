
const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "hearts",
  aliases: ["hearts"],
  category: "🖼 IMAGE",
  description: "Shows hearts in img",
  usage: "<PREFIX>hearts [user]",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const Embed = new Discord.MessageEmbed()
      .setColor(client.config.botcolor)
      .setTitle("Hearts")
      .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
      .setImage(
        encodeURI(
          `https://api.devs-hub.xyz/hearts?image=${Member.user.displayAvatarURL(
            { format: "png" }
          )}`
        )
      )
      .setTimestamp();

    return message.channel.send({embeds:[Embed]});
  },
};
