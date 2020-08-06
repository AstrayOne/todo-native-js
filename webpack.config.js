const path = require('path');

module.exports = {
  entry: './src/js/controller.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  mode: 'production'
};