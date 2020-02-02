const os = require('os')
const path = require('path')
const stream = require('stream')

const { Extract } = require('unzipper')

import { dataPath } from '../utils.js';

function getReleaseAssetForPlatform(release) {
  let platform
  switch (os.platform()) {
    case 'darwin':
      platform = 'macos'
      break
    case 'win32':
      platform = 'windows'
      break
    case 'linux':
      platform = 'ubuntu'
    default:
      throw new Error(`${os.platform()} is a unsupported platform.`)
  }
  return release.assets.find((asset) => asset.name.includes(platform))
}

export default {
  state: {
    progress: {
      max: 0,
      current: 0
    },
    asset: null
  },
  mutations: {
    setMax(state, max) {
      state.max = max
    },
    setCurrent(state, current) {
      state.current = current
    },
    setAsset(state, asset) {
      state.asset = asset
    }
  },
  getters: {
    installed(state) {
      return state.asset !== null
    },
    created_at(state, getters) {
      return (getters.installed) ? new Date(state.asset.created_at) : null
    }
  },
  actions: {
    async updateBinary(context) {
      const releaseResponse = await fetch('https://api.github.com/repos/tomatenquark/code/releases/latest')
      const release = await releaseResponse.json()

      if (!context.getters.installed) {
        const asset = getReleaseAssetForPlatform(release)
        const archive = await fetch(asset.browser_download_url)
        const bytes = await archive.arrayBuffer()
        const passThrough = new stream.PassThrough()
        passThrough.end(Buffer.from(bytes))
        passThrough.pipe(Extract({ path: path.join(dataPath, 'bin') }))
        context.commit('setAsset', asset)
      }
    }
  }
}
