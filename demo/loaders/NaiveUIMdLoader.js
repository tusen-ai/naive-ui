const marked = require('marked')
const createRenderer = require('./mdRenderer')
const renderer = createRenderer()
const projectPath = require('./project-path')

function parseMdAsAnchor (tokens) {
  const titles = tokens.filter(token => token.type === 'heading' && token.depth === 2).map(token => token.text)
  const linkTags = titles.map(title => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}"/>`
  })
  return `<n-anchor ignore-gap :top="32" position="absolute" affix style="width: 144px;">${linkTags.join('\n')}</n-anchor>`
}

function parseComponents (tokens) {
  const componentsIndex = tokens.findIndex(token => token.type === 'code' && token.lang === 'component')
  let components = []
  if (~componentsIndex) {
    components = tokens[componentsIndex].text
    components = components.split('\n').map(component => component.trim()).filter(component => component.length)
    tokens.splice(componentsIndex, 1)
  }
  return components
}

module.exports = function (content, path) {
  const relativeURL = path.replace(projectPath + '/', '')

  const showAnchor = !!~content.search('<!--anchor:on-->')
  // for marked bug https://github.com/markedjs/marked/issues/1047
  content = content.replace(/\n#/g, '\n\n#')
  const tokens = marked.lexer(content)
  const titleIndex = tokens.findIndex(token => token.type === 'heading' && token.depth === 1)
  const titleText = titleIndex > -1 ? JSON.stringify(tokens[titleIndex].text) : null
  const anchor = parseMdAsAnchor(tokens)
  const components = parseComponents(tokens)
  const importStatements = components
    .map(component => `import ${component} from './${component}'`)
    .join('\n')
  let mdContent = marked.parser(tokens, { renderer })
  if (titleText) {
    const githubButton = `<edit-on-github-header relative-url="${relativeURL}" text=${titleText}></edit-on-github-header>`
    const titleReg = /(<n-h1[^>]*>)(.*?)(<\/n-h1>)/
    mdContent = mdContent.replace(titleReg, `${githubButton}`)
  }
  return `
<template>
  <component-documentation>
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="width: calc(100% - 180px); margin-right: 36px;">
        ${mdContent}
      </div>
      ${
  showAnchor ? `
      <div style="width: 144px;">
        ${anchor}
      </div>` : ''
}
    </div>
  </component-documentation>
</template>
<script>
${importStatements}

export default {
  components: {
    ${components.join(',\n')}
  }
}
</script>`
}
