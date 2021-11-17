const { Client, MessageEmbed, Util, Collection } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "🔰 Thông Tin",
  aliases: ["av", "avt"],
  usage: "<PREFIX>avatar",
  description: "Xem avatar ",
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    let embed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setTitle(`${user.user.username}'s avatar`)
      .setImage(
        `${user.user.displayAvatarURL({ dynamic: true })}` + "?size=4096"
      )
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    message.reply({ embeds: [embed] });
  },
};
