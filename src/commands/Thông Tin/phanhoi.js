const Discord = require('discord.js');
module.exports = {
  name: "reply",
  aliases: ['rep'],
  description: "Gửi phản hồi cho staff",
  category: "🔰 Thông Tin",
  cooldown: 5,
  usage: "<PREFIX>rep [nội dung]",
  run: async (client, message, args) => {
    let feedbackchannel = message.client.channels.cache.get("888708019725160468");
    let content = message.content.split(" ").slice(1).join(" ");
    if (content.length > 1024) return client.func.error(`${client.emoji.x} **Oah! dài thật đấy nhưng tối đa chỉ được 1024 chữ thôii**`, message.channel)
    const error = new Discord.MessageEmbed()
      .setDescription('**' + client.emoji.x + ' Hãy viết gì đó hoặc đính kèm hình ảnh lỗi ;-;**')
      .setColor('RED')
    if (!content) return message.channel.send({ embeds: [error] });
    let embed = new Discord.MessageEmbed()
      .setAuthor('Phản hồi mới', message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL())
      .addField("Từ:", `${message.author.username} \nID: ${message.author.id}`, true)
      .addField("Server:", `${message.guild.name} \nID: ${message.guild.id}`, true)
      .addField(`Nội dung:`, `${content}`)
      .setColor(client.config.botcolor)
      .setTimestamp()
    if (message.attachments.size) {
      embed.setImage(message.attachments.first().url)
    }

    await feedbackchannel.send({ embeds: [embed] })
    const done = new Discord.MessageEmbed()
      .setDescription(`${client.emoji.tick} **Phản hồi của bạn đã được gửi!**`)
      .setColor(client.config.botcolor)
    await message.channel.send({ embeds: [done] })
  }
};