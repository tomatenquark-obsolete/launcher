const envPaths = require('env-paths')

const paths = envPaths('tomatenquark', {
  suffix: ''
})

export const dataPath = paths.data
