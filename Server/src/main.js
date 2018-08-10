import chalk from 'chalk'
import { readFileSync } from 'fs'
import { argv } from 'yargs'
import moment from 'moment'
import Crawler from 'Modules/Crawler/Crawler'

class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    this.initServer()
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

  async initServer() {
    log('Server start')
    try {
      this.config = readFileSync('static/config.json', 'utf8')
      global.config = this.config
    } catch (error) {
      log(error, 'red')
      log('Server fail cuz config.json incorrect or not exist', 'red')
      return
    }

    this.crawler = Crawler
    await this.crawler.render('http://127.0.0.1:8081')
  }
}

export default new App()