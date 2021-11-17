const Discord = require('discord.js')
const { laysodep } = require('../util/util')
module.exports = async (client, oldguild) => {
  try {
    let guildowner = await client.users.fetch(oldguild.ownerId)
    let embed = new Discord.MessageEmbed()
      .setDescription(`Now bot in ${client.guilds.cache.size} guilds`)
      .setTitle("Bot left the server!")
      .addField('Guild Name: ', `${oldguild.name}`, true)
      .addField('Guild ID: ', `${oldguild.id}`, true)
      .addField('Guild members: ', `${oldguild.memberCount}`, true)
      .addField("Owner server: ", guildowner.tag, true)
      .setFooter(`OwnerID: ${oldguild.ownerId}`)
      .setColor("#FF0000")
    let channel = client.channels.cache.get('888648769414004746')
    if (channel) {
      channel.send({ embeds: [embed] });
    } else return null

  } catch (e) {
    throw e
  }

}
