const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "slap",
  aliases: ["batmanslap", "aslp"],
  category: "🖼 IMAGE",
  description: "TÁT!",
  usage: "<PREFIX>slap [Mention hoặc ID | Text]",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Member)
      return message.channel.send(
        "<:recluse3:827723090125258812> Hãy Mentions Hoặc Cho Tôi ID!"
      );

    const Other = args.slice(1).join(" ") || "Tao Không Bê ĐÊ";
    if (Other.length > 50)
      return message.channel.send(
        "<:recluse10:827723702727606333> Đã đạt đến giới hạn ký tự - 50 !"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(client.config.botcolor)
      .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
      .setImage(
        encodeURI(
          `https://vacefron.nl/api/batmanslap?text1=bruh&text2=${Other}&batman=${message.author.avatarURL(
            { format: "png" }
          )}&robin=${Member.user.displayAvatarURL({ format: "png" })}`
        )
      )
      .setTimestamp();

    return message.channel.send({ embeds: [Embed] });
  },
};