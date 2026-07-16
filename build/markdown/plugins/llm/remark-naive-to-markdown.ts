import type { Paragraph, Root, RootContent } from 'mdast'
import { findHtmlFragment } from '../../html-utils/html-fragment'
import {
  cleanInlineCodeValue,
  hastToMdast,
  parseHtmlFragment
} from '../../renderers/naive-to-mdast'

const phrasingParentTypes = new Set([
  'paragraph',
  'heading',
  'link',
  'emphasis',
  'strong',
  'delete'
])

/** Convert an html fragment string to mdast nodes. */
function convertHtml(html: string, inline: boolean): RootContent[] {
  const children = hastToMdast(parseHtmlFragment(html), {
    document: !inline
  }).children
  if (inline && children.length === 1 && children[0].type === 'paragraph') {
    return (children[0] as Paragraph).children
  }
  return children
}

function processNodes(nodes: RootContent[], inline: boolean): RootContent[] {
  const result: RootContent[] = []
  let i = 0

  while (i < nodes.length) {
    const node = nodes[i]

    // ```component blocks are docs-site only
    if (node.type === 'code' && node.lang === 'component') {
      i++
      continue
    }

    // html comments (e.g. <!--anchor:on-->) are docs-site only
    if (node.type === 'html' && /^\s*<!--/.test(node.value)) {
      i++
      continue
    }

    // `<n-image-group />` in inline code -> `n-image-group`
    if (node.type === 'inlineCode') {
      const value = cleanInlineCodeValue(node.value)
      result.push(value === node.value ? node : { ...node, value })
      i++
      continue
    }

    if (node.type === 'html') {
      if (inline) {
        // Inline html: pair open/close tags across sibling nodes, e.g.
        // `x <n-text code>n-button</n-text> y`.
        const fragment = findHtmlFragment(nodes, i)
        if (fragment) {
          result.push(...convertHtml(fragment.html, true))
          i = fragment.end + 1
          continue
        }
        i++
        continue
      }
      // Block html: a complete CommonMark html block. rehype-parse
      // auto-closes unclosed tags, so each block converts independently and
      // content between an unclosed wrapper and its close tag is preserved.
      result.push(...convertHtml(node.value, false))
      i++
      continue
    }

    if (inline && node.type === 'text') {
      // An open tag may land in a text node when remark fails to tokenize
      // it as html (e.g. vue-specific attribute syntax).
      const fragment = findHtmlFragment(nodes, i)
      if (fragment) {
        result.push(...convertHtml(fragment.html, true))
        i = fragment.end + 1
        continue
      }
    }
    if ('children' in node && Array.isArray(node.children)) {
      ;(node as { children: RootContent[] }).children = processNodes(
        node.children as RootContent[],
        phrasingParentTypes.has(node.type)
      )
    }

    result.push(node)
    i++
  }

  return result
}

export function remarkNaiveToMarkdown() {
  return (tree: Root) => {
    tree.children = processNodes(tree.children, false)
  }
}
