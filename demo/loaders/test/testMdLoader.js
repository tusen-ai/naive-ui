const mdLoader = require('./NaiveUIMdLoader')
const marked = require('marked')
const fs = require('fs')
const path = require('path')
const content = fs.readFileSync(path.resolve(__dirname, '../documentation/intro/start.vue.md')).toString()
// console.log('rendered', mdLoader(content))

function parseMdAsAnchor (content) {
  const tokens = marked.lexer(content)
  const titles = tokens.filter(token => token.type === 'heading' && token.depth === 2).map(token => token.text)
  const linkTags = titles.map(title => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}"/>`
  })
  return `<n-anchor :top="24" position="absolute" affix style="width: 132px;">${linkTags.join('\n')}</n-anchor>`
}

console.log(parseMdAsAnchor(content))
