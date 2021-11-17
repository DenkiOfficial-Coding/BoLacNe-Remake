const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "uptime",
    aliases: ["ut","uptime","up"],
    usage: "<PREFIX>uptime",
    description: "View bot uptime",
    owner: true,
    run: async (client, message, args) => {
    let uptime = ``
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60

   uptime += `\`\`\`ARM\n ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\n\`\`\``


   let uptimeembed = new Discord.MessageEmbed()
   .setColor(client.config.botclolor)
   .setTitle('⏱ Uptime')
   .setDescription(uptime)
   .setTimestamp()
   .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }));
   message.channel.send({embeds:[uptimeembed]})
    }
}

