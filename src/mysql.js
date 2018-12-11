const mysql = require("promise-mysql");
const chalk = require("chalk");
const { defaultSqlConfig } = require("./constants");

module.exports = {
  init: async config => {
    try {
      const conn = await mysql.createConnection(
        Object.assign(defaultSqlConfig, config)
      );
      this.conn = conn;
      return conn;
    } catch (e) {
      console.log(chalk.red("Mysql connection failed: ", e.message));
      return process.exit();
    }
  },

  getCount: async (tableName, filterRule) => {
    const connection = await this.conn;

    const res = await connection.query(
      `SELECT count(*) as count from ${tableName} ${
        filterRule ? `WHERE ${filterRule}` : ""
      }`
    );
    const count = (res && res[0] && res[0].count) || 0;
    return count;
  },

  getTableChunk: async (tableName, filterRule, size, lastID = 0) => {
    const connection = await this.conn;

    const results = await connection.query(
      `SELECT * from ${tableName} WHERE id>${lastID} ${
        filterRule ? `AND (${filterRule})` : ""
      }
        ORDER BY id ASC limit ${size}`
    );
    return results;
  }
};
