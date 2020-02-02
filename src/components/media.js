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
        <a class="card-footer-item" @click="$store.dispatch('media/update')" v-else-if="!$store.getters['media/installed']">Install</a>
    </footer>
  </div>
  `
}
