const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dongxumayman",
  category: "🎯 Minigames",
  aliases: ["coinlucky", "cl"],
  cooldown: 2.5,
  usage: "<PREFIX>dongxumayman",
  description: "Quay đông Xu Để Xem Độ May Mắn ",
  run: async (client, message, args) => {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "May Mắn";
    else result = "Không May Mắn";
    const embed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(`**${message.member.displayName} Xoay Dính ${result}**!`);
    message.channel.send({ embeds: [embed] });
  },
};
