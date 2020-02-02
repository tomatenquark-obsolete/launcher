const fs = require('fs')
const path = require('path')

const git = require('isomorphic-git')
const envPaths = require('env-paths')

import Binary from './binary.js'

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
    async updateMedia(context) {
      if (!context.state.media.installed) {
        const paths = envPaths('tomatenquark')
        const mediaDirectory = path.join(paths.data, 'media')
        await git.clone({
          fs,
          dir: mediaDirectory,
          url: 'https://github.com/tomatenquark/media',
          ref: 'master'
        })
        console.log("Done")
      }
    }
  },
  modules: {
    binary: Binary
  }
}
