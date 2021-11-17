const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const func = require("../../util/user")
const Data = require("../../databases/models/economy")
const heart = "<a:heart:899155478234402867>"
let top = {
  "1": "<a:so1:899194115764408341>",
  "2": "<a:so2:899194184412561429>",
  "3": "<a:so3:899194211792982126>"
}
module.exports = {
  name: "leaderboard",
  aliases: ["lb", "top"],
  category: "🥑 TiềnBơ",
  description: "Bảng xếp hạng",
  usage: "<PREFIX>leaderboard [golbal | số top | ring] [siliver | golden | platinum | diamond | home]",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  run: async (client, message, args) => {
    let lb = []
    Data.find({
      lb: "all"
    }).sort([
      ['money']
    ]).exec(async (err, res) => {
      if (args[0] == "global") {
        let top = parseInt(args[1]) || 25
        res.sort(function(a, b) { return b.money - a.money; });
        for (var i = 0; i < res.length; i++) {
          lb.push({
            userID: res[i].userID,
            username: res[i].username,
            money: res[i].money,
            rank: res.indexOf(res[i]) + 1
          })
        }
        let yrank = lb.filter(x => x.userID === message.author.id).map(x => x.rank)
        let description = lb.map((r) => `**${r.rank}** - ${r.username} | **${client.func.laysodep(r.money)} ${client.emoji.money}**`).slice(0, top).join("\n");
        const moneylb = new Discord.MessageEmbed()
          .setColor(client.config.botcolor)
          .setAuthor(`Top ${top} Tất Cả Server!`, message.guild.iconURL({ dynamic: true }))
          .setFooter(`Xếp hạng của bạn là #${yrank}`)
          .setDescription(description);
        let msg = await message.channel.send({
          embeds: [moneylb]
        })
      } else if (args[0] == "ring") {
        let topring = await func.getTopRings(client)
        let DATE_NOW = Date.now()
        let des = []
        if (topring.length > 25) topring = topring.slice(0, 25)
        switch (args[1]) {
          case "siliver":
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            topring = topring.filter(e => e.ringId == "02")
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            if (topring.length == 0) {
              des.push("Không có")
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top Silver Ring`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
            break;
          case "golden":
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            topring = topring.filter(e => e.ringId == "03")
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            if (topring.length == 0) {
              des.push("Không có")
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top Golden Ring`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
            break;
          case "platinum":
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            topring = topring.filter(e => e.ringId == "04")
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            if (topring.length == 0) {
              des.push("Không có")
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top Platinum Ring`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
            break;
          case "diamond":
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            topring = topring.filter(e => e.ringId == "05")
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            if (topring.length == 0) {
              des.push("Không có")
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top nhẫn Diamond Ring`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
            break;
          case "home":
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            topring = topring.filter(e => e.ringId == "️0️6️")
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            if (topring.length == 0) {
              des.push("Không có")
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top Love Home`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
            break;
          default:
            if (topring.length > 0) {
              topring.sort(function(a, b) { return b.weddingday - a.weddingday; });
            }
            var yrank = topring.find(x => x.couples.includes(message.author.id)) ? topring.indexOf(topring.find(x => x.couples.includes(message.author.id))) + 1 : "không có"
            for (i in topring) {
              des.push(`**${getTop(topring.indexOf(topring[i]) + 1)}** - ${topring[i].ring} **${client.users.cache.get(topring[i].couples[0]).username} ${heart} ${client.users.cache.get(topring[i].couples[1]).username}** ${secondsToDhms(Math.floor(topring[i].weddingday / 1000))}`)
            }
            var moneylb = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setAuthor(`Top Marry`, message.guild.iconURL({ dynamic: true }))
              .setDescription(des.join("\n"))
              .setFooter(`Xếp hạng của bạn là #${yrank}`)
            var msg = await message.channel.send({
              embeds: [moneylb]
            })
        }
      } else {
        res.sort(function(a, b) { return b.money - a.money; });
        let rank = 0
        for (var i = 0; i < res.length; i++) {
          var inGuild = message.guild.members.cache.get(res[i].userID)
          if (inGuild) {
            rank++
            lb.push({
              userID: res[i].userID,
              username: res[i].username,
              money: res[i].money,
              rank: rank
            })
          }
        }
        let top = parseInt(args[0]) || 25
        if (lb.length < top) {
          top = lb.length
        }
        let yrank = lb.filter(x => x.userID === message.author.id).map(x => x.rank)
        let description = lb.map((r) => `**${r.rank}** - ${r.username} | **${client.func.laysodep(r.money)} ${client.emoji.money}**`).slice(0, top).join("\n");
        const moneylb = new Discord.MessageEmbed()
          .setColor(client.config.botcolor)
          .setAuthor(`Top ${top} Bơ Của ` + message.guild.name + '', message.guild.iconURL({ dynamic: true }))
          .setFooter(`Xếp hạng của bạn là #${yrank}`)
          .setDescription(description);
        let msg = await message.channel.send({
          embeds: [moneylb]
        })
      }
    })
  }
};

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

function getTop(t) {
  let find = top[t.toString()]
  if(find) {
    return find
  } else {
    return t
  }
}