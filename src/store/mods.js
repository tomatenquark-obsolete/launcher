export default {
  namespaced: true,
  state: {
    shipped: [
      {
        name: 'sauerworld_mappack',
        enabled: false,
        commit: null
      }
    ]
  },
  mutations: {
    toggleEnabled(state, name) {
      const key = state.shipped.findIndex((mod) => mod.name === name)
      state.shipped[key].enabled = !state.shipped[key].enabled
    }
  }
}
