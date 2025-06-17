import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { process } from 'node:process'
import { components as allComponents, outputDir } from './utils'

const GRAPHQL_URL = 'https://api.github.com/graphql'

async function graphql(query) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  })

  const result = await response.json()

  if (result.error?.length) {
    process.exit(1)
  }

  return result.data
}

const nodeFlag = {}

const OWNER = 'naive-ui'
const REPO = 'naive-ui'
const BRANCH = 'main'

async function fetchContributors(fetchOptions) {
  const { paths } = fetchOptions
  const contributors = []
  const endCursorList = []

  // build GraphQL query to get contributors info of related
  // files of each component under default branch
  const query = `
    query {
      repository(owner: "${OWNER}", name: "${REPO}") {
        object(expression: "${BRANCH}") {
          ... on Commit {
            ${paths
              .map(({ path, cursor }, index) => {
                return `path${index}: history(path: "${path}"${
                  cursor ? `, after: ${cursor}` : ''
                }) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  author {
                    user {
                      login
                      name
                      email
                      url
                      avatarUrl
                    }
                  }
                }
              }`
              })
              .join('\n')}
          }
        }
      }
    }
  `

  const response = await graphql(query)
  const target = response?.repository?.object || {}

  for (let i = 0, len = paths.length; i < len; ++i) {
    const pageInfo = target?.[`path${i}`]?.pageInfo || {}
    const nodes = target?.[`path${i}`]?.nodes || []
    const component = paths[i].component

    for (const node of nodes) {
      const author = node?.author?.user || {}

      if (author.url) {
        if (!nodeFlag[component].includes(author.login)) {
          contributors.push({ ...author, component })
          nodeFlag[component].push(author.login)
        }
      }
    }

    if (pageInfo.hasNextPage) {
      endCursorList.push({ ...paths[i], cursor: pageInfo.endCursor })
    }
  }

  if (endCursorList.length) {
    contributors.push(...(await fetchContributors({ paths: endCursorList })))
  }

  return contributors
}

function chunk(array, size = 1) {
  size = Math.max(Math.floor(size), 0)
  const length = array == null ? 0 : array.length

  if (!length || size < 1) {
    return []
  }

  const result = Array.from({ length: Math.ceil(length / size) })

  let index = 0
  let resIndex = 0

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }

  return result
}

async function main() {
  if (process.env.DEV) {
    ;(await import('dotenv')).config()
  }

  if (!process.env.GITHUB_TOKEN) {
    if (process.env.DEV) {
      writeFileSync(resolve(outputDir, 'contributors.json'), '{}\n', 'utf-8')

      return
    }
    else {
      process.exit(1)
    }
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const paths = []

  for (const component of allComponents) {
    nodeFlag[component] = []
    paths.push(
      ...[
        { path: `components/${component}`, component },
        { path: `style/${component}.scss`, component },
        { path: `docs/demos/${component}`, component }
      ]
    )
  }

  const contributors = {}
  const users = {}
  const pathsChunk = chunk(paths, 50)

  for (const paths of pathsChunk) {
    const resultData = await fetchContributors({ paths })

    for (let i = 0; i < resultData.length; i++) {
      const { component, ...contributor } = resultData[i]
      const loginList = contributors[component]

      if (!users[contributor.login]) {
        users[contributor.login] = contributor
      }

      if (loginList) {
        loginList.push(contributor.login)
      }
      else {
        contributors[component] = [contributor.login]
      }
    }
  }

  contributors._users = users

  writeFileSync(
    resolve(outputDir, 'contributors.json'),
    JSON.stringify(contributors),
    'utf-8'
  )
}

main()
