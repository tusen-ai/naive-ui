const { marked } = require('marked')
const createRenderer = require('./md-renderer')
const mdRenderer = createRenderer()
const { genVueComponent, getFileName, mergeParts } = require('./convert-md-to-demo')

function getPartsOfDemo (text) {
  const template = text.match(/<template>([\s\S]+?)<\/template>/)[1].trim()
  const script = text.match(/<script.*?>([\s\S]+?)<\/script>/)?.[1]?.trim()
  const style = text.match(/<style>([\s\S]*?)<\/style>/)?.[1]?.trim()
  let title = null
  const markdownText = text.match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]?.trim()
  const tokens = marked.lexer(markdownText)
  const contentTokens = []
  contentTokens.links = tokens.links
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else {
      contentTokens.push(token)
    }
  }
  const languageType = text.includes('lang="ts"') ? 'ts' : 'js'
  return {
    template,
    script,
    style,
    title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    }),
    language: languageType
  }
}

function convertVue2Demo (content, { resourcePath, relativeUrl }) {
  const parts = getPartsOfDemo(content)
  const mergedParts = mergeParts(parts)
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(
    mergedParts,
    fileName,
    relativeUrl
  )
  return vueComponent
}

module.exports = convertVue2Demo
