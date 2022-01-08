const { resolve, join } = require('path')
const fs = require('fs-extra')
const fg = require('fast-glob')

const COMPONENT_ROOT = resolve(__dirname, '../src')

const excludeDir = ['global-style', 'themes', 'composables', 'locales']

function exist (path) {
  return fs.existsSync(path)
}

async function loadComponent (dir) {
  return {
    path: dir,
    name: `n-${dir}`,
    components: exist(join(COMPONENT_ROOT, dir, 'index.ts')) ? await require(join(COMPONENT_ROOT, dir, 'index.ts')) : {}
  }
}
function parseComponentsDeclaration (code) {
  if (!code) {
    return {}
  }
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      (i) => [i[1], i[2]]
    )
  )
}

async function generateComponentsType () {
  const folders = (await fg('[^_]*', {
    onlyDirectories: true,
    cwd: COMPONENT_ROOT
  })).filter(fold => !excludeDir.includes(fold))
  const files = await Promise.all(
    folders.map(async dir => await loadComponent(dir))
  )

  const components = {}

  files.forEach((file) => {
    const fileComponents = file.components
    Object.keys(fileComponents).forEach((key) => {
      const entry = `typeof import('./${file.path}')['${key}']`
      if (key.startsWith('N')) {
        components[key] = entry
      }
    })
  })
  const originalContent = exist(
    resolve(COMPONENT_ROOT, 'components-declaration.d.ts')
  )
    ? await fs.readFile(
      resolve(COMPONENT_ROOT, 'components-declaration.d.ts'),
      'utf-8'
    )
    : ''

  const originImports = parseComponentsDeclaration(originalContent)
  const lines = Object.entries({
    ...originImports,
    ...components
  })
    .filter(([name]) => {
      return components[name]
    })
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    })
  const code = `// this is global component declaration
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
    [key: string]: any
  }
}
export { }
`
  if (code !== originalContent) {
    await fs.writeFile(
      resolve(COMPONENT_ROOT, 'components-declaration.d.ts'),
      code,
      'utf-8'
    )
  }
}
generateComponentsType()
