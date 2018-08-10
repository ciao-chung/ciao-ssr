export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    loading(state, status = true) {
      state.loading = status
    },
  },
  actions: {
    loading(context, status) {
      context.commit('loading', status)
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
  },
}
