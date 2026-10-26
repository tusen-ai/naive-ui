import type { Element, ElementContent, Properties } from 'hast'
import type { Parents, Root } from 'mdast'
import type { Handlers, State } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import hljs from 'highlight.js'
import { defaultHandlers, toHast } from 'mdast-util-to-hast'

// Renders the docs Markdown as a Vue template of the site's components:
// each Markdown node becomes its Naive UI counterpart (`n-p`, `n-h2`,
// `n-table`, ...). The site components written in the Markdown are raw HTML
// and come out as they are.

function h(
  tagName: string,
  properties: Properties,
  children: ElementContent[] = []
): Element {
  return { type: 'element', tagName, properties, children }
}

function highlight(code: string, lang: string | null | undefined): string {
  const language = lang?.startsWith('__') ? lang.slice(2) : lang
  if (!language || !hljs.getLanguage(language)) {
    throw new Error(
      `MdRendererError: ${language} is not valid for code - ${code}`
    )
  }
  return hljs.highlight(code, { language }).value
}

/** Whether the items of a list are laid out as paragraphs. */
function isLoose(list: Parents | undefined): boolean {
  if (list?.type !== 'list')
    return false
  return (
    !!list.spread
    || list.children.some(item => item.spread ?? item.children.length > 1)
  )
}

function isParagraph(node: ElementContent): node is Element {
  return node.type === 'element' && node.tagName === 'n-p'
}

function withData<T extends Element>(
  state: State,
  node: Parameters<State['applyData']>[0],
  result: T
): T {
  state.patch(node, result)
  return state.applyData(node, result) as T
}

const handlers: Handlers = {
  paragraph: (state, node) =>
    withData(state, node, h('n-p', {}, state.all(node))),
  heading: (state, node) =>
    withData(state, node, h(`n-h${node.depth}`, {}, state.all(node))),
  blockquote: (state, node) =>
    withData(
      state,
      node,
      h('n-blockquote', {}, state.wrap(state.all(node), true))
    ),
  thematicBreak: (state, node) => withData(state, node, h('n-hr', {})),
  strong: (state, node) =>
    withData(state, node, h('n-text', { strong: true }, state.all(node))),
  inlineCode: (state, node) =>
    withData(
      state,
      node,
      // `code` is typed as a string attribute in hast
      h('n-text', { code: '' }, [{ type: 'text', value: node.value }])
    ),
  link(state, node) {
    const children = state.all(node)
    if (/^https?:/.test(node.url)) {
      return withData(
        state,
        node,
        h('n-a', { href: node.url, target: '_blank' }, children)
      )
    }
    // Links in the site go through the router
    return withData(
      state,
      node,
      h(
        'router-link',
        { to: node.url, '#': '{ navigate, href }', custom: true },
        [h('n-a', { ':href': 'href', '@click': 'navigate' }, children)]
      )
    )
  },
  list(state, node) {
    const properties: Properties = {}
    if (
      node.ordered
      && node.start !== null
      && node.start !== undefined
      && node.start !== 1
    ) {
      properties.start = node.start
    }
    return withData(
      state,
      node,
      h(
        node.ordered ? 'n-ol' : 'n-ul',
        properties,
        state.wrap(state.all(node), true)
      )
    )
  },
  listItem(state, node, parent) {
    const loose = isLoose(parent)
    const results = state.all(node)
    // A tight list holds the content of its paragraphs inline
    const children = loose
      ? results
      : results.flatMap(child =>
          isParagraph(child) ? child.children : [child]
        )
    if (typeof node.checked === 'boolean') {
      const checkbox = h('n-checkbox', {
        ':checked': String(node.checked),
        style: 'vertical-align: -2px; margin-right: 8px;'
      })
      const head = children[0]
      const target
        = loose && head && isParagraph(head) ? head.children : children
      target.unshift(checkbox, { type: 'text', value: ' ' })
    }
    return withData(state, node, h('n-li', {}, children))
  },
  table(state, node) {
    const table = defaultHandlers.table(state, node)
    table.tagName = 'n-table'
    table.properties = { 'single-column': true, className: ['md-table'] }
    return h('div', { className: ['md-table-wrapper'] }, [table])
  },
  code(state, node) {
    const code = h('n-code', {}, [
      h('pre', { 'v-pre': true }, [
        { type: 'raw', value: highlight(node.value, node.lang) }
      ])
    ])
    return withData(
      state,
      node,
      h(
        'n-card',
        {
          embedded: true,
          ':bordered': 'false',
          className: ['md-card'],
          'content-style': 'padding: 0;'
        },
        [
          h(
            'n-scrollbar',
            { 'x-scrollable': true, 'content-style': 'padding: 16px;' },
            [code]
          )
        ]
      )
    )
  }
}

/** The template of a Markdown tree. */
export function renderMarkdown(tree: Root): string {
  const hast = toHast(tree, { allowDangerousHtml: true, handlers })
  return toHtml(hast, { allowDangerousHtml: true })
}
