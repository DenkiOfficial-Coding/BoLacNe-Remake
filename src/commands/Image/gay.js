const canvacord = require("canvacord");
const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  name: "gay",
  aliases: ["gay","lgbt"],
  category: "🖼 IMAGE",
  description: "GAY!",
  usage: "<PREFIX>gay | [user]>",
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      let fontSize = 70;
      do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);
      return ctx.font;
    };
    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext('2d');
    let avatar = await Canvas.loadImage(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    let blurImage = await Canvas.loadImage(
      "https://media.discordapp.net/attachments/746721255780122744/751315541594996816/gay.png"
    );
    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'gay.png');
 const Embed = new Discord.MessageEmbed()
      .setColor(client.config.botcolor)
      .setTitle("Gay 🏳‍🌈")
      .setFooter(`Được yêu cầu bởi ${message.author.tag}`)
      .setImage(`attachment://gay.png`)
      .setTimestamp();
    message.channel.send({files:[attachment], embeds:[Embed]});
  },
};

