import { getLatestRelease } from '../utils.js'
const { lt } = require('semver')

export default {
  template: `
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4"><i class="fas fa-running"></i> Binaries</p>
        </div>
      </div>
  
      <div class="content" v-if="$store.getters['binary/installed']">
        <code>{{ $store.state.binary.release.tag_name }}</code> released on <time>{{ $store.getters['binary/created_at'].toLocaleDateString() }}</time> currently installed.
      </div>
    </div>
    <footer class="card-footer">
        <progress class="progress" :value="$store.state.binary.progress.current" :max="$store.state.binary.progress.max" v-if="$store.state.binary.progress.max > 0"></progress>
        <a class="card-footer-item" @click="$store.dispatch('binary/update')" v-else-if="!$store.getters['binary/installed']">Install</a>
        <a class="card-footer-item" @click="update" v-if="updatable && $store.state.binary.progress.max === 0">Update</a>
    </footer>
  </div>
  `,
  data () {
    return {
      updatable: false
    }
  },
  async mounted () {
    if (this.$store.getters['binary/installed']) {
      try {
        const release = await getLatestRelease()
        if (lt(this.$store.state.binary.release.tag_name, release.tag_name)) {
          this.updatable = true
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    async update () {
      try {
        await this.$store.dispatch('binary/update')
        this.updatable = false
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.commit('binary/resetProgress')
      }
    }
  }
}
