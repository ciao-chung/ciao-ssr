const puppeteer = require('puppeteer')
const child_process = require('child_process')
const Page = require('./Page')
class Crawler {
  async init(config) {
    this.debug = config.debug == true
    const customLaunchOptions = typeof config.launchOptions == 'object' ? config.launchOptions : {}
    this.browser = await puppeteer.launch({
      headless: !this.debug,
      ...customLaunchOptions,
    })

    this.browser.on('disconnected', this._handleBrowserDisconnected)
  }

  async _handleBrowserDisconnected() {
    const processPid = process.pid
    log(`Handle Browser Disconnected, Process: ${processPid}`, 'red')
    setTimeout(() => {
      child_process.exec(`kill -9 ${processPid}`, (error, stdout, stderr) => {
        if (error) {
          log(`Process Kill Error: ${error}`, 'red')
        }

        log(`Process Kill Success. stdout: ${stdout} stderr:${stderr}`, 'red')
      })
    }, 500)
  }

  async render(url) {
    const page = new Page(this.browser)
    return new Promise(resolve => page.render(resolve, url))
  }
}

module.exports = new Crawler()