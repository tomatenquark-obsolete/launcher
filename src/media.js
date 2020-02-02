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
        <a class="card-footer-item" v-if="$store.state.media.installed">Update</a>
        <a class="card-footer-item">Install</a>
    </footer>
  </div>
  `
}
