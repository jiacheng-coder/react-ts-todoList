const path = require('path');
const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, 'src/styles')],
          },
        },
      },
    ],
  })
);
