const { shell } = require('electron')

export default {
  template: `
  <div>
    <div class="modal" v-bind:class="{ 'is-active': modSelection }">
      <div class="modal-background"></div>
      <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Enabled Mods</p>
            <button class="delete" aria-label="close" @click="modSelection = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="list">
                <div class="list-item" v-for="mod in $store.state.mods.shipped">
                    <p><input type="checkbox" @click="$store.commit('mods/toggleEnabled', mod.name)" :checked="mod.enabled"> {{ mod.name }}</p>
                </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button" @click="modSelection = false">Close</button>
          </footer>
      </div>
    </div>
  
    <div class="columns is-mobile">
      <div class="column">
        <p><code>Launcher</code> helps you set up <a @click="openProjectLink">Tomatenquark</a> quickly.</p>
        <p>If you run into any issues please feel free to contact. Feedback is highly appreciated.</p>
      </div>
      <div class="column is-one-quarter" align="right">
        <button class="button"><i class="fas fa-redo-alt"></i></button>
        <button class="button" @click="modSelection = true"><i class="fas fa-plus"></i></button>
      </div>
    </div>
  </div>
  `,
  data () {
    return {
      modSelection: false
    }
  },
  methods: {
    openProjectLink() {
      shell.openExternal('http://tomatenquark.github.io/')
    }
  }
}
