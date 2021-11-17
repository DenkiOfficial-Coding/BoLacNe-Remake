const {
  MessageEmbed
} = require("discord.js");

function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}
module.exports = {
  name: "transfer",
  aliases: ["tf", "chuyentien"],
  description: "Gửi Tiền",
  usage: "<PREFIX>give [mention | ID] <amount>",
  owner: true,
  run: async (client, message, args) => {
    try {
      let member1 = { user: await client.users.fetch(args[0]) }
      let member2 = { user: await client.users.fetch(args[1]) }

      if (!member1 || !member2)
        return client.func.error(
          `${client.emoji.x} Người dùng không hợp lệ!`,
          message.channel
        )
      let amount = args[2]
      if (amount && amount.toString().includes("k") || amount.toString().includes("m")) {
        amount = client.func.getTien(amount)
      }
      let rbal1 = await client.db.fetch(client, member1.user.id);
      let bal1 = rbal1.money
      if(bal1 < amount) return client.func.error(
          `${client.emoji.x} **${member1.user.username}** Không đủ tiền!`,
          message.channel
        )
      console.log(amount)
      let moneyEmbed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setDescription(
          `${client.emoji.tick} Đã chuyển **__${laysodep(parseInt(amount))}__**${client.emoji.money} từ **${member1.user.username}** sang cho **${member2.user.username}** (transfer)`
        )
        .setTimestamp()
        .setFooter(`${message.guild.name}`);
      message.channel.send({
        embeds: [moneyEmbed]
      });
      client.channels.cache
        .get("886563660628111371")
        .send({
          embeds: [moneyEmbed]
        });
      await client.db.addmoney(client, member2.user.id, parseInt(amount));
      await client.db.submoney(client, member1.user.id, parseInt(amount));
    } catch (e) {
      console.log(e.stack)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )
    }
  },
};