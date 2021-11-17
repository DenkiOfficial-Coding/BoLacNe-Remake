const random = require("random-number-csprng");
const taixiu = [
  "<:dice1:894875772496527372>",
  "<:dice2:894875822312288316>",
  "<:dice3:894875880998965299>",
  "<:dice4:894875934820286484>",
  "<:dice5:894876011118858260>",
  "<:dice6:894876081465741332>"
]
function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "taixiu",
  category: "🎯 Minigames",
  aliases: ["tx"],
  cooldown: 5,
  usage: "<PREFIX>taixiu",
  description: "Game tài xỉu",
  run: async (bot, message, args) => {
    const emo = '<a:dice0:894876115175350302>'
    let r1 = await random(0, taixiu.length-1)
    let r2 = await random(0, taixiu.length-1)
    let r3 = await random(0, taixiu.length-1)
    const i1 = taixiu[r1]
    const i2 = taixiu[r2]
    const i3 = taixiu[r3]
    const diem = (r1 + 1) + (r2 + 1) + (r3 + 1) 
    const message1 = await message.channel.send(`**Đang lắc tài xỉu**`)
    const msg = await message.channel.send(` ${emo}  ${emo}  ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${emo}  ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${i2}  ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${i2}  ${i3}`)
    let taixiuu
    if(diem >= 1 && diem <=10) {
      taixiuu = "Xỉu"
    }else if (diem > 10 && diem <= 18) {
      taixiuu = "Tài"
    }
    let chanle = diem%2 == 0 ? "Chẵn" : "Lẻ"
     await message1.edit(`Bạn đã lắc được: **${diem} điểm • ${chanle} • ${taixiuu}**`)

  }
};
