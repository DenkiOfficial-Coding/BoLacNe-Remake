const { readdirSync } = require("fs");
const { table, getBorderCharacters } = require("table");
const chalk = require("chalk");
let data = [["Command name", "Status"]];
const config = {
  border: getBorderCharacters("norc"),
  header: {
    alignment: "center",
    content: "Commands",
  },
};
module.exports = (client) => {
  let count = 0;
  readdirSync("./src/commands/").forEach((dir) => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const fileName = `../commands/${dir}/${file}`;
      delete require.cache[require.resolve(fileName)];
      const pull = require(fileName);
      if (pull.name) {
        count++;
        client.commands.set(pull.name, pull);
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#4DFDBB")("loaded ✅"),
        ]);
      } else {
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#FD4D50")(`error ❌`),
        ]);
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
    }
  });

  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${count} commands loaded`));
};
