const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "ban",
  category:  "👨‍💻 Moderation",
  aliases: [],
  usage: "<PREFIX>ban",
  description: "Cấm 1 Thành Viên Khỏi Server",
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(["BAN_MEMBERS"])) return client.func.error(client.emoji.x + "** Bạn Không Có Quyền **\`[BAN_MEMBERS]\`", message.channel);
      if (!message.guild.me.permissions.has(["BAN_MEMBERS"])) return client.func.error(client.emoji.x + "** Tớ Không Có Quyền **\`[BAN_MEMBERS]\`", message.channel);
      if (!args[0]) return client.func.error(`**${client.emoji.x} Vui Lòng Cung Cấp ID Hoặc TAG Một Người Dùng Để Cấm!**`, message.channel)

      let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      if (!banMember) return client.func.error(client.emoji.x + "** Người Dùng Không Ở Trong Guild **", message.channel);
      if (banMember === message.member) return client.func.error("** Bạn Không Thể Tự Cấm Chính Bạn**", message.channel)

      var reason = args.slice(1).join(" ");

      if (!banMember.bannable) return client.func.error(client.emoji.x + "** Không thể ban người dùng đó **", message.channel)
      var sembed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setDescription(`**Bạn Đã Bị Cấm Vì**: ${reason || "Không Lý Do!"}`)
      banMember.send({ embeds: [sembed] })
      message.guild.members.ban(banMember, { days: 7, reason: reason })
      var sembed2 = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setDescription(`${client.emoji.tick} **${banMember.user.username}** Đã Bị Cấm Vì  ${reason || "Không Lý Do!"}`)
      message.channel.send({ embeds: [sembed2] })
      let guilddatas = await client.log.fetch(client, message.guild.id)
      if (!guilddatas) return;
      let channel = message.guild.channels.cache.get(guilddatas.logchannel)
      if (!channel) return;

      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "ban")
        .addField("**Banned**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Banned Bởi**", message.author.username)
        .addField("**Lý Do**", `${reason || "Không Lý Do"}`)
        .addField("**Lúc**", message.createdAt.toLocaleString())
        .setTimestamp();
      channel.send({ embeds: [embed] })
    } catch (e) {
      return console.log(e.stack)
    }
  }
};