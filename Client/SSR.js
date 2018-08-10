class SSR {
  constructor() {
    this.isSSR = window.ServerSideRenderStart instanceof Function
  }

  done() {
    if(!this.isSSR) return
    window.ServerSideRenderStart('PageDone')
  }

  error(statusCode = 404) {
    if(!this.isSSR) return
    window.ServerSideRenderStart('PageError', statusCode)
  }
}

export default new SSR()