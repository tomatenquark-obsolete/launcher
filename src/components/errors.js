export default {
  template: `
    <div>
      <article class="message is-danger" v-for="(error, index) in $store.state.errors">
        <div class="message-header">
          <p>{{ error.name }}</p>
          <button class="delete" aria-label="delete" @click="$store.commit('spliceError', index)"></button>
        </div>
        <div class="message-body">
          {{ error.message }}
        </div>
      </article>
    </div>
  `,
}
