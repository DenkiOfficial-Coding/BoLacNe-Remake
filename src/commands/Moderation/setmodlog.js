const Discord = module.require("discord.js");
module.exports = {
  name: "setmodlog",
  category: "👨‍💻 Moderation",
  aliases: ['setm', 'smc'],
  description: "Đặt Kênh Nơi Bot Có Thể Cho Bạn Biết LOG BAN,KICK,MUTE!",
  usage: "<PREFIX>setmodlog [channel]",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return client.func.error(client.emoji.x + "** Bạn Không Có Quyền **\`[ADMINISTRATOR]\`",message.channel)
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
    await client.log.setlogchannel(client,message.guild.id, channel.id)
    const embed = new Discord.MessageEmbed()
      .setDescription(client.emoji.tick + ` Đã cài đặt kênh mod log thành ${channel}`)
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setColor(client.config.botcolor)
    message.channel.send({embeds:[embed]})
  }
};
