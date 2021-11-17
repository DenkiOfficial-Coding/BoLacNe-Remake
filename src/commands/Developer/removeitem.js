const {
  MessageEmbed
} = require("discord.js");

function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}
module.exports = {
  name: "removeitem",
  aliases: ["ri"],
  description: "Gửi Tiền",
  usage: "<PREFIX>removeitem [id item]",
  owner: true,
  run: async (client, message, args) => {
    try {
      let id = args[0]
      if (!id) return client.func.error(`${client.emoji.x} Vui lòng nhập id item, Lưu ý viết liền`, message.channel)
      await client.item.removeitem(client, id)
      message.reply(`${client.emoji.tick} Đã thêm xóa công item \`${id}\``)
    } catch (e) {
      console.log(e.stack)
      if (e.stack.includes("item not found")) {
        return client.func.error(`${client.emoji.x} Item không tồn tại!`, message.channel)
      }
    }
  },
};