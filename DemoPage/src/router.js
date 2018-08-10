import Vue from 'vue'
import Router from 'vue-router'
import Home from 'Modules/Base/Home'
import PageNotFound from 'Modules/Base/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/404',
      name: '404',
      component: PageNotFound,
    },
  ]
})
