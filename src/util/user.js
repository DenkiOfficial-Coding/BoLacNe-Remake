const Userdatas = require("../databases/models/economy");
const { MessageEmbed } = require("discord.js");
const giai = [
  "<:top_1:894197949050019871> Giải đặc biệt",
  "<:top_2:894198002938441788> Giải nhì",
  "<:top_3:894198037105221652> Giải ba",
];
const Itemdatas = require("../databases/models/items.js")
const Marrydatas = require("../databases/models/marry");
const Loterydatas = require("../databases/models/lottery");
const random = require("random-number-csprng");
const shuffle = require("shuffle-array");
let prize = [60, 15, 10];
module.exports = {
  muaVeSo: async function(client, userID) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let udata = await Userdatas.findOne({
      userID: member.id,
    });
    if (!udata) {
      udata = new Userdatas({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: 0,
      });
      await udata.save();
    }
    let ldata = await Loterydatas.findOne({
      clientID: client.user.id,
    });
    if (!ldata) {
      ldata = new Loterydatas({
        clientID: client.user.id,
        money: 0,
        datas: [],
        winners: [],
      });
      await ldata.save();
    }
    let laysove = await random(100000, 999999);
    let kiemtra = ldata.datas.find((e) => e.sove == laysove);
    while (kiemtra) {
      laysove = await random(100000, 999999);
      kiemtra = ldata.datas.find((e) => e.sove == laysove);
    }
    ldata.datas.push({
      userID: member.id,
      sove: laysove,
    });
    udata.money -= 100000;
    ldata.money += 100000;
    await udata.save();
    await ldata.save();
  },
  checkLottery: async function(client) {
    let description;
    let ldata = await Loterydatas.findOne({
      clientID: client.user.id,
    });
    if (!ldata) {
      ldata = new Loterydatas({
        clientID: client.user.id,
        money: 0,
        datas: [],
        winners: [],
      });
      await ldata.save();
    }
    let winner;
    if (ldata.datas.length > 0) {
      winner = shuffle(ldata.datas);
      if (ldata.datas.length >= 3) {
        winner = winner.slice(0, 3);
      } else if (ldata.datas.length < 3) {
        winner = winner.slice(0, ldata.datas.length);

        if (ldata.money < 100000) ldata.money += 300000;
      }
      let rprize = prize.map((e) => Math.floor((ldata.money * e) / 100));
      for (j = 0; j < winner.length; j++) {
        await client.db.addmoney(client, winner[j].userID, rprize[j]);
        ldata.money -= rprize[j];
      }
      ldata.winners = [];
      for (i1 = 0; i1 < winner.length; i1++) {
        var member = await client.users.fetch(winner[i1].userID)
        member.send(`🎉 Chúc mừng bạn đã đạt được **${giai[i1]}** của xổ số Bơ\n**Giải thưởng:** __**${client.func.laysodep(rprize[i1])}**__${client.emoji.money}\n**Vé của bạn:** \`${winner[i1].sove}\``).catch(e => console.log("Khong gui duocc :c"))
        ldata.winners.push({
          type: giai[i1],
          userID: winner[i1].userID,
          prize: rprize[i1],
          sove: winner[i1].sove,
        });
      }
      ldata.datas = [];
      await ldata.save();

      winner = winner.map(
        (e) =>
          `**${giai[winner.indexOf(e)]}: <@!${
          e.userID
          }> - ${client.func.laysodep(rprize[winner.indexOf(e)])}${client.emoji.money} | **\`${
          e.sove
          }\``
      );
      description = winner.join("\n");
    } else {
      description = "**Không thể quay số vì không đủ người tham ja!**";
    }
    let embed = new MessageEmbed()
      .setColor(client.config.botcolor)
      .setTimestamp()
      .setDescription(description);
    client.channels.cache.get("894098483894714369").send({ embeds: [embed] });
  },
  findUser: async function(client, userID) {
    let ldata = await Loterydatas.findOne({
      clientID: client.user.id,
    });
    if (!ldata) {
      ldata = new Loterydatas({
        clientID: client.user.id,
        money: 0,
        datas: [],
        winners: [],
      });
      await ldata.save();
    }
    if (ldata.datas.find((e) => e.userID == userID)) {
      return true;
    } else return false;
  },
  getWinner: async function(client) {
    let ldata = await Loterydatas.findOne({
      clientID: client.user.id,
    });
    if (!ldata) {
      ldata = new Loterydatas({
        clientID: client.user.id,
        money: 0,
        datas: [],
        winners: [],
      });
      await ldata.save();
    }
    return ldata.winners;
  },
  /** clientID: String,
  couples: [Object] */
  async marry(client, userId1, userId2, ringId) {
    let u1 = await client.users.fetch(userId1)
    let u2 = await client.users.fetch(userId2)
    let mdata = await Marrydatas.findOne({
      clientID: client.user.id
    })
    if (!mdata) {
      mdata = new Marrydatas({
        clientID: client.user.id,
        couples: []
      })
      await mdata.save()
    }
    let udata = await Userdatas.findOne({
      userID: u1.id,
    });
    if (!udata) {
      udata = new Userdatas({
        userID: u1.id,
        username: u1.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: 0,
      });
      await udata.save();
    }
    let items = udata.inv;
    if (items.find(e => e.id == ringId)) {
      items = removeItemOnce(items, items.find(e => e.id == ringId))
    }
    mdata.couples.push({
      couples: [u1.id, u2.id],
      description: "",
      ring: ringId,
      weddingday: Date.now()
    })
    await udata.save()
    await mdata.save()
  },
  async married(client, userId) {
    let member = await client.users.fetch(userId)
    let mdata = await Marrydatas.findOne({
      clientID: client.user.id
    })
    if (!mdata) {
      mdata = new Marrydatas({
        clientID: client.user.id,
        couples: [],
      })
      await mdata.save()
    }
    let marriedlist = mdata.couples
    let find = marriedlist.find(e => e.couples.includes(member.id))
    if (!find) return undefined;
    find.ringId = find.ring
    find.ring = await getEmoji(client, find.ring)
    return find
  },
  async changeSlogan(client, userId, value) {
    let member = await client.users.fetch(userId)
    let mdata = await Marrydatas.findOne({
      clientID: client.user.id
    })
    if (!mdata) {
      mdata = new Marrydatas({
        clientID: client.user.id,
        couples: [],
      })
      await mdata.save()
    }
    let marriedlist = mdata.couples
    let find = marriedlist.find(e => e.couples.includes(member.id))
    if (!find) return undefined;
    find.description = value
    marriedlist[marriedlist.indexOf(find)] = find
    mdata.couples = marriedlist
    await mdata.save()
  },
  async lyhon(client, userId) {
    let member = await client.users.fetch(userId)
    let mdata = await Marrydatas.findOne({
      clientID: client.user.id
    })
    if (!mdata) {
      mdata = new Marrydatas({
        clientID: client.user.id,
        couples: [],
      })
      await mdata.save()
    }
    let marrydatas = mdata.couples
    let find = marrydatas.find(e => e.couples.includes(member.id))
    if (find) {
      marrydatas = removeItemOnce(marrydatas, find)
    }
    mdata.couples = marrydatas
    await mdata.save()
  },
  async getTopRings(client) {
    let mdata = await Marrydatas.findOne({
      clientID: client.user.id
    })
    if (!mdata) {
      mdata = new Marrydatas({
        clientID: client.user.id,
        couples: [],
      })
      await mdata.save()
    }
    let DATE_NOW = Date.now()
    let top = mdata.couples
    let lb = []
    if (top.length > 0) {
      for (i of top) {
        lb.push({
          couples: i.couples,
          description: i.description,
          ringId: i.ring,
          ring: await getEmoji(client, i.ring),
          weddingday: DATE_NOW - i.weddingday
        })
      }
    }
    return lb
  }
};
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

async function getEmoji(client, id) {
  let idata = await Itemdatas.findOne({
    clientID: client.user.id
  })
  if (!idata) {
    idata = new Itemdatas({
      clientID: client.user.id,
      items: [],
      emojis: [], descriptions: [], names: []
    })
    await idata.save()
  }
  let emoji_object = idata.emojis
  let findemoji = emoji_object.find(e => e.id == id)
  if (!findemoji) return ""
  return findemoji.value
}