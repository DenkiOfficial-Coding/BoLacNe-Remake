const { MessageEmbed } = require("discord.js");
 const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
module.exports = {

  name: "inventory",
  aliases: ["inv","khodo"],
  category: "🥑 TiềnBơ",
  description: "Kiểm tra kho đồ",
  owner:true,
  usage: "<PREFIX>buyitem [id item]",
  run: async (client, message, args) => {
    let msg = await message.reply(`<a:waiting:894885965670281216> Chờ tí đang mở kho đồ!`)
    let inv = await client.item.inventory(client, message.author.id)
    inv = inv.map(e => `${e.emoji}`)
    let raw_inv = countOccurrences(inv)
    let iname = Object.keys(raw_inv)
    let ivalue = Object.values(raw_inv)
    let main_inv = []
    for (i=0;i<iname.length;i++) {
      main_inv.push({
        name:iname[i],
        value: ivalue[i]
      })
    } 
    main_inv = main_inv.map(e=> `${e.name}${client.func.laysonho(e.value)}`)
    await msg.delete()
    let embed = new MessageEmbed()
      .setTimestamp()
      .setAuthor(`Kho đồ của ${message.author.username}`,message.author.displayAvatarURL())
      .setColor(client.config.botcolor)
      .setDescription(`${main_inv.join(" ")}`)
    return message.reply({embeds:[embed]}) 
  }
};
