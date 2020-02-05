import { dataPath } from '../utils.js'

const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

const { clone, log, plugins, pull } = require('isomorphic-git')

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
    resetProgress (state) {
      state.progress.indeterminate = false
      state.progress.max = 0
      state.progress.current = 0
    },
    setMax (state, max) {
      state.progress.max = max
    },
    setCurrent (state, current) {
      state.progress.current = current
    },
    toggleIndeterminate (state) {
      state.progress.indeterminate = !state.progress.indeterminate
    },
    setCommit (state, commit) {
      state.commit = commit
    }
  },
  getters: {
    media_directory () {
      return path.join(dataPath, 'media')
    },
    installed (state) {
      return state.commit !== null
    },
    updated_at (state, getters) {
      return (getters.installed) ? new Date(state.commit.committer.timestamp * 1000) : null
    }
  },
  actions: {
    async install (context) {
      if (!context.getters.installed) {
        const emitter = new EventEmitter()
        plugins.set('emitter', emitter)
        emitter.on('message', (message) => {
          console.debug(message)
        })

        const trackProgress = (progress) => {
          if (progress.lengthComputable) {
            if (context.state.progress.indeterminate) {
              context.commit('toggleIndeterminate')
              context.commit('setMax', progress.total)
            }
            context.commit('setCurrent', progress.loaded)
          }
        }
        emitter.on('progress', trackProgress)

        context.commit('toggleIndeterminate')
        await clone({
          fs,
          dir: context.getters.media_directory,
          url: 'https://github.com/tomatenquark/media',
          ref: 'master'
        })
        emitter.off('progress', trackProgress)
        context.commit('resetProgress')
        const commits = await log({
          fs,
          dir: context.getters.media_directory,
          depth: 1,
          ref: 'master'
        })
        context.commit('setCommit', commits.shift())
      }
    },
    async update (context) {
      if (context.getters.installed) {
        const emitter = new EventEmitter()
        plugins.set('emitter', emitter)

        const trackProgress = (progress) => {
          if (progress.lengthComputable) {
            if (context.state.progress.indeterminate) {
              context.commit('toggleIndeterminate')
              context.commit('setMax', progress.total)
            }
            context.commit('setCurrent', progress.loaded)
          }
        }

        emitter.on('progress', trackProgress)
        context.commit('toggleIndeterminate')

        await pull({
          fs,
          dir: context.getters.media_directory
        })

        emitter.off('progress', trackProgress)
        const commits = await log({
          fs,
          dir: context.getters.media_directory,
          depth: 1,
          ref: 'master'
        })
        context.commit('setCommit', commits.shift())
      }
    }
  }
}
