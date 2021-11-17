const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];
const { MessageEmbed } = require("discord.js");
async function snipe(client) {
  client.on("messageDelete", async (message) => {
    let snipes = client.snipes.get(message.channel.id) || [];
    snipes.unshift({
      channel: message.channel,
      content: message.content,
      author: message.author,
      image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null,
      date: new Date(),
    });
    snipes.splice(10);
    client.snipes.set(message.channel.id, snipes);
  });
}
module.exports = snipe;
