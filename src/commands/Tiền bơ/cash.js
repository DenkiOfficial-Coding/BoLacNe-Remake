const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "cash",
  aliases: ["money", "cash", "money"],
  category: "🥑 TiềnBơ",
  description: "Xem Tiền",
  usage: "<PREFIX>cash",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],

  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let bal = await client.db.fetch(client, user.id);
    if (!user) {
      return client.func.error(`${client.emoji.x} Không tìm thấy người dùng!`,message.channel);
    }
    let moneyEmbed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(
        `**${user.user.username}** đang có **__${client.func.laysodep(bal.money)}__** ${client.emoji.money}`
      )
      .setFooter(`Được yêu cầu bởi ${user.user.tag}`)
      .setTimestamp();
    message.reply({ embeds: [moneyEmbed] });
    client.channels.cache
      .get("886563660628111371")
      .send({ embeds: [moneyEmbed] });
  },
};
