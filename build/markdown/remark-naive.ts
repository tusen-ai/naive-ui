import type { Element, ElementContent, Properties } from 'hast'
import type {
  Code,
  Heading,
  Image,
  InlineCode,
  Link,
  List,
  ListItem,
  Table,
  TableCell,
  TableRow
} from 'mdast'
import type { Options } from 'remark-rehype'
import hljs from 'highlight.js'
import { toString } from 'mdast-util-to-string'

type Handlers = NonNullable<Options['handlers']>
type State = Parameters<NonNullable<Handlers[keyof Handlers]>>[0]

export interface CreateHandlersOptions {
  wrapCodeWithCard?: boolean
}

function el(
  tagName: string,
  children: ElementContent[],
  properties: Properties = {}
): Element {
  return { type: 'element', tagName, properties, children }
}

function raw(value: string): ElementContent {
  return { type: 'raw', value } as ElementContent
}

function highlight(code: string, lang: string): string {
  return hljs.highlight(code, { language: lang }).value
}

function hasLanguage(lang: string): boolean {
  return !!hljs.getLanguage(lang)
}

export function renderToNaive(options: CreateHandlersOptions = {}): Handlers {
  const { wrapCodeWithCard = true } = options

  return {
    heading(state: State, node: Heading) {
      const id = toString(node).replace(/ /g, '-')
      return el(`n-h${node.depth}`, state.all(node), { id })
    },

    paragraph(state: State, node) {
      return el('n-p', state.all(node))
    },

    blockquote(state: State, node) {
      return el('n-blockquote', state.all(node))
    },

    thematicBreak() {
      return el('n-hr', [])
    },

    link(state: State, node: Link) {
      const { url } = node
      if (/^(http:|https:)/.test(url)) {
        return el('n-a', state.all(node), { href: url, target: '_blank' })
      }
      const text = toString(node)
      return raw(
        `<router-link to="${url}" #="{ navigate, href }" custom>`
        + `<n-a :href="href" @click="navigate">${text}</n-a>`
        + `</router-link>`
      )
    },

    list(state: State, node: List) {
      const tagName = node.ordered ? 'n-ol' : 'n-ul'
      const properties: Properties = {}
      if (node.ordered && node.start != null && node.start !== 1) {
        properties.start = node.start
      }
      return el(tagName, state.all(node), properties)
    },

    listItem(state: State, node: ListItem) {
      const children: ElementContent[] = []

      if (typeof node.checked === 'boolean') {
        children.push(
          raw(
            `<n-checkbox :checked="${node.checked}" style="vertical-align: -2px; margin-right: 8px;" />`
          )
        )
      }

      for (const child of state.all(node)) {
        if (child.type === 'element' && child.tagName === 'n-p') {
          children.push(...child.children)
        }
        else {
          children.push(child)
        }
      }

      return el('n-li', children)
    },

    table(state: State, node: Table) {
      const align = node.align || []
      const [headRow, ...bodyRows] = node.children

      function buildRow(row: TableRow, cellTag: 'th' | 'td'): Element {
        const cells: ElementContent[] = []
        for (let i = 0; i < row.children.length; i++) {
          const props: Properties = {}
          if (align[i])
            props.align = align[i]!
          cells.push(el(cellTag, state.all(row.children[i]), props))
          cells.push({ type: 'text', value: '\n' })
        }
        return el('tr', cells)
      }

      const thead = el(
        'thead',
        headRow ? [{ type: 'text', value: '\n' }, buildRow(headRow, 'th')] : []
      )

      const tableChildren: ElementContent[] = [thead]
      if (bodyRows.length > 0) {
        const tbodyChildren: ElementContent[] = []
        for (const row of bodyRows) {
          tbodyChildren.push(buildRow(row, 'td'))
          tbodyChildren.push({ type: 'text', value: '\n' })
        }
        tableChildren.push(el('tbody', tbodyChildren))
      }

      return el(
        'div',
        [
          el('n-table', tableChildren, {
            'single-column': true,
            class: 'md-table'
          })
        ],
        { class: 'md-table-wrapper' }
      )
    },

    // Fallback handlers when rows/cells are processed outside of the table handler
    tableRow(state: State, node: TableRow) {
      return el('tr', state.all(node))
    },
    tableCell(state: State, node: TableCell) {
      return el('td', state.all(node))
    },

    code(_state: State, node: Code) {
      let lang = node.lang || ''
      if (lang.startsWith('__'))
        lang = lang.slice(2)

      if (!lang || !hasLanguage(lang)) {
        throw new Error(
          `MdRendererError: ${lang} is not valid for code - ${node.value}`
        )
      }
      const highlighted = highlight(node.value, lang)
      const content = `<n-code><pre v-pre>${highlighted}</pre></n-code>`
      return raw(
        wrapCodeWithCard
          ? `<n-card embedded :bordered="false" class="md-card" content-style="padding: 0;">`
          + `<n-scrollbar x-scrollable content-style="padding: 16px;">${
            content
          }</n-scrollbar></n-card>`
          : content
      )
    },

    inlineCode(_state: State, node: InlineCode) {
      return el('n-text', [{ type: 'text', value: node.value }], { code: true })
    },

    strong(state: State, node) {
      return el('n-text', state.all(node), { strong: true })
    },

    emphasis(state: State, node) {
      return el('em', state.all(node))
    },

    image(_state: State, node: Image) {
      const properties: Properties = { src: node.url }
      if (node.alt)
        properties.alt = node.alt
      if (node.title)
        properties.title = node.title
      return el('img', [], properties)
    }
  }
}
