const Discord = module.require("discord.js");
module.exports = {
  name: "unlock",
  category: "👨‍💻 Moderation",
  description: "unLock Channel",
  usage: "<PREFIX>unlock",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) {
      return messclient.func.error(client.emoji.x + "** Bạn không có quyền để làm điều này!", message.channel)
    }
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
    channel.permissionOverwrites.edit(message.guild.roles.everyone, { 'SEND_MESSAGES': true })
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Update")
      .setDescription(`🔓 Đã mở khóa kênh ${message.channel}`)
      .setTimestamp()
      .setColor(client.config.botcolor)
    message.channel.send({embeds:[embed]})
  }
}