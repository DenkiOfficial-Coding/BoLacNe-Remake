const { MessageEmbed } = require("discord.js");
const emojis = require("../../assets/json/emojis.json");
module.exports = {
  name: "ping",
  category: `🔰 Thông Tin`,
  aliases: ["latency"],
  cooldown: 2,
  usage: "<PREFIX>ping",
  description: "Gives you information on how fast the Bot can respond to you",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  run: async (client, message, args) => {
    try {
      let embed1 = new MessageEmbed()
        .setColor(client.emoji.color)
        .setTitle(`🏓 Pinging....`);
      let msg = await message
        .reply({ embeds: [embed1], allowedMentions: { repliedUser: false } })
        .then((msg) => {
          let ping = msg.createdTimestamp - message.createdTimestamp;
          embed1.setColor(client.emoji.color);
          embed1.setTitle("🏓 Pong!");
          embed1.addField(
            `Ping của bạn`,
            `\`\`\`css\n${Math.round(client.ws.ping)}ms\`\`\``,
            true
          );
          embed1.addField(`Bot ping`, `\`\`\`css\n${ping}ms\`\`\``, true);
          msg.edit({ embeds: [embed1] });
        });
    } catch (e) {
      console.log(String(e.stack).bgRed);
      let embed2 = new MessageEmbed()
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``);
      return message.reply({ embeds: [embed2] });
    }
  },
};
