const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();


module.exports = {
  name: "kiss",
  category: "🖼 IMAGE",
  description: "KISSS",
  usage: "<PREFIX>kiss [user]",
  run: async (client, message, args) => {
    //command

    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.reply("Hãy Mentions Người Bạn Muốn Hunn");

    async function work() {
      let owo = await neko.sfw.kiss();

      const kissembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn Đã Bị Cưỡng Hôn ! ")
        .setDescription(
          user.toString() + " Đã Hôn " + message.author.toString()
        )
        .setImage(owo.url)
        .setColor(client.config.botcolor)
        .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
        .setURL(owo.url);
      message.channel.send({embeds:[kissembed]});
    }

    work();
  },
};