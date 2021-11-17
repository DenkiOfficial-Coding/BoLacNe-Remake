const {
  Client,
  MessageEmbed,
  Util,
  Collection,
  MessageManager,
} = require("discord.js");
const func = require("../../util/user")
let ITEMS_ID = ["01", "02", "03", "04", "05", "06"];
const countOccurrences = (arr) =>
  arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
const {
  MessageActionRow,
  MessageButton
} = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "divorce",
  aliases: ["lyhon"],
  category: "🥑 TiềnBơ",
  description: "",
  owner: true,
  usage: "Ly hôn với ai đó",
  run: async (client, message, args) => {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let getmarry1 = await func.married(client, message.author.id)
    if (!member)
      return client.func.error(
        `${client.emoji.x} Người dùng không hợp lệ!`,
        message.channel
      );
    let getmarry2 = await func.married(client, member.user.id)
    if (!getmarry1) {
      return message.reply(`Bạn chx kết hôn`)
    } else if (!getmarry2.couples.includes(message.author.id)) {
      return message.reply(`Bạn Này Không phải Người Yêu Của Bạn`)
    }
    await func.lyhon(client,message.author.id)
    message.reply("Đã ly hôn thành công!")
  },
};
