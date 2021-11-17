const Discord = require('discord.js')
module.exports = {
  name: "dms",
  description: "DM a user in the guild",
  cooldown: 5,
  aliases: ['dm'],
  owner: true,
  usage: 'dm (userID) (content)',
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `Invalid id`
      );
    let user = await client.users.fetch(args[0])
    if (!user)
      return message.channel.send(
        `Invalid id`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("Nhập Gì Đó đi");

    const emb = new Discord.MessageEmbed()
      .setDescription(args.slice(1).join(" "))
      .setFooter(`Reply Cuộc Trò Chuyện Này Bằng Cách Vào Nơi Có Bot Và Nhập Lệnh areply!`, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor(client.emoji.color)


    if (message.attachments.size) {
      emb.setImage(message.attachments.first().url)
    }

    user.send({ embeds: [emb] })
      .catch(() => message.channel.send("That user could not be DMed!"))
      .then(() => message.channel.send(`Sent a message to ${user.tag}`));
  },
};
