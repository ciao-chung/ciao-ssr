'use strict'
// This is the webpack config used for unit tests.

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const chai = require('chai')
global.expect = chai.expect
global.assert = chai.assert
global.should = chai.should
const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
