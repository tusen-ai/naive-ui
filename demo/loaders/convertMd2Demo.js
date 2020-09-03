const marked = require('marked')
const fs = require('fs')
const path = require('path')
const createRenderer = require('./mdRenderer')
const mdRenderer = createRenderer()
const codeRenderer = createRenderer(false)
// const prettier = require('prettier')

const demoBlock = fs.readFileSync(path.resolve(__dirname, 'ComponentDemoTemplate.vue')).toString()

function getPartsOfDemo (tokens) {
  let template = null
  let script = null
  let style = null
  let title = null
  // let content = null
  const contentTokens = []
  contentTokens.links = tokens.links
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else if (token.type === 'code' && (token.lang === 'template' || token.lang === 'html')) {
      template = token.text
    } else if (token.type === 'code' && (token.lang === 'script' || token.lang === 'js')) {
      script = token.text
    } else if (token.type === 'code' && (token.lang === 'style' || token.lang === 'css')) {
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
    })
  }
}

function mergeParts (parts) {
  const mergedParts = {
    ...parts
  }
  mergedParts.title = parts.title
  mergedParts.content = parts.content
  mergedParts.code = ''
  // console.log(parts)
  if (parts.template) {
    mergedParts.code += parts.template
  }
  if (parts.script) {
    if (parts.template) mergedParts.code += '\n\n'
    mergedParts.code += `<script>
${parts.script}
</script>`
  }
  if (parts.style) {
    if (parts.template || parts.script) mergedParts.code += '\n\n'
    mergedParts.code += `<style>
${parts.style}
</style>`
  }
  mergedParts.code = marked(`\`\`\`html
${mergedParts.code}
\`\`\``, {
    renderer: codeRenderer
  })
  // console.log(mergedParts.code)
  return mergedParts
}

function genVueComponent (parts, fileName, relativeUrl, noRunning = false) {
  const demoFileNameReg = /<!--DEMO_FILE_NAME-->/g
  const relativeUrlReg = /<!--URL-->/g
  const titleReg = /<!--TITLE_SLOT-->/g
  const contentReg = /<!--CONTENT_SLOT-->/
  const codeReg = /<!--CODE_SLOT-->/
  const scriptReg = /\/\*\*\sSCRIPT_SLOT\s\*\//
  const styleReg = /\/\*\*STYLE_SLOT\*\//g
  const demoReg = /<!--DEMO_SLOT-->/
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
    src = src.replace(codeReg, parts.code)
  }
  if (parts.script && !noRunning) {
    src = src.replace(scriptReg, parts.script)
  }
  if (parts.style) {
    src = src.replace(styleReg, parts.style)
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template)
  }
  return src.trim()
}

function getFileName (resourcePath) {
  const dirs = resourcePath.split('/')
  const fileNameWithExtension = dirs[dirs.length - 1]
  return [fileNameWithExtension.split('.')[0], fileNameWithExtension]
}

function convertMd2Demo (text, {
  resourcePath,
  relativeUrl
}) {
  const noRunning = /<!--no-running-->/.test(text)
  const tokens = marked.lexer(text)
  const parts = getPartsOfDemo(tokens)
  const mergedParts = mergeParts(parts)
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(mergedParts, fileName, relativeUrl, noRunning)
  return vueComponent
}

module.exports = convertMd2Demo
// const startTime = new Date()
// for (let i = 0; i < 100; ++i) {
// const md = fs.readFileSync('./demo/documentation/components/input/enUS/lazyFocus.md').toString()
// convertMd2Demo(md)
// }
// const endTime = new Date()
// console.log(endTime - startTime)
