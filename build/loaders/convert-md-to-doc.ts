import type { Html, Root, RootContent } from 'mdast'
import path from 'node:path'
import fse from 'fs-extra'
import camelCase from 'lodash/camelCase'
import {
  getHeadingId,
  getPageConfig,
  getText,
  isHeading,
  parseMarkdown,
  slugHeadings
} from '../utils/markdown'
import { renderMarkdown } from './md-renderer'
import projectPath from './project-path'

interface DemoInfo {
  id: string
  title: string
  debug: boolean
  variable?: string
  fileName?: string
  tag?: string
}

interface ComponentInfo {
  ids: string[]
  importStmt: string
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

function genAnchorTemplate(
  children: string,
  options: { ignoreGap: boolean } = {
    ignoreGap: false
  }
): string {
  return `
    <n-anchor
      internal-scrollable
      :bound="16"
      type="block"
      style="width: 192px; position: sticky; top: 32px; max-height: calc(100vh - 32px - 64px); height: auto;"
      offset-target="#doc-layout"
      :ignore-gap="${options.ignoreGap}"
    >
      ${children}
    </n-anchor>
  `
}

interface AnchorLink {
  id: string
  title: string
  debug: boolean
}

function getHeadingLinks(tree: Root, depth: number): AnchorLink[] {
  return tree.children
    .filter(node => isHeading(node, depth))
    .map(heading => ({
      id: getHeadingId(heading),
      title: getText(heading),
      debug: false
    }))
}

function genAnchorLinks(links: AnchorLink[]): string {
  return links
    .map(
      ({ id, title, debug }) => `<n-anchor-link
      v-if="(displayMode === 'debug') || ${!debug}"
      title="${title}"
      href="#${id}"
    />`
    )
    .join('\n')
}

// The demos, then the API and its parts
function genDemosAnchorTemplate(demoInfos: DemoInfo[], tree: Root): string {
  const api = getHeadingLinks(tree, 2).find(link => link.title === 'API')
  const links = api
    ? [...demoInfos, api, ...getHeadingLinks(tree, 3)]
    : demoInfos
  return genAnchorTemplate(genAnchorLinks(links), { ignoreGap: !!api })
}

function genPageAnchorTemplate(tree: Root): string {
  const links = getHeadingLinks(tree, 2).map(
    ({ id, title }) => `<n-anchor-link title="${title}" href="#${id}"/>`
  )
  return genAnchorTemplate(links.join('\n'), { ignoreGap: true })
}

function genScript(
  demoInfos: DemoInfo[],
  components: ComponentInfo[] = [],
  url: string,
  forceShowAnchor: boolean
): string {
  const showAnchor = !!(demoInfos.length || forceShowAnchor)
  const importStmts = demoInfos
    .map(({ variable, fileName }) => `import ${variable} from './${fileName}'`)
    .concat(components.map(({ importStmt }) => importStmt))
    .join('\n')
  const componentStmts = demoInfos
    .map(({ variable }) => variable)
    .concat(components.map(({ ids }) => ids).flat())
    .join(',\n')
  const script = `<script>
${importStmts}
import { computed } from 'vue'
import { useMemo } from 'vooks'
import { useDisplayMode } from '/demo/store'
import { useIsMobile } from '/demo/utils/composables'

export default {
  components: {
    ${componentStmts}
  },
  setup () {
    const isMobileRef = useIsMobile()
    const showAnchorRef = useMemo(() => {
      if (isMobileRef.value) return false
      return ${showAnchor}
    })
    const useSmallPaddingRef = isMobileRef
    return {
      showAnchor: showAnchorRef,
      displayMode: useDisplayMode(),
      wrapperStyle: computed(() => {
        return !useSmallPaddingRef.value
          ? 'display: flex; flex-wrap: nowrap; padding: 32px 24px 56px 56px;'
          : 'padding: 16px 16px 24px 16px;'
      }),
      contentStyle: computed(() => {
        return showAnchorRef.value
          ? 'width: calc(100% - 228px); margin-right: 36px;'
          : 'width: 100%; padding-right: 12px;';
      }),
      url: ${JSON.stringify(url)}
    }
  }
}
</script>`
  return script
}

function parseComponents(literal: string): ComponentInfo[] {
  return literal.split('\n').map((component) => {
    const [ids, importStmt] = component.split(':')
    if (!ids.trim())
      throw new Error('No component id')
    if (!importStmt.trim())
      throw new Error('No component source url')
    return {
      ids: ids.split(',').map(id => id.trim()),
      importStmt: importStmt.trim()
    }
  })
}

function html(value: string): Html {
  return { type: 'html', value }
}

export async function convertMd2ComponentDocumentation(
  text: string,
  url: string,
  env: string = 'development'
): Promise<string> {
  const tree = parseMarkdown(text)
  const config = getPageConfig(tree)
  slugHeadings(tree)
  let components: ComponentInfo[] = []
  let demoInfos: DemoInfo[] = []
  let hasTitle = false
  const children: RootContent[] = []
  for (const node of tree.children) {
    // External components used in the page
    if (node.type === 'code' && node.lang === 'component') {
      components = parseComponents(node.value)
    }
    // Debug demos are removed from production build
    else if (node.type === 'code' && node.lang === 'demo') {
      demoInfos = await resolveDemoInfos(node.value, url, env)
      children.push(html(genDemosTemplate(demoInfos, config.demoColumns ?? 2)))
    }
    // The title comes with an edit on github button
    else if (isHeading(node, 1) && !hasTitle) {
      hasTitle = true
      children.push(
        html(
          `<edit-on-github-header relative-url="${url}" text=${JSON.stringify(
            getText(node)
          )} id="${getHeadingId(node)}"></edit-on-github-header>`
        )
      )
    }
    else {
      children.push(node)
    }
  }
  const docMainTemplate = renderMarkdown({ ...tree, children })
  // generate page
  const docTemplate = `
<template>
  <div
    class="doc"
    :style="wrapperStyle"
  >
    <div :style="contentStyle">
      ${docMainTemplate}
    </div>
    <div style="width: 192px;" v-if="showAnchor">
      ${
        demoInfos.length
          ? genDemosAnchorTemplate(demoInfos, tree)
          : genPageAnchorTemplate(tree)
      }
    </div>
  </div>
</template>`
  const docScript = genScript(demoInfos, components, url, !!config.anchor)
  return `${docTemplate}\n\n${docScript}`
}
