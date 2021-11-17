const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "whois",
  category: "🔰 Thông Tin",
  aliases: ["who", "user", "userinfo"],
  description: "Trả Về Thông Tin Người Dùng ",
  usage: " <PREFIX>whois [name | nickname | mention | ID] (không bắt buộc)",
  accessableby: "ADMINISTRATOR",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("SEND_MESSAGES")) return client.func.error(client.emoji.x + "** Bạn Không Có Quyền **\`[Quản Lý Tin Nhắn]!\`", message.channel);
    let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

    if (!member) return client.func.error(client.emoji.x + "** Hãy Tag Hoặc ID Người Dùng!**", message.channel)

    const joined = `<t:${Math.floor(member.joinedAt/1000)}> (<t:${Math.floor(member.joinedAt/1000)}:R>)`;
    const roles = member.roles.cache
      .filter(r => r.id !== message.guild.id)
      .map(r => r).join(", ") || 'Không Có';
    const created = `<t:${Math.floor(member.user.createdAt/1000)}> (<t:${Math.floor(member.user.createdAt/1000)}:R>)`

    const embed = new MessageEmbed()
      .setFooter(message.guild.name, message.guild.iconURL())
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor(client.config.botcolor)
      .addField("**Thông Tin Người Dùng**", `${member.displayName}`)
      .addField("**ID**", `${member.user.id}`)
      .addField("**Username**", `${member.user.username}`)
      .addField("**Tag**", `${member.user.tag}`)
      .addField("**Được Tạo Ngày**", `${created}`)
      .addField("**Tham Gia Ngày **", `${joined}`)
      .addField("**Roles**", `${roles}`, true)
      .setTimestamp()
    member.presence.activities.forEach((activity) => {
      if (activity.type === 'PLAYING') {
        embed.addField('Hiện đang chơi', `\n**${activity.name}**`)
      }
    })
    message.channel.send({ embeds: [embed] });
  }
}