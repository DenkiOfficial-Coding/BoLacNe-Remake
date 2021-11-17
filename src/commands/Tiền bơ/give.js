const {
  MessageEmbed
} = require("discord.js");

function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}
module.exports = {
  name: "give",
  noalias: ["send"],
  category: "🥑 TiềnBơ",
  description: "Gửi Tiền",
  usage: "<PREFIX>give [mention | ID] <amount>",
  run: async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const moneydata = await client.db.fetch(client, message.author.id);
    if (!member)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )
    if (member.user.bot) {
      return client.func.error(
        `${client.emoji.x} Bạn không thể give tiền cho bot!`,
        message.channel
      );
    }
    let amount = args[1]
    if (!amount) return client.func.error(
      `${client.emoji.x} Số tiền không hợp lệ!`,
      message.channel
    )
    if (amount && amount.toString().includes("k") || amount.toString().includes("m")) {
      amount = client.func.getTien(amount)
    }
    if (!amount || isNaN(amount) || parseInt(amount) < 0) {
      return client.func.error(
        `${client.emoji.x} Số bơ không hợp lệ!`,
        message.channel
      );
    }

    if (moneydata.money < amount) {
      return client.func.error(
        `${client.emoji.x} Bạn Không Có Nhiều Bơ Đến Thế!`,
        message.channel
      );
    }
    let embed2 = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(
        `${client.emoji.tick} **${message.author.username}** đã gửi **__${laysodep(parseInt(amount))}__** ${client.emoji.money} cho **${member.user.username}**`
      );

    if (member.user.id === message.author.id) {
      return message.reply({
        embeds: [embed2]
      });
    }

    let moneyEmbed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(
        `${client.emoji.tick} **${message.author.username}** đã gửi **__${laysodep(parseInt(amount))}__** ${client.emoji.money} cho **${member.user.username}**`
      )
      .setTimestamp()
      .setFooter(`${message.guild.name}`);
    message.reply({
      embeds: [moneyEmbed]
    });
    client.channels.cache
      .get("890094539384184862")
      .send({
        embeds: [moneyEmbed]
      });
    await client.db.addmoney(client, member.user.id, parseInt(amount));
    await client.db.submoney(client, message.author.id, parseInt(amount));
  },
};