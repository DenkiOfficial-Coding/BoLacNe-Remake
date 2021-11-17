
const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "rip",
  aliases: ["died", "rip"],
  category: "🖼 IMAGE",
  description: "Hiển thị tạo RIP với hình đại diện của người dùng",
  usage: "<PREFIX>rip [user]",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const Embed = new Discord.MessageEmbed()
      .setColor(client.config.botcolor)
      .setTitle("An Nghỉ")
      .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
      .setImage(
        encodeURI(
          `https://api.devs-hub.xyz/rip?image=${Member.user.displayAvatarURL({
            format: "png",
          })}`
        )
      )
      .setTimestamp();

    return message.channel.send({ embeds: [Embed] });
  },
};