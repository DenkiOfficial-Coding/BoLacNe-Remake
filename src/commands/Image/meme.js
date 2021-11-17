const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const HuyAPI = require("huyapi")
const image = new HuyAPI()
module.exports = {
  name: "meme",
  aliases: ["meme"],
  category: "🖼 IMAGE",
  description: "Gửi random ảnh meme",
  usage: "<PREFIX>meme",
  run: async (client, message, args) => {
    try {
      const data = await image.get.meme()

      const embed = new MessageEmbed()
        .setColor(client.emoji.color)
        .setImage(`${data.url}`)
        .setTimestamp()
        .setFooter(`Chia sẻ bởi ${data.author}`)
      const edit = new MessageButton()
        .setCustomId('reload')
        .setLabel('Ảnh Khác')
        .setEmoji('🖼')
        .setStyle('SUCCESS')
      const row = new MessageActionRow()
        .addComponents(edit)
      let msg = await message.channel.send({ embeds: [embed], components: [row] })
      const filters = i => i.isButton() && i.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filters, componentType: 'BUTTON', });
      collector.on('collect', async i => {
        if (i.customId == 'reload') {
          let { member } = i;
          if (member.user.id != message.author.id) return i.reply({
            content: `Chỉ có ${message.author} điều khiển được!`,
            ephemeral: true
          })
          await i.deferUpdate()
          const datas = await image.get.meme()
          const embe = new MessageEmbed()
            .setColor(client.emoji.color)
            .setImage(`${datas.url}`)
            .setTimestamp()
            .setFooter(`Chia sẻ bởi ${datas.author}`)
          msg.edit({ embeds: [embe] })

        }
      })
    } catch (e) {
      console.log(e.stack)
      return client.func.error(`${client.emoji.x} **Vui lòng thử lại!**`, message.channel)
    }
  },
};
