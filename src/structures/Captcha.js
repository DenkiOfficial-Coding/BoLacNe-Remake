/**
 *userID: String,
  username: String,
  times: Number,
  counts: Number,
  totalCounts: Number,
 */
const ms = require("ms")
const Captcha = require("captcha-generator-alphanumeric").default;
const Discord = require('discord.js')
const Captchadata = require("../databases/models/captcha.js")
const random = require('random-number-csprng');
class CaptchaVerify {
  constructor() { }
  async runVerify(client, userId) {
    let member = await client.users.fetch(userId);
    if (!member) return undefined;
    let data = await Captchadata.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new Captchadata({
        userID: member.id,
        username: member.username,
        times: 0,
        counts: 0,
        totalCounts: 0
      })
      await data.save()
    }
    if (!data.totalCounts || data.totalCounts == 0) data.totalCounts = await random(100, 200)
    data.counts += 1
    await data.save()
    if (data.counts == data.totalCounts) {
      let captcha = new Captcha();
      let verifyValue = captcha._value
      let verifyDone = false
      let max_check = 3
      let msg = await member.send({ content: `**${client.emoji.warning} Bạn có phải người thật? Vui lòng nhập mã xác nhận mà bạn thấy trên hình ảnh này, bạn có \`${max_check}/3\` lần nhập.**`, files: [new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")] })
      data.counts = 0
      data.totalCounts = 0;
      await data.save()
      const filter = m => m.author.id == member.id
      const collector = msg.channel.createMessageCollector({ filter, max: 3, time: 60000 });
      collector.on('collect', m => {
        if (m.content == verifyValue) {
          verifyDone = true
          collector.stop()
          msg.edit({ content: `**${client.emoji.tick} Đã xác minh thành công!**` })
        } else {
          max_check -= 1
          if (max_check >= 3) {
            collector.stop()
          }
          msg.edit({ content: `**${client.emoji.x} Sai mã, bạn còn \`${max_check}/3\` lần nhập.**` })
        }
      });

      collector.on('end', async collected => {
        if (!verifyDone) {
          data.times += 1
          await data.save()
          if (data.times >= 3) {
            let banembed = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setTimestamp()
              .setDescription(`${client.emoji.tick} Bạn đã bị thêm vào danh sách đen của bot vì đã nghi vấn sử dụng tool để cày bơ!`)
            member.send({ embeds: [banembed] })
            await client.blacklist.blackListUser(client, member.id)
            let uembed = new Discord.MessageEmbed()
              .setColor(client.config.botcolor)
              .setTimestamp()
              .setDescription(`${client.emoji.tick} Đã thêm **${member.tag}** vào danh sách đen vì đã nghi vấn sử dụng tool để cày bơ!`)
            client.channels.cache
              .get("889838439007158322")
              .send({ embeds: [uembed] });
            data.times = 0;
            data.counts = 0;
            data.totalCounts = 0;
            await data.save()
          }
          msg.edit({ content: `**${client.emoji.x} Xác minh không thành công!**` })
        }
        let cembed = new Discord.MessageEmbed()
          .setColor(client.config.botcolor)
          .setTimestamp()
          .setDescription(`${verifyDone ? client.emoji.tick : client.emoji.x} Đã xác minh **${member.tag}** ${verifyDone ? "thành công" : "không thành công"}!`)
        client.channels.cache
          .get("893814768211750963")
          .send({ embeds: [cembed] });
      });
    }
  }
  async adminCaptcha(client, userId) {
    let member = await client.users.fetch(userId);
    if (!member) return undefined;
    let data = await Captchadata.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new Captchadata({
        userID: member.id,
        username: member.username,
        times: 0,
        counts: 0,
        totalCounts: 0
      })
      await data.save()
    }
    let captcha = new Captcha();
    let verifyValue = captcha._value
    let verifyDone = false
    let max_check = 3
    let msg = await member.send({ content: `**${client.emoji.warning} Bạn có phải người thật? Vui lòng nhập mã xác nhận mà bạn thấy trên hình ảnh này, bạn có \`${max_check}/3\` lần nhập.**`, files: [new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")] }).catch(async e => {
      console.log(e)
      console.log("ko gui dc captcha")
      data.times += 1
      await data.save()
      if (data.times >= 3) {
        await client.blacklist.blackListUser(client, member.id)
        let uembed = new Discord.MessageEmbed()
          .setColor(client.config.botcolor)
          .setTimestamp()
          .setDescription(`${client.emoji.tick} Đã thêm **${member.tag}** vào danh sách đen vì đã nghi vấn sử dụng tool để cày bơ!`)
        client.channels.cache
          .get("889838439007158322")
          .send({ embeds: [uembed] });
        data.times = 0;
        data.counts = 0;
        data.totalCounts = 0;
        await data.save()
      }
      let cembed = new Discord.MessageEmbed()
        .setColor(client.config.botcolor)
        .setTimestamp()
        .setDescription(`${verifyDone ? client.emoji.tick : client.emoji.x} Đã xác minh **${member.tag}** ${verifyDone ? "thành công" : "không thành công"}!`)
      return client.channels.cache
        .get("893814768211750963")
        .send({ embeds: [cembed] });
    })
    const filter = m => m.author.id == member.id
    const collector = msg.channel.createMessageCollector({ filter, max: 3, time: ms("5m") });
    collector.on('collect', m => {
      if (m.content == verifyValue) {
        verifyDone = true
        collector.stop()
        msg.edit({ content: `**${client.emoji.tick} Đã xác minh thành công!**` })
      } else {
        max_check -= 1
        if (max_check >= 3) {
          collector.stop()
        }
        msg.edit({ content: `**${client.emoji.x} Sai mã, bạn còn \`${max_check}/3\` lần nhập.**` })
      }
    });

    collector.on('end', async collected => {
      if (!verifyDone) {
        data.times += 1
        await data.save()
        if (data.times >= 3) {
          let banembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Bạn đã bị thêm vào danh sách đen của bot vì đã nghi vấn sử dụng tool để cày bơ!`)
          member.send({ embeds: [banembed] })
          await client.blacklist.blackListUser(client, member.id)
          let uembed = new Discord.MessageEmbed()
            .setColor(client.config.botcolor)
            .setTimestamp()
            .setDescription(`${client.emoji.tick} Đã thêm **${member.tag}** vào danh sách đen vì đã nghi vấn sử dụng tool để cày bơ!`)
          client.channels.cache
            .get("889838439007158322")
            .send({ embeds: [uembed] });
          data.times = 0;
          data.counts = 0;
          data.totalCounts = 0;
          await data.save()
        }
        msg.edit({ content: `**${client.emoji.x} Xác minh không thành công!**` })
      }
      let cembed = new Discord.MessageEmbed()
        .setColor(client.config.botcolor)
        .setTimestamp()
        .setDescription(`${verifyDone ? client.emoji.tick : client.emoji.x} Đã xác minh **${member.tag}** ${verifyDone ? "thành công" : "không thành công"}!`)
      client.channels.cache
        .get("893814768211750963")
        .send({ embeds: [cembed] });
    });
  }
}
module.exports = CaptchaVerify;