const random = require("random-number-csprng");
const { laysodep } = require("../../util/util");
const Discord = require("discord.js")
const { MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js')
const check_game = new Set();
const hitemoji = "👊";
const stopemoji = "🛑"
const TwoSum = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
module.exports = {
  name: "blackjack",
  category: "🎯 Minigames",
  aliases: ["bj"],
  cooldown: 20,
  usage: "<PREFIX>blackjack",
  description: "Chơi game blackjack",
  run: async (client, message, args) => {
    let user = message.author;
    let bal = await client.db.fetch(client, user.id);
    let moneydb = bal.money
    let money = parseInt(args[0]);
    let raw_money = args[0]
    let backcard = '<:backcard:890193156765798410>'
    let hide_deck = []
    let player_count = 0, bots_count = 0;
    let cards = require("../../assets/json/cardemojis").cards
    if (args[0] == Math.floor(args[0])) {
      money = parseInt(args[0])
    } else if (raw_money && raw_money.toLowerCase() == "all") {
      if (moneydb > 50000) {
        money = 50000
      } else money = moneydb
    } else {
      return client.func.error(
        `${client.emoji.x} Số tiền không hợp lệ`,
        message.channel
      )
    }
    if (money > 50000) {
      return client.func.error(
        `${client.emoji.x} Số tiền lớn hơn __**50,000**__ ${client.emoji.money}`,
        message.channel)
    }

    if (money < 0) {
      return client.func.error(
        `${client.emoji.x} Số tiền không hợp lệ`,
        message.channel
      )
    }
    if (!money) {
      return client.func.error(
        `${client.emoji.x} Hãy Nhập Số Tiền Bạn Muốn Đặt Cược`,
        message.channel
      )
    }
    if (money > moneydb) {
      return client.func.error(
        `${client.emoji.x} Bạn Không Đủ Tiền Mất Rồiii`,
        message.channel
      )
    }
    let save_cards = []
    save_cards = cards
    check_game.add(message.author.id)
    let player_deck = [], bots_deck = []
    for (let i = 0; i < 2; i++) {
      player_deck.push(await randomCard(cards))
      cards = locbai(cards, player_deck)
    }
    while (tinhDiem(player_deck) < 13) {
      if (player_count < 13) {
        player_deck = []
        cards = save_cards;
      }
      for (let i = 0; i < 2; i++) {
        player_deck.push(await randomCard(cards))
        cards = locbai(cards, player_deck)
      }
      player_count = tinhDiem(player_deck)
    }
    player_count = tinhDiem(player_deck)
    bots_deck.push(await randomCard(cards))
    cards = locbai(cards, bots_deck)
    hide_deck.push(backcard)

    bots_count = tinhDiem(bots_deck)
    if (checkAutoWin(player_deck, bots_deck)) {
      bots_deck.push(await randomCard(cards))
      cards = locbai(cards, bots_deck)
      let bjEmbedss = new MessageEmbed()
        .setAuthor(`${message.author.tag} đã cược ${client.func.laysodep(money)} 🥑 vào trò xì dách`, message.author.displayAvatarURL())
        .setFields(
          { name: `${message.author.username} [${player_count}]`, value: `${createembedfield(player_deck)}`, inline: true },
          { name: `${client.user.username} [${bots_count}]`, value: `${createembedfield(bots_deck)}`, inline: true }
        )
        .setColor("GREEN")
        .setFooter(`Bạn đã thắng +${client.func.laysodep(money)}🥑`)
      await client.db.addmoney(client, message.author.id, parseInt(money));
      return message.channel.send({ embeds: [bjEmbedss] })
    } 
    const hit = new MessageButton()
      .setCustomId('hit')
      .setLabel(`Bốc thêm`)
      .setEmoji(hitemoji)
      .setStyle('PRIMARY')
    const stop = new MessageButton()
      .setCustomId('stop')
      .setEmoji(stopemoji)
      .setLabel('Bỏ bài')
      .setStyle('PRIMARY')
    let row = new MessageActionRow().addComponents(hit, stop)
    let bjEmbed = new MessageEmbed()
      .setAuthor(`${message.author.tag} đã cược ${client.func.laysodep(money)} 🥑 vào trò xì dách`, message.author.displayAvatarURL())
      .setColor(client.config.botcolor)
      .setFields(
        { name: `${message.author.username} [${player_count}]`, value: `${createembedfield(player_deck)}`, inline: true },
        { name: `${client.user.username} [${tinhDiem(bots_deck.slice(0, 1))}+?]`, value: `${createembedfield(bots_deck)}${createembedfield(hide_deck)}`, inline: true }
      )
      .setFooter("🃏 Trò chơi đang diễn ra")
    bots_deck.push(await randomCard(cards))
    cards = locbai(cards, bots_deck)
    let msg = await message.channel.send({ embeds: [bjEmbed], components: [row] })
    const filter = i => i.isButton() && i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', });
    collector.on('collect', async i => {
      await i.deferUpdate()
      if (i.customId == 'hit') {
        player_deck.push(await randomCard(cards))
        cards = locbai(cards, player_deck)
        player_count = tinhDiem(player_deck)
        //bots_deck.push(await randomCard(cards))
        //cards = locbai(cards, bots_deck)
        bots_count = tinhDiem(bots_deck)
        if (player_count > 21) {
          collector.stop()
          return await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
        }
        bjEmbed.setFields(
          { name: `${message.author.username} [${player_count}]`, value: `${createembedfield(player_deck)}`, inline: true },
          { name: `${client.user.username} [${tinhDiem(bots_deck.slice(0, 1))}+?]`, value: `${createembedfield(bots_deck.slice(0, 1))}${createembedfield(hide_deck)}`, inline: true }
        )
        msg.edit({ embeds: [bjEmbed], components: [row] })

      } else if (i.customId == 'stop') {
        let ktra = player_deck.length - bots_deck.length
        bots_count = tinhDiem(bots_deck)
        if (player_deck.length == 2 && bots_count != 21 && bots_count < player_count) {
          console.log("1 " + bots_count)
          console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
          console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
          console.log(player_count)
          console.log("2 " + bots_count)
        } else if (ktra == 2 && bots_count != 21 && bots_count < player_count) {
          console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
        }
        hide_deck = []
        let tile = await random(0, 1000) / 100
        collector.stop()
        await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
      }
    })
  }
};
function getCard(cards, num) {
  let res = cards.find(e => e.replace(/(<:|(c|d|h|s):[0-9]{0,100}>)/g, "").includes(num.toString().replace(/10/g, "a").replace(/11/g, "a")))
  if (!res) return null
  return res
}
function autoMath(cards, player_deck, bots_deck, arr) {
  let a, b, res;
  let num1 = tinhDiem(player_deck)
  let num2 = tinhDiem(bots_deck)
  if (num1 > num2) {
    for (i1 of arr) {
      a = num2 + i1
      if (a > num1 && a <= 21) {
        res = i1
      }
    }
  } else if (num1 == 21) {
    for (i1 of arr) {
      a = num2 + i1
      if (a == 21) {
        res = i1
      }
    }
  }
  if (!res) {
    let timbai = getCard(cards, 21 - num2)
    if (!timbai) {
      res = 21 - num2
    } else {
      res = 3
    }
  }
  return res
}

async function randomCard(cards) {
  if (!Array.isArray(cards)) return null;
  return cards[await random(0, cards.length - 1)]
}
function locbai(listOfCard, deck) {
  if (!Array.isArray(listOfCard) || !Array.isArray(deck)) return null;
  return listOfCard.filter(item => !deck.includes(item))
}
function createembedfield(deck) {
  if (!Array.isArray(deck)) return null;
  let line = ""
  deck.forEach(card => {
    line += card
  })
  return line
}
const allEqual = arr => arr.every(val => val === arr[0]);
function tinhDiem(arr) {
  let diem = 0
  arr = arr.map(e => e.replace(/(<:|(c|d|h|s):[0-9]{0,100}>)/g, ""))
  if (arr.includes("a") && !allEqual(arr)) {
    arr = removeItemOnce(arr, "a")
    for (i1 of arr) {
      diem += parseInt(i1.replace(/(j|q|k)/g, "10").replace(/a/g, "1"))
    }
    if (diem > 11) {
      diem += 1
    } else if (diem <= 11) {
      diem += 11
    }
  } else if (arr.includes("a") && allEqual(arr)) {
    for (i3 of arr) {
      diem += 10
    }
  } else {
    for (i2 of arr) {
      diem += parseInt(i2.replace(/(<:|(c|d|h|s):[0-9]{0,100}>)/g, "").replace(/(j|q|k)/g, "10"))
    }
  }
  return diem
}
function checkWin(arr1, arr2) {
  let pcount = tinhDiem(arr1)
  let bcount = tinhDiem(arr2)
  let res;
  if (pcount > 21 && bcount <= 21) {
    res = "thua"
  } else if (pcount > 21 && bcount > 21) {
    res = "hoa"
  } else if (pcount <= 21 && bcount > 21) {
    res = "thang"
  } else if (pcount > bcount) {
    res = "thang"
  } else if (pcount == bcount) {
    res = "hoa"
  } else if (pcount < bcount) {
    res = "thua"
  }
  return res
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

async function stopGame(client, amount, message, player_deck, bots_deck, player_count, bots_count, msg) {
  let ketqua = checkWin(player_deck, bots_deck)
  let bjEmbeds = new MessageEmbed()
    .setAuthor(`${message.author.tag} đã cược ${client.func.laysodep(amount)} 🥑 vào trò xì dách`, message.author.displayAvatarURL())
    .setFields(
      { name: `${message.author.username} [${player_count}]`, value: `${createembedfield(player_deck)}`, inline: true },
      { name: `${client.user.username} [${bots_count}]`, value: `${createembedfield(bots_deck)}`, inline: true }
    )
  switch (ketqua) {
    case "thang":
      await client.db.addmoney(client, message.author.id, parseInt(amount));
      bjEmbeds.setColor("GREEN")
      bjEmbeds.setFooter(`Bạn đã thắng +${client.func.laysodep(amount)}🥑`)
      await msg.edit({ embeds: [bjEmbeds], components: [] })
      break;
    case "thua":
     await client.db.submoney(client, message.author.id, parseInt(amount));
      bjEmbeds.setColor("RED")
      bjEmbeds.setFooter(`Bạn đã thua -${client.func.laysodep(amount)}🥑`)
      await msg.edit({ embeds: [bjEmbeds], components: [] })
      break;
    case "hoa":
      bjEmbeds.setColor(client.config.botcolor)
      bjEmbeds.setFooter(`Bạn đã hòa`)
      await msg.edit({ embeds: [bjEmbeds], components: [] })
      break;
  }
  console.log(ketqua)
}
let twoSum = (array, sum) => {
  let hashMap = {},
    results = []

  for (let i = 0; i < array.length; i++) {
    if (hashMap[array[i]]) {
      results.push([hashMap[array[i]], array[i]])
    } else {
      hashMap[sum - array[i]] = array[i];
    }
  }
  return results;
}
function checkAutoWin(arr1, arr2) {
  let kq1 = tinhDiem(arr1)
  let kq2 = tinhDiem(arr2)
  let check = false
  if (kq1 == 21 || kq1 == 20) {
    if (kq2 < 21 || kq2 < 20) {
      check = true
    }
  }
  if (kq1 == kq2) check = false
  return check
}