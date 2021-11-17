const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "youtube-together",
  aliases: ["yt"],
  category: "🔊 Voice",
  description: "tạo kênh xem youtube chung",
  usage: "<PREFIX>youtube",
  cooldown: 5,
  clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "CREATE_INSTANT_INVITE"],
  run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    var novc = new Discord.MessageEmbed()
      .setDescription(
        " " + client.emoji.x + " Bạn cần vào voice để thực hiện lệnh này"
      )
      .setColor("RED");
    if (!channel) return message.channel.send({ embeds: [novc] });
    var yt = new Discord.MessageEmbed()
      .setDescription(
        "" + client.emoji.tick + " Bấm vào nút bên dưới để bắt đầu"
      )
      .setColor("#ccffcc");
    let yt_code = await client.discordTogether.createTogetherCode(
      message.member.voice.channel.id,
      "youtube"
    );
    if (!yt_code)
      return client.func.error(
        "" + client.emoji.x + " Không thể bắt đầu Youtube-Together",
        message.channel
      );
    let button = new MessageButton()
      .setLabel("xem")
      .setStyle("LINK")
      .setEmoji("853907257549258772")
      .setURL(yt_code.code);
    let wtf2 = new MessageActionRow().addComponents(button);
    message.channel.send({ embeds: [yt], components: [wtf2] });
},
};
