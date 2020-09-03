const marked = require('marked')
const camelCase = require('lodash/camelCase')
const mdLoader = require('./NaiveUIMdLoader')
const createRenderer = require('./mdRenderer')
const mdRenderer = createRenderer()

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

function parseDemos (demosLiteral, env) {
  const demoFileNames = demosLiteral
    .split('\n')
    .map(demoFileName => demoFileName.trim())
    .filter((demoFileName) => {
      if (env === 'production') {
        return demoFileName.length && demoFileName.indexOf('debug') < 0 && demoFileName.indexOf('Debug') < 0
      }
      return demoFileName.length
    })
  const demoTags = demoFileNames.map(demoFileName => `<${demoFileName}Demo id="${demoFileName}" demo-id="${demoFileName}"/>`)
  return demoTags.join('\n')
}

function parseDemosAsAnchor (demosLiteral) {
  const demoFileNames = demosLiteral
    .split('\n')
    .map(demoFileName => demoFileName.trim())
    .filter(demoFileName => demoFileName.length)
  const linkTags = demoFileNames.map(demoFileName => (
    `
<n-anchor-link
  v-if="anchorLinkMap.has('${demoFileName}')"
  :title="anchorLinkMap.get('${demoFileName}')"
  href="#${demoFileName}"
/>`))
  return `<n-anchor :top="32" :bound="16" position="absolute" affix style="width: 144px;">${linkTags.join('\n')}</n-anchor>`
}

function generateScript (demosLiteral, components = [], url) {
  const demoFileNames = demosLiteral
    .split('\n')
    .map(demoFileName => demoFileName.trim())
    .filter(demoFileName => demoFileName.length)
  const importStatements = demoFileNames
    .map(demoFileName => `import ${camelCase(demoFileName)}Demo from './${demoFileName}.demo.md'`)
    .concat(components.map(component => `import ${camelCase(component)} from './${component}'`))
    .join('\n')
  const componentStatements = demoFileNames.map(demoFileName => camelCase(demoFileName) + 'Demo').concat(components).join(', ')
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
      anchorLinkMap: new Map(),
      url: ${JSON.stringify(url)}
    }
  }
}
</script>`
  return script
}

function convertMd2ComponentDocumentation (text, env = 'development', url) {
  const isNoDemo = !!~text.search('<!--no-demo-->')
  if (isNoDemo) {
    return mdLoader(text, url)
  }
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
  const documentationHTML = `${marked.parser(headerPart, {
    gfm: true,
    renderer: mdRenderer
  })}\n` + '<!--demos-->\n' + `${marked.parser(footerPart, {
    gfm: true,
    renderer: mdRenderer
  })}\n`
  // console.log(documentationHTML)
  // const classedDocumentationHTML = addClassToHTML(documentationHTML, 'markdown')
  const demosReg = /<!--demos-->/
  const demoTags = parseDemos(demosLiteral, env)
  let documentationContent = documentationHTML
    .replace(demosReg, template(demoTags, demosLiteral, isSingleColumn))
  const titleIndex = tokens.findIndex(token => token.type === 'heading' && token.depth === 1)
  if (titleIndex > -1) {
    const titleText = JSON.stringify(tokens[titleIndex].text)
    const gheButton = `<edit-on-github-header url=${url} text=${titleText}></edit-on-github-header>`
    const titleReg = /(<n-h1[^>]*>)(.*?)(<\/n-h1>)/
    documentationContent = documentationContent.replace(titleReg, `${gheButton}`)
  }
  const documentationTemplate = `s
<template>
  <component-documentation>
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="width: calc(100% - 180px); margin-right: 36px;">
        ${documentationContent}
      </div>
      <div style="width: 144px;">
        ${parseDemosAsAnchor(demosLiteral)}
      </div>
    </div>
  </component-documentation>
</template>`
  const documentationScript = generateScript(demosLiteral, components, url)
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
