const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ao",
  aliases: ["ao"],
  category: "",
  description: "Mua đồ trong cửa hàng",
  owner:true,
  usage: "<PREFIX>ao [ao]",
  run: async (client, message, args) => {
     let embed = new MessageEmbed()
      .setTimestamp()
      .setColor(client.config.botcolor)
      .setTitle("Hoodies")
      .setImage("https://images-ext-1.discordapp.net/external/4JWutxObzixNblK77krDSDZmoqdSqDSiQc-ut9NnX1g/https/cbu01.alicdn.com/img/ibank/2020/759/258/23560852957_523140469.jpg?width=701&height=701")
      .setDescription(`**Tên Áo : __Astronaut Chest__\n Size : XS , S , M , L , XL , XXL , XXXL \n Thời Gian Oder Áo Về : 10 - 14 Ngày \n Giá VND: 350,000 \n Giá Bơ : 3,500,000$** ${client.emoji.money} `)
      .setURL("https://discord.gg/hm685YZxYx")
    return message.reply({embeds:[embed]})
  }
};
