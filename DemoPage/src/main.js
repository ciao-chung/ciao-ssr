import Vue from 'vue'
import App from 'App'
import router from 'router'
import store from 'Store/Store'
import SSR from '../../Client/SSR.js'

Vue.config.productionTip = false

import $ from 'jquery'
window.self.$ = $
window.SSR = SSR

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
})
