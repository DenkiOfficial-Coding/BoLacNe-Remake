const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];
const { MessageEmbed } = require("discord.js");
async function esnipes(client) {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;
    if (oldMessage.author.bot) return;
    const date = Date.now();
    const esnipes = oldMessage.client.esnipes.get(oldMessage.channel.id) || [];
    esnipes.unshift({
      content: oldMessage.content,
      author: oldMessage.author,
      newmsg: newMessage.content,
      image: oldMessage.attachments.first()
        ? oldMessage.attachments.first().proxyURL
        : null,
      date: new Date(),
    });
    esnipes.splice(10);
    oldMessage.client.esnipes.set(oldMessage.channel.id, esnipes);
  });
}
module.exports = esnipes;
