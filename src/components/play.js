export default {
  template: `
      <button class="button is-success" :disabled="!$store.getters['binary/installed'] || !$store.getters['media/installed']">Play!</button>
  `
}
