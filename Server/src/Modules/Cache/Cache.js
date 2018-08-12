import cacheManager from 'cache-manager'
import fsStore from 'cache-manager-fs'
class Cache {
  async init(config) {
    this.config = config
    this.cacheManager = cacheManager.caching({
      store: fsStore,
      options: {
        ttl: this._getCacheConfigProperty('ttl')*1000,
        maxsize: this._getCacheConfigProperty('maxsize')*1000,
        path:'/home/ciao/桌面/cache',
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
      self.cacheManager.get(key, (error, result) => resolve(result))
    })
  }

  set(key, value) {
    this.cacheManager.set(key, value)
  }

  del(key) {
    this.cacheManager.del(key)
  }
}

export default new Cache()