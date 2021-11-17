module.exports = {
  name: "pick",
  aliases: [""],
  category: "🔰 Thông Tin",
  usage: "<PREFIX>pick [?] [?]",
  description: "Chọn Ngẫu Nhiên",
  run: (client, message, args) => {
          if (!args[0] || !args[1]) return message.channel.send('\` Ví Dụ: apick Anh Yêu Em, Em Yêu Người Khác\`');
        const pickWordlist = args.join(' ').split(',');
        message.channel.send(` **Cậu Gì Ơi Tớ Chọn :  ` + pickWordlist[Math.floor(Math.random() * pickWordlist.length)] + `**`);
  },
};
