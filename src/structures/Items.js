/**
 * clientID: String,
  items: [Object],
 */
const ms = require("ms")
const Discord = require('discord.js')
const random = require('random-number-csprng');
const Itemdatas = require("../databases/models/items.js")
const Userdatas = require("../databases/models/economy.js");
class ItemsManager {
  constructor() { }
  async additem(client, id, name) {
    let item_object;
    let data = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await data.save()
    }
    if (data.items.find(e => e.id == id)) {
      throw new Error('item already exists');
    }
    data.names.push({
          id: id,
          value: name
    })
    item_object = {
      id: id,
      name: id,
      description:id,
      emoji: id,
      price: 0,
    }
    data.items.push(item_object)
    await data.save()
  }
  async edititem(client, type, id, value) {
    let data = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await data.save()
    }
    let item_data = data.items
    let item_object = item_data.find(e => e.id == id)
    let vitri = data.items.indexOf(item_object)
    if (!item_object) {
      throw new Error('item not found');
    }
    if (type == "emoji") {
      item_object[type] = id
      let emoji_object = data.emojis
      let findemoji = emoji_object.find(e => e.id == id)
      if (findemoji) {
        let vitri_emoji = emoji_object.indexOf(findemoji)
        findemoji.value = value
        emoji_object[vitri_emoji] = findemoji
      } else {
        emoji_object.push({
          id: id,
          value: value
        })
      }
      item_data[vitri] = item_object
      data.emojis = emoji_object
      data.items = item_data
    } else if (type == "description") {
      item_object[type] = id
      let des_object = data.descriptions
      let finddes = des_object.find(e => e.id == id)
      if (finddes) {
        let vitri_des = des_object.indexOf(finddes)
        finddes.value = value
        des_object[vitri_des] = finddes
      } else {
        des_object.push({
          id: id,
          value: value
        })
      }
      item_data[vitri] = item_object
      data.descriptions = des_object
      data.items = item_data
    } else if (type == "name") {
      item_object[type] = id
      let name_object = data.names
      let findname = name_object.find(e => e.id == id)
      if (findname) {
        let vitri_name = name_object.indexOf(findname)
        findname.value = value
        name_object[vitri_name] = finddes
      } else {
        name_object.push({
          id: id,
          value: value
        })
      }
      item_data[vitri] = item_object
      data.names = name_object
      data.items = item_data
    } else {
      item_object[type] = value
      item_data[vitri] = item_object
      data.items = item_data
    }
    await data.save()
  }
  async removeitem(client, id) {
    let data = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await data.save()
    }
    let item_data = data.items
    let item_object = item_data.find(e => e.id == id)
    if (!item_object) {
      throw new Error('item not found');
    }
    item_data = removeItemOnce(item_data, item_object)
    data.items = item_data
    await data.save()
  }
  async getAll(client) {
    let data = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!data) {
      data = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await data.save()
    }
    let inv_ob = data.items
    for (var i = 0; i < inv_ob.length; i++) {
      inv_ob[i].emoji = await this.getEmoji(client, inv_ob[i].id)
      inv_ob[i].name = await this.getName(client, inv_ob[i].id)
      inv_ob[i].description = await this.getDescription(client, inv_ob[i].id)
    }
    return data.items
  }
  async buyitem(client, userID, id) {
    let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    let member = await client.users.fetch(userID);
    if (!member) {
      throw new Error('user not found');
    }
    let udata = await Userdatas.findOne({
      userID: member.id,
    });
    let item_data = idata.items
    let item_object = item_data.find(e => e.id == id)
    if (!item_object) {
      throw new Error('item not found');
    }
    udata.money -= item_object.price
    udata.inv.push(item_object)
    await udata.save()
  }
  async getitem(client, id) {
    let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    let item_data = idata.items
    let item_object = item_data.find(e => e.id == id)
    item_object.emoji = await this.getEmoji(client, item_object.id)
    item_object.name = await this.getName(client, item_object.id)
    item_object.description = await this.getDescription(client, item_object.id)
    if (!item_object) return undefined;
    return item_object
  }
  async getAllEmojis(client, id) {
    let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    return emojis
  }
  async getEmoji(client, id) {
    let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    let emoji_object = idata.emojis
    let findemoji = emoji_object.find(e => e.id == id)
    if (!findemoji) return ""
    return findemoji.value
  }
  async getDescription(client, id) {
    let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    let des_object = idata.descriptions
    let findemoji = des_object.find(e => e.id == id)
    if (!findemoji) return ""
    return findemoji.value
  }
  async getName(client,id) {
     let idata = await Itemdatas.findOne({
      clientID: client.user.id
    })
    if (!idata) {
      idata = new Itemdatas({
        clientID: client.user.id,
        items: [],
        emojis: [], descriptions: [],names:[]
      })
      await idata.save()
    }
    let des_object = idata.names
    let findemoji = des_object.find(e => e.id == id)
    if (!findemoji) return ""
    return findemoji.value
  }
  async inventory(client, userID) {
    let member = await client.users.fetch(userID);
    if (!member) undefined;
    let udata = await Userdatas.findOne({
      userID: member.id,
    });
    let inv_ob = udata.inv
    for (var i = 0; i < inv_ob.length; i++) {
      inv_ob[i].emoji = await this.getEmoji(client, inv_ob[i].id)
      inv_ob[i].description = await this.getDescription(client, inv_ob[i].id)
      inv_ob[i].name = await this.getName(client, inv_ob[i].id)
    }
    return inv_ob
  }
}
module.exports = ItemsManager;

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}