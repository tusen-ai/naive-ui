import type { Token, Tokens } from 'marked'
import path from 'node:path'
import fse from 'fs-extra'
import camelCase from 'lodash/camelCase'
import { marked } from 'marked'
import { createRenderer } from './md-renderer'
import projectPath from './project-path'

const mdRenderer = createRenderer()

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

function genDemosApiAnchorTemplate(
  tokens: Token[]
): (DemoInfo | { id: string, title: string, debug: boolean })[] {
  const api: DemoInfo[] = [
    {
      id: 'API',
      title: 'API',
      debug: false
    }
  ]
  return api.concat(
    tokens
      .filter(
        (token): token is Tokens.Heading =>
          token.type === 'heading' && token.depth === 3
      )
      .map(token => ({
        id: token.text.replace(/ /g, '-'),
        title: token.text,
        debug: false
      }))
  )
}

function genDemosAnchorTemplate(
  demoInfos: DemoInfo[],
  hasApi: boolean,
  tokens: Token[]
): string {
  const links = (
    hasApi
      ? demoInfos.concat(genDemosApiAnchorTemplate(tokens) as DemoInfo[])
      : demoInfos
  ).map(
    ({ id, title, debug }) => `<n-anchor-link
      v-if="(displayMode === 'debug') || ${!debug}"
      title="${title}"
      href="#${id}"
    />`
  )
  return genAnchorTemplate(links.join('\n'), {
    ignoreGap: hasApi
  })
}

function genPageAnchorTemplate(tokens: Token[]): string {
  const titles = tokens
    .filter(
      (token): token is Tokens.Heading =>
        token.type === 'heading' && token.depth === 2
    )
    .map(token => token.text)
  const links = titles.map((title) => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}"/>`
  })
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

export async function convertMd2ComponentDocumentation(
  text: string,
  url: string,
  env: string = 'development'
): Promise<string> {
  const forceShowAnchor = !!~text.search('<!--anchor:on-->')
  const colSpan = ~text.search('<!--single-column-->') ? 1 : 2
  const hasApi = !!~text.search('## API')
  const tokens = marked.lexer(text)
  // resolve external components
  const componentsIndex = tokens.findIndex(
    token =>
      token.type === 'code' && (token as Tokens.Code).lang === 'component'
  )
  let components: ComponentInfo[] = []
  if (~componentsIndex) {
    const token = tokens[componentsIndex] as Tokens.Code
    components = token.text
      .split('\n')
      .map((component) => {
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
      .filter(({ ids, importStmt }) => ids && importStmt)
    tokens.splice(componentsIndex, 1)
  }
  // add edit on github button on title
  const titleIndex = tokens.findIndex(
    token => token.type === 'heading' && token.depth === 1
  )
  if (titleIndex > -1) {
    const titleText = JSON.stringify(
      (tokens[titleIndex] as Tokens.Heading).text
    )
    const btnTemplate = `<edit-on-github-header relative-url="${url}" text=${titleText}><\/edit-on-github-header>`
    tokens.splice(titleIndex, 1, {
      type: 'html',
      pre: false,
      text: btnTemplate
    } as Tokens.HTML)
  }
  // resolve demos, debug demos are removed from production build
  const demosIndex = tokens.findIndex(
    token => token.type === 'code' && (token as Tokens.Code).lang === 'demo'
  )
  let demoInfos: DemoInfo[] = []
  if (~demosIndex) {
    demoInfos = await resolveDemoInfos(
      (tokens[demosIndex] as Tokens.Code).text,
      url,
      env
    )
    tokens.splice(demosIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(demoInfos, colSpan)
    } as any)
  }
  const docMainTemplate = marked.parser(tokens, {
    gfm: true,
    renderer: mdRenderer
  })
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
          ? genDemosAnchorTemplate(demoInfos, hasApi, tokens)
          : genPageAnchorTemplate(tokens)
      }
    </div>
  </div>
</template>`
  const docScript = await genScript(demoInfos, components, url, forceShowAnchor)
  return `${docTemplate}\n\n${docScript}`
}
