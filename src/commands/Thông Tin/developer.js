const { Client, MessageEmbed, Util, Collection } = require("discord.js");

module.exports = {
  name: "developer",
  category: "🔰 Thông Tin",
  aliases: ["dev", "botdev"],
  usage: "<PREFIX>developer",
  description: "Xem thông tin developer",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`
      ${client.emoji.money} Bot được phát triển bởi \`CatCat#4533\` và \`Hoang Le#4122\``)
      .addField(` ${client.emoji.information} Hoang Le`,`<:discord_logo:886543139995799582> Hoang Le#4122\n<:facebook_logo:886543139916099644> [Hoàng Lê](https://www.facebook.com/hoangdeptrai23/)`,true)
      .addField(` ${client.emoji.information} CatCat`,`<:discord_logo:886543139995799582> CatCat#4533\n<:facebook_logo:886543139916099644> [中村愛子](https://www.facebook.com/profile.php?id=100025144504969)`,true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL()
      );
    message.reply({ embeds: [embed] });
  },
};
