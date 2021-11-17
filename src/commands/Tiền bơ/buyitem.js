const { MessageEmbed } = require("discord.js");
let ITEMS_ID = ["01", "02", "03", "04", "05", "06"];
module.exports = {
  name: "buyitem",
  aliases: ["buyitem","bi","muahang"],
  category: "🥑 TiềnBơ",
  description: "Mua đồ trong cửa hàng",
  owner:true,
  usage: "<PREFIX>buyitem [id item]",
  run: async (client, message, args) => {
    let bal = await client.db.fetch(client, message.author.id);
    let ubal = bal.money
    let item = await client.item.getitem(client,args[0])
    if(!item) return client.func.error(`${client.emoji.x} Không tìm thấy mặt hàng!`,message.channel);
    if(ubal < item.price) return client.func.error(`${client.emoji.x} Bạn không đủ tiền để mua **${item.emoji}${item.name}**`,message.channel);
    await client.item.buyitem(client,message.author.id,item.id)
    let cnt;
    if (ITEMS_ID.includes(args[0])) {
      cnt = `\nHãy nhập \`${client.config.PREFIX}marry user [@user]\` để kết hôn với người mà bạn muốn <3`
    }
    let embed = new MessageEmbed()
      .setTimestamp()
      .setColor(client.config.botcolor)
      .setDescription(`${client.emoji.tick} Đã mua thành công **${item.emoji}${item.name}**${cnt ? cnt : ""}`)
    return message.reply({embeds:[embed]})
  }
};
