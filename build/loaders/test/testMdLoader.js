// const mdLoader = require('./NaiveUIMdLoader')
// const { marked } = require('marked')
const fs = require('fs')
const path = require('path')
const content = fs
  .readFileSync(path.resolve(__dirname, '../../../CHANGELOG.zh-CN.md'))
  .toString()
// console.log('rendered', mdLoader(content))

const mdLoader = require('../NaiveUIMdLoader')

// function parseMdAsAnchor (content) {
//   const tokens = marked.lexer(content)
//   const titles = tokens.filter(token => token.type === 'heading' && token.depth === 2).map(token => token.text)
//   const linkTags = titles.map(title => {
//     const href = title.replace(/ /g, '-')
//     return `<n-anchor-link title="${title}" href="#${href}"/>`
//   })
//   return `<n-anchor :top="32" position="absolute" affix style="width: 132px;">${linkTags.join('\n')}</n-anchor>`
// }

console.log(mdLoader.call({ resourcePath: 'xxx' }, content, 'xxx'))
