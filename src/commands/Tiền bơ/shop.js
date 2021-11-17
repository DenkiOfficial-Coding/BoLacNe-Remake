const { Client, MessageEmbed, Util, Collection, MessageManager } = require('discord.js');
let arrow = `<a:muitenxanh:899158873502519357>`
module.exports = {
  name: "shop",
  aliases: ["store","cuahang"],
  category: "🥑 TiềnBơ",
  description: "Xem Tất Cả Mặt Hàng Đang Bán",
  usage: "<PREFIX>shop",
  run: async (client, message, args, ) => {
    let items = await client.item.getAll(client)
    let tutorial = `Hãy mua một chiếc nhẫn để kết hôn với ai đó!
    ${arrow} \`${client.config.PREFIX}marry user @[user]\`
    ${arrow} \`${client.config.PREFIX}buyitem [item id]\`
    ${arrow} \`${client.config.PREFIX}top ring [sliliver | golden | platinum | diamond | home]\`
    ══════════════════════════════════════`
    const shop = new MessageEmbed()
      .setAuthor(`Avocado Shop`,message.guild.iconURL())
      .setTimestamp()
      .setColor(client.config.botcolor)
      .setFooter(`Chúc các bạn hạnh phúc`)
    if(items.length == 0 ) {
      shop.setDescription(tutorial+`\n\n**Không có mặt hàng nào!**`)
    } else {
      shop.setDescription(tutorial)
      for (i of items) {
        shop.addField(`\`${i.id}\` ${i.emoji} ${i.name} - __**${client.func.laysodep(i.price)}**__${client.emoji.money}`,`${i.description.length == 0 ? "Không có mô tả" : i.description }`)
      }
    }
    let msg = message.channel.send({
      embeds: [shop]
    })
  }
}
