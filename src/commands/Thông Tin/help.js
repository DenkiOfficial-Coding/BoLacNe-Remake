const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const disbut = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "help",
  category: "🔰 Thông Tin",
  usage: "<PREFIX>help",
  description: "Hiển thị tất cả lệnh",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
      if (!command) {
        return client.func.error(client.emoji.x +` **Không tìm thấy lệnh: **${args[0]}`,message.channel)
      }
      let embed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setDescription(
          `
        **Tên lệnh**: ${command.name}
        **Cách dùng**: \`${
          command.usage.replace(/<PREFIX>/g, client.config.PREFIX) ||
          "Không có ;-;"
        }\`
        **Aliases**: \`${command.aliases || "Không có ;-;"}\`
        **Phân Loại**: ${command.category || "Không có ;-;"}
        **Mô tả**: ${
          command.description.replace(/<PREFIX>/g, client.config.PREFIX) ||
          "Không có ;-;"
        }`
        )
        .setFooter("Support Liên Hệ HoangLe#4122 , CatCat#4533")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/682768459435999232/784638390645162045/Save-Help-Me-Sticker-downsized.gif"
        );
      return message.channel.send({ embeds: [embed] });
    } else {
      const commands = await client.commands;
      let prefix = message.client.config.PREFIX;
      let url = new MessageButton()
        .setStyle("LINK")
        .setURL("https://www.facebook.com/profile.php?id=100025144504969")
        .setEmoji("886543139916099644")
        .setLabel("Facebook");
      let url2 = new MessageButton()
        .setStyle("LINK")
        .setURL("https://discord.gg/k3QXGYFkW9")
        .setEmoji("886543139995799582")
        .setLabel("Support Server");
      let com = {};
      let commandsize = 0;
      for (let comm of commands.values()) {
        if (comm.category) {
          let category = comm.category;
          let name = comm.name;

          if (!com[category]) {
            com[category] = [];
          }
          com[category].push(name);
          commandsize++;
        }
      }
      let embed = new MessageEmbed()
        .setAuthor(`Danh sách lệnh của ${message.guild.me.displayName}`, message.guild.iconURL())
        .setDescription(
          `\nPrefix: **${prefix}** \n Tổng số lệnh: **${commandsize}**`
        )
        .setColor(client.config.botcolor)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(
          `Xem thông tin và mô tả lệnh, hãy nhập: ahelp [CMD NAME] | Code bởi CatCat#7311`
        );
      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        embed.addField(`${category} [ ${value.length} ]:`, desc);
      }
      const row = new MessageActionRow().addComponents(url2, url);
      return message.channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  },
};
