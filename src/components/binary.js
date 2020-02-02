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
        <code>{{ $store.state.binary.asset.name }}</code> released on <time>{{ $store.getters['binary/created_at'].toLocaleDateString() }}</time> is currently installed.
      </div>
    </div>
    <footer class="card-footer">
        <progress class="progress" :value="$store.state.binary.progress.current" :max="$store.state.binary.progress.max" v-if="$store.state.binary.progress.max > 0"></progress>
        <a class="card-footer-item" @click="$store.dispatch('binary/update')" v-else-if="!$store.getters['binary/installed']">Install</a>
    </footer>
  </div>
  `
}
