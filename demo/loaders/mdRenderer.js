const hljs = require('highlight.js')
const marked = require('marked')

function createRenderer (wrapCodeWithCard = true) {
  const renderer = new marked.Renderer()
  const overrides = {
    table (header, body) {
      if (body) body = '<tbody class="n-table__tbody">' + body + '</tbody>'
      return '<n-table>\n' +
        '<thead class="n-table__thead">\n' +
        header +
        '</thead>\n' +
        body +
        '</n-table>\n'
    },

    tablerow (content) {
      return '<tr class="n-table__tr">\n' + content + '</tr>\n'
    },

    tablecell (content, flags) {
      const type = flags.header ? 'th' : 'td'
      const tag = flags.align
        ? '<' + type + ` class="n-table__${type}"` + ' align="' + flags.align + '">'
        : '<' + type + ` class="n-table__${type}"` + '>'
      return tag + content + '</' + type + '>\n'
    },

    code: (code, language) => {
      const isLanguageValid = !!(language && hljs.getLanguage(language))
      if (!isLanguageValid) {
        throw new Error(`MdRendererError: ${language} is not valid for code`)
      }
      const highlighted = hljs.highlight(language, code).value
      return `${wrapCodeWithCard ? '<n-card size="small">' : ''}<n-config-consumer transparent>
  <template v-slot="{ theme }">
    <pre class="n-code" :class="'n-' + theme + '-theme'"><code v-pre>${highlighted}</code></pre>
  </template>
</n-config-consumer>${wrapCodeWithCard ? '</n-card>' : ''}`
    },
    heading: (text, level) => {
      const id = text.replace(/ /g, '-')
      return `<n-h${level} id="${id}">${text}</n-h${level}>`
    },
    blockquote: quote => {
      return `<n-blockquote>${quote}</n-blockquote>`
    },
    hr: () => `<n-hr />`,
    paragraph: text => {
      return `<n-p>${text}</n-p>`
    },
    link (href, title, text) {
      return `<n-a to="${href}" >${text}</n-a>`
    },
    list (body, ordered, start) {
      const type = ordered ? 'n-ol' : 'n-ul'
      const startatt = (ordered && start !== 1) ? (' start="' + start + '"') : ''
      return `<${type}${startatt}>\n` + body + `</${type}>\n`
    },
    listitem (text) {
      return `<n-li>${text}</n-li>`
    },
    codespan (code) {
      return `<n-text code>${code}</n-text>`
    },
    strong (text) {
      return `<n-text strong>${text}</n-text>`
    }
  }

  Object.keys(overrides).forEach(key => {
    renderer[key] = overrides[key]
  })
  return renderer
}

module.exports = createRenderer
