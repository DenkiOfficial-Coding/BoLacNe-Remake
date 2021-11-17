const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");
const { DiscordTogether } = require("discord-together");
module.exports = {
  name: "wordsnack",
  aliases: ["wordsnack","ws"],
  category: "🔊 Voice",
  description: "tạo kênh chơi game",
  usage: "<PREFIX>wordsnack",
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
      .setImage("https://cdn.discordapp.com/attachments/878295451500150854/894941001360212028/unknown.png")
      .setDescription(
        "" + client.emoji.tick + " Bấm vào nút bên dưới để bắt đầu"
      )
      .setColor(client.config.botcolor);
    let wordsnack_code = await client.discordTogether.createTogetherCode(
      message.member.voice.channel.id,
      "wordsnack"
    );
    let wordsnack = new MessageButton()
      .setStyle("LINK")
      .setURL(wordsnack_code.code)
      .setEmoji("📝")
      .setLabel("wordsnack");
    const row = new MessageActionRow().addComponents(wordsnack);
    message.reply({
      embeds: [games],
      components: [row],
    });
  },
};
