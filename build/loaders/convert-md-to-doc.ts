import type { Heading, Root } from 'mdast'
import type { ComponentInfo } from '../markdown/plugins/remark-extract-components'
import type { DemoInfo } from '../markdown/plugins/remark-extract-demos'
import { toString } from 'mdast-util-to-string'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import { createHandlers } from '../markdown/handlers'
import { createBaseProcessor } from '../markdown/parser'
import { remarkDocHeader } from '../markdown/plugins/remark-doc-header'
import { remarkExtractComponents } from '../markdown/plugins/remark-extract-components'
import { remarkExtractDemos } from '../markdown/plugins/remark-extract-demos'

export interface AnchorInfo {
  id: string
  title: string
  debug: boolean
}

/**
 * Inline remark plugin that captures heading data from the mdast tree
 * before remarkRehype converts it to hast. This data is needed for
 * generating anchor navigation in the final Vue SFC.
 */
function remarkCaptureAnchors() {
  return (tree: Root, file: any) => {
    const nodes = tree.children
    const h2Anchors: AnchorInfo[] = nodes
      .filter(
        (node): node is Heading => node.type === 'heading' && node.depth === 2
      )
      .map((node) => {
        const title = toString(node)
        return { id: title.replace(/ /g, '-'), title, debug: false }
      })

    const h3Anchors: AnchorInfo[] = nodes
      .filter(
        (node): node is Heading => node.type === 'heading' && node.depth === 3
      )
      .map((node) => {
        const title = toString(node)
        return { id: title.replace(/ /g, '-'), title, debug: false }
      })

    file.data.h2Anchors = h2Anchors
    file.data.h3Anchors = h3Anchors
  }
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

function genDemosAnchorTemplate(
  demoInfos: DemoInfo[],
  hasApi: boolean,
  h3Anchors: AnchorInfo[]
): string {
  const apiAnchors: AnchorInfo[] = [
    { id: 'API', title: 'API', debug: false },
    ...h3Anchors
  ]
  const links = (
    hasApi ? demoInfos.concat(apiAnchors as DemoInfo[]) : demoInfos
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

function genPageAnchorTemplate(h2Anchors: AnchorInfo[]): string {
  const links = h2Anchors.map(({ id, title }) => {
    return `<n-anchor-link title="${title}" href="#${id}"/>`
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

  // Build the full unified pipeline
  const processor = createBaseProcessor()
    .use(remarkExtractComponents)
    .use(remarkDocHeader)
    .use(remarkExtractDemos, { env, colSpan })
    .use(remarkCaptureAnchors)
    .use(remarkRehype, { handlers: createHandlers(), allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })

  const file = await processor.process({ value: text, data: { url } })

  // Extract plugin data from vfile
  const demoInfos: DemoInfo[] = (file.data.demoInfos as DemoInfo[]) || []
  const components: ComponentInfo[]
    = (file.data.components as ComponentInfo[]) || []
  const h2Anchors: AnchorInfo[] = (file.data.h2Anchors as AnchorInfo[]) || []
  const h3Anchors: AnchorInfo[] = (file.data.h3Anchors as AnchorInfo[]) || []

  const docMainTemplate = String(file)

  // Generate page template
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
          ? genDemosAnchorTemplate(demoInfos, hasApi, h3Anchors)
          : genPageAnchorTemplate(h2Anchors)
      }
    </div>
  </div>
</template>`
  const docScript = genScript(demoInfos, components, url, forceShowAnchor)
  return `${docTemplate}\n\n${docScript}`
}
