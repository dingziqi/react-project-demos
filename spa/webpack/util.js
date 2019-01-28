const path = require('path');

exports.getAlias = (aliasMap, root = __dirname) => {
  const result = {};
  for (let key in aliasMap) {
    result[key] = path.resolve(root, aliasMap[key]);
  }
  return result;
};
