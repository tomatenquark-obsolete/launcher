import { dataPath, getLatestRelease } from '../utils.js'

const os = require('os')
const path = require('path')
const stream = require('stream')

const { Extract } = require('unzipper')

function getReleaseAssetForPlatform (release) {
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
      break
    default:
      throw new Error(`${os.platform()} is a unsupported platform.`)
  }
  return release.assets.find((asset) => asset.name.includes(platform))
}

export default {
  namespaced: true,
  state: {
    progress: {
      max: 0,
      current: 0
    },
    chmod: false,
    release: null,
    asset: null
  },
  mutations: {
    resetProgress (state) {
      state.progress.max = 0
      state.progress.current = 0
    },
    setMax (state, max) {
      state.progress.max = max
    },
    setCurrent (state, current) {
      state.progress.current = current
    },
    setAsset (state, asset) {
      state.asset = asset
    },
    setRelease (state, release) {
      state.release = release
    },
    toggleChmod (state) {
      state.chmod = !state.chmod
    }
  },
  getters: {
    installed (state) {
      return state.asset !== null
    },
    created_at (state, getters) {
      return (getters.installed) ? new Date(state.asset.created_at) : null
    }
  },
  actions: {
    async update (context) {
      const release = await getLatestRelease()

      if (!context.getters.installed) {
        const asset = getReleaseAssetForPlatform(release)
        context.commit('setMax', asset.size)

        const archive = await fetch(asset.browser_download_url)
        const reader = archive.body.getReader()
        const passThrough = new stream.PassThrough()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          context.commit('setCurrent', context.state.progress.current += value.length)
          passThrough.write(value)
        }
        passThrough.pipe(Extract({ path: path.join(dataPath, 'bin') }))
        context.commit('setRelease', release)
        context.commit('setAsset', asset)
        if (context.state.chmod) {
          context.commit('toggleChmod')
        }
        context.commit('resetProgress')
      }
    }
  }
}
