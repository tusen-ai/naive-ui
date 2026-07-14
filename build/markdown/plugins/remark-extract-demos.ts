import type { Code, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import path from 'node:path'
import fse from 'fs-extra'
import camelCase from 'lodash/camelCase'
import projectPath from '../../loaders/project-path'

export interface DemoInfo {
  id: string
  title: string
  debug: boolean
  variable?: string
  fileName?: string
  tag?: string
}

export interface RemarkExtractDemosOptions {
  env?: string
  colSpan?: number
}

async function resolveDemoTitle(
  fileName: string,
  demoEntryPath: string
): Promise<string> {
  const demoStr = await fse.readFile(
    path.resolve(projectPath, demoEntryPath, '..', fileName),
    'utf-8'
  )
  const match = demoStr.match(/# ([^\n]+)/)
  if (!match)
    throw new Error('No demo title found')
  return match[1]
}

async function resolveDemoInfos(
  literal: string,
  url: string,
  env: string
): Promise<DemoInfo[]> {
  const ids = literal
    .split('\n')
    .map(line => line.trim())
    .filter(id => id.length)
  const infos: DemoInfo[] = []
  for (const id of ids) {
    const debug = id.includes('debug') || id.includes('Debug')
    if (env === 'production' && debug) {
      continue
    }
    let fileName
    if (id.includes('.vue')) {
      fileName = `${id.slice(0, -4)}.demo.vue`
    }
    else {
      fileName = `${id}.demo.md`
    }
    const variable = `${camelCase(id)}Demo`
    infos.push({
      id,
      variable,
      fileName,
      title: await resolveDemoTitle(fileName, url),
      tag: `<${variable} />`,
      debug
    })
  }
  return infos
}

function genDemosTemplate(demoInfos: DemoInfo[], colSpan: number): string {
  return `<component-demos :span="${colSpan}">${demoInfos
    .map(({ tag }) => tag)
    .join('\n')}</component-demos>`
}

export function remarkExtractDemos(
  options: RemarkExtractDemosOptions = {}
): Transformer<Root, Root> {
  const { env = 'development', colSpan = 2 } = options

  return async (tree, file) => {
    const nodes = tree.children
    const url = (file.data.url as string) || ''

    const demosIndex = nodes.findIndex(
      node => node.type === 'code' && (node as Code).lang === 'demo'
    )

    let demoInfos: DemoInfo[] = []
    if (~demosIndex) {
      demoInfos = await resolveDemoInfos(
        (nodes[demosIndex] as Code).value,
        url,
        env
      )
      nodes.splice(demosIndex, 1, {
        type: 'html',
        value: genDemosTemplate(demoInfos, colSpan)
      } as RootContent)
    }

    file.data.demoInfos = demoInfos
  }
}
