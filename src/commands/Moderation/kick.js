const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "kick",
  category: "👨‍💻 Moderation",
  aliases: [],
  usage: "<PREFIX>kick [user]",
  description: "Kick 1 Thành Viên Khỏi Server ",
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has("KICK_MEMBERS")) return client.func.error(client.emoji.x + "** Bạn Không Có Quyền Để **\`[KICK_MEMBERS]\`", message.channel);
      if (!message.guild.me.permissions.has("KICK_MEMBERS")) return client.func.error(client.emoji.x + "** Tớ Không Có Quyền Để **\`[KICK_MEMBERS]\`", message.channel);

      if (!args[0]) return client.func.error(client.emoji.x + '** Hãy Tag Hoặc ID Người Bạn Muốn Kick!**', message.channel)

      var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      if (!kickMember) return client.func.error(client.emoji.x + "** Người Dùng Không Có Trong Guild!**", message.channel);

      if (kickMember.id === message.member.id) return client.func.error("**Bạn Không Thể Kick Chính Bạn!**", message.channel)

      if (!kickMember.kickable) return client.func.error(client.emoji.x + "** Bạn Không Thể Kick Người Dùng Này!**", message.channel)

      var reason = args.slice(1).join(" ");
      const sembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`**Bạn Đã Bị Kick Ở ${message.guild.name} Lý Do**: ${reason || "Không Lý Do!"}`)
        .setFooter(message.guild.name, message.guild.iconURL())
      kickMember.send({ embeds: [sembed2] })
      kickMember.kick()
      var sembed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`${client.emoji.tick} **${kickMember.user.username}** Đã Bị Kick Vì ${reason || "Không Lý Do!"}`)
      message.channel.send({embeds:[sembed]});
      let guilddatas = await client.log.fetch(client, message.guild.id)
      if (!guilddatas) return;
      let channel = message.guild.channels.cache.get(guilddatas.logchannel)
      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "kick")
        .addField("**Người dùng Bị Đá**", kickMember.user.username)
        .addField("**Đá Bởi**", message.author.username)
        .addField("**Lý Do**", `${reason || "Không Lý Do"}`)
        .addField("**Lúc**", message.createdAt.toLocaleString())
        .setTimestamp();
      channel.send({ embeds: [embed] })
    } catch (e) {
      return console.log(e.stack)
    }
  }
}