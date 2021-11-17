const {
  Client,
  MessageEmbed,
  Util,
  Collection,
  MessageManager,
} = require("discord.js");
const func = require("../../util/user")
let ITEMS_ID = ["01", "02", "03", "04", "05", "06"];
const countOccurrences = (arr) =>
  arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
const {
  MessageActionRow,
  MessageButton
} = require("discord.js");
const ms = require("ms");
let marry_ring;
let selected = false;
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
module.exports = {
  name: "marry",
  aliases: ["marry", "kethon", "cuoi"],
  category: "🥑 TiềnBơ",
  description: "Kết hôn với ai đó",
  usage: "<PREFIX>marry [info | slogan | user] [@user]",
  run: async (client, message, args) => {
    let getmarry1 = await func.married(client, message.author.id)
    if (!args[0]) {
      return client.func.error(
        `${client.emoji.x} Vui lòng nhập lệnh phụ \`info\`,\`user\`,\`slogan\``,
        message.channel
      )
    }
    if (!["user", "info", "slogan"].includes(args[0])) {
      return client.func.error(
        `${client.emoji.x} Vui lòng nhập lệnh phụ \`info\`,\`user\`,\`slogan\``,
        message.channel
      )
    }
    if (args[0] == "info") {
      if (!getmarry1) return client.func.error(
        `${client.emoji.x} Bạn làm gì có ny mà check :)`,
        message.channel
      )
      let loverrr = client.users.cache.get(removeItemOnce(getmarry1.couples, message.author.id)[0])
      let membed = new MessageEmbed()
        .setAuthor(`${message.author.username} 💗 ${loverrr.username}`, message.author.displayAvatarURL())
        .setColor(client.config.botcolor)
        .setTimestamp()
        .setDescription(`${getmarry1.description.length > 0 ? `${getmarry1.description}\n` : ""}${getmarry1.ring} Ngày kết hôn: <t:${Math.floor(getmarry1.weddingday / 1000)}:R>`)
      return message.reply({ embeds: [membed] })
    } else if (args[0] == "slogan") {
      if (!getmarry1) return client.func.error(
        `${client.emoji.x} Lệnh này chỉ dùng cho người đã có ny thoii =))`,
        message.channel
      )
      if (!ITEMS_ID.slice(5).includes(getmarry1.ringId)) return client.func.error(
        `${client.emoji.x} Chỉ có __**Love Home**__ mới đổi slogan được nhé!`,
        message.channel
      )
      let slogan = args.slice(1).join(" ")
      if (!slogan) {
        return client.func.error(
          `${client.emoji.x} Vui lòng nhập sologan`,
          message.channel
        )
      }
      await func.changeSlogan(client, message.author.id, slogan)
      var sloganembed = new MessageEmbed()
        .setTimestamp()
        .setColor(client.config.botcolor)
      return message.reply({ embeds: [sloganembed] })
    } else if (args[0] == "user") {
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[1]);
      if (!member)
        return client.func.error(
          `${client.emoji.x} Người dùng không hợp lệ!`,
          message.channel
        );
      let getmarry2 = await func.married(client, member.id)
      if (getmarry1) {
        return client.func.error(
          `${client.emoji.x} Ara ara, định ngoại tềnh hả!`,
          message.channel
        )
      } else if (getmarry2) {
        return client.func.error(
          `${client.emoji.x} Bạn này có ny rồi nha, chọn người khác đee!`,
          message.channel
        )
      }
      let inv = await client.item.inventory(client, message.author.id);
      let raw_inv = countOccurrences(inv.map((e) => `${e.emoji}`));
      let iname = Object.keys(raw_inv);
      let ivalue = Object.values(raw_inv);
      let main_inv = [];
      for (i = 0; i < iname.length; i++) {
        main_inv.push({
          name: iname[i],
          value: ivalue[i],
        });
      }
      main_inv = main_inv.map((e) => `${e.name}${client.func.laysonho(e.value)}`);
      const filters = (i) => i.isButton() && i.user.id === message.author.id;
      let all_ring = [];
      for (i of inv) {
        if (ITEMS_ID.includes(i.id)) {
          all_ring.push(i);
        }
      }
      if (!all_ring.length) {
        return client.func.error(
          `${client.emoji.x} Bạn cần có nhẫn để kết hôn!\n\nSử dụng: \`${client.config.PREFIX}shop\` để xem các loại nhẫn!`,
          message.channel
        );
      } else if (all_ring.length == 1) {
        marry_ring = all_ring[0].id;
        await ketHon(client, message, member, marry_ring)
      } else if (all_ring.length > 1) {
        let rings = [];
        for (i of all_ring) {
          if (!rings.find((e) => e.id == i.id)) {
            rings.push(i);
          }
        }
        let buttons = [];
        let embed = new MessageEmbed()
          .setTimestamp()
          .setAuthor(
            `Chọn loại nhẫn mà bạn muốn dùng để kết hôn!`,
            message.author.displayAvatarURL()
          )
          .setColor(client.config.botcolor)
          .setDescription(`${main_inv.join(" ")}`);
        for (i in rings) {
          buttons[i] = new MessageButton()
            .setCustomId(rings[i].id)
            .setEmoji(rings[i].emoji.replace(/(<:[a-z|A-z]{0,100}:|>)/g, ""))
            .setLabel(rings[i].name)
            .setStyle("PRIMARY");
        }

        const row = new MessageActionRow().addComponents(buttons);
        let msg1 = await message.reply({
          embeds: [embed],
          components: [row],
        });
        const chosecollector = msg1.createMessageComponentCollector({
          filters,
          componentType: "BUTTON",
          time: ms("10m"),
        });
        chosecollector.on("collect", async (c) => {
          if (ITEMS_ID.includes(c.customId)) {
            marry_ring = c.customId;
            await msg1.delete()
            chosecollector.stop()
            await ketHon(client, message, member, marry_ring)
          }
        });
        chosecollector.on("end", (collected) => {
          if (!collected.size) {
            return client.func.error(
              `${client.emoji.x} Kết hôn không thành công rồi :c`,
              message.channel
            )
          }
        });
      }
    }
  },
};
async function ketHon(client, message, lover, ringId) {
  let acp1 = false
  let acp2 = false
  let des = [`**${message.author.username}**: ${acp1 ? "đã đồng ý" : "chưa đồng ý"}`, `**${lover.user.username}**: ${acp2 ? "đã đồng ý" : "chưa đồng ý"}`]
  const filters1 = (i) => i.isButton() && i.user.id == message.author.id || i.user.id == lover.user.id
  let marryEmbed = new MessageEmbed()
    .setTimestamp()
    .setAuthor(
      `Cả hai người hãy nhấn đồng ý để kết hôn :>!`,
      message.author.displayAvatarURL()
    )
    .setColor(client.config.botcolor)
    .setDescription(des.join("\n"));
  let accept = new MessageButton()
    .setCustomId("marry")
    .setEmoji("💗")
    .setLabel(`Đồng ý`)
    .setStyle("PRIMARY");
  let acceptrow = new MessageActionRow().addComponents(accept);
  let msg2 = await message.reply({
    content: `${message.author} ${lover}`,
    embeds: [marryEmbed],
    components: [acceptrow],
  });
  let acptcollector = await msg2.createMessageComponentCollector({
    filters1,
    componentType: "BUTTON",
    time: ms("15m")
  });
  acptcollector.on("collect", async (c) => {
    await c.deferUpdate()
    console.log(c.user.id)
    console.log(lover.user.id)
    if (c.user.id == message.author.id) {
      acp1 = true
      des = [`**${message.author.username}**: ${acp1 ? "đã đồng ý" : "chưa đồng ý"}`, `**${lover.user.username}**: ${acp2 ? "đã đồng ý" : "chưa đồng ý"}`]
      marryEmbed.setDescription(des.join("\n"));
      acceptrow = new MessageActionRow().addComponents(accept);
      msg2.edit({
        content: `${message.author} ${lover}`,
        embeds: [marryEmbed],
        components: [acceptrow],
      })
    } else if (c.user.id == lover.user.id) {
      acp2 = true
      des = [`**${message.author.username}**: ${acp1 ? "đã đồng ý" : "chưa đồng ý"}`, `**${lover.user.username}**: ${acp2 ? "đã đồng ý" : "chưa đồng ý"}`]
      marryEmbed.setDescription(des.join("\n"));
      acceptrow = new MessageActionRow().addComponents(accept);
      msg2.edit({
        content: `${message.author} ${lover}`,
        embeds: [marryEmbed],
        components: [acceptrow],
      })
    }
    if (acp1 && acp2) {
      acptcollector.stop()
    }
  });
  acptcollector.on("end", async (collected) => {
    if (collected.size == 0) {
      return client.func.error(
        `${client.emoji.x} Kết hôn không thành công rồi :c`,
        message.channel
      )
    } else if (acp1 && acp2) {
      marryEmbed.setAuthor(
        `Đã kết hôn thành công`,
        message.author.displayAvatarURL()
      )
      await func.marry(client, message.author.id, lover.user.id, ringId)
      await msg2.edit({
        embeds: [marryEmbed],
        components: []
      })
    }
  });
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