import hljs from 'highlight.js'
import { Renderer } from 'marked'

export function createRenderer(wrapCodeWithCard = true): Renderer {
  const renderer = new Renderer()
  const overrides: any = {
    table(header: string, body: string): string {
      if (body)
        body = `<tbody>${body}</tbody>`
      return (
        `<div class="md-table-wrapper"><n-table single-column class="md-table">\n`
        + `<thead>\n${header}</thead>\n${body}</n-table>\n`
        + `</div>`
      )
    },

    tablerow(content: string): string {
      return `<tr>\n${content}</tr>\n`
    },

    tablecell(
      content: string,
      flags: { header: boolean, align: 'center' | 'left' | 'right' | null }
    ): string {
      const type = flags.header ? 'th' : 'td'
      const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`
      return `${tag + content}</${type}>\n`
    },

    code: (code: string, language: string): string => {
      if (language.startsWith('__')) {
        language = language.replace('__', '')
      }
      const isLanguageValid = !!(language && hljs.getLanguage(language))
      if (!isLanguageValid) {
        throw new Error(
          `MdRendererError: ${language} is not valid for code - ${code}`
        )
      }
      const highlighted = hljs.highlight(code, { language }).value
      const content = `<n-code><pre v-pre>${highlighted}</pre></n-code>`
      return wrapCodeWithCard
        ? `<n-card embedded :bordered="false" class="md-card" content-style="padding: 0;">
            <n-scrollbar x-scrollable content-style="padding: 16px;">
              ${content}
            </n-scrollbar>
          </n-card>`
        : content
    },
    heading: (text: string, level: number): string => {
      const id = text.replace(/ /g, '-')
      return `<n-h${level} id="${id}">${text}</n-h${level}>`
    },
    blockquote: (quote: string): string => {
      return `<n-blockquote>${quote}</n-blockquote>`
    },
    hr: (): string => '<n-hr />',
    paragraph: (text: string): string => {
      return `<n-p>${text}</n-p>`
    },
    link(href: string, title: string | null | undefined, text: string): string {
      if (/^(http:|https:)/.test(href)) {
        return `<n-a href="${href}" target="_blank">${text}</n-a>`
      }
      return `<router-link to="${href}" #="{ navigate, href }" custom><n-a :href="href" @click="navigate">${text}</n-a></router-link>`
    },
    list(body: string, ordered: boolean, start: number): string {
      const type = ordered ? 'n-ol' : 'n-ul'
      const startatt = ordered && start !== 1 ? ` start="${start}"` : ''
      return `<${type}${startatt}>\n${body}</${type}>\n`
    },
    listitem(text: string): string {
      return `<n-li>${text}</n-li>`
    },
    codespan(code: string): string {
      return `<n-text code>${code}</n-text>`
    },
    strong(text: string): string {
      return `<n-text strong>${text}</n-text>`
    },
    checkbox(checked: boolean): string {
      return `<n-checkbox :checked="${checked}" style="vertical-align: -2px; margin-right: 8px;" />`
    }
  }

  Object.assign(renderer, overrides)
  return renderer
}
