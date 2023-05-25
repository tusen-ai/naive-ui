const componentsList = require('../components.meta.json')
const { Octokit } = require('octokit')
const fs = require('fs')
const path = require('path')

const REPO_OWNER = 'tusen-ai'
const REPO_NAME = 'naive-ui'
const REPO_BRANCH = 'main'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

async function fetchCommits (options) {
  const query = `{
      repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
        object(expression: "${REPO_BRANCH}") {
          ... on Commit {
            ${options
              .map(({ path, after }, index) => {
                return `
                path${index}: history(path: "${path}"${
                  after ? `, after: "${after}"` : ''
                }) {
                  nodes {
                    oid
                    author {
                      avatarUrl
                      date
                      email
                      name
                      user {
                        login
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }`
              })
              .join('\n')}
          }
        }
      }
    }`
  const response = (await octokit.graphql(query)).repository.object
  return Object.fromEntries(
    Object.entries(response).map(([key, result]) => {
      const index = +key.replace('path', '')
      return [index, result]
    })
  )
}

async function getComponentsCommits (components) {
  let options = components.map((component) => {
    return { key: component, path: `src/${component}` }
  })
  const commits = {}
  do {
    const results = await fetchCommits(options)

    for (const [i, result] of Object.values(results).entries()) {
      const component = options[i].key
      if (!commits[component]) commits[component] = []
      commits[component].push(...result.nodes)
    }

    options = options
      .map((option, index) => {
        const pageInfo = results[index].pageInfo
        const after = pageInfo.hasNextPage ? pageInfo.endCursor : undefined
        return { ...option, after }
      })
      .filter((option) => !!option.after && commits[option.key].length < 200)
  } while (options.length > 0)
  return commits
}
const taskComponents = []
for (let i = 0; i < componentsList.length; i++) {
  if (i % 5 === 0) {
    taskComponents.push(componentsList.slice(i, i + 5))
  }
}
async function getAllComponentsCommits () {
  const componentsCommits = {}
  const promiseAll = []
  for (const task of taskComponents) {
    promiseAll.push(getComponentsCommits(task))
  }
  const results = await Promise.all(promiseAll)
  for (const commits of results) {
    Object.assign(componentsCommits, commits)
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../components-commits.meta.json'),
    JSON.stringify(componentsCommits, null, 2)
  )
}

getAllComponentsCommits()
