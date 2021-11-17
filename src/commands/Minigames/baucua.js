const cooldown = new Set();
const wait = require('util').promisify(setTimeout);
const emojis = [
  "<:caa:882771527483920434>", 
  "<:cuaa:882771527962095646>", 
  "<:toom:882771527127433227>", 
  "<:naii:882771527551053934>",
  "<:gaa:882771527215480853>", 
  "<:bauu:882771527483949066>",
  "<:caa:882771527483920434>", 
  "<:cuaa:882771527962095646>", 
  "<:toom:882771527127433227>", 
  "<:naii:882771527551053934>",
  "<:gaa:882771527215480853>", 
  "<:bauu:882771527483949066>",
  "<:caa:882771527483920434>", 
  "<:cuaa:882771527962095646>", 
  "<:toom:882771527127433227>", 
  "<:naii:882771527551053934>",
  "<:gaa:882771527215480853>", 
  "<:bauu:882771527483949066>"
];
const bacuaa = [
  "Tôm",
  "Nai",
  "Gà",
  "Cua",
  "Cá",
  "Bầu",
  "Tôm",
  "Nai",
  "Gà",
  "Cua",
  "Cá",
  "Bầu"
]
module.exports = {
  name: "baucua",
  category: "🎯 Minigames",
  aliases: ["bc", "baucua"],
  cooldown: 7,
  usage: "<PREFIX>baucua",
  description: "Đơn Giản Là Bầu Cua ",
  run: async (client, message, args) => {
      if (
      !message.member.roles.cache.some((r) => r.name === "Lắc Bầu Cua")
    ) {
      return message.channel.send(
        "<:like:866504743479541780> | **Bạn Không Đủ Điều Kiện Để Lắc Bầu Cua! | Bạn Cần Phải Có Role Tên: Lắc Bầu Cua **"
      );  
    } 
   await baucua(message, emojis)
  }
};

async function baucua(message, emojis) {
  let res = []
  r1 = Math.floor(Math.random() * (emojis.length - 1)) + 0;
  r2 = Math.floor(Math.random() * (emojis.length - 1)) + 0;
  r3 = Math.floor(Math.random() * (emojis.length - 1)) + 0;
  let msg = await message.channel.send("**Đợi Chút Lắc Nè, <a:lacne:869295144602583080> <a:lacne:869295144602583080> <a:lacne:869295144602583080>**")
  await wait(3000)
  msg.edit(`**Đợi Chút Lắc Nè, ${emojis[r1]} <a:lacne:869295144602583080> <a:lacne:869295144602583080>**`)
  await wait(3000)
  msg.edit(`**Đợi Chút Lắc Nè, ${emojis[r1]} ${emojis[r2]} <a:lacne:869295144602583080>**`)
  await wait(3000)
  msg.edit(`**Bạn Đã Lắc Được, ${emojis[r1]} ${emojis[r2]} ${emojis[r3]}**`)
  await wait(100)
  msg.edit(`${emojis[r1]}${emojis[r2]}${emojis[r3]}`)
  res.push(bacuaa[r1])
  res.push(bacuaa[r2])
  res.push(bacuaa[r3])
  return res
}

