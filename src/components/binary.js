export default {
  template: `
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">Sauerbraten binary</p>
        </div>
      </div>
  
      <div class="content">
        This binary is built by tomatenquark and necessary to play the game.
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
        <progress class="progress" :value="$store.state.binary.progress.current" :max="$store.state.binary.progress.max" v-if="$store.state.binary.progress.max > 0"></progress>
        <a class="card-footer-item" @click="$store.dispatch('updateBinary')" v-else>Install</a>
    </footer>
  </div>
  `
}
