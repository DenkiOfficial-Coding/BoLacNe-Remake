
const { MessageEmbed } = require("discord.js");
async function owoToBo(client) {
  /*client.on("messageCreate", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.id != "872768260196683816") return
    const filter = (m) => m.author.id === "408785106942164992";
    const host = await client.users.fetch("745578649889144925")
    if (message.content.replace(/ /g, '').toLowerCase().startsWith("owo" + "give") || message.content.replace(/ /g, '').toLowerCase().startsWith("o" + "give")) {
      message.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ["time"] }).then(async (collected) => {
        const user = message.guild.members.cache.get(message.author.id)
        const msg = collected.first().content
        if (!msg.includes("💳")) return
        const str = msg.replace('**💳 | ', '').replace('** sent **', '').replace(' cowoncy** to **', '').replace('**!', '').replace(message.author.username, '').replace(host.username, '').replace(/,/g, '')
        const cash = parseInt(str)
        console.log(cash)
        if (msg.includes(message.author.username) && msg.includes(host.username)) {
          let embed = new MessageEmbed()
            .setColor(client.config.botcolor)
            .setDescription(`${client.emoji.tick}${user.user.username} đã đổi thành công __**${client.func.laysodep(cash)}**__ **cowoncy** sang ${client.emoji.money}`)
          message.member.send({ embeds: [embed] })
          await client.db.addmoney(client, message.author.id, cash)
          client.channels.cache
            .get("888704514260090880")
            .send({ embeds: [embed] });
        }
      }).catch((e) => { console.log(e) })

    }
  }); */
}
module.exports = owoToBo;
