'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../../')
const argv = require('yargs').argv
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new UglifyJsPlugin(),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if(argv.prod) {
  webpackConfig.plugins.push(new WebpackShellPlugin({
    onBuildStart: [
      `rm -rf ${path.resolve(projectRoot, 'Prod/Server/dist')}`,
      `rm -rf ${path.resolve(projectRoot, 'Prod/Server/cache')}`,
    ],
    onBuildEnd: [
      `cp -r ${path.resolve(__dirname, '../dist/server.js')} ${path.resolve(projectRoot, 'Prod/Server')}`,
      `cp -r ${path.resolve(__dirname, '../dist/static')} ${path.resolve(projectRoot, 'Prod/Server')}`,
      `cp ${path.resolve(projectRoot, 'Prod/Server/static/config.json')} ${path.resolve(projectRoot, 'Prod/Server/static/config.example.json')}`,
      `mkdir ${path.resolve(projectRoot, 'Prod/Server/cache')}`,
      `touch ${path.resolve(projectRoot, 'Prod/Server/cache/.gitkeep')}`,
    ],
  }))
}

module.exports = webpackConfig
