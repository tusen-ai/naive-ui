import * as marked from 'marked'
import { createRenderer } from './md-renderer'
import { genVueComponent, getFileName, mergeParts } from './convert-md-to-demo'

const mdRenderer = createRenderer()

function getPartsOfDemo (text) {
  // slot template
  const firstIndex = text.indexOf('<template>')
  let template = text.slice(firstIndex + 10)
  const lastIndex = template.lastIndexOf('</template>')
  template = template.slice(0, lastIndex)
  const script = text.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/)?.[1]?.trim()
  const style = text.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  const markdownText = text
    .match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]
    ?.trim()
  const tokens = marked.lexer(markdownText)
  const contentTokens = []
  let title = ''
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else {
      contentTokens.push(token)
    }
  }
  const scriptAttributes = text
    .match(/<script([\s\S]*?)>[\s\S]*?<\/script>/)?.[1]
    .trim()
  const languageType = scriptAttributes?.includes('lang="ts"') ? 'ts' : 'js'
  const apiType = scriptAttributes?.includes('setup')
    ? 'composition'
    : 'options'
  return {
    template,
    script,
    style,
    title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    }),
    language: languageType,
    api: apiType
  }
}

export function convertVue2Demo (
  content,
  { resourcePath, relativeUrl, isVue = true }
) {
  const parts = getPartsOfDemo(content)
  const mergedParts = mergeParts({ parts, isVue })
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(
    mergedParts,
    fileName + '.vue',
    relativeUrl
  )
  return vueComponent
}
