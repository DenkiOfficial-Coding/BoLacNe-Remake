

const xocdia = [
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>",
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>",
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>",
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>",
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>",
  "<:mauden:894816341792530462>",
  "<:maudo:894817665267421205>"
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
  name: "xocdia",
  category: "🎯 Minigames",
  aliases: ["xd"],
  cooldown: 5,
  usage: "<PREFIX>xocdia",
  description: "Game Xoc Dia",
  run: async (bot, message, args) => {
      if (
      !message.member.roles.cache.some((r) => r.name === "Xóc Đĩa")
    ) {
      return message.channel.send(
        "<:like:866504743479541780> | **Bạn Không Đủ Điều Kiện Để Lắc Bầu Cua! | Bạn Cần Phải Có Role Tên: Xóc Đĩa **"
      );
    }
    const emo = '<:caidiaa:894770060684570644>'
    let r1 = Math.floor(Math.random() * (xocdia.length-1))
    let r2 = Math.floor(Math.random() * (xocdia.length-1))
    let r3 = Math.floor(Math.random() * (xocdia.length-1))
    let r4 = Math.floor(Math.random() * (xocdia.length-1))
    const i1 = xocdia[r1]
    const i2 = xocdia[r2]
    const i3 = xocdia[r3]
    const i4 = xocdia[r4]
    const message1 = await message.channel.send(`**Đang Xóc Đĩa**`)
    const msg = await message.channel.send(` ${emo}  ${emo}  ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${emo} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${i2}  ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${i2}  ${i3} ${emo}`)
    await wait(2000)
    await msg.edit(` ${i1}  ${i2}  ${i3} ${i4}`)
    await message1.delete()

  }
};

