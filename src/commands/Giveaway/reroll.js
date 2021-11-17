
module.exports = {
  name: "rerollgiveaway",
  aliases: ["rr", "reroll"],
  category: "🎉 Giveaway",
  description: "Quay Lại Người Chiến Thắng!",
  usage: "<PREFIX>rerollgiveaway [ID GA]",
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.permissions.has('SEND_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return client.func.error(client.emoji.x + "** Bạn cần quyền **\`MANAGE_MESSAGES\`** hoặc role \`Giveaways\` để chọn lại người thắng!." + `\nSử dụng: **\`${client.config.PREFIX}rerollgiveaway [ID GA]\``, message.channel);
    }

    // If no message Id or giveaway name is specified
    if (!args[0]) {
      return client.func.error(client.emoji.x + "** Bạn phải chỉ định một ID Giveaway Hợp Lệ!" + `\nSử dụng: **\`${client.config.PREFIX}rerollgiveaway [ID GA]\``, message.channel);
    }

    // try to found the giveaway with prize then with ID
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find((g) => g.messageId === args[0]);

    // If no giveaway was found
    if (!giveaway) {
      return client.func.error(client.emoji.x + `** Không Tìm Thấy GA Với ID Này \`${args.join(' ')}\`**`, message.channel);
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageId,{
      winnerCount: 1,
      messages: {
        congrat: {
          embed: {
              description: `[**Đi tới giveaway**]({this.messageURL})`,
              color: '#2f3136'
            },
            content: `🎉 Chúc mừng {winners}! đã trúng **{this.prize}** | Tổ chức bởi: {this.hostedBy}!`
          },
          error: {
            embed: {
              description: '' + client.emoji.x + ' **Không có đủ người tham gia hợp lệ! không thể tìm ra người chiến thắng mới!**',
              color: client.config.botcolor
            }
          }
        }
      }).catch((e) => {
        if (e.startsWith(`Giveaway with message Id ${giveaway.messageId} is not ended.`)) {
          return client.func.error(client.emoji.x + `** Giveaway này chưa kết thúc!**`, message.channel);
        } else {
          console.error(e);
          return client.func.error(client.emoji.x + '** Lỗi Hệ Thống Vui Lòng Contact Support, Staff...**', message.channel);
        }
      });

  }
};
