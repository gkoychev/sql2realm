const fs = require("fs");
const chalk = require("chalk");
const { argv } = require("yargs")
  .usage("Usage: $0 <config file>")
  .options({
    s: {
      alias: "skip",
      describe: "skip some tables",
      array: true,
      default: []
    },
    c: {
      alias: "chunk",
      describe: "chunk size",
      int: true,
      default: 10000
    }
  })
  .demandCommand(1);

const loadJsonFile = require("load-json-file");

const fileName = argv._[0];

if (!fs.existsSync(fileName)) {
  console.log(chalk.red("file not found:", fileName));
  process.exit();
}

module.exports = { config: loadJsonFile.sync(fileName), argv };
