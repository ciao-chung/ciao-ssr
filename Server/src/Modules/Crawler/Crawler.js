import puppeteer from 'puppeteer'
class Crawler {
  async render(url) {
    this.debug = config.debug == true
    this.timeout = config.timeout || 3000

    this.browser = await puppeteer.launch({ headless: this.debug })
    this.page = await this.browser.newPage()
    this.page.exposeFunction('ServerSideRenderStart', () => this._getContent())
    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle2',
      })
    } catch (error) {
      log('page not found', 'red')
      return {
        statusCode: 404,
      }
    }

    // Auto render if timeout
    this.wait = setTimeout(async () => {
      await this._getContent()
    }, this.timeout)
  }

  async _getContent() {
    clearTimeout(this.wait)
    this.wait = null

    let content
    try {
      content = await this.page.content()
    } catch(error) {
      log(error, 'red')
      this.page.close()
      this.browser.close()
      return
    }

    this.page.close()
    this.browser.close()
    console.warn(content)
    return {
      statusCode: 200,
      content,
    }
  }
}

export default new Crawler()