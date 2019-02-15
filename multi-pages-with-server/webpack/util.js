const glob = require('glob');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

exports.getEntry = (rootPages, htmlPath, chunksNames = []) => {
  let entry = {};
  const entryHTML = [];

  glob
    .sync('/**/index.@(js|jsx)', {
      root: rootPages,
      nodir: true
    })
    .forEach(file => {
      const relativePath = path.relative(rootPages, file);
      const { dir, name } = path.parse(relativePath);
      const entryName = path.format({ dir, name });
      entry[entryName] = [file];

      entryHTML.push(
        new HTMLWebpackPlugin({
          template: htmlPath,
          chunks: chunksNames.concat([entryName]),
          filename: path.join(dir, './index.html')
        })
      );
    });

  return { entry, entryHTML };
};

exports.getAlias = (aliasMap, root = __dirname) => {
  const result = {};
  for (let key in aliasMap) {
    result[key] = path.resolve(root, aliasMap[key]);
  }
  return result;
};
