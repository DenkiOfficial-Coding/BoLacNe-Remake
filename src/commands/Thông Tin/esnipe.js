const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "esnipe",
  description: "Ghi lại tin nhắn đã được chỉnh sửa",
  cooldown: 5,
  aliases: ["es"],
  category: "🔰 Thông Tin",
  usage: "<PREFIX>esnipe",
  botPermission: ["SEND_MESSAGES", "VIEW_AUDIT_LOG"],
  run: async (client, message, args) => {
    function secondsToDhms(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const esnipes = client.esnipes.get(message.channel.id);
    if (!esnipes)
      return client.func.error(
        `${client.emoji.x} Ở đây không có tin nhắn nào được chỉnh sửa cả`,
        message.channel
      );
    const sotn = args[0] - 1 || 0;
    const fixmsg = esnipes[sotn];
    if (!fixmsg)
      return client.func.error(
        `${client.emoji.x} Ở đây chỉ có \`${snipes.length}\` tin nhắn đã được chỉnh sửa`,
        message.channel
      );
    const { content, image, author, date, newmsg } = fixmsg;
    var endDate = new Date();
    //const msg = Date.now()
    var time = (endDate.getTime() - date.getTime()) / 1000;
    const embed = new MessageEmbed()
      .setAuthor(author.tag, author.displayAvatarURL())
      .setDescription(
        `\`Tin nhắn cũ:\` \n**${content}**\n\`Tin nhắn mới:\` \n**${newmsg}**`
      )
      .setFooter(`${secondsToDhms(time)} trước | ${sotn + 1}/${esnipes.length}`)
      .setColor(client.emoji.color);
    if (image) {
      embed.setImage(image);
    }
    return message.reply({ embeds: [embed] });
  },
};
