const { inspect } = require("util");
const { post } = require("../../util/post");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "leave",
  aliases: [],
  usage: "",
  description: "Rời server",
  owner: true,
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Nhập id guild!");
    let guild = client.guilds.cache.get(args[0])
    let owner = await client.users.fetch(guild.ownerId)
    owner.send(`${client.emoji.warning} Vì bot đang bị giới hạn 100 servers nên các bạn có thể qua server support (https://discord.gg/nNWbaeqssT) để thử nghiệm bot mình xin phép leave bot để cho những servers lớn hơn sử dụng và kiểm tra sự an toàn trước, xin lỗi vì sự bất tiện này!`).catch(e => console.log("khong gui dc"))
    if (!guild) return message.reply("Không tìm thấy server")
    guild.leave()
    message.reply("Đã rời!")
  },
};
