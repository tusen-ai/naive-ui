import type { RootContent } from 'mdast'

export interface TagInfo {
  tagName: string
  isClosing: boolean
  isSelfClosing: boolean
}

export function parseTagInfo(html: string): TagInfo | null {
  const match = html.match(/^\s*<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b/)
  if (!match) {
    return null
  }
  return {
    tagName: match[2],
    isClosing: Boolean(match[1]),
    isSelfClosing: html.trim().endsWith('/>')
  }
}

export function findMatchingClosingTag(
  nodes: RootContent[],
  startIndex: number,
  tagName: string
): number {
  let depth = 1
  for (let i = startIndex + 1; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.type !== 'html') {
      continue
    }
    const info = parseTagInfo(node.value)
    if (!info || info.tagName !== tagName) {
      continue
    }
    if (info.isClosing) {
      if (--depth === 0) {
        return i
      }
      continue
    }
    if (!info.isSelfClosing) {
      depth++
    }
  }
  return -1
}

export function reconstructHtml(
  nodes: RootContent[],
  start: number,
  end: number
): string {
  const values: string[] = []
  for (const node of nodes.slice(start, end + 1)) {
    if (node.type === 'html' || node.type === 'text') {
      values.push(node.value)
    }
  }
  return values.join('')
}

export interface HtmlFragment {
  start: number
  end: number
  html: string
}

function isKnownTag(tagName: string): boolean {
  return tagName.includes('-') || /^[A-Z]/.test(tagName)
}

export function findHtmlFragment(
  nodes: RootContent[],
  startIndex: number
): HtmlFragment | null {
  const node = nodes[startIndex]

  if (node.type === 'html') {
    const info = parseTagInfo(node.value)
    if (!info || info.isClosing) {
      return null
    }

    if (info.isSelfClosing) {
      return { start: startIndex, end: startIndex, html: node.value }
    }

    const endIndex = findMatchingClosingTag(nodes, startIndex, info.tagName)
    if (endIndex !== -1) {
      return {
        start: startIndex,
        end: endIndex,
        html: reconstructHtml(nodes, startIndex, endIndex)
      }
    }

    return { start: startIndex, end: startIndex, html: node.value }
  }

  if (node.type === 'text') {
    const match = node.value.match(/<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/)
    if (!match) {
      return null
    }

    const tagName = match[1]
    if (!isKnownTag(tagName)) {
      return null
    }

    const endIndex = findMatchingClosingTag(nodes, startIndex, tagName)
    if (endIndex !== -1) {
      return {
        start: startIndex,
        end: endIndex,
        html: reconstructHtml(nodes, startIndex, endIndex)
      }
    }
  }

  return null
}
