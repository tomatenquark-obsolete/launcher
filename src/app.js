import Vue from '../node_modules/vue/dist/vue.esm.browser.js'
import Vuex from '../node_modules/vuex/dist/vuex.esm.browser.js'

import Store from './store.js'
import Binary from './binary.js'
import Media from './media.js'
import Play from './play.js'

Vue.use(Vuex)
const store = new Vuex.Store(Store)

new Vue({
  el: '#app',
  store,
  components: {
    Binary,
    Media,
    Play
  }
})
