import Vue from '../node_modules/vue/dist/vue.esm.browser.js'

import Store from './store.js'
import Binary from './binary.js'
import Media from './media.js'
import Play from './play.js'

new Vue({
  el: '#app',
  Store,
  components: {
    Binary,
    Media,
    Play
  }
})
