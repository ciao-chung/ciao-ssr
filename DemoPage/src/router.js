import Vue from 'vue'
import Router from 'vue-router'
import Home from 'Modules/Base/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
