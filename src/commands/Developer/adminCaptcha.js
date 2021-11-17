//adminCaptcha
//await client.check.adminCaptcha
const {
  MessageEmbed
} = require("discord.js");
function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}
module.exports = {
  name: "admincaptcha",
  aliases: ["ac", "admincheck"],
  description: "Kiểm tra người dùng",
  usage: "<PREFIX>admincaptcha [mention | ID]",
  owner: true,
  run: async (client, message, args) => {
    try {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || { user: await client.users.fetch(args[0]) }
    if (!member)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )

    let captcha = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(
        `${client.emoji.tick} Đã kiểm tra **${member.user.username}**!`
      );

    message.channel.send({
      embeds: [captcha]
    });

    await client.check.adminCaptcha(client, member.user.id);
    } catch (e) {
      console.log(e.stack)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )
    }
  },
};