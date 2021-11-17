const Discord = require('discord.js');
module.exports = {
  name: "report",
  aliases: ['rp'],
  description: "Báo cáo người dùng scam",
  category: "🔰 Thông Tin",
  cooldown: 5,
  usage: "<PREFIX>rp [user] [nội dung]",
  run: async (client, message, args) => {
    let feedbackchannel = message.client.channels.cache.get("890109805455376396");
    if(!args[0]) return client.func.error(`${client.emoji.x} **Vui lòng nhập id người dùng**`, message.channel)
    let member = await client.users.fetch(args[0].replace(/(<@!|<@|>)/g,""))
    if(!member) return client.func.error(`${client.emoji.x} **Không tìm thấy người dùng!**`, message.channel) 
    let content = message.content.split(" ").slice(2).join(" ");
    if (content.length > 1024) return client.func.error(`${client.emoji.x} **Oah! dài thật đấy nhưng tối đa chỉ được 1024 chữ thôii**`, message.channel)
    const error = new Discord.MessageEmbed()
      .setDescription('**' + client.emoji.x + ' Hãy viết gì đó hoặc đính kèm hình ảnh!**')
      .setColor('RED')
    if (!content) return message.channel.send({ embeds: [error] });
    let embed = new Discord.MessageEmbed()
      .setAuthor('Báo cáo mới', message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL())
      .addField("Từ:", `${message.author.username} \nID: ${message.author.id}`, true)
      .addField("Tố cáo",`${member.username} (${member.id})`)
      .addField("Server:", `${message.guild.name} \nID: ${message.guild.id}`, true)
      .addField(`Nội dung:`, `${content}`)
      .setColor(client.config.botcolor)
      .setTimestamp()
    if (message.attachments.size) {
      embed.setImage(message.attachments.first().url)
    }

    await feedbackchannel.send({ embeds: [embed] })
    const done = new Discord.MessageEmbed()
      .setDescription(`${client.emoji.tick} **Báo cáo của bạn đã được gửi!**`)
      .setColor(client.config.botcolor)
    await message.channel.send({ embeds: [done] })
  }
};