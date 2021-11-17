const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "unban",
  category: "👨‍💻 Moderation",
  aliases: [],
  usage: "<PREFIX>unban [user]",
  description: "Mở Cấm 1 Thành Viên Nào Đó",
  run: async (client, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return client.func.error(client.emoji.x + `** Bạn Không Có Quyền Để Mở Cấm Thành Viên **\`BAN_MEMBERS\``, message.channel)
    }
    const member = message.mentions.members.first() || await client.users.fetch(args[0])
    if (!member) {
      return client.func.error(client.emoji.x + `Không tìm thấy người dùng!`, message.channel)
    }
    try {
      await message.guild.members.unban(member.id || member.user.id)
      let sembed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setDescription(`${client.emoji.tick} ${member} Đã được bỏ cấm!`)
      message.channel.send({ embeds: [sembed] })
    } catch (e) {
      return client.func.error(client.emoji.x + `** Đã xảy ra lỗi !**`, message.channel)
    }

  }
}