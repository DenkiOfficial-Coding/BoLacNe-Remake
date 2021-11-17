const random = require("random-number-csprng");
const func = require("../util/user")
module.exports = async (client) => {
  let time = getTime(new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}))
  let gio = 7
  let phut = 0
  let sau = phut+1
  if(time.hour == gio && time.minute == phut && client.xoso == false && time.meridiem == "PM") {
      client.xoso = true
      await func.checkLottery(client)
    } else if(time.hour == gio && time.minute == sau && client.xoso == true && time.meridiem == "PM") {
      client.xoso = false
    }
};
function getNumber(num) {
  if(num.toString().length == 1) {
    return "0"+num.toString()
  } else  return num.toString()
}
function getTime(str) {
  let a = str.split(" ")
  let b = a[1].split(":")
  return {
    hour:  parseInt(b[0]),
    minute: parseInt(b[1]),
    second: parseInt(b[2]),
    meridiem: a[2]
  }
}