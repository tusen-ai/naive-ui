import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { walk } from '../utils'

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  }
  catch {
    return false
  }
}

function isSuspiciousImportSpecifier(specifier: string): boolean {
  return (
    specifier.includes('Users/')
    || specifier.includes('node_modules/')
    || specifier.includes('.pnpm/')
    || path.isAbsolute(specifier)
  )
}

function isUnwantedDeclarationFile(fileName: string): boolean {
  return (
    fileName === 'global.d.ts'
    || fileName === 'shims-vue.d.ts'
    || fileName.endsWith('.d.d.ts')
  )
}

export async function checkArtifacts(): Promise<void> {
  const roots = ['es', 'lib'].map(dir => path.resolve(process.cwd(), dir))
  const problems: string[] = []

  for (const root of roots) {
    if (!(await pathExists(root)))
      continue

    for (const leakedDir of ['Users', 'node_modules']) {
      const leakedPath = path.join(root, leakedDir)
      if (await pathExists(leakedPath)) {
        problems.push(
          `leaked directory: ${path.relative(process.cwd(), leakedPath)}`
        )
      }
    }

    for await (const filePath of walk(root)) {
      if (!filePath.endsWith('.d.ts'))
        continue
      const rel = path.relative(process.cwd(), filePath)
      if (isUnwantedDeclarationFile(path.basename(filePath))) {
        problems.push(`unwanted declaration file: ${rel}`)
        continue
      }
      const content = await fs.readFile(filePath, 'utf8')
      content.split('\n').forEach((line, index) => {
        if (/\bconst\s+process\.env\b/.test(line)) {
          problems.push(`${rel}:${index + 1}: ${line.trim()}`)
          return
        }
        const match = line.match(/from\s+['"]([^'"]+)['"]/)
        if (!match)
          return
        const specifier = match[1]
        if (isSuspiciousImportSpecifier(specifier)) {
          problems.push(`${rel}:${index + 1}: ${line.trim()}`)
        }
      })
    }
  }

  if (problems.length === 0) {
    console.log('[post-build] artifact check passed')
    return
  }

  console.error('[post-build] artifact check failed:')
  for (const problem of problems) {
    console.error(`  - ${problem}`)
  }
  throw new Error(
    `Found ${problems.length} suspicious artifact issue(s). `
    + 'Declaration files must not embed host paths, ambient shims, or define replacements.'
  )
}
