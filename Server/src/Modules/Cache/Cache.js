const cacheManager = require('cache-manager')
const fsStore = require('cache-manager-fs')
const redisStore = require('cache-manager-redis-store')
class Cache {
  async init(config) {
    log(`Cache Path: ${cachePath}`)
    this.config = config
    this.cacheDriver = fsStore
    this.cacheConfig = {
      options: {
        ttl: this._getCacheConfigProperty('ttl')*60 || 1,
        maxsize: this._getCacheConfigProperty('maxsize')*1000 || 1000*1000,
        path: cachePath,
        preventfill:true,
      }
    }

    if(this._getCacheConfigProperty('driver') === 'redis') {
      this.cacheDriver = redisStore
      this.cacheConfig = {
        store: redisStore,
        host: this._getCacheConfigProperty('redisHost') ||'localhost',
        port: this._getCacheConfigProperty('redisPort') || 6379,
        auth_pass: this._getCacheConfigProperty('redisPass') || '',
        db: 0,
        ttl: this._getCacheConfigProperty('ttl')*60 || 1,
      }
    }

    this.cacheManager = cacheManager.caching({
      store: this.cacheDriver,
      ...this.cacheConfig,
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