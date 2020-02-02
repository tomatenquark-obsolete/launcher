export default {
  template: `
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">Sauerbraten media</p>
        </div>
      </div>
  
      <div class="content">
        The media is hosted by tomat and necessary to play the game.
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
