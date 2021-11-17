const { MessageEmbed } = require("discord.js");
const ms = require("ms");
function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ',');
}
const func = require("../../util/user")
let phantram = {
  "01":5,
  "02":10,
  "03":15,
  "04":20,
  "05":30,
  "06":100,
            
}
module.exports = {
  name: "daily",
  aliases: ["coins-system"],
  category: "🥑 TiềnBơ",
  description: "Điểm Danh Để Nhận 200 Mỗi Ngày",
  usage: "",
  run: async (client, message, args) => {
    let getmarry1 = await func.married(client, message.author.id)
    let timeout = 86400000;
    let amount = Math.floor(Math.random() * 100) + 200;
    let userdatas = await client.db.fetch(client, message.author.id);
    if (userdatas.daily !== 0 && timeout - (Date.now() - userdatas.daily) > 0) {
      let time = timeout - (Date.now() - userdatas.daily);
      return client.func.error(`${client.emoji.x} Bạn đã nhận được phần thưởng hàng ngày của mình \nThu thập lại trong: **${secondsToDhms(time/1000)}**`,message.channel);
    } else {
      let cong;
      if(getmarry1) {
        cong = amount*phantram[getmarry1.ringId]/100
      }
      let moneyEmbed = new MessageEmbed()
        .setColor(client.config.botcolor)
        .setDescription(`${client.emoji.tick} Bạn đã nhận được phần thưởng hàng ngày của mình là **__${laysodep(amount)}${laysodep(cong ? `+${phantram[getmarry1.ringId]}%` : "")}__** ${client.emoji.money}`)
        .setTimestamp();
      message.channel.send({embeds:[moneyEmbed]})
      amount += cong ? cong : 0
      await client.db.addmoney(client, message.author.id, amount);
      await client.db.setdaily(client, message.author.id);
    }
  }
}

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}