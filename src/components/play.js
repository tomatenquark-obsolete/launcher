const fs = require('fs')
const os = require('os')
const path = require('path')
const child_process = require('child_process')
const util = require('util')

import { dataPath } from '../utils.js';

function getBinaryNameForPlatform() {
  let binary
  switch(os.platform()) {
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
      break
  }
  return binary
}

export default {
  template: `
      <button class="button is-success":disabled="!$store.getters['binary/installed'] || !$store.getters['media/installed']" @click="start">Play!</button>
  `,
  methods: {
    async start () {
      const binary = getBinaryNameForPlatform()
      if (!this.$store.state.binary.chmod && ['darwin', 'linux'].includes(os.platform())) {
        const chmodAsync = util.promisify(fs.chmod)
        await chmodAsync(path.join(dataPath, 'bin', binary), 0o775) // Make sure it is actually executable
        this.$store.commit('binary/toggleChmod')
      }

      const args = ['-q', path.join(dataPath, 'config'), '-k', path.join(dataPath, 'media'), '-q', 'log.txt']
      child_process.spawn(binary, args, {
        cwd: path.join(dataPath, 'bin'),
        detached: true
      })
    }
  }
}
