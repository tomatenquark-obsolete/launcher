import Binary from './binary.js'
import Media from './media.js'

export default {
  state: {
    errors: []
  },
  mutations: {
    pushError (state, error) {
      state.errors.push(error)
    },
    spliceError (state, index) {
      if (state.errors.length) {
        return state.errors.splice(index, 1)
      }
    }
  },
  modules: {
    binary: Binary,
    media: Media
  }
}
