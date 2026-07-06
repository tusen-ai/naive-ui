import type { Code, Link, Parent, Root, RootContent } from 'mdast'
import { createBaseProcessor } from '../parser'

const mdParser = createBaseProcessor()

const blockTags = [
  'div',
  'p',
  'section',
  'article',
  'template',
  'n-alert',
  'n-card',
  'n-space',
  'n-ul',
  'ul',
  'ol'
]

const inlineTags = [
  'router-link',
  'span',
  'strong',
  'em',
  'code',
  'n-a',
  'n-button',
  'n-code',
  'n-el',
  'n-icon',
  'n-li',
  'n-text'
]

function decodeHtml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&nbsp;/g, ' ')
}

function getAttribute(attrs: string, name: string): string | null {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}=(["'])(.*?)\\1`))
  return match ? decodeHtml(match[2]) : null
}

function toInlineMarkdown(value: string): string {
  return decodeHtml(
    value
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\/?[\w-]+(?:\s[^>]*)?>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function getOpeningTagAttrs(value: string, tag: string): string | null {
  const match = value.trim().match(new RegExp(`^<${tag}\\b([^>]*)>$`, 'i'))
  return match?.[1] ?? null
}

function isClosingTag(value: string, tag: string): boolean {
  return new RegExp(`^</${tag}>$`, 'i').test(value.trim())
}

function nodeToInlineText(node: Parent['children'][number]): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.type === 'html' ? toInlineMarkdown(node.value) : node.value
  }
  if ('children' in node) {
    return nodesToInlineText(node.children)
  }
  return ''
}

function nodesToInlineText(nodes: Parent['children']): string {
  return nodes
    .map(node => nodeToInlineText(node))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

function replaceSeparatedInlineLink(
  parent: Parent,
  startIndex: number,
  tag: string,
  attrName: string
): boolean {
  const node = parent.children[startIndex]
  if (node.type !== 'html')
    return false

  const attrs = getOpeningTagAttrs(node.value, tag)
  if (attrs == null)
    return false

  const url = getAttribute(attrs, attrName)
  if (!url)
    return false

  const endIndex = parent.children.findIndex((child, index) => {
    return (
      index > startIndex
      && child.type === 'html'
      && isClosingTag(child.value, tag)
    )
  })
  if (endIndex < 0)
    return false

  const text = nodesToInlineText(
    parent.children.slice(startIndex + 1, endIndex)
  )
  const link: Link = {
    type: 'link',
    url,
    children: [{ type: 'text', value: text || url }]
  }
  parent.children.splice(
    startIndex,
    endIndex - startIndex + 1,
    link as Parent['children'][number]
  )
  return true
}

function htmlToMarkdown(value: string): string {
  let markdown = value

  markdown = markdown.replace(/<!--[\s\S]*?-->/g, '')
  markdown = markdown.replace(
    /<router-link\b([^>]*)>([\s\S]*?)<\/router-link>/gi,
    (_, attrs: string, content: string) => {
      const to = getAttribute(attrs, 'to')
      const text = toInlineMarkdown(content)
      return to ? `[${text}](${to})` : text
    }
  )
  markdown = markdown.replace(
    /<n-text\b(?=[^>]*\bcode\b)[^>]*>([\s\S]*?)<\/n-text>/gi,
    (_, content: string) => `\`${toInlineMarkdown(content)}\``
  )
  markdown = markdown.replace(
    /<n-a\b([^>]*)>([\s\S]*?)<\/n-a>/gi,
    (_, attrs: string, content: string) => {
      const href = getAttribute(attrs, 'href')
      const text = toInlineMarkdown(content)
      return href ? `[${text}](${href})` : text
    }
  )
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n')
  markdown = markdown.replace(/<li\b[^>]*>/gi, '\n- ')
  markdown = markdown.replace(/<\/li>/gi, '\n')
  markdown = markdown.replace(/<n-alert\b([^>]*)>/gi, (_, attrs: string) => {
    const title = getAttribute(attrs, 'title')
    return title ? `\n\n**${title}**\n\n` : '\n\n'
  })

  for (const tag of blockTags) {
    markdown = markdown.replace(new RegExp(`<${tag}\\b[^>]*>`, 'gi'), '\n\n')
    markdown = markdown.replace(new RegExp(`</${tag}>`, 'gi'), '\n\n')
  }

  for (const tag of inlineTags) {
    markdown = markdown.replace(new RegExp(`<${tag}\\b[^>]*>`, 'gi'), '')
    markdown = markdown.replace(new RegExp(`</${tag}>`, 'gi'), '')
  }

  return decodeHtml(
    markdown
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

function htmlToNodes(value: string): RootContent[] {
  const markdown = htmlToMarkdown(value)
  if (!markdown)
    return []
  return mdParser.parse(markdown).children
}

function transformChildren(parent: Parent): void {
  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i]

    if (node.type === 'code' && (node as Code).lang === 'component') {
      parent.children.splice(i, 1)
      i--
      continue
    }

    if (node.type === 'html') {
      if (
        replaceSeparatedInlineLink(parent, i, 'router-link', 'to')
        || replaceSeparatedInlineLink(parent, i, 'n-a', 'href')
      ) {
        continue
      }
      const replacement = htmlToNodes(node.value)
      parent.children.splice(i, 1, ...replacement)
      i += replacement.length - 1
      continue
    }

    if ('children' in node)
      transformChildren(node as Parent)
  }
}

export function remarkCleanMdForLlms() {
  return (tree: Root) => {
    transformChildren(tree)
  }
}
