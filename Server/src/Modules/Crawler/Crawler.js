const puppeteer = require('puppeteer')
const Page = require('./Page')
class Crawler {
  async init(config) {
    this.debug = config.debug == true
    const customLaunchOptions = typeof config.launchOptions == 'object' ? config.launchOptions : {}
    this.launchOptins = {
      headless: !this.debug,
      ...customLaunchOptions,
    }
    this._launchBrowser()
  }

  async _launchBrowser() {
    this.browser = await puppeteer.launch(this.launchOptins)
    this.browser.on('disconnected', () => this._restartBrowser())
  }

  async _restartBrowser() {
    log(`Restart browser`, 'red')
    try {
      this.browser.close()
    } catch(error) {

    }
    setTimeout(async () => {
      this._launchBrowser()
    }, 1000)
  }

  async render(url) {
    const page = new Page(this.browser)
    return new Promise(resolve => page.render(resolve, url))
  }
}

module.exports = new Crawler()