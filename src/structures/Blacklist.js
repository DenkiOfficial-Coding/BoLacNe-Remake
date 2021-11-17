const Blacklistdata = require("../databases/models/blacklist")
/**
 *clientID: String,
  users: [String],
  guilds: [String]
 */
class Blacklist {
  constructor() { }
  async blackListUser(client, userID) {
    let member = await client.users.fetch(userID)
    if (!member) return undefined;
    let data = await Blacklistdata.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Blacklistdata({
        clientID: client.user.id,
        users: [member.id],
        guilds: []
      })
      await data.save()
    } else {
      data.users.push(member.id)
      await data.save()
    }
  }
  async blackListGuild(client, guildID) {
    let guild = client.guilds.cache.get(guildID)
    if (!guild) return undefined;
    let data = await Blacklistdata.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Blacklistdata({
        clientID: client.user.id,
        users: [],
        guilds: [guild.id]
      })
      await data.save()
    } else {
      data.guilds.push(guild.id)
      await data.save()
    }
  }
  async removeBlackListUser(client, userID) {
    let member = await client.users.fetch(userID)
    if (!member) return undefined;
    let data = await Blacklistdata.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Blacklistdata({
        clientID: client.user.id,
        users: [],
        guilds: []
      })
      await data.save()
    } else {
      data.users = removeItemOnce(data.users, member.id)
      await data.save()
    }
  }
  async removeBlackListGuild(client, guildID) {
    let guild = client.guilds.cache.get(guildID)
    if (!guild) return undefined;
    let data = await Blacklistdata.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Blacklistdata({
        clientID: client.user.id,
        users: [],
        guilds: []
      })
      await data.save()
    } else {
      data.guilds = removeItemOnce(data.guilds, guild.id)
      await data.save()
    }
  }
  async getAll(client) {
    let ob;
    let data = await Blacklistdata.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Blacklistdata({
        clientID: client.user.id,
        users: [],
        guilds: []
      })
      await data.save()
      ob = {
        users: data.users,
        guilds: data.guilds
      }
    } else {
      ob = {
        users: data.users,
        guilds: data.guilds
      }
    }
    return ob
  }
}
module.exports = Blacklist;

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
