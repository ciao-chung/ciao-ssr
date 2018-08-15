class SSR {
  constructor(options) {
    this.isSSR = window.ServerSideRenderStart instanceof Function
    this.isDebug = false
    this.options = options
    this._init()
  }

  _init() {
    if(!this.options) return
    this.isDebug = this.options.debug == true
  }

  done() {
    if(this.isDebug) console.warn(`SSR DONE`)
    if(!this.isSSR) return
    window.ServerSideRenderStart('PageDone')
  }

  error(statusCode = 404) {
    if(this.isDebug) console.warn(`SSR ERROR(${statusCode})`)
    if(!this.isSSR) return
    window.ServerSideRenderStart('PageError', statusCode)
  }
}

export default (options) => new SSR(options)