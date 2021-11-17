const {
  MessageEmbed
} = require("discord.js");
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];
const moving = "<a:spinned:888975223456694302>";
function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ',');
}
const random = require('random-number-csprng');
module.exports = {
  name: "slots",
  aliases: ["slot", "sl", "s"],
  category: "🎯 Minigames",
  cooldown: 20,
  description: "Slot game",
  usage: "<PREFIX>slots <số tiền đặt cược>",
  run: async (client, message, args) => {
    let user = message.author;
    let bal = await client.db.fetch(client, user.id);
    let moneydb = bal.money
    let money = parseInt(args[0]);
    let win = false;
    let raw_money = args[0]
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
    const rslots = []
    const ti_le = await random(1, 1000) / 10
    let ti_le2 = await random(1, 1000) / 10
    let slot1, slot2, slot3;
    if (ti_le > 50) {
      slot1 = Math.floor(Math.random() * (slotItems.length - 1));
      slot2 = Math.floor(Math.random() * (slotItems.length - 1));
      slot3 = Math.floor(Math.random() * (slotItems.length - 1));
    } else if (ti_le <= 50) {
      slot1 = Math.floor(Math.random() * (slotItems.length - 1));
      slot2 = Math.floor(Math.random() * (slotItems.length - 1));
      slot3 = Math.floor(Math.random() * (slotItems.length - 1));
      if (ti_le2 <= 50) {
        while (slot1 == slot2 || slot2 == slot3 || slot1 == slot3) {
          slot1 = Math.floor(Math.random() * (slotItems.length - 1));
          slot2 = Math.floor(Math.random() * (slotItems.length - 1));
          slot3 = Math.floor(Math.random() * (slotItems.length - 1));
        }
      }
      while (slot1 == slot2 && slot2 == slot3) {
        slot1 = Math.floor(Math.random() * (slotItems.length - 1));
        slot2 = Math.floor(Math.random() * (slotItems.length - 1));
        slot3 = Math.floor(Math.random() * (slotItems.length - 1));
      }
    }
    console.log(ti_le)
    console.log(ti_le2)
    rslots.push(slotItems[slot1])
    rslots.push(slotItems[slot2])
    rslots.push(slotItems[slot3])

    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const allEqual = arr => arr.every(val => val === arr[0]);

    let x2
    for (i of slotItems) {
      if (countOccurrences(rslots)[i] == 2) x2 = true
    }
    let x3 = allEqual(rslots)

    if (x3) {
      money *= 2
      win = true;
      await client.db.addmoney(client, message.author.id, parseInt(money));
    } else if (x2) {
      money *= 1
      win = true;
      await client.db.addmoney(client, message.author.id, parseInt(money));
    }
    let winmsg = (win == 0) ? `Bạn Đã Không May Mắn __**-${laysodep(money)}**__ ${client.emoji.money} :(` : `Bạn Đã Chiến Thắng __**+${laysodep(money)}**__ ${client.emoji.money}`
    if (!win) await client.db.submoney(client, message.author.id, parseInt(money));
    let slotsEmbed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setDescription(`\`___SLOTS___\`\n${moving} | ${moving} | ${moving}\n\`|         |\`\n\`|         |\`\n\nĐang quay...`)
    let msg = await message.channel.send({
      embeds: [slotsEmbed]
    })
    setTimeout(async function() {
      slotsEmbed.setDescription(`\`___SLOTS___\`\n${rslots[0]} | ${moving} | ${moving}\n\`|         |\`\n\`|         |\`\n\nĐang quay...`)
      msg.edit({ embeds: [slotsEmbed] })
      setTimeout(async function() {
        slotsEmbed.setDescription(`\`___SLOTS___\`\n${rslots[0]} | ${moving} | ${rslots[2]}\n\`|         |\`\n\`|         |\`\n\nĐang quay...`)
        msg.edit({ embeds: [slotsEmbed] })
        setTimeout(async function() {
          slotsEmbed.setDescription(`\`___SLOTS___\`\n${rslots[0]} | ${rslots[1]} | ${rslots[2]}\n\`|         |\`\n\`|         |\`\n\n${winmsg}`)
          if (!win) slotsEmbed.setColor("RED")
          msg.edit({ embeds: [slotsEmbed] })
        }, 2000)
      }, 2000)
    }, 2000)
    /*
    if (win) {
      let slotsEmbed1 = new MessageEmbed()
        .setDescription(`\`___SLOTS___\`\n${rslots[0]} | ${rslots[1]} | ${rslots[2]}\n\`|         |\`\n\`|         |\`\n\n`)
        .setColor(client.config.botcolor)
      message.channel.send({
        embeds: [slotsEmbed1]
      })
    } else {
      let slotsEmbed = new MessageEmbed()
        .setDescription(`\`___SLOTS___\`\n${[0]} | ${rslots[1]} | ${rslots[2]}\n\`|         |\`\n\`|         |\`\n\n${winmsg}`)
        .setColor("RED")
      message.channel.send({
        embeds: [slotsEmbed]
      })
     
    } */
  },
};