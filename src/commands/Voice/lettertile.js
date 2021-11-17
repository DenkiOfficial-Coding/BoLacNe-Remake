const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");
const { DiscordTogether } = require("discord-together");
module.exports = {
  name: "lettertile",
  aliases: ["lettertile","lt"],
  category: "🔊 Voice",
  description: "tạo kênh chơi game",
  usage: "<PREFIX>lettertile",
  cooldown: 5,
  run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    var novc = new Discord.MessageEmbed()
      .setDescription(
        " " + client.emoji.x + " Bạn cần vào voice để thực hiện lệnh này"
      )
      .setColor("RED");
    if (!channel) return message.channel.send({ embeds: [novc] });
    var games = new Discord.MessageEmbed()
      .setImage("https://cdn.discordapp.com/attachments/878295451500150854/894941806448500836/unknown.png")
      .setDescription(
        "" + client.emoji.tick + " Bấm vào nút bên dưới để bắt đầu"
      )
      .setColor(client.config.botcolor);
    let lettertile_code = await client.discordTogether.createTogetherCode(
      message.member.voice.channel.id,
      "lettertile"
    );
    let lettertile = new MessageButton()
      .setStyle("LINK")
      .setURL(lettertile_code.code)
      .setEmoji("💌")
      .setLabel("lettertile");
    const row = new MessageActionRow().addComponents(lettertile);
    message.reply({
      embeds: [games],
      components: [row],
    });
  },
};
