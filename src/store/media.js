const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

const { clone, plugins } = require('isomorphic-git')

import { dataPath } from '../utils.js'

export default {
  namespaced: true,
  state: {
    progress: {
      indeterminate: false,
      max: 0,
      current: 0
    },
    commit: null
  },
  mutations: {
    resetProgress(state) {
      state.progress.indeterminate = false
      state.progress.max = 0
      state.progress.current = 0
    },
    setMax(state, max) {
      state.progress.max = max
    },
    setCurrent(state, current) {
      state.progress.current = current
    },
    toggleIndeterminate(state) {
      state.progress.indeterminate = !state.progress.indeterminate
    }
  },
  getters: {
    installed(state) {
      return state.commit !== null
    }
  },
  actions: {
    async update(context) {
      if (!context.getters.installed) {
        const mediaDirectory = path.join(dataPath, 'media')
        const emitter = new EventEmitter()
        plugins.set('emitter', emitter)
        emitter.on('message', function(message) {
          console.debug(message)
        })
        emitter.on('progress', function(progress) {
          if (progress.lengthComputable) {
            if (context.state.progress.indeterminate) {
              context.commit('toggleIndeterminate')
              context.commit('setMax', progress.total)
            }
            context.commit('setCurrent', progress.loaded)
          }
        })

        context.commit('toggleIndeterminate')
        await clone({
          fs,
          dir: mediaDirectory,
          //url: 'https://github.com/tomatenquark/media',
          url: 'https://github.com/pre-commit/demo-repo.git',
          ref: 'master'
        })
        context.commit('resetProgress')
      }
    }
  }
}
