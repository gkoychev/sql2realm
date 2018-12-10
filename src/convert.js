const converters = {
  toLowerCase: (el, fieldName) => {
    el[fieldName] = String(el[fieldName]).toLowerCase();
    return el;
  },

  rename: (el, fieldName, newName) => {
    el[newName] = el[fieldName];
    delete el[fieldName];
    return el;
  },

  toList: (el, fieldName, split) => {
    el[fieldName] = el[fieldName]
      ? String(el[fieldName]).split(new RegExp(split))
      : [];
    return el;
  },

  toBool: (el, fieldName) => {
    el[fieldName] = Boolean(el[fieldName]);
    return el;
  }
};

const convertField = (el, fieldName, rules) => {
  Object.keys(rules).forEach(ruleName => {
    const params = rules[ruleName];
    el = converters[ruleName]
      ? converters[ruleName](el, fieldName, params)
      : el;
  });
  return el;
};

module.exports = {
  convert: (el, fields = {}) => {
    Object.keys(fields).forEach(fieldName => {
      el = convertField(el, fieldName, fields[fieldName]);
    });
    return el;
  }
};
