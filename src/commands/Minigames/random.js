const { MessageEmbed } = require("discord.js");
const random = require("random-number-csprng");
const { laysodep } = require("../../util/util");
let buffRandom = ["852921776191307798"]
module.exports = {
  name: "random",
  category: "🎯 Minigames",
  aliases: ["rd"],
  usage: "<PREFIX>random",
  description: "Quay Ngẫu Nhiên Số ",
  run: async (client, message, args) => {
    if (!args[0]) args[0] = "10";
    if (isNaN(args[0]))
      return message.reply({
        content: "Số thứ nhất không phải là số hoặc nguyên ",
      });
    const first = parseInt(args[0]);
    const second = parseInt(args[1]) || null;
    if (args[1] && second === null)
      return message.reply({
        content: "Số thứ hai không phải là số hoặc số nguyên",
      });

    try {
      let randomNum = await random(
        second ? first : 0,
        second ? second : first
      );
      console.log(first)
      if (buffRandom.includes(message.author.id)) {
        let tile = await random(0, 100)
        console.log(tile)
        if (tile >= 50) {
          randomNum = await random(first - (Math.pow(10, first.toString().length - 2) * 7), first)
          console.log(Math.pow(10, first.toString().length - 2) * 7)
          //console.log(first - (Math.pow(10,first.toString().length-2)*7))
        }
        //console.log(tile)
      }
      return message.reply({
        content: `Số random của bạn là: **${laysodep(randomNum)}**`,
      });
    } catch (err) {
      if (
        err.message.includes(
          "The maximum value must be higher than the minimum value"
        )
      ) return message.channel.send("Số đầu tiên phải nhỏ hơn số thứ hai!");
      return message.reply({ content: "Số không hợp lệ!" });
    }
  },
};
