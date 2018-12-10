#!/usr/bin/env node

require("pretty-error").start();
const { config } = require("./src/loadconfig");
const mysql = require("./src/mysql");

(async function main() {
  const connection = await mysql.init(config.mysql);

  const res = await connection.query(
    "select count(*) as count from derivative_form limit 2"
  );
  console.log(res);

  connection.end();
  process.exit();
})();
