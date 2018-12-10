#!/usr/bin/env node

require("pretty-error").start();
const { config } = require("./src/loadconfig");
const Realm = require("./src/realm");

(async function main() {
  const realm = await Realm.init(
    config.realm,
    config.tables.derivative_form.schema
  );

  const hrstart = process.hrtime();
  const res = realm.objects("Derivative").filtered("name contains 'фар'");
  const hrend = process.hrtime(hrstart);
  console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
  console.log(res.length);

  process.exit();
})();
