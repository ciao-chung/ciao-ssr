import Vue from 'vue'
import App from 'App'
import router from 'router'
import store from 'Store/Store'
import ServerSideRenderClient from '../../Client/SSR.js'

Vue.config.productionTip = false

import $ from 'jquery'
window.self.$ = $
window.SSR = ServerSideRenderClient({ debug: true })

import VueMoment from 'vue-moment'
Vue.use(VueMoment)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    this.setupRoute()
  },
  methods: {
    setupRoute() {
      if(!this.$route.name) this.$router.replace({ name: '404' })
    },
  },
  metaInfo() {
    return {
      title: 'Base Vue Webpack Template',
      link: [
        { rel: 'favicon', href: 'static/favicon.ico' },
        { rel: 'shortcut icon', href: 'static/favicon.ico' },
      ],
      meta: [],
    }
  },
  watch: {
    $route() {
      this.setupRoute()
    }
  },
})
