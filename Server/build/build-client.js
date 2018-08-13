const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const chalk = require('chalk')
const argv = require('yargs').argv
const { resolve } = require('path')
const projectRoot = path.resolve(__dirname, '../../')
let webpackConfig = {
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


if(argv.prod) {
  webpackConfig.plugins.push(new WebpackShellPlugin({
    onBuildStart: [
      `rm -rf ${path.resolve(projectRoot, 'Prod/Client/dist')}`,
    ],
    onBuildEnd: [
      `mkdir ${path.resolve(projectRoot, 'Prod/Client/dist')}`,
      `cp ${path.resolve(projectRoot, 'README.md')} ${path.resolve(projectRoot, 'Prod/Client')}`,
      `cp ${path.resolve(projectRoot, 'LICENSE.md')} ${path.resolve(projectRoot, 'Prod/Client')}`,
      `cp ${path.resolve(projectRoot, 'Client/copyfile/.htaccess')} ${path.resolve(projectRoot, 'Prod/Client/dist')}`,
      `cp ${path.resolve(projectRoot, 'Client/copyfile/ssr.php')} ${path.resolve(projectRoot, 'Prod/Client/dist')}`,
    ],
  }))
}


webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
})