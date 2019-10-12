const hljs = require('highlight.js')
const marked = require('marked')
const camelCase = require('lodash/camelCase')
// const prettier = require('prettier')

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeForHTML (input) {
  return input.replace(/([&<>'"])/g, char => escapeMap[char])
}

marked.setOptions({
  gfm: true
})

// Create your custom renderer.
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && hljs.getLanguage(language))

  // Highlight only if the language is valid.
  // highlight.js escapes HTML in the code, but we need to escape by ourselves
  // when we don't use it.
  const highlighted = validLang
    ? hljs.highlight(language, code).value
    : escapeForHTML(code)

  // Render the highlighted code with `hljs` class.
  return `<pre><code class="${language}">${highlighted}</code></pre>`
}

// marked.setOptions({
//   renderer
// })

function template (demos, isSingleColumn = false) {
  return `<component-demos :single-column="${isSingleColumn}">${demos}</component-demos>`
}

function parseDemos (demosLiteral) {
  const demoNames = demosLiteral
    .split('\n')
    .map(demoName => demoName.trim())
    .filter(demoName => demoName.length)
  const demoTags = demoNames.map(demoName => `<${demoName}Demo />`)
  return demoTags.join('\n')
}

function generateScript (demosLiteral) {
  const demoNames = demosLiteral
    .split('\n')
    .map(demoName => demoName.trim())
    .filter(demoName => demoName.length)
    .map(demoName => camelCase(demoName))
  const importStatements = demoNames.map(demoName => `import ${demoName}Demo from './${demoName}.md'`).join('\n')
  const componentStatements = demoNames.map(demoName => demoName + 'Demo').join(', ')
  const script = `<script>
${importStatements}

export default {
  components: {
    ${componentStatements}
  }
}
</script>`
  return script
}

function convertMd2ComponentDocumentation (text) {
  const isSingleColumn = !!~text.search('<!--single-column-->')
  const tokens = marked.lexer(text)
  const demosIndex = tokens.findIndex(token => token.type === 'code' && token.lang === 'demo')
  let demos = { text: '' }
  let demosLiteral = ''
  let headerPart = tokens
  let footerPart = []
  // console.log(tokens)
  if (~demosIndex) {
    headerPart = tokens.slice(0, demosIndex)
    footerPart = tokens.slice(demosIndex + 1)
    demos = tokens[demosIndex]
    demosLiteral = demos.text
    tokens.splice(demosIndex, 1, {
      type: 'html',
      pre: false,
      text: '<!--demos-->\n'
    })
  }
  headerPart.links = {}
  footerPart.links = {}
  const documentationHTML = `<section class="markdown header-part">${marked.parser(headerPart)}</section>\n` + '<!--demos-->\n' + `<section class="markdown footer-part">${marked.parser(footerPart)}</section>\n`
  // console.log(documentationHTML)
  // const classedDocumentationHTML = addClassToHTML(documentationHTML, 'markdown')
  const demosReg = /<!--demos-->/
  const demoTags = parseDemos(demosLiteral)
  const documentationContent = documentationHTML.replace(demosReg, template(demoTags, isSingleColumn))
  // console.log(documentationContent)
  const documentationTemplate = `<template><component-documentation>${documentationContent}</component-documentation></template>`
  const documentationScript = generateScript(demosLiteral)
  return `${documentationTemplate}\n\n${documentationScript}`
  // console.log(vueComponent)
  // return vueComponent
  // console.log(marked.parser(tokens))
  // const parts = getPartsOfDemo(tokens)
  // const mergedParts = mergeParts(parts)
  // const vueComponent = genVueComponent(mergedParts)
  // console.log(vueComponent)
  // return vueComponent
}

// function addClassToHTML (html, className) {
//   const classReg = /<[^!/][^>]*>/g
//   return html.replace(classReg, (openTag) => {
//     return openTag.replace(/>/, ` class="${className}">`)
//   })
// }

module.exports = convertMd2ComponentDocumentation
// const startTime = new Date()
// for (let i = 0; i < 100; ++i) {

// const fs = require('fs')
// const md = fs.readFileSync('./marked/component.md').toString()
// console.log(convertMd2ComponentDocumentation(md))
// }
// const endTime = new Date()
// console.log(endTime - startTime)
