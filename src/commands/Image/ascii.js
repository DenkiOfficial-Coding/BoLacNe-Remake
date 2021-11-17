
const Discord = require("discord.js");
const figlet = require('figlet');
module.exports = {
  name: "ascii",
  aliases: ["dislike"],
  category: "🖼 IMAGE",
  description: "Text to Ascii",
  usage: "<PREFIX>ascii <content>",
  run: async (client, message, args) => {
    let content = args.join(" ")
    if (!content) return client.func.error(`${client.emoji.x} Vui lòng nhập nội dung`, message.channel)
    if(content.includes("ngan")) content = content.replace(/ngan/g, "anh")
    figlet.text(content, function(err, data) {
      if (err) {
        console.log('Something went wrong');
        console.dir(err);
      }
      if (data.length > 2000) return client.func.error('Please provide text shorter than 2000 characters!', message.channel)

      message.channel.send('```' + data + '```')
    })
  },
};
