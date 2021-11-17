const ms = require('ms');

module.exports = {
  name: "startgiveaway",
  aliases: ["start", "ga"],
  category: "🎉 Giveaway",
  description: "Tạo GiveAway!",
  usage: "<PREFIX>startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]",
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.permissions.has('VIEW_CHANNEL') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return client.func.error(client.emoji.x + "** Bạn cần quyền **\`MANAGE_MESSAGES\`** hoặc role \`Giveaways\` để bắt đầu Giveaway!." + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``, message.channel);
    }

    // Giveaway channel
    let giveawayChannel = message.channel;
    // If no channel is mentionned

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return client.func.error(client.emoji.x + "** Vui Lòng Nhập Thời Gian Hợp Lệ!" + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``, message.channel);
    }

    // Number of winners
    let giveawayNumberWinners = args[1].replace(/w/g,"")
    // If the specified number of winners is not a number
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
      return client.func.error(client.emoji.x + "** Vui Lòng Nhập Số Người Win Hợp Lệ!" + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``, message.channel);
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if (!giveawayPrize) {
      return client.func.error(client.emoji.x + "** Vui Lòng Nhập Tiêu Đề Để Bắt Đầu Giveaway.!" + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``, message.channel);
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayNumberWinners),
      // Who hosts this giveaway
      hostedBy: true ? message.author : null,
      // Messages
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      lastChance: {
        enabled: true,
        content: '**🔥 Cơ hội cuối để tham gia**',
        threshold: 5000,
        embedColor: '#FF0000'
      },
      messages: {
        giveaway: (client.config.everyoneMention ? "\n\n" : "") + "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: (client.config.everyoneMention ? "\n\n" : "") + "🎉🎉 **GIVEAWAY KẾT THÚC** 🎉🎉",
        drawing: "Thời gian còn lại: **{timestamp}**!",
        inviteToParticipate: "React 🎉 Để Tham Gia!",
        winMessage: "Chúc Mừng, {winners}! Bạn Đã Nhận Được **{prize}**!",
        winMessage: {
          embed: {
            description: `[Đi tới giveaway]({this.messageURL})`,
            color: '#2f3136'
          },
          content: `🎉 Chúc mừng {winners}! đã trúng **{this.prize}** | Tổ chức bởi: {this.hostedBy}!`
        },
        embedFooter: "{this.winnerCount} winers",
        noWinner: "Giveaway bị hủy, không có người tham gia hợp lệ.",
        hostedBy: `Tạo Bởi: {this.hostedBy}`,
        winners: "Winner(s)",
        endedAt: "Kết Thúc Lúc",
      }
    });
    try {
      message.delete()
    } catch { return; }
  }
};