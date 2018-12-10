const { resolve } = require("path");
const chalk = require("chalk");
const Realm = require("realm");
const { defaultRealmConfig } = require("./constants");

const baseDir = resolve(__dirname, "../../");
function getDbPath(dir) {
  return resolve(baseDir, dir);
}

module.exports = {
  init: (config = defaultRealmConfig, schema) => {
    const options = {
      path: config.database ? getDbPath(config.database) : undefined,
      schema: Array.isArray(schema) ? schema : [schema]
    };
    return Realm.open(options).catch(error => {
      console.log(chalk.red(error));
      process.exit();
    });
  },

  erase: (config = defaultRealmConfig) => {
    const options = {
      path: config.database ? getDbPath(config.database) : undefined
    };
    Realm.deleteFile(options);
  }
};
