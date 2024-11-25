const path = require('node:path')
const babel = require('@babel/core')
const glob = require('fast-glob')
const fs = require('fs-extra')

const formatConfigs = {
  es: {
    root: path.join(__dirname, '../../es'),
    async parse(code, filePath, currentDir) {
      const suffix = '.mjs'
      const result = await babel.transformAsync(code, {
        root: this.root,
        babelrc: false,
        filename: filePath,
        sourceType: 'module',
        plugins: [
          {
            visitor: {
              ImportDeclaration: ({ node }) => {
                const source = node.source.value
                const parsedSource = parseSource(source, currentDir, suffix)
                if (parsedSource) {
                  node.source.value = parsedSource
                }
              },
              ExportNamedDeclaration: ({ node }) => {
                if (node.source) {
                  const source = node.source.value
                  const parsedSource = parseSource(source, currentDir, suffix)
                  if (parsedSource) {
                    node.source.value = parsedSource
                  }
                }
              },
              ExportAllDeclaration: ({ node }) => {
                const source = node.source.value
                const parsedSource = parseSource(source, currentDir, suffix)
                if (parsedSource) {
                  node.source.value = parsedSource
                }
              }
            }
          }
        ]
      })
      const newFilePath = replaceExtname(filePath, suffix)
      await fs.writeFile(newFilePath, result.code || code)
      await fs.unlink(filePath)
    }
  },
  lib: {
    root: path.join(__dirname, '../../lib'),
    async parse(code, filePath, currentDir) {
      const suffix = '.js'
      const result = await babel.transformAsync(code, {
        root: this.root,
        babelrc: false,
        filename: filePath,
        plugins: [
          {
            visitor: {
              CallExpression: ({ node }) => {
                if (
                  node.callee.type === 'Identifier'
                  && node.callee.name === 'require'
                ) {
                  const firstArg = node.arguments[0]
                  if (firstArg.type === 'StringLiteral') {
                    const source = firstArg.value
                    const parsedSource = parseSource(source, currentDir, suffix)
                    if (parsedSource) {
                      firstArg.value = parsedSource
                    }
                  }
                }
              }
            }
          }
        ]
      })
      await fs.writeFile(filePath, result.code || code)
    }
  }
}

/**
 * @param {('es' | 'lib')[]} formats
 */
module.exports.completePath = async (formats) => {
  await Promise.all(
    formats.map(async (format) => {
      const config = formatConfigs[format]
      const files = await glob('**/*.js', {
        cwd: config.root,
        absolute: true,
        onlyFiles: true
      })
      await Promise.all(
        files.map(async (filePath) => {
          const code = await fs.readFile(filePath, 'utf-8')
          await config.parse(code, filePath, path.dirname(filePath))
        })
      )
    })
  )
}

/**
 * @param {string} source
 * @param {string} currentDir
 * @param {string} suffix
 * @returns {string | null}
 */
function parseSource(source, currentDir, suffix) {
  if (source.startsWith('.')) {
    const fullPath = joinPath(currentDir, source)
    return fs.existsSync(fullPath)
      ? path.extname(fullPath)
        ? source
        : joinPath(source, `index${suffix}`)
      : source + suffix
  }
  else {
    return source
  }
}

function replaceExtname(filePath, ext) {
  const oldExt = path.extname(filePath)
  if (!oldExt)
    return filePath + ext
  return joinPath(path.dirname(filePath), path.basename(filePath, oldExt) + ext)
}

/**
 * @param {string} path
 */
const normalizePath = path => path.replace(/\\/g, '/')

function joinPath(firstPath, ...restPath) {
  const joinedPath = normalizePath(path.join(firstPath, ...restPath))
  return firstPath.startsWith('./') ? `./${joinedPath}` : joinedPath
}
