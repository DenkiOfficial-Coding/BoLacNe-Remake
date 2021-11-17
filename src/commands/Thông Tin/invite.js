const { MessageEmbed } = require("discord.js");
const emojis = require("../../assets/json/emojis.json");
module.exports = {
  name: "invite",
  category: `🔰 Thông Tin`,
  aliases: ["latency"],
  cooldown: 2,
  usage: "<PREFIX>invite",
  description: "Tạo link mời bot vô server!",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setTimestamp()
      .setTitle(`Link invite`).setDescription(`
  [Link Invite Giới Hạn Lệnh](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=537000129&scope=bot)
  
  [Link Invite Không Giới Hạn (QuyềnQuảnLý)](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
  `);

    message.reply({ embeds: [embed] });
  },
};
