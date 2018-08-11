import http from 'http'
import App from 'Modules/WebServer/App.js'

class WebServer {
  constructor() {
    this.port = 3000
    this.host = 'localhost'
    log(`WebServer listen at http://${this.host}:${this.port}`)

    this.setupApp()
  }

  async setupApp() {
    this.app = await App.init(config)
    http.createServer(this.app).listen(this.port, this.host)
  }
}

export default () => new WebServer()