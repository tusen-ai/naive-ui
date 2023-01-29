const Git = require('simple-git')
const glob = require('fast-glob')
const path = require('path')

const git = Git({
  maxConcurrentProcesses: 200
})

async function getContributors (path) {
  try {
    const list = (
      await git.raw(['log', '--pretty=format:"%an|%ae"', '--', path])
    )
      .split('\n')
      .map((i) => i.slice(1, -1).split('|'))
    const map = {}
    list
      .filter((i) => i[1])
      .forEach((i) => {
        if (!map[i[1]]) {
          map[i[1]] = {
            name: i[0],
            count: 0,
            email: i[1]
          }
        }
        map[i[1]].count++
      })

    return Object.values(map).sort((a, b) => b.count - a.count)
  } catch (e) {
    console.error(e)
    return []
  }
}

async function getContributorsByComponent () {
  const components = await glob('*', {
    cwd: path.resolve('./src'),
    onlyDirectories: true
  })
  const result = await Promise.all(
    components.map(async (i) => {
      return [i, await getContributors(`src/${i}`)]
    })
  )
  return Object.fromEntries(result)
}

module.exports = {
  getContributorsByComponent
}
