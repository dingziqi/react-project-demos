const path = require('path');

const root = path.resolve(__dirname, '../');

module.exports = {
  path: {
    root: root,
    dist: path.resolve(root, 'dist'),
    pages: path.resolve(root, 'client/pages'),
    html: path.resolve(root, 'client/template.html')
  }
}