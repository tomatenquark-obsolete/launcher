import Vue from '../node_modules/vue/dist/vue.esm.browser.js'
import Vuex from '../node_modules/vuex/dist/vuex.esm.browser.js'
import createPersistedState from '../node_modules/vuex-persistedstate/dist/vuex-persistedstate.es.js'

import Store from './store/index.js'
import Binary from './components/binary.js'
import Media from './components/media.js'
import Play from './components/play.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  ...Store,
  plugins: [createPersistedState()]
})

new Vue({ // eslint-disable-line
  el: '#app',
  store,
  components: {
    Binary,
    Media,
    Play
  }
})
