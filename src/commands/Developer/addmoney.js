const {
  MessageEmbed
} = require("discord.js");

function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}
module.exports = {
  name: "addmoney",
  aliases: ["am", "ap", "ag"],
  description: "Gửi Tiền",
  usage: "<PREFIX>give [mention | ID] <amount>",
  owner: true,
  run: async (client, message, args) => {
    try {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || { user: await client.users.fetch(args[0]) }
      if (!member)
        return client.func.error(
          `${client.emoji.x} Người dùng không hợp lệ!`,
          message.channel
        )
      let amount = args[1]
      if(!amount) return client.func.error(
          `${client.emoji.x} Số tiền không hợp lệ!`,
          message.channel
        )
      if (amount && amount.toString().includes("k") || amount.toString().includes("m")) {
        amount = client.func.getTien(amount)
      }

      console.log(amount)
      let moneyEmbed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setDescription(
          `${client.emoji.tick} **${message.author.username}** đã gửi **__${laysodep(parseInt(amount))}__** ${client.emoji.money} cho **${member.user.username}** (give cmd)`
        )
        .setTimestamp()
        .setFooter(`${message.guild.name}`);
      message.channel.send({
        embeds: [moneyEmbed]
      });
      client.channels.cache
        .get("896722088541450271")
        .send({
          embeds: [moneyEmbed]
        });

      await client.db.addmoney(client, member.user.id, parseInt(amount));
    } catch (e) {
      console.log(e.stack)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )
    }
  },
};