const { Client, MessageEmbed, Util, Collection } = require("discord.js");
const Discord = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "math",
  category: "🔰 Thông Tin",
  aliases: ["math", "cal"],
  usage: "<PREFIX>math [query](mathematical)",
  description: "Ông Thần Tính Nhẩm , Vị Vua Toán Học , Ông Hoàng Học Giỏi",
  run: async (client, message, args) => {
    if (!args[0]) return client.func.error("**Nhập Một Cái Gì Đó Để Tính Toán **");

    let result;
    try {
      result = math.evaluate(
        args
          .join(" ")
          .replace(/[x]/gi, "*")
          .replace(/[,]/g, ".")
          .replace(/[÷]/gi, "/")
      );
    } catch (e) {
      return message.reply(
        "**Nhập phép tính hợp lệ!**\n\n**Danh sách các phép tính** - \n1. **phương trình sqrt** - `sqrt(3^2 + 4^2) = 5`\n2. **Đơn vị đến Đơn vị** - `2 inch to cm = 0.58`\n3. **Biểu thức phức tạp như** - `cos(45 deg) = 0.7071067811865476`\n4. **Biểu thức toán học cơ bản ** - `+, -, ^, /, số thập phân ` = **2.5 - 2 = 0.5**"
      );
    }

    let embed = new Discord.MessageEmbed();
    message.reply(`**Kết Quả Là:** **${result}**`);
  },
};
