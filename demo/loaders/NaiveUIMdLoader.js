const marked = require('marked')
const createRenderer = require('./mdRenderer')
const renderer = createRenderer()

function parseMdAsAnchor (content) {
  const tokens = marked.lexer(content)
  const titles = tokens.filter(token => token.type === 'heading' && token.depth === 2).map(token => token.text)
  const linkTags = titles.map(title => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}"/>`
  })
  return `<n-anchor :top="24" position="absolute" affix style="width: 132px;">${linkTags.join('\n')}</n-anchor>`
}

module.exports = function (content) {
  return `<template>
  <component-documentation>
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="width: calc(100% - 184px); margin-right: 24x;">
        ${marked(content, {
          renderer
        })}
      </div>
      <div style="width: 160px;">
        ${parseMdAsAnchor(content)}
      </div>
    </div>
  </component-documentation>
</template>`
}
