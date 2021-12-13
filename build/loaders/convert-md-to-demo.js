const { marked } = require('marked')
const fs = require('fs')
const path = require('path')
const createRenderer = require('./md-renderer')
const tsToJs = require('../utils/tsToJs')
const mdRenderer = createRenderer()

const __HTTP__ = process.env.NODE_ENV !== 'production' ? 'http' : 'https'

const demoBlock = fs
  .readFileSync(path.resolve(__dirname, 'ComponentDemoTemplate.vue'))
  .toString()

function getPartsOfDemo (tokens) {
  let template = null
  let script = null
  let style = null
  let title = null
  const contentTokens = []
  contentTokens.links = tokens.links
  let languageType = 'js'
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'template' || token.lang === 'html')
    ) {
      template = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'script' || token.lang === 'js' || token.lang === 'ts')
    ) {
      languageType = token.lang
      script = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'style' || token.lang === 'css')
    ) {
      style = token.text
    } else {
      contentTokens.push(token)
    }
  }
  return {
    template: template,
    script: script,
    style: style,
    title: title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    }),
    language: languageType
  }
}

function mergeParts ({ parts, isVue }) {
  const mergedParts = {
    ...parts
  }
  mergedParts.title = parts.title
  mergedParts.content = parts.content
  mergedParts.code = ''
  mergedParts.jsCode = ''
  let jsCode = ''
  if (parts.template) {
    if (isVue) {
      mergedParts.code += `<template>${parts.template}</template>`
      mergedParts.jsCode += `<template>${parts.template}</template>`
    } else {
      mergedParts.code += `<template>\n${parts.template
        .split('\n')
        .map((line) => (line.length ? '  ' + line : line))
        .join('\n')}\n</template>`
      mergedParts.jsCode = mergedParts.code
    }
  }
  if (parts.script) {
    if (parts.template) {
      mergedParts.code += '\n\n'
      mergedParts.jsCode += '\n\n'
    }
    const startScriptTag =
      parts.language === 'ts' ? '<script lang="ts">' : '<script>'
    mergedParts.code += `${startScriptTag}
${parts.script}
</script>`
    if (parts.language === 'ts') {
      jsCode = tsToJs(parts.script)
      mergedParts.jsCode += `<script>
${jsCode}
</script>`
    } else {
      mergedParts.jsCode = mergedParts.code
    }
  }
  if (parts.style) {
    if (parts.template || parts.script) {
      mergedParts.code += '\n\n'
      mergedParts.jsCode += '\n\n'
    }
    const style = isVue
      ? `<style>${parts.style}</style>`
      : `<style>
${parts.style}
</style>`
    mergedParts.code += style
    mergedParts.jsCode += style
  }
  mergedParts.code = encodeURIComponent(mergedParts.code)
  mergedParts.jsCode = encodeURIComponent(mergedParts.jsCode)
  return mergedParts
}

const cssRuleRegex = /([^{}]*)(\{[^}]*\})/g

// simulate scss style
// to remove dep of sass
// xxx {
//   mystyle
// }
function genStyle (sourceStyle) {
  let match
  let matched = false
  const rules = []

  while ((match = cssRuleRegex.exec(sourceStyle)) !== null) {
    matched = true
    const selector = match[1]
    const body = match[2]
    rules.push(
      selector
        .split(',')
        .map((part) => `.demo-card__view ${part}, .naive-ui-doc ${part}`)
        .join(',') + body
    )
  }
  if (!matched) return null
  return '<style scoped>\n' + rules.join('\n') + '</style>'
}

function genVueComponent (parts, fileName, relativeUrl) {
  const demoFileNameReg = /<!--DEMO_FILE_NAME-->/g
  const relativeUrlReg = /<!--URL-->/g
  const titleReg = /<!--TITLE_SLOT-->/g
  const contentReg = /<!--CONTENT_SLOT-->/
  const tsCodeReg = /<!--TS_CODE_SLOT-->/
  const jsCodeReg = /<!--JS_CODE_SLOT-->/
  const scriptReg = /<!--SCRIPT_SLOT-->/
  const styleReg = /<!--STYLE_SLOT-->/
  const demoReg = /<!--DEMO_SLOT-->/
  const languageTypeReg = /<!--LANGUAGE_TYPE_SLOT-->/
  let src = demoBlock
  src = src.replace(demoFileNameReg, fileName)
  src = src.replace(relativeUrlReg, relativeUrl)
  if (parts.content) {
    src = src.replace(contentReg, parts.content)
  }
  if (parts.title) {
    src = src.replace(titleReg, parts.title)
  }
  if (parts.code) {
    src = src.replace(tsCodeReg, parts.code)
  }
  if (parts.jsCode) {
    src = src.replace(jsCodeReg, parts.jsCode)
  }
  if (parts.script) {
    const startScriptTag =
      parts.language === 'ts' ? '<script lang="ts">\n' : '<script>\n'
    src = src.replace(scriptReg, startScriptTag + parts.script + '\n</script>')
  }
  if (parts.language) {
    src = src.replace(languageTypeReg, parts.language)
  }
  if (parts.style) {
    const style = genStyle(parts.style)
    if (style !== null) {
      src = src.replace(styleReg, style)
    }
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template)
  }
  if (/__HTTP__/.test(src)) {
    src = src.replace(/__HTTP__/g, __HTTP__)
  }
  return src.trim()
}

function getFileName (resourcePath) {
  const dirs = resourcePath.split('/')
  const fileNameWithExtension = dirs[dirs.length - 1]
  return [fileNameWithExtension.split('.')[0], fileNameWithExtension]
}

function convertMd2Demo (text, { resourcePath, relativeUrl }) {
  const tokens = marked.lexer(text)
  const parts = getPartsOfDemo(tokens)
  const mergedParts = mergeParts({ parts, isVue: false })
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(mergedParts, fileName, relativeUrl)
  return vueComponent
}

module.exports = {
  getFileName,
  genVueComponent,
  mergeParts,
  convertMd2Demo
}
