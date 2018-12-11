const isCamelCase = str =>
  typeof str === "string" ? /[A-Z]/.test(str) : false;

const stripSchemaName = str => {
  const m = str.match(/[A-Z][a-zA-Z]*/);
  return m && m[0];
};

module.exports = {
  getLastId: (items = []) => {
    const lastEl = items.slice(-1).pop();
    return lastEl && lastEl.id;
  },

  isCamelCase,
  stripSchemaName,

  getSchemas: (allTablesConfig = {}, schema = {}) => {
    const done = new Map([]);
    const stack = [schema];
    const result = [];

    const findSchemaByName = schemaName => {
      const nameToFind = stripSchemaName(schemaName);
      const tableName = Object.keys(allTablesConfig).find(
        name => allTablesConfig[name].schema.name === nameToFind
      );
      return tableName && allTablesConfig[tableName].schema;
    };

    function processItem(item) {
      if (!done.has(item)) {
        Object.keys(item.properties || {}).forEach(key => {
          const type = item.properties[key];
          if (isCamelCase(type)) {
            const newSchema = findSchemaByName(type);
            if (newSchema) stack.push(newSchema);
          }
        });
        done.set(item, true);
        result.push(item);
      }
    }

    while (stack.length) {
      const next = stack.pop();
      processItem(next);
    }

    return result;
  }
};
