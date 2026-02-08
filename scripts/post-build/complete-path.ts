import path from 'node:path'
import process from 'node:process'
import * as babel from '@babel/core'
import glob from 'fast-glob'
import fs from 'fs-extra'

interface FormatConfig {
  root: string
  parse: (code: string, filePath: string, currentDir: string) => Promise<void>
}

const formatConfigs: Record<string, FormatConfig> = {
  es: {
    root: path.join(process.cwd(), 'es'),
    async parse(code: string, filePath: string, currentDir: string) {
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
      await fs.writeFile(newFilePath, result?.code || code)
      await fs.unlink(filePath)
    }
  },
  lib: {
    root: path.join(process.cwd(), 'lib'),
    async parse(code: string, filePath: string, currentDir: string) {
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
      await fs.writeFile(filePath, result?.code || code)
    }
  }
}

export async function completePath(formats: ('es' | 'lib')[]): Promise<void> {
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

function parseSource(
  source: string,
  currentDir: string,
  suffix: string
): string | null {
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

function replaceExtname(filePath: string, ext: string): string {
  const oldExt = path.extname(filePath)
  if (!oldExt)
    return filePath + ext
  return joinPath(path.dirname(filePath), path.basename(filePath, oldExt) + ext)
}

const normalizePath = (p: string): string => p.replace(/\\/g, '/')

function joinPath(firstPath: string, ...restPath: string[]): string {
  const joinedPath = normalizePath(path.join(firstPath, ...restPath))
  return firstPath.startsWith('./') ? `./${joinedPath}` : joinedPath
}
