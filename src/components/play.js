import { dataPath } from '../utils.js'

const fs = require('fs')
const os = require('os')
const path = require('path')
const child_process = require('child_process') // eslint-disable-line
const util = require('util')

function getBinaryNameForPlatform () {
  let binary
  switch (os.platform()) {
    case 'win32':
      binary = 'bin64/sauerbraten_debug.exe'
      break
    case 'darwin':
      binary = 'sauerbraten.app/Contents/MacOS/sauerbraten'
      break
    case 'linux':
      binary = 'sauer_client'
      break
    default:
      throw new Error(`Platform ${os.platform()} is not supported.`)
  }
  return binary
}

export default {
  template: `
    <div class="columns is-mobile">
      <div class="column">
        <p v-if="!$store.getters['binary/installed'] && !$store.getters['media/installed']">Installing <code>binaries</code> and <code>media</code> is required before running the game.</p>
        <p v-else-if="!$store.getters['binary/installed']">Please install <code>binaries</code> before playing.</p>
        <p v-else-if="!$store.getters['media/installed']">Please install <code>media</code> before playing.</p>
        <p v-else>You're all set. Have fun and good luck!</p>
      </div>
      <div class="column" align="right">
        <button class="button is-success level-item" :disabled="!$store.getters['binary/installed'] || !$store.getters['media/installed']" @click="start">Play!</button>                          
      </div>
    </div>
  `,
  methods: {
    async start () {
      const binary = getBinaryNameForPlatform()
      if (!this.$store.state.binary.chmod && ['darwin', 'linux'].includes(os.platform())) {
        const chmodAsync = util.promisify(fs.chmod)
        await chmodAsync(path.join(dataPath, 'bin', binary), 0o775) // Make sure it is actually executable
        this.$store.commit('binary/toggleChmod')
      }

      const args = ['-q', path.join(dataPath, 'media')]
      child_process.spawn(binary, args, {
        cwd: path.join(dataPath, 'bin'),
        detached: true
      })
    }
  }
}
