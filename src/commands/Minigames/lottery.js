const { MessageEmbed } = require("discord.js");
const func = require("../../util/user")
const giai = ["<:top_1:894197949050019871> Giải đặc biệt", "<:top_2:894198002938441788> Giải nhì", "<:top_3:894198037105221652> Giải ba"]
module.exports = {
  name: "lottery",
  category: "🎯 Minigames",
  aliases: ["xoso"],
  cooldown: 10,
  usage: "<PREFIX>lottery [buy]",
  description: "Quay Xổ số vào 7 giờ tối hàng ngày, giá vé 100k 🥑",
  run: async (client, message, args) => {
    let damua = await func.findUser(client, message.author.id)
    let bal = await client.db.fetch(client, message.author.id);
    let moneydb = bal.money    
    switch (args[0]) {
      case "buy":
        var time = canBuy(damua)
        if (!time.can_buy) {
          return client.func.error(`${client.emoji.x} Hết thời gian bán vé số!\n\nQuay xổ số sau: **${secondsToDhms(Math.floor(time.lottery_time / 1000))}**`, message.channel)
        }
        if (damua) {
          return client.func.error(`${client.emoji.x} Bạn đã mua vé của ngày hôm nay rồi! Hãy thử lại vào ngày mai!\n\nQuay xổ số sau: **${secondsToDhms(Math.floor(time.lottery_time / 1000))}**
          `, message.channel)
        }
        if (moneydb < 100000) {
          return client.func.error(`${client.emoji.x} Bạn đã không đủ tiền để mua vé số!`, message.channel)
        }
        await func.muaVeSo(client, message.author.id)
        let lembed = new MessageEmbed()
          .setTimestamp()
          .setColor(client.config.botcolor)
          .setDescription(`${client.emoji.tick} Đã mua vé số thành công!\n\nQuay xổ số sau: **${secondsToDhms(Math.floor(time.lottery_time / 1000))}**`)
        message.reply({ embeds: [lembed] })
        break;
      default:
        let winners = await func.getWinner(client)
        let rtime = canBuy(false)
        let des = []
        let tile = ""
        if(!winners.length) {
          for (i=0;i<3;i++) {
            des.push(`**${giai[i]}: ? - ??? |** \`??????\``)
          }
        } else {
          for (i=0;i<winners.length;i++) {
            des.push(`**${winners[i].type}: <@!${winners[i].userID}> - ${client.func.laysodep(winners[i].prize)}${client.emoji.money}** | \`${winners[i].sove}\``)
          }
        }
        var time = getTime(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
        if(time.meridiem == "AM" || time.hour < 7) {
          des = []
          for (i=0;i<3;i++) {
            des.push(`**${giai[i]}: ? - ??? |** \`??????\``)
          }
        }
        let embed = new MessageEmbed()
          .setTimestamp()
          .setAuthor(`Xổ số ngày ${time.day}/${time.month}/${time.year}`,message.guild.iconURL())
          .setDescription(des.join("\n")+`\n**Quay xổ số sau:** ${secondsToDhms(Math.floor(rtime.lottery_time / 1000))}`)
          .setColor(client.config.botcolor)
        if(!damua) {
          embed.setFooter(`Nhập lệnh axoso buy để mua vé số`)
        }
          
        message.reply({ embeds: [embed] })
        break;
    }
  },
};
function canBuy(damua) {
  let time = getTime(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
  let cothemua = false
  let thoigianquay
  let thoigianhientai = new Date(`${time.month}/${time.day}/${time.year} ${time.hour.toString().length == 1 ? "0" + time.hour.toString() : time.hour.toString()}:${time.minute}:${time.second} ${time.meridiem}`)
  thoigianhientai = thoigianhientai.getTime()
  if (damua) {
    cothemua = true
    thoigianquay = new Date(`${time.month}/${time.day + 1}/${time.year} 07:00:00 PM`)
    thoigianquay = thoigianquay.getTime()
    thoigianquay = thoigianquay - thoigianhientai
  } else if (time.meridiem == "AM") {
    cothemua = true
    thoigianquay = new Date(`${time.month}/${time.day}/${time.year} 07:00:00 PM`)
    thoigianquay = thoigianquay.getTime()
    thoigianquay = thoigianquay - thoigianhientai
  } else if (time.hour < 7 && time.meridiem == "PM") {
    cothemua = true
    thoigianquay = new Date(`${time.month}/${time.day}/${time.year} 07:00:00 PM`)
    thoigianquay = thoigianquay.getTime()
    thoigianquay = thoigianquay - thoigianhientai
  } else if (time.hour >= 7 && time.meridiem == "PM") {
    thoigianquay = new Date(`${time.month}/${time.day + 1}/${time.year} 07:00:00 PM`)
    thoigianquay = thoigianquay.getTime()
    thoigianquay = thoigianquay - thoigianhientai
  }
  return {
    lottery_time: thoigianquay,
    can_buy: cothemua
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
function getNumber(num) {
  if (num.toString().length == 1) {
    return "0" + num.toString()
  } else return num.toString()
}
function getTime(str) {
  let a = str.replace(/,/g, "").split(" ")
  let b = a[1].split(":")
  let c = a[0].split("/")
  return {
    hour: parseInt(b[0]),
    minute: parseInt(b[1]),
    second: parseInt(b[2]),
    day: parseInt(c[1]),
    month: parseInt(c[0]),
    year: parseInt(c[2]),
    meridiem: a[2]
  }
}