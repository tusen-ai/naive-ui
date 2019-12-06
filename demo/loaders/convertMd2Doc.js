const hljs = require('highlight.js')
const marked = require('marked')
const camelCase = require('lodash/camelCase')
const kababCase = require('lodash/kebabCase')
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

function template (demos, demosLiteral, isSingleColumn = false) {
  // return `<component-demos :single-column="${isSingleColumn}">
  // ${demos}
  //   <template v-slot:anchor>
  //     ${parseDemosAsAnchor(demosLiteral)}
  //   </template>
  // </component-demos>`
  return `<component-demos :single-column="${isSingleColumn}">
  ${demos}
  </component-demos>`
}

function parseDemos (demosLiteral) {
  const demoNames = demosLiteral
    .split('\n')
    .map(demoName => demoName.trim())
    .filter(demoName => demoName.length)
  const demoTags = demoNames.map(demoName => `<${demoName}Demo id="${kababCase(demoName)}" demo-id="${kababCase(demoName)}"/>`)
  return demoTags.join('\n')
}

function parseDemosAsAnchor (demosLiteral) {
  const demoNames = demosLiteral
    .split('\n')
    .map(demoName => demoName.trim())
    .filter(demoName => demoName.length)
  const linkTags = demoNames.map(demoName => `<n-anchor-link :title="anchorLinkMap.get('${kababCase(demoName)}') || ''" href="#${kababCase(demoName)}"/>`)
  return `<n-anchor :top="24" position="absolute" affix style="width: 132px;">${linkTags.join('\n')}</n-anchor>`
}

function generateScript (demosLiteral, components = []) {
  const demoNames = demosLiteral
    .split('\n')
    .map(demoName => demoName.trim())
    .filter(demoName => demoName.length)
    .map(demoName => camelCase(demoName))
  components = components.map(component => camelCase(component))
  const importStatements = demoNames
    .map(demoName => `import ${demoName}Demo from './${demoName}.md'`)
    .concat(components.map(component => `import ${component} from './${component}'`))
    .join('\n')
  const componentStatements = demoNames.map(demoName => demoName + 'Demo').concat(components).join(', ')
  const script = `<script>
${importStatements}

export default {
  components: {
    ${componentStatements}
  },
  provide () {
    return {
      NDocumentation: this
    }
  },
  data () {
    return {
      anchorLinkMap: new Map()
    }
  }
}
</script>`
  return script
}

function convertMd2ComponentDocumentation (text) {
  const isSingleColumn = !!~text.search('<!--single-column-->')
  const tokens = marked.lexer(text)
  const componentsIndex = tokens.findIndex(token => token.type === 'code' && token.lang === 'component')
  let components = []
  if (~componentsIndex) {
    components = tokens[componentsIndex].text
    components = components.split('\n').map(component => component.trim()).filter(component => component.length)
    tokens.splice(componentsIndex, 1)
  }
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
  const documentationContent = documentationHTML.replace(demosReg, template(demoTags, demosLiteral, isSingleColumn))
  // console.log(documentationContent)
  const documentationTemplate = `
<template>
  <component-documentation>
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="width: calc(100% - 148px); margin-right: 16px;">
        ${documentationContent}
      </div>
      <div style="width: 132px;">
        ${parseDemosAsAnchor(demosLiteral)}
      </div>
    </div>
  </component-documentation>
</template>`
  const documentationScript = generateScript(demosLiteral, components)
  // if (components.length) console.log(`${documentationTemplate}\n\n${documentationScript}`)
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
