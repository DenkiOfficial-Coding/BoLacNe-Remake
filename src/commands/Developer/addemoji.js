const Discord = require('discord.js');
const { MessageEmbed, Client, Util } = require('discord.js')
const { parse } = require('twemoji-parser')
module.exports = {
  name: 'addemoji',
  description: 'Thêm emoji vào server của bạn',
  cooldown: 5,
  aliases: ['aemoji'],
  owner:true,
  usage: '<PREFIX>addemoji (link)/:emoji: (name)',
  run: async (client, message, args) => {
    const prefix = client.config.PREFIX
    try {
      if (!args[0] || !args[1]) return client.func.error(`Không đúng cách! Ví dụ: ${prefix}addemoji (link) /:emoji: (name)`, message.channel);
      const missing = message.channel.permissionsFor(message.guild.me).missing('MANAGE_EMOJIS_AND_STICKERS');
      if (missing.includes('MANAGE_EMOJIS_AND_STICKERS')) {
        message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`Bot không có quyền \`MANAGE_EMOJIS_AND_STICKERS\``).setAuthor(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`).setColor('RED')]})
      } else if (!message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
        message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(` **Bạn không có quyền \`MANAGE_EMOJIS_AND_STICKERS\`**`).setAuthor(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`).setColor('RED')]})
      } else {
        if (message.content.includes('https://') || message.content.includes('http://')) {
          const URL = args[0];
          message.guild.emojis.create(URL, args[1]).then(emoji => {
            message.channel.send(`${emoji} đã được tải lên!`)
          }).catch(err => {
            if (err == `DiscordAPIError: Invalid Form Bodyimage: File cannot be larger than 256.0 kb.`) {
              message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`File không thể lớn hơn 265kb`).setColor('RED').setAuthor(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`)]})
            }
          })
        } else if (message.content.includes(':')) {
          if (!args[0]) {
            return client.func.error(`Không đúng cách! Ví dụ: ${prefix}addemoji (link) /:emoji: (name)`, message.channel);
          } else {
            const emoji = Discord.Util.parseEmoji(args[0]);
            if (emoji.animated === true) {
              const URL = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`;
              message.guild.emojis.create(URL, args[1]).then(emoji => {
                //    letEmote = Util.parseEmoji(args[1])
                message.channel.send(`**${emoji} đã được tải lên!**`)
              }).catch(err => {
                client.func.error(`Đã hết slot thêm emoji mới`, message.channel)
              })
            } else {
              const URL = `https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`;
              message.guild.emojis.create(URL, args[1]).then(emoji => {
                //     letEmote = Util.parseEmoji(args[1])
                message.channel.send(`**${emoji} đã được tải lên!**`)
              }).catch(err => {
                client.func.error(`Đã hết slot thêm emoji mới`, message.channel)
              })
            }
          }
        }
      }
    } catch (err) {
      message.channel.send(`\`\`\`${err}\`\`\``)
      if (err.message === "Error") {
        client.func.error(`Không thể thêm emoji này`, message.channel)
      }
    }
  }
}