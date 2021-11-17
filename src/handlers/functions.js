const { readdirSync } = require("fs");
const { table, getBorderCharacters } = require("table");
const chalk = require("chalk");
let data = [["Command name", "Status"]];
const config = {
  border: getBorderCharacters("norc"),
  header: {
    alignment: "center",
    content: "Functions",
  },
};
module.exports = (client) => {
  let count = 0;
  const functions = readdirSync(`./src/functions/`).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of functions) {
    try {
      const fileName = `../functions/${file}`;
      delete require.cache[require.resolve(fileName)];
      const pull = require(fileName)(client);
      count++;
      data.push([
        chalk.hex("#E5C3FF")(file),
        chalk.hex("#4DFDBB")("loaded ✅"),
      ]);
    } catch (err) {
      console.error(err);
      data.push([chalk.hex("#E5C3FF")(file), chalk.hex("#FD4D50")(`error ❌`)]);
      continue;
    }
  }
  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${count} functions loaded`));
};
