const Discord = require('discord.js')
module.exports = {
  name: "additem",
  description: "Thêm mặt hàng vào shop",
  cooldown: 5,
  aliases: ['ai'],
  owner: true,
  usage: '<PREFIX>additem [id item] [tên item]',
  run: async (client, message, args) => {
    try {
      let id = args[0]
      if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
      let name = args.slice(1).join(" ")
      if (!name) return client.func.error(`${client.emoji.x} Vui lòng nhập tên item!`, message.channel)
      await client.item.additem(client, id, name)
      message.reply(`${client.emoji.tick} Đã thêm thành công item ${name} | \`${id}\``)
    } catch (e) {
      console.log(e.stack)
      if (e.stack.includes("item already exists")) {
        return client.func.error(`${client.emoji.x} Id đã có, vui lòng chọn id khác!`, message.channel)
      }
    }
  },
};
