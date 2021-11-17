const Discord = require('discord.js')
module.exports = {
  name: "edititem",
  description: "Chỉnh sửa mặt hàng trong shop",
  cooldown: 5,
  aliases: ['ei'],
  owner: true,
  usage: '<PREFIX>edititem [emoji | description | name | price] [id item] [giá trị mới]',
  run: async (client, message, args) => {
    try {
    switch (args[0]) {
      case "emoji":
        var id = args[1]
        if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
        var value = args.slice(2).join(" ")
        if (!value) return client.func.error(`${client.emoji.x} Vui lòng nhập giá trị mới`, message.channel)
        await client.item.edititem(client, args[0], id, value)
        message.reply(`${client.emoji.tick} Đã sửa emoji của \`${id}\` thành ${value}`)
        break;
      case "name":
        var id = args[1]
        if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
        var value = args.slice(2).join(" ")
        if (!value) return client.func.error(`${client.emoji.x} Vui lòng nhập giá trị mới`, message.channel)
        await client.item.edititem(client, args[0], id, value)
        message.reply(`${client.emoji.tick} Đã sửa tên của \`${id}\` thành ${value}`)
        break;
      case "description":
        var id = args[1]
        if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
        var value = args.slice(2).join(" ")
        if (!value) return client.func.error(`${client.emoji.x} Vui lòng nhập giá trị mới`, message.channel)
        await client.item.edititem(client, args[0], id, value)
        message.reply(`${client.emoji.tick} Đã sửa môt tả của \`${id}\` thành ${value}`)
        break;
      case "price":
        var id = args[1]
        if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
        var value = args[2]
        if (!value || isNaN(value)) return client.func.error(`${client.emoji.x} Giá của item không hợp lệ!`, message.channel)
        await client.item.edititem(client, args[0], id, parseInt(value))
        message.reply(`${client.emoji.tick} Đã sửa giá của \`${id}\` thành ${value}`)
        break;
    }
    }catch (e) {
      console.log(e.stack)
      if(e.stack.includes("item not found")) {
        return client.func.error(`${client.emoji.x} Không tìm thấy item!`, message.channel)
      }
    }
  },
};
