const Timeout = new Set();
const { MessageEmbed, Message, Client, Collection } = require("discord.js");
const ms = require("ms");
const cooldowns = new Collection();
const whitelist = ["515743179375509515","576712041117515777","881741078963818536","881739210996981820","852921776191307798","719544108779307071","752006076609593377","393709500546154506","866126148849500161","634143608882200576","467904492873056257","487112108022956042","885196923882078228","756410843389886504","689716154608123960","855477790883446844","851524198409306152","680982487362568201","813755662974713877","742738774227812362","851339323093549066","885047354259042314","696778070203301910","803600749535821834","855037636640243752"]
module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  let prefix = client.config.PREFIX;
  message.channel.messages.fetch();
  if (message.content.includes(`${client.user.id}`))
    message.channel.send({
      embeds: [
        {
          color: client.config.botcolor,
          description: `**${client.emoji.tick} Prefix của tớ là: **\`${prefix}\``,
        },
      ],
    });
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    let blacklists = await client.blacklist.getAll(client)
    if(blacklists.users.includes(message.author.id) && !client.config.ownerID.includes(message.author.id)) return
    if(blacklists.guilds.includes(message.guild.id) && !client.config.ownerID.includes(message.author.id)) return
    if (!checkMsgPerm(message)) return message.author.send(`**${client.emoji.warning} Tớ không có đủ quyền ở kênh ${message.channel} . Hãy cho mình những quyền được liệt kê bên dưới để có thể chạy được một cách tốt  nhất!**\n\`\`\`fix\nSEND_MESSAGES, VIEW_CHANNEL, READ_MESSAGE_HISTORY, EMBED_LINKS, ADD_REACTIONS\n\`\`\``).catch(err => console.log(`${message.author.id} không mở DMs`));
    let check = false;
    let owners = client.config.ownerID;
    if (!owners.includes(message.author.id)) check = true;
    if(message.author.id == "852921776191307798") check = false;
    if (command.owner === true && check == true) return;
    if (!cooldowns.has(command.name))
      cooldowns.set(command.name, new Collection());
    console.log(
      `${message.author.tag} used command ${command.name} in server ${message.guild.name}`
    );
    client.channels.cache.get('888648548848115712').send(`${message.author.tag} | ID: ${message.author.id} used command \`${command.name}\` in ${message.guild.name} [${message.guild.id}] | ${message.channel.name} (${message.channel.id}) <t:${Math.floor(Date.now() / 1000)}>`)
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    if (timestamps.has(message.author.id) && check == true) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message
          .reply({
            embeds: [
              {
                color: client.config.botcolor,
                description: `**⏱ Bạn chỉ có thể sử dụng lệnh này sau **\`${timeLeft.toFixed(
                  1
                )}\`**s**`,
              },
            ],
          })
          .then(msg => { setTimeout(() => msg.delete(), timeLeft * 1000) })
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    let botperms = []
    if (command.clientPermissions) {
      command.clientPermissions.forEach((p) => {
        if (!message.guild.me.permissions.has(p)) botperms.push("`" + p + "`");
      });
      if (botperms.length > 0) return client.func.error(
        `${client.emoji.warning} Tớ cần quyền ${botperms.join(
          ", "
        )} để có thể chạy lệnh này`, message.channel
      )
    }
    function checkMsgPerm(message) {
      const botPerms = message.channel.permissionsFor(client.user);
      return botPerms.has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS']);
    }
    if(!whitelist.includes(message.author.id)) {
      await client.check.runVerify(client,message.author.id)
    }
    command.run(client, message, args);
  }
};
