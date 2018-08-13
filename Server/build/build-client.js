const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const chalk = require('chalk')
const { resolve } = require('path')
const config = {
  target: 'node',
  context: resolve(__dirname, '../'),
  externals: [nodeExternals()],
  entry: {
    client: ['../Client/SSR.js'],
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      'node_modules',
    ],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'client.js',
    publicPath: '/',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('../Client')],
        options: {
          presets: [
            require.resolve('babel-preset-env'),
            [require.resolve('babel-preset-es2015'), { "modules": false }],
            require.resolve('babel-preset-stage-3'),
          ],
        },
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
}

webpack(config, function (err, stats) {
  if (err) throw err
  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
})