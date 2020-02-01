import Vuex from '../node_modules/vuex/dist/vuex.esm.browser.js'

export default new Vuex.Store({
  state: {
    binary: {
      installed: false,
      version: null
    },
    media: {
      installed: false,
      version: null
    }
  },
  mutations: {
    installBinary(state, version) {
      state.binary.installed = true
      state.binary.version = version
    },
    installMedia(state, version) {
      state.media.installed = true
      state.media.version = version
    }
  }
})
