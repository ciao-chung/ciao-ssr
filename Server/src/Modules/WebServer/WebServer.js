import http from 'http'
import detectPort from 'detect-port'
import killPort from 'kill-port'
import App from 'Modules/WebServer/App.js'

class WebServer {
  constructor(config) {
    this.config = config
    this.port = this.config.port || 3000
    this.host = this.config.host || 'localhost'

    this.setupApp()
  }

  async setupApp() {
    await this.killPortIfUsed()
    this.app = await App.init(this.config)
    this.server = http.createServer(this.app)
    setTimeout(() => {
      this._launchServer()
    }, 1000)
  }

  async _launchServer() {
    try {
      this.server.listen(this.port, this.host)
      log(`WebServer listen at http://${this.host}:${this.port}`)
    } catch(error) {
      log(`WebServer launch fail: ${error}`, 'red')
      this.setupApp()
    }
  }

  killPortIfUsed() {
    const self = this
    return new Promise((resolve) => {
      detectPort(self.port, (error, port) => {
        if(error) {
          log(error, 'red')
          self.killProcess()
          resolve()
          return
        }

        if(self.port != port) {
          self.killProcess()
          resolve()
          return
        }

        resolve()
      })
    })
  }

  killProcess() {
    try{
      killPort(this.port)
      log(`Kill port ${this.port} success`)
    } catch(error) {
      log(`Kill port ${this.port} fail: ${error}`, 'red')
    }
  }
}

export default (config) => new WebServer(config)