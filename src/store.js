const fs = require('fs')
const zlib = require('zlib')
const stream = require('stream')
const path = require('path')
const os = require('os')

const unzipper = require('unzipper')
const envPaths = require('env-paths')

export default {
  state: {
    binary: {
      installed: false,
      version: null
    },
    media: {
      installed: false,
      version: null
    }
  },
  mutations: {
  },
  actions: {
    async updateBinary(context) {
      const response = await fetch('https://api.github.com/repos/tomatenquark/code/releases/latest')
      const release = await response.json()
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

      if (!context.state.binary.installed) {
        // Download binary
        const asset = getReleaseAssetForPlatform(release)
        const paths = envPaths('tomatenquark')
        const file = await fetch(asset.browser_download_url)
        const blob = await file.blob()
        const bytes = await blob.arrayBuffer()
        const passThrough = new stream.PassThrough()
        passThrough.end(Buffer.from(bytes))
        passThrough.pipe(unzipper.Extract({ path: path.join(paths.data, 'bin') }))
      } else if (compareVersion(context.state.binary.version, release.tag_name) === -1) {
        // Download binary
      }
    }
  }
}
