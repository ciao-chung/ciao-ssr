const puppeteer = require('puppeteer')
const child_process = require('child_process')
const chromiumBinary = require('chromium-binary')
const executablePath = chromiumBinary.path

class Crawler {
  async init(config) {
    this.debug = config.debug == true
    this.timeout = config.timeout || 5000
    const customLaunchOptions = typeof config.launchOptions == 'object' ? config.launchOptions : {}
    log(`*Chrome executablePath: ${executablePath}`, 'green')
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
    return new Promise(resolve => this._handleRender(resolve, url))
  }

  async _handleRender(resolve, url) {
    this.page = await this.browser.newPage()

    // get result if timeout
    this.wait = setTimeout(async () => {
      const result = await this._getResult('Timeout')
      resolve(result)
      return
    }, this.timeout)

    const result =  await this._setupPage(url)
    resolve(result)
  }

  async _setupPage(url) {
    const self = this
    return new Promise(async(resolve) => {
      // expose callable function to client side
      self.page.exposeFunction('ServerSideRenderStart', async (type, statusCode) => {
        const result = await self._getResult(type, statusCode)
        resolve(result)
        return
      })

      let response
      try {
        response = await self.page.goto(url, {
          timeout: 15000,
        })
      } catch(error) {
        log('*!page not found', 'red')
        resolve(await self._getResult('PageError', 404))
        return
      }

      if(!response || !response.ok()) {
        log('*!page not found', 'red')
        resolve(await self._getResult('PageError', 404))
        return
      }
    })
  }

  async _getResult(type, statusCode = 200) {
    if(this.wait) clearTimeout(this.wait)
    let content = ''
    try {
      content = await this.page.content()
      this.page.close()
    } catch(error) {
      log(`*!${error}`, 'red')
    }

    return {
      statusCode,
      type,
      content,
    }
  }
}

module.exports = new Crawler()