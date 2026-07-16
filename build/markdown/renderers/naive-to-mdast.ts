import type { Element, Root as HastRoot } from 'hast'
import type { Handle, State } from 'hast-util-to-mdast'
import type { Blockquote, Root as MdastRoot, PhrasingContent } from 'mdast'
import { defaultHandlers, toMdast } from 'hast-util-to-mdast'
import rehypeParse from 'rehype-parse'
import { unified } from 'unified'

export function parseHtmlFragment(html: string): HastRoot {
  return unified().use(rehypeParse, { fragment: true }).parse(html) as HastRoot
}

function prop(node: Element, key: string): string | undefined {
  const value = node.properties?.[key]
  if (value == null) {
    return undefined
  }
  return Array.isArray(value) ? value.join(' ') : String(value)
}

function truthy(node: Element, key: string): boolean {
  const value = node.properties?.[key]
  return value != null && value !== 'false'
}

function rawText(node: Element): string {
  const walk = (children: Element['children']): string =>
    children
      .map(child =>
        child.type === 'text'
          ? child.value
          : 'children' in child
            ? walk(child.children)
            : ''
      )
      .join('')
  return walk(node.children).trim()
}

/**
 * Collapse a component tag written inside inline code to the component name,
 * e.g. `<n-image-group />` -> `n-image-group`. Generic type syntax such as
 * `<T extends O>` is left untouched.
 */
const selfClosingTagPattern = /^<([a-zA-Z][\w-]*)(?:\s[^>]*)?\s*\/>$/
const pairedTagPattern = /^<([a-zA-Z][\w-]*)(?:\s[^>]*)?>([^<]*)<\/\1>$/

export function cleanInlineCodeValue(value: string): string {
  const decoded = value.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const match
    = decoded.match(selfClosingTagPattern) ?? decoded.match(pairedTagPattern)
  if (match && match[1].includes('-')) {
    return match[2] || match[1]
  }
  return value
}

const ignore: Handle = () => {}

function all(state: State, node: Element): ReturnType<State['all']> {
  return state.all(node)
}

function flow(state: State, node: Element): ReturnType<State['toFlow']> {
  return state.toFlow(state.all(node))
}

const TYPE_LABELS: Record<string, string> = {
  warning: 'Warning',
  info: 'Info',
  success: 'Success',
  error: 'Error'
}

const nAlert: Handle = (state, node) => {
  const title = prop(node, 'title')
  const typeLabel = TYPE_LABELS[prop(node, 'type') || '']
  const prefix
    = title && typeLabel ? `${typeLabel}: ${title}` : title || typeLabel

  const children = state.toFlow(state.all(node))
  if (prefix) {
    const label: PhrasingContent = {
      type: 'strong',
      children: [{ type: 'text', value: prefix }]
    }
    const first = children[0]
    if (first?.type === 'paragraph') {
      // Merge into the body paragraph with a soft line break.
      first.children.unshift(label, { type: 'text', value: '\n' })
    }
    else {
      children.unshift({ type: 'paragraph', children: [label] })
    }
  }

  const result: Blockquote = { type: 'blockquote', children }
  state.patch(node, result)
  return result
}

const nText: Handle = (state, node) => {
  if (truthy(node, 'code')) {
    const result = {
      type: 'inlineCode' as const,
      value: cleanInlineCodeValue(rawText(node))
    }
    state.patch(node, result)
    return result
  }
  if (truthy(node, 'strong')) {
    return defaultHandlers.strong(state, node)
  }
  return all(state, node)
}

/**
 * Components that render as a link when a static url attribute is present,
 * and are unwrapped to their children otherwise (e.g. dynamic `:href`).
 */
function linkBy(attr: string): Handle {
  return (state, node) => {
    const url = prop(node, attr)
    const children = state.all(node) as PhrasingContent[]
    if (!url || children.length === 0) {
      return children
    }
    const result = { type: 'link' as const, url, title: null, children }
    state.patch(node, result)
    return result
  }
}

const nSpace: Handle = (state, node) =>
  truthy(node, 'vertical') || prop(node, 'direction') === 'vertical'
    ? flow(state, node)
    : all(state, node)

const template: Handle = (state, node) =>
  state.all(
    ((node as Element & { content?: HastRoot }).content ?? node) as Element
  )

/**
 * Handlers for the naive-ui components that appear in documentation
 * markdown. Everything else falls back to hast-util-to-mdast defaults:
 * unknown elements are unwrapped to their children and self-closing
 * unknown elements are dropped.
 */
export const naiveHandlers: Record<string, Handle> = {
  'n-alert': nAlert,
  'n-text': nText,
  'n-a': linkBy('href'),
  'n-button': linkBy('href'),
  'router-link': linkBy('to'),
  'n-space': nSpace,
  'n-card': flow,
  'n-icon': ignore,
  'n-ul': defaultHandlers.ul,
  template
}

export interface HastToMdastOptions {
  /**
   * Pass true when converting a block-level fragment so phrasing content is
   * wrapped in paragraphs.
   */
  document?: boolean
}

export function hastToMdast(
  root: HastRoot,
  options: HastToMdastOptions = {}
): MdastRoot {
  return toMdast(root, {
    handlers: naiveHandlers,
    document: options.document ?? false
  }) as MdastRoot
}
