require('shelljs/global')
const { readFileSync } = require('fs')
const { argv } = require('yargs')
const chalk = require('chalk')
const moment = require('moment')
const WebServer = require('./Modules/WebServer/WebServer')
const { resolve } = require('path')
const { version } = require('../package.json')
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    this.startApp()
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan') {
    console.log(chalk[`${style}Bright`](content)+chalk.whiteBright(`\t at ${now()}`))
  }

  now() {
    return moment(new Date).format('YYYY-MM-DD HH:mm:ss')
  }

  async startApp() {
    const initResult = await this.initConfig()
    if(argv.clean) {
      this.cleanCache()
      return
    }

    if(!initResult) process.exit()
    this.initServer()
  }

  cleanCache() {
    log(`clean cache from: ${cachePath}`, 'yellow')
    exec(`rm -rf ./*`, { cwd: cachePath })
  }

  _getCacheConfigPropertyPath() {
    if(!this.config) return null
    if(!this.config.cache) return null
    if(!this.config.cache.path) return null
    return this.config.cache.path
  }

  async initConfig() {
    try {
      this.config = JSON.parse(readFileSync(argv.config, 'utf8'))
      global.config = this.config
    } catch (error) {
      if(!argv.clean) {
        log(error, 'red')
        log('Server fail cuz config.json incorrect or not exist', 'red')
      }
      this.setupCachepath()
      return false
    }

    this.setupCachepath()
    return true
  }

  setupCachepath() {
    global.cachePath = this._getCacheConfigPropertyPath() ? this._getCacheConfigPropertyPath() : resolve(__dirname, '../cache')
  }

  async initServer() {
    log(`Server start(${version})`)
    WebServer(this.config)
  }

  async clean() {

  }
}

module.exports = new App()