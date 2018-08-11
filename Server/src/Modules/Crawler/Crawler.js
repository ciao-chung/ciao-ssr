import puppeteer from 'puppeteer'
class Crawler {
  async render(url) {
    this.debug = config.debug == true
    this.timeout = config.timeout || 5000
    this.browser = await puppeteer.launch({ headless: !this.debug })
    return new Promise(resolve => this.handle(resolve, url))
  }

  async handle(resolve, url) {
    this.page = await this.browser.newPage()

    this.wait = setTimeout(async () => {
      const result = await this._PageDone('Timeout')
      resolve(result)
      return
    }, this.timeout)

    const result =  await this._setupPage(url)
    resolve(result)
  }

  async _setupPage(url) {
    const self = this
    return new Promise(async(resolve) => {
      self.page.exposeFunction('ServerSideRenderStart', async (type, statusCode) => {
        const result = await self._PageDone(type, statusCode)
        resolve(result)
      })

      try {
        await self.page.goto(url, {
          waitUntil: 'networkidle2',
        })
      } catch (error) {
        log('page not found', 'red')
        resolve(await self._PageDone('PageError', 404))
      }
    })
  }

  async _PageDone(type, statusCode = 200) {
    if(this.wait) clearTimeout(this.wait)
    const content = await this.page.content()
    this.page.close()
    return {
      statusCode,
      type,
      content,
    }
  }
}

export default new Crawler()