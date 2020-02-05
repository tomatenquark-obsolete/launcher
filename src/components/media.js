export default {
  template: `
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4"><i class="fas fa-cubes"></i> Media</p>
        </div>
      </div>
  
      <div class="content" v-if="$store.getters['media/installed']">
        Last recently updated on <time>{{ $store.getters['media/updated_at'].toLocaleDateString() }}</time> by <code>{{ $store.state.media.commit.committer.name }}</code>.
      </div>
    </div>
    <footer class="card-footer">
        <progress class="progress" max="100" v-if="$store.state.media.progress.indeterminate"></progress>
        <progress class="progress" :value="$store.state.media.progress.current" :max="$store.state.media.progress.max" v-else-if="$store.state.media.progress.max > 0"></progress>
        <a class="card-footer-item" @click="install" v-else-if="!$store.getters['media/installed']">Install</a>
        <a class="card-footer-item" @click="update" v-if="updatable && !$store.state.media.progress.indeterminate">Update</a>
    </footer>
  </div>
  `,
  data () {
    return {
      updatable: false
    }
  },
  methods: {
    async install () {
      try {
        await this.$store.dispatch('media/install')
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.commit('media/resetProgress')
      }
    },
    async update () {
      try {
        await this.$store.dispatch('media/update')
        this.updatable = false
      } catch (error) {
        this.$store.commit('pushError', error)
        console.log(error)
      } finally {
        this.$store.commit('media/resetProgress')
      }
    }
  },
  async mounted () {
    if (this.$store.getters['media/installed']) {
      try {
        const request = await fetch('https://api.github.com/repos/tomatenquark/media/commits') // eslint-disable-line
        const commits = await request.json()
        const latestCommit = commits.shift()
        if (this.$store.getters['media/updated_at'] < new Date(latestCommit.commit.committer.date)) {
          this.updatable = true
        }
      } catch (error) {
        this.$store.commit('pushError', error)
      }
    }
  }
}
