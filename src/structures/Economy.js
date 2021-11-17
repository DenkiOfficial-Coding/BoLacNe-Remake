const { Util, Collection, MessageEmbed, Structures } = require("discord.js");
const MoneyData = require("../databases/models/economy.js");
class Economy {
  constructor() { }
  async fetch(client, userID) {
    let ob;
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: 0
      });
      data.save();
      ob = {
        userID: data.userID,
        username: data.username,
        money: data.money,
        inv: data.inv,
        daily: data.daily,
        weekly: data.weekly,
        giaobo: data.giaobo
      };
    } else {
      ob = {
        userID: data.userID,
        username: data.username,
        money: data.money,
        inv: data.inv,
        daily: data.daily,
        weekly: data.weekly,
        giaobo: data.giaobo
      };
    }
    return ob;
  }
  async addmoney(client, userID, amount) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (member.id == "852921776191307798") amount += amount * 50 / 100
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: amount,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: 0
      });
      data.save();
    } else {

      data.money += amount
      data.save();
    }
  }
  async submoney(client, userID, amount) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: 0
      });
      data.save();
    } else {
      data.money -= amount;
      data.save();
    }
  }
  async setdaily(client, userID) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: Date.now(),
        weekly: 0,
        giaobo: 0
      });
      data.save();
    } else {
      data.daily = Date.now();
      data.save();
    }
  }
  async setweekly(client, userID) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: Date.now(),
        giaobo: 0
      });
      data.save();
    } else {
      data.weekly = Date.now();
      data.save();
    }
  }
  async setgiaobo(client, userID) {
    let member = await client.users.fetch(userID);
    if (!member) return undefined;
    let data = await MoneyData.findOne({
      userID: member.id,
    });
    if (!data) {
      data = new MoneyData({
        userID: member.id,
        username: member.username,
        money: 0,
        inv: [],
        lb: "all",
        daily: 0,
        weekly: 0,
        giaobo: Date.now()
      });
      data.save();
    } else {
      data.giaobo = Date.now();
      data.save();
    }
  }
}
module.exports = Economy;
