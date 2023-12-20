const fs = require('fs-extra')
const path = require('path')
const glob = require('fast-glob')
const babel = require('@babel/core')

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

const formatConfigs = {
  es: {
    root: path.join(__dirname, '../../es'),
    async parse (code, filePath, currentDir) {
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
    async parse (code, filePath, currentDir) {
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
                  node.callee.type === 'Identifier' &&
                  node.callee.name === 'require'
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
 * @param {string} source
 * @param {string} currentDir
 * @param {string} suffix
 * @returns {string | null}
 */
const parseSource = (source, currentDir, suffix) => {
  if (source.startsWith('.')) {
    const fullPath = joinPath(currentDir, source)
    return fs.existsSync(fullPath)
      ? path.extname(fullPath)
        ? source
        : joinPath(source, 'index' + suffix)
      : source + suffix
  } else {
    const [pkgName, subpath] = splitSource(source) || []
    return pkgName == null || subpath == null
      ? null
      : guessFullPath(pkgName, subpath)
  }
}

/**
 * @param {string} pkgName
 * @param {string} subpath
 * @return {string | null}
 */
const guessFullPath = (pkgName, subpath) => {
  const pkgPath = require.resolve(path.posix.join(pkgName, 'package.json'))
  const pkgRootPath = path.dirname(pkgPath)

  let parsedSource = null
  const sourcePath = path.join(pkgRootPath, subpath)
  if (fs.existsSync(sourcePath + '.js')) {
    parsedSource = joinPath(pkgName, subpath + '.js')
  } else if (fs.existsSync(sourcePath + '.mjs')) {
    parsedSource = joinPath(pkgName, subpath + '.mjs')
  } else if (fs.existsSync(path.join(sourcePath, 'index.js'))) {
    parsedSource = joinPath(pkgName, subpath, 'index.js')
  } else if (fs.existsSync(path.join(sourcePath, 'index.mjs'))) {
    parsedSource = joinPath(pkgName, subpath, 'index.mjs')
  }
  return parsedSource
}

const splitSource = (() => {
  const splitRegex = /^([\w-]+|@[\w-]+\/[\w-]+)(?:\/(.*))?$/
  /**
   * @param {string} source
   * @return {[string, string] | null}
   */
  return (source) => {
    const matched = splitRegex.exec(source)
    if (!matched) return null
    return matched.slice(1)
  }
})()

const replaceExtname = (filePath, ext) => {
  const oldExt = path.extname(filePath)
  if (!oldExt) return filePath + ext
  return joinPath(path.dirname(filePath), path.basename(filePath, oldExt) + ext)
}

const joinPath = (firstPath, ...restPath) => {
  const joinedPath = normalizePath(path.join(firstPath, ...restPath))
  return firstPath.startsWith('./') ? './' + joinedPath : joinedPath
}

/**
 * @param {string} path
 */
const normalizePath = (path) => path.replace(/\\/g, '/')
