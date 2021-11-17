const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "work",
  aliases: ["wr"],
  category: "🥑 TiềnBơ",
  description: "Làm Việc Chăm Chỉ",
  usage: "<PREFIX>work",
  cooldown: 35,
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  run: async (client, message, args) => {
    //let author = await client.db.fetch(client, message.author.id);
    let randomb = ["Bạn Cắt Bơ Và Nhận Về", "Bạn Đã Xay Sinh Tố Bơ Và Nhận Về"];
    let amount = Math.floor(Math.random() * 20) + 1;
    let randomchat = [Math.floor(Math.random() * randomb.length)];
    let embed1 = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(
        `${client.emoji.tick} ${randomb[randomchat]} **__${client.func.laysodep(amount)}__**`
      );
    message.reply({ embeds: [embed1] });

    await client.db.addmoney(client, message.author.id, amount);
  },
};
