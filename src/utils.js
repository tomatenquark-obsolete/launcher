const envPaths = require('env-paths')

const paths = envPaths('tomatenquark', {
  suffix: ''
})

export const dataPath = paths.data

export async function getLatestRelease () {
  const releaseResponse = await fetch('https://api.github.com/repos/tomatenquark/code/releases/latest')
  return releaseResponse.json()
}
