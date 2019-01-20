const cacheManager = require('cache-manager')
const fsStore = require('cache-manager-fs')
class Cache {
  async init(config) {
    log(`Cache Path: ${cachePath}`)
    this.config = config
    this.cacheManager = cacheManager.caching({
      store: fsStore,
      options: {
        ttl: this._getCacheConfigProperty('ttl')*60 || 1,
        maxsize: this._getCacheConfigProperty('maxsize')*1000 || 1000*1000,
        path: cachePath,
        preventfill:true,
      }
    })
  }

  _getCacheConfigProperty(property) {
    if(!this.config) return null
    if(!this.config.cache) return null
    if(!this.config.cache[property]) return null
    return this.config.cache[property]
  }

  async get(key) {
    const self = this
    return new Promise(resolve => {
      self.cacheManager.get(key, (error, result) => resolve(!error ? result : null))
    })
  }

  set(key, value) {
    this.cacheManager.set(key, value)
  }

  del(key) {
    this.cacheManager.del(key)
  }
}

module.exports = new Cache()