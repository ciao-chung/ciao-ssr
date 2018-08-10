import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Base from 'Store/Modules/Base'

export default new Vuex.Store({
  modules: {
    Base,
  }
})
