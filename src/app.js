import Vue from '../node_modules/vue/dist/vue.esm.browser.js'
import Vuex from '../node_modules/vuex/dist/vuex.esm.browser.js'

import Store from './store/index.js'
import Binary from './components/binary.js'
import Media from './components/media.js'
import Play from './components/play.js'

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
