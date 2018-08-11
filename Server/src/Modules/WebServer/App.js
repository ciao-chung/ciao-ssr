import express from 'express'
import bodyParser from 'body-parser'
import Crawler from 'Modules/Crawler/Crawler'

class App {
  async init(config) {
    this.config = config
    this.crawler = Crawler
    await this.crawler.init(this.config)

    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: true
    }))

    this.app.use((err, request, response, next) => {
      response.sendStatus(err.statusCode)
    })

    this._setupRoute()
    return this.app
  }

  _setupRoute() {
    this.app.get('/render', async (request, response) => {

      const url = 'http://localhost:8081'
      log(`Start render: ${url}`)
      const result = await this.crawler.render(url)
      const color = result.type == 'PageError' ? 'red' : 'green'
      log(`${url}`, color)
      log(`Response: ${result.statusCode}, ${result.type}`, color)
      if(this.config.debug) {
        log(JSON.stringify(result), 'magenta')
      }

      response.status(200).json(result)
    })

    this.app.all('*', (request, response) => {
      response.sendStatus(400)
    })

    return this.app
  }
}

export default new App()