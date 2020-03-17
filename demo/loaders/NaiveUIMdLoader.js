const marked = require('marked')
const createRenderer = require('./mdRenderer')
const renderer = createRenderer()

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

module.exports = function (content, titleReg, gheUrl, gheButton) {
  const tokens = marked.lexer(content)
  const anchor = parseMdAsAnchor(tokens)
  const components = parseComponents(tokens)
  const importStatements = components
    .map(component => `import ${component} from './${component}'`)
    .join('\n')
  const mdContent = marked.parser(tokens, { renderer })
  const documentationContent = mdContent.replace(titleReg, `$1$2${gheButton}$3`)
  return `<i18n>
  {
    "zh-CN": {
      "editOnGithub": "在 Github 上编辑"
    },
    "en-US": {
      "editOnGithub": "Edit on Github"
    }
  }
</i18n>
<template>
  <component-documentation>
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="width: calc(100% - 180px); margin-right: 36px;">
        ${documentationContent}
      </div>
      <div style="width: 144px;">
        ${anchor}
      </div>
    </div>
  </component-documentation>
</template>
<script>
${importStatements}
import createOutline from 'naive-ui/lib/icons/create-outline'

export default {
  components: {
    createOutline,
    ${components.join(',\n')}
  },
  data () {
    return {
      gheUrl: ${JSON.stringify(gheUrl)}
    }
  },
  methods: {
    handleEditOnGithubClick () {
      window.open(this.gheUrl, '_blank')
      return false
    },
  }
}
</script>`
}
