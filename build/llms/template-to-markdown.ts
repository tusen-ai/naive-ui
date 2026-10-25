import type { SFCDescriptor } from '@vue/compiler-sfc'
import { parse } from '@vue/compiler-sfc'

// The docs Markdown embeds blocks of site components (`<n-alert>`,
// `<n-text code>`, ...), which the site renders as a Vue template. Here they
// are parsed with Vue's own template parser and turned into plain Markdown:
// the components with a Markdown equivalent become it, any other element
// keeps only its content.

// Vue's template AST, as @vue/compiler-sfc gives it
type TemplateChildNode = NonNullable<
  NonNullable<SFCDescriptor['template']>['ast']
>['children'][number]
type ElementNode = Extract<TemplateChildNode, { tag: string }>
type Prop = ElementNode['props'][number]

// Node types (`NodeTypes` of @vue/compiler-core)
const ELEMENT = 1
const TEXT = 2
const INTERPOLATION = 5
const ATTRIBUTE = 6
const DIRECTIVE = 7

function isElement(node: TemplateChildNode): node is ElementNode {
  return node.type === ELEMENT
}

/** Elements that hold blocks: their children are laid out one per paragraph. */
const BLOCK_CONTAINERS = new Set([
  'div',
  'p',
  'template',
  'n-card',
  'n-space',
  'n-ul',
  'n-ol',
  'ul',
  'ol'
])

/** Elements that become a link to their `href` or `to`. */
const LINKS = new Set(['a', 'n-a', 'n-button', 'router-link'])

function findAttribute(node: ElementNode, name: string): Prop | undefined {
  return node.props.find(
    prop => prop.type === ATTRIBUTE && prop.name === name
  )
}

/** A static attribute's value; `undefined` without it or when it is bound. */
function getAttribute(node: ElementNode, name: string): string | undefined {
  const prop = findAttribute(node, name)
  return prop && 'value' in prop ? (prop.value?.content ?? '') : undefined
}

function hasAttribute(node: ElementNode, name: string): boolean {
  return (
    findAttribute(node, name) !== undefined
    || node.props.some(
      prop =>
        prop.type === DIRECTIVE
        && 'arg' in prop
        && prop.arg?.loc.source === name
    )
  )
}

function collapseWhitespace(text: string): string {
  return text.split(/\s+/).join(' ')
}

function renderInline(nodes: TemplateChildNode[]): string {
  return nodes.map(renderInlineNode).join('')
}

function renderInlineNode(node: TemplateChildNode): string {
  if (node.type === TEXT)
    return collapseWhitespace(node.content)
  if (node.type === INTERPOLATION)
    return node.loc.source
  if (!isElement(node))
    return ''
  const content = renderInline(node.children).trim()
  if (node.tag === 'n-text' && hasAttribute(node, 'code'))
    return `\`${content}\``
  if (node.tag === 'img')
    return `![${getAttribute(node, 'alt') ?? ''}](${getAttribute(node, 'src')})`
  if (node.tag === 'br')
    return '\n'
  if (LINKS.has(node.tag)) {
    const target = getAttribute(node, 'href') ?? getAttribute(node, 'to')
    // A link that gets its target at runtime (`:href`) defers to its parent
    return target && content ? `[${content}](${target})` : content
  }
  return content
}

function renderBlocks(nodes: TemplateChildNode[]): string[] {
  const blocks: string[] = []
  let inline: TemplateChildNode[] = []
  const flushInline = () => {
    const text = renderInline(inline).trim()
    if (text)
      blocks.push(text)
    inline = []
  }
  for (const node of nodes) {
    if (isElement(node) && isBlock(node)) {
      flushInline()
      blocks.push(...renderBlockElement(node))
    }
    else {
      inline.push(node)
    }
  }
  flushInline()
  return blocks
}

function isBlock(node: ElementNode): boolean {
  return (
    node.tag === 'n-alert'
    || node.tag === 'li'
    || BLOCK_CONTAINERS.has(node.tag)
  )
}

function renderBlockElement(node: ElementNode): string[] {
  if (node.tag === 'n-alert')
    return [renderAlert(node)]
  if (node.tag === 'li')
    return [`- ${renderInline(node.children).trim()}`]
  const blocks = renderBlocks(node.children)
  // Keep the items of a list together in one block
  return node.children.some(child => isElement(child) && child.tag === 'li')
    ? [blocks.join('\n')]
    : blocks
}

/** `<n-alert title="Note">...</n-alert>` -> a quote that starts with the title. */
function renderAlert(node: ElementNode): string {
  const title = getAttribute(node, 'title')
  const blocks = renderBlocks(node.children)
  const lines = (title ? [`**${title}**`, ...blocks] : blocks)
    .join('\n\n')
    .split('\n')
  return lines.map(line => (line ? `> ${line}` : '>')).join('\n')
}

/** Converts an HTML block of the docs Markdown to plain Markdown. */
export function templateToMarkdown(html: string): string {
  // The parser reports blocks a code block cut in two (an opening tag
  // without its end, an end tag alone) but still builds the tree
  const { descriptor } = parse(`<template>${html}</template>`)
  const nodes = descriptor.template?.ast?.children ?? []
  return renderBlocks(nodes).join('\n\n')
}
