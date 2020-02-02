export default {
  template: `
      <button class="button is-success" :disabled="!$store.getters.binaryInstalled || !$store.getters.mediaInstalled">Play!</button>
  `
}
