const {
  MessageEmbed
} = require("discord.js");
const nums = require("../assets/json/numbers.json")
const axios = require("axios");
module.exports = {
  getMember: function(message, toFind = "", self = true) {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target && self == true) {
      target = message.member;
    } else target = undefined;
    return target;
  },
  laysodep: function(num) {
    const pattern = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(pattern, ",");
  },
  sleep: async function(miliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > miliseconds) {
        break;
      }
    }
  },
  formatDate: function(date) {
    return new Intl.DateTimeFormat("vi-VN").format(date);
  },
  formatBytes: function(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  },
  capitalizeWords: function(string) {
    return string.replace(
      /(?!^[0-9])(^|[^a-zA-Z\u00C0-\u017F\u0400-\u04FF'])([a-zA-Z\u00C0-\u017F\u0400-\u04FF])/g,
      function(m) {
        return m.toUpperCase();
      }
    );
  },
  error: function(text, channel) {
    let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription(text)
      .setFooter(`Nếu bot lỗi vui lòng nhập lệnh afeedback để gửi lỗi`);
    channel.send({
      embeds: [embed],
      allowedMentions: {
        repliedUser: true
      }
    });
  },
  getTien: function(a) {
    let arrcash, cash
    if (a.includes("k")) {
      arrcash = a.split("k")
      arrcash = arrcash.map(e => e = parseInt(e))
      cash = arrcash[0] * 1000 + (arrcash[1] ? arrcash[1] * 100 : 0)
    } else if (a.includes("m")) {
      arrcash = a.split("m")
      arrcash = arrcash.map(e => e = parseInt(e))
      cash = arrcash[0] * 1000000 + (arrcash[1] ? arrcash[1] * 100000 : 0)
    }
    return cash
  },
  laysonho: function(n) {
    let num = n.toString()
    let res = []
    for (i = 0; i < num.length; i++) {
      res[i] = nums[num[i]]
    }
    if(res.length = 1) {
      return nums["0"]+res.join("")
    }
    return res.join("")
  }
};