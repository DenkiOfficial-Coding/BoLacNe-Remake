const { MessageEmbed } = require("discord.js");
   module.exports = {
    name: "love",
    category: "🔰 Thông Tin",
    cooldown: 10,
    description: "\`? LOVE?????????????\`",
    usage: "alove @hoangLe",
    run: async (client, message, args) => {
   const love = Math.random() * 100;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (member === message.member) return client.func.error("**Vui Lòng Hãy Tag Người Dùng Khác **", message.channel)
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .setImage("https://media.discordapp.net/attachments/799932589234323466/898022539698257930/unknown.png?width=701&height=701")
            .addField(`☁ **${message.author.username}** **${member.user.username}**`,
                `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

       message.channel.send({ embeds: [embed] })
    }}