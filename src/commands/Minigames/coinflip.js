const { MessageEmbed } = require("discord.js");
const random = require("random-number-csprng");
const { laysodep } = require("../../util/util");
module.exports = {
  name: "coinflip",
  category: "🎯 Minigames",
  cooldown: 20,
  aliases: ["cf", "coinflip"],
  usage: "<PREFIX>coinflip <bet>",
  description: "Chơi game coinflip",
  run: async (client, message, args) => {
    const cowoncy = client.emoji.money;
    const spin = client.emoji.spin;
    const heads = client.emoji.heads;
    const tails = client.emoji.tails;
    let bet
    let bal = await client.db.fetch(client, message.author.id);
    let money = bal.money
    if (!args[0]) return client.func.error(`${client.emoji.x} Số tiền không hợp lệ`, message.channel)
    if (args[0] == Math.floor(args[0])) {
      bet = parseInt(args[0])
    } else if (args[0].toLowerCase() == "all") {
      bet = money
      if (bet > 50000) bet = 50000
    } else return client.func.error(`${client.emoji.x} Số tiền không hợp lệ`, message.channel)
    if (bet > 50000) {
      return client.func.error(`${client.emoji.x} Tối đa đặt được 50,000 ${client.emoji.money}`, message.channel)
    }
    if (bet < 0) {
      return client.func.error(
        `${client.emoji.x} Số tiền không hợp lệ`,
        message.channel
      )
    }
    if (money < bet || money == 0) return client.func.error(`${client.emoji.x} Bạn không đủ tiền để chơi game`, message.channel)
    var choice = 'heads';
    if (args[1] != undefined)
      args[1] = args[1].toLowerCase();
    if (args[1] == 'heads' || args[1] == 'h' || args[1] == 'head')
      choice = 'h';
    else if (args[1] == 'tails' || args[1] == 't' || args[1] == 'tail')
      choice = 't';
    else choice = 'h';
    let rand = await random(0, 1);
    let win = false;
    //tails
    if (rand == 0 && choice == "t")
      win = true;
    //heads
    else if (rand == 1 && choice == "h")
      win = true;

    if (win) {
      await client.db.addmoney(client, message.author.id, bet)
    } else {
      await client.db.submoney(client, message.author.id, bet)
    }
    let text = "**" + message.author.username + "** cược **" + client.func.laysodep(bet) + " " + cowoncy + "** và đã chọn " + ((choice == 'h') ? "**mặt ngửa **" + heads : "**mặt úp **" + tails);
    let text2 = text;
    text2 += "\n" + "Đồng xu dừng lại ở " + ((win) ? ((choice == 'h') ? heads : tails) : ((choice == 'h') ? tails : heads)) + " và bạn ";
    if (win) {
      text2 += "đã thắng được ** " + client.func.laysodep(bet * 2) + " " + cowoncy + "**!!";
    } else {
      text2 += "còn đúng một cái nịt :<";
    }
    text += "\nĐồng xu đang xoay..." + spin;

    let msg = await message.channel.send(text)
    setTimeout(function() {
      msg.edit(text2)
    }, 2000);
    console.log(bet)
  },
};
