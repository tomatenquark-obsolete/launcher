const path = require('path')
const fs = require('fs')

const git = require('isomorphic-git')

import { dataPath } from '../utils.js'

export default {
  state: {
    progress: {
      max: 0,
      current: 0
    },
    commit: null
  },
  getters: {
    mediaInstalled(state) {
      return state.commit !== null
    }
  },
  actions: {
    async updateMedia(context) {
      if (!context.getters.mediaInstalled) {
        const paths = envPaths('tomatenquark')
        const mediaDirectory = path.join(dataPath, 'media')
        await git.clone({
          fs,
          dir: mediaDirectory,
          url: 'https://github.com/tomatenquark/media',
          ref: 'master'
        })
      }
    }
  }
}
