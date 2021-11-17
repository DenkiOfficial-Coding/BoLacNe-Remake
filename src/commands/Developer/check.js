const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
  name: "check",
  description: "DM a user in the guild",
  cooldown: 5,
  aliases: ['check'],
  owner: true,
  usage: 'dm (userID) (content)',
  run: async (client, message, args) => {
    let embeds = new MessageEmbed()
      .setImage("https://bizweb.dktcdn.net/100/408/793/products/bacb169d5780a7defe915-0de3363b-6e0b-44b7-a51d-443ba401f8d9.jpg?v=1610213676897")
      .setColor(client.config.botcolor)
      .setDescription(`
      **Tên mặt hàng: **Áo hoodie có ảnh gái cực vjp
      **Tag: ** \`hoodie\`, \`gaixinh\`
      **ID: **1736`)
      .setTimestamp()
    let menu = new MessageSelectMenu()
      .setCustomId('select')
      .setPlaceholder('Nhấn vào đây để chọn')
      .addOptions([
        {
          label: 'Mua hàng',
          description: 'Nhấn vào đây để chọn',
          emoji: "✅",
          value: 'first_option',
        },
        {
          label: 'Thêm vào giỏ hàng',
          description: 'Nhấn vào đây để thêm vào giỏ hàng',
          emoji: "🛒",
          value: 'second_option',
        }
      ])
    let muahang = new MessageButton()
      .setCustomId('muahang')
      .setLabel('Mua hàng')
      .setStyle('PRIMARY')
      .setEmoji('✅');
    let giohang = new MessageButton()
      .setCustomId('giohang')
      .setLabel('Thêm vào giỏ hàng')
      .setStyle('PRIMARY')
      .setEmoji('🛒');
    let row = new MessageActionRow().addComponents(muahang,giohang)
    message.channel.send({
      embeds: [embeds],
      components: [row]
    })
  }
};
