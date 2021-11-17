const Discord = require('discord.js')
module.exports = {
  name: "blacklist",
  description: "Banned người dùng hoặc guild",
  aliases: ['bl'],
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
          await client.blacklist.blackListUser(client, member.user.id)
          let uembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Đã thêm **${member.user.username}** vào danh sách đen!`)
          message.channel.send({ embeds: [uembed] })
          client.channels.cache
            .get("889838439007158322")
            .send({ embeds: [uembed] });
          uembed.setDescription(`${client.emoji.tick} Bạn đã được thêm vào danh sách đen của bot **${client.user.username}** vì vi phạm luật lệ của bot!`)
          member.user.send({ embeds: [uembed] }).catch(() => console.log("Ng dung tat DMs"))
          break;
        case "guild":
          let guild = client.guilds.cache.get(args[1])
          if (!guild) return client.func.error(
            `${client.emoji.x} Id server không hợp lệ!`,
            message.channel
          )
          await client.blacklist.blackListGuild(client, guild.id)
          let gembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Đã thêm ${guild.name} vào danh sách đen!`)
          message.channel.send({ embeds: [gembed] })
          client.channels.cache
            .get("889838439007158322")
            .send({ embeds: [gembed] });
          let owner = await client.users.fetch(guild.ownerId)
          if (!owner) return
          gembed.setDescription(`${client.emoji.tick} **${guild.name}** đã được thêm vào danh sách đen của bot **${client.user.username}** vì vi phạm luật lệ của bot!!`)
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
