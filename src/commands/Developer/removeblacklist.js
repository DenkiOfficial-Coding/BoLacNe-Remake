const Discord = require('discord.js')
module.exports = {
  name: "removeblacklist",
  description: "Xóa blacklist người dùng hoặc guild",
  aliases: ['rbl'],
  owner: true,
  run: async (client, message, args) => {
    try {
      switch (args[0]) {
        case "user":
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || { user: await client.users.fetch(args[1]) }
          if (!member) return client.func.error(
            `${client.emoji.x} Người dùng không hợp lệ!`,
            message.channel
          )
          await client.blacklist.removeBlackListUser(client, member.user.id)
          let uembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Đã xóa ${member.user.username} khỏi danh sách đen!`)
          message.channel.send({ embeds: [uembed] })
          client.channels.cache
            .get("889838439007158322")
            .send({ embeds: [uembed] });
          return
          uembed.setDescription(`${client.emoji.tick} Bạn đã được xóa khỏi danh sách đen của bot **${client.user.username}**!`)
          member.user.send({ embeds: [uembed] }).catch(() => console.log("Ng dung tat DMs"))
          break;
        case "guild":
          let guild = client.guilds.cache.get(args[1])
          if (!guild) return client.func.error(
            `${client.emoji.x} Id server không hợp lệ!`,
            message.channel
          )
          await client.blacklist.removeBlackListGuild(client, guild.id)
          let gembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Đã xóa ${guild.name} khỏi danh sách đen!`)
          message.channel.send({ embeds: [gembed] })
          client.channels.cache
            .get("889838439007158322")
            .send({ embeds: [gembed] });
          let owner = await client.users.fetch(guild.ownerId)
          if (!owner) return
          gembed.setDescription(`${client.emoji.tick} **${guild.name}** đã được xóa khỏi danh sách đen của bot **${client.user.username}**!`)
          owner.send({ embeds: [gembed] }).catch(() => console.log("Ng dung tat DMs"))
          return
          break;
        default:
          return client.func.error(
            `${client.emoji.x} Vui lòng chọn \`user\` hoặc \`guild\``,
            message.channel
          )
      }
    } catch (e) {
      console.log(e.stack)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      )
    }
  }
};
