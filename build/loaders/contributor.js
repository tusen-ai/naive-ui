const { graphql } = require('@octokit/graphql')
const glob = require('fast-glob')
const path = require('path')

const owner = 'jahnli'
const repo = 'naive-ui'
const authorization =
  'token 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'

const graphqlWithAuth = graphql.defaults({
  headers: {
    // authorization:process.env.GITHUB_TOKEN
    authorization
  }
})

const getContributors = async (path) => {
  const result = []
  const getCommits = async (pageInfo) => {
    const { hasNextPage, endCursor } = pageInfo ?? {}
    const { repository } = await graphqlWithAuth(`
    {
      repository(owner: "${owner}", name: "${repo}") {
        object(expression: "main") {
          ... on Commit {
            history(path: "${path}" ${
      hasNextPage ? `, after: "${endCursor}"` : ''
    }) {
              nodes {
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
            }
          }
        }
      }
    }
  `)
    result.push(...repository.object.history.nodes)
    if (repository?.object.history?.pageInfo?.hasNextPage) {
      await getCommits(repository?.object.history?.pageInfo)
    }
  }
  await getCommits()
  return sortedContributors(result)
}

const sortedContributors = (commits) => {
  const contributors = {}
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i]
    const { author } = commit
    const login = author.user?.login
    if (!login) continue
    if (!contributors[login]) {
      contributors[login] = {
        login,
        name: author.name,
        email: author.email,
        avatar: author.avatarUrl,
        count: 1
      }
    } else {
      contributors[login].count++
    }
  }
  return Object.values(contributors).sort((a, b) => b.count - a.count)
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
