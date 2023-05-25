const componentsList = require('../../components.meta.json')
const componentsCommits = require('../../components-commits.meta.json')

const CONR_ID = '/virtual-contributors'

function getContributorsAt (component) {
  try {
    const componentCommits = componentsCommits[component]
    const map = {}
    componentCommits
      .filter((i) => i.author)
      .forEach((i) => {
        const login = i.author?.user?.login
        if (login === undefined) {
          return
        }
        if (!map[login]) {
          map[login] = {
            name: login,
            count: 0,
            avatar: i.author?.avatarUrl
          }
        }
        map[login].count++
      })
    return Object.values(map).sort((a, b) => b.count - a.count)
  } catch (e) {
    console.error(e)
    return []
  }
}

function getComponentContributors () {
  const result = componentsList.map((component) => {
    return [component, getContributorsAt(component)]
  })
  return Object.fromEntries(result)
}

module.exports = {
  getComponentContributors,
  CONR_ID
}
