import http from 'http'
import App from 'Modules/WebServer/App.js'

class WebServer {
  constructor(config) {
    this.config = config
    this.port = this.config.port || 3000
    this.host = this.config.host || 'localhost'
    log(`WebServer listen at http://${this.host}:${this.port}`)

    this.setupApp()
  }

  async setupApp() {
    this.app = await App.init(this.config)
    http.createServer(this.app).listen(this.port, this.host)
  }
}

export default (config) => new WebServer(config)