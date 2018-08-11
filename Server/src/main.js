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
      this.config = JSON.parse(readFileSync('static/config.json', 'utf8'))
      global.config = this.config
    } catch (error) {
      log(error, 'red')
      log('Server fail cuz config.json incorrect or not exist', 'red')
      return
    }


    const url = 'http://127.0.0.1:8081'

    this.crawler = Crawler
    log(`Start render: ${url}`)
    const result = await this.crawler.render(url)
    const color = result.type == 'PageError' ? 'red' : 'green'
    log(`${url}`, color)
    log(`Response: ${result.statusCode}, ${result.type}`, color)
    if(this.config.debug) {
      log(JSON.stringify(result), 'magenta')
    }

  }
}

export default new App()