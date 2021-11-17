const { Client, Collection, Intents } = require("discord.js");
const config = require("../assets/json/config.json")
const { DiscordTogether } = require("discord-together");
const Economy = require("./Economy.js")
const AuditLog = require("./Auditlog.js")
const GiveawayManagerWithOwnDatabase = require("./Giveaway.js")
const Blacklist = require("./Blacklist.js")
const CaptchaVerify = require("./Captcha")
const ItemsManager = require("./Items")
module.exports = class extends Client {
  constructor(config) {
    super({
      allowedMentions: { prase: ["users", "roles"], repliedUser: false },
      intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
      ],
      partials: ["CHANNEL"],
    });
    this.commands = new Collection();
    this.aliases = new Collection();
    this.emoji = require("../assets/json/emojis.json");
    this.config = require("../assets/json/config.json");
    this.snipes = new Collection();
    this.esnipes = new Collection();
    this.func = require("../util/util.js");
    this.discordTogether = new DiscordTogether(this);
    this.db = new Economy();
    this.log = new AuditLog();
    this.blacklist = new Blacklist()
    this.check = new CaptchaVerify()
    this.item = new ItemsManager()
    this.xoso = false
    const manager = new GiveawayManagerWithOwnDatabase(this, {
      default: {
        botsCanWin: false,
        embedColor:this.config.botcolor,
        embedColorEnd: '#2f3136',
        reaction: '🎉'
      }
    });
    this.giveawaysManager = manager;
  }
  start(token) {
    const database = require("../databases/create");
    database.connect(config.MONGODB);
    process.on("unhandledRejection", (reason, p) => {
      console.log(`unhandledRejection: ${reason}`, p);
    });
    this.login(token);
  }
};
