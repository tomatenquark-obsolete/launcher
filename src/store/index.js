import Binary from './binary.js'
import Media from './media.js'

export default {
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
  modules: {
    binary: Binary,
    media: Media
  }
}
