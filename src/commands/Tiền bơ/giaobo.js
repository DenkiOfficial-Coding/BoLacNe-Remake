const { MessageEmbed } = require("discord.js");
const ms = require("ms");
var imageTick = 'https://i.imgur.com/vtGBfAR.png';
var emojiBlank = '<:Bo_Blank:889100801732128788>';
const text = [ 
    "Bạn đã giao bơ tới tận tay", 
    "Vắng nhà nên bạn đã để hàng bơ ở ngoài cửa nhà"
]
const nguoiNhan = ["Thầy Butter", "Thầy Kenny", "Hoàng Lê"]
const textDanhGia = [
    "Giao hàng nhanh! Tốt!",
    "Miếng bơ rất ngon, dùng ăn với sữa đặc là chuẩn ý!",
    "Uầy, sao bạn nhanh thế!",
    "Amazing Goodjob",
    "Bơ đã ngon nhưng người giao bơ còn ngon hơn 😋",
    "Mlem Mlem",
    "Sản phẩm được gói cẩn thận, bơ cũng rất ngon!"
]

function laysodep(num) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ',');
}

module.exports = {
  name: "giaobo",
  aliases: ["gb"],
  category: "🥑 TiềnBơ",
  description: `Nhiệm vụ của bạn là làm shipper giao bơ.
  \nCố gắng giao nhiều để nhận nhiều tiền nha. 
  \nShop còn đang nhỏ, cứ **1 tiếng** mới có một đơn hàng nha!`,
  usage: "<PREFIX>giaobo ",
  run: async (client, message, args) => {
    const messageText = text[Math.floor(Math.random() * (text.length-1))]
    const messageNguoiNhan = nguoiNhan[Math.floor(Math.random() * (nguoiNhan.length-1))]
    let timeout = 3600000;
    let amount = Math.floor(Math.random() * 100) + 400
    let userdatas = await client.db.fetch(client, message.author.id);
    if (userdatas.giaobo !== 0 && timeout - (Date.now() - userdatas.giaobo) > 0) {
      let time = timeout - (Date.now() - userdatas.giaobo);

      return client.func.error(`
      ❌ **|** Hết đơn hàng mất tiêu rồi 😥
      \n${emojiBlank} Bạn hãy chờ thêm **${time > 1000 ? secondsToDhms(time/1000) : `~ 1 giây nữa`}** để nhận thêm Bơ từ shop nha!`,message.channel);
    } else {
      let moneyEmbed = new MessageEmbed()
        .setAuthor("Bạn đã giao bơ thành công!", imageTick)
        .setColor(client.config.botcolor)
        .setDescription(`Chúc mừng bạn nha, ${messageText} ${messageNguoiNhan}`)
        .addField("Bạn đã nhận được", `**__${laysodep(amount)}__** ${client.emoji.money}`, true)
        .addField("Bạn đã có đánh giá từ khách hàng:", `${textDanhGia[Math.floor(Math.random() * (textDanhGia.length-1))]}`, false)
        .setTimestamp();
      message.channel.send({embeds:[moneyEmbed]})
      await client.db.addmoney(client, message.author.id, amount);
      await client.db.setgiaobo(client, message.author.id);
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