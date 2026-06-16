import type { PropType, VNodeChild } from 'vue'
import type { Hljs } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { MarkdownProcessor } from '../../config-provider/src/markdown'
import { computed, defineComponent, h, inject, watchEffect } from 'vue'
import { useConfig, useHljs } from '../../_mixins'
import { warnOnce } from '../../_utils'
import { NCode } from '../../code'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import {
  NA,
  NBlockquote,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
  NHr,
  NLi,
  NOl,
  NP,
  NText,
  NUl
} from '../../typography'

export const markdownProps = {
  source: {
    type: String,
    default: ''
  },
  sanitize: {
    type: Boolean,
    default: true
  },
  sanitizeHtml: Function as PropType<(html: string) => string>,
  hljs: Object as PropType<Hljs>,
  markdown: [Object, Function] as PropType<MarkdownProcessor>
} as const

export type MarkdownProps = ExtractPublicPropTypes<typeof markdownProps>

interface MarkdownNodeBase {
  type: string
}

interface MarkdownParent extends MarkdownNodeBase {
  children: MarkdownNode[]
}

interface MarkdownRoot extends MarkdownParent {
  type: 'root'
}

interface MarkdownHeading extends MarkdownParent {
  type: 'heading'
  depth: number
}

interface MarkdownParagraph extends MarkdownParent {
  type: 'paragraph'
}

interface MarkdownText extends MarkdownNodeBase {
  type: 'text'
  value?: string
}

interface MarkdownEmphasis extends MarkdownParent {
  type: 'emphasis'
}

interface MarkdownStrong extends MarkdownParent {
  type: 'strong'
}

interface MarkdownDelete extends MarkdownParent {
  type: 'delete'
}

interface MarkdownInlineCode extends MarkdownNodeBase {
  type: 'inlineCode'
  value?: string
}

interface MarkdownBreak extends MarkdownNodeBase {
  type: 'break'
}

interface MarkdownLink extends MarkdownParent {
  type: 'link'
  url?: string
  title?: string
}

interface MarkdownReferenceBase extends MarkdownNodeBase {
  identifier?: string
  label?: string
  referenceType?: 'full' | 'collapsed' | 'shortcut'
}

interface MarkdownLinkReference extends MarkdownParent, MarkdownReferenceBase {
  type: 'linkReference'
}

interface MarkdownImage extends MarkdownNodeBase {
  type: 'image'
  url?: string
  alt?: string
  title?: string
}

interface MarkdownImageReference
  extends MarkdownNodeBase, MarkdownReferenceBase {
  type: 'imageReference'
  alt?: string
}

interface MarkdownHtml extends MarkdownNodeBase {
  type: 'html'
  value?: string
}

interface MarkdownCode extends MarkdownNodeBase {
  type: 'code'
  value?: string
  lang?: string | null
}

interface MarkdownList extends MarkdownParent {
  type: 'list'
  ordered?: boolean
  start?: number | null
  spread?: boolean
}

interface MarkdownListItem extends MarkdownParent {
  type: 'listItem'
  checked?: boolean | null
  spread?: boolean
}

interface MarkdownBlockquote extends MarkdownParent {
  type: 'blockquote'
}

interface MarkdownThematicBreak extends MarkdownNodeBase {
  type: 'thematicBreak'
}

interface MarkdownDefinition extends MarkdownNodeBase {
  type: 'definition'
  identifier?: string
  url?: string
  title?: string
}

interface MarkdownUnknown extends MarkdownNodeBase {
  value?: string
  children?: MarkdownNode[]
}

type MarkdownNode
  = | MarkdownRoot
    | MarkdownHeading
    | MarkdownParagraph
    | MarkdownText
    | MarkdownEmphasis
    | MarkdownStrong
    | MarkdownDelete
    | MarkdownInlineCode
    | MarkdownBreak
    | MarkdownLink
    | MarkdownLinkReference
    | MarkdownImage
    | MarkdownImageReference
    | MarkdownHtml
    | MarkdownCode
    | MarkdownList
    | MarkdownListItem
    | MarkdownBlockquote
    | MarkdownThematicBreak
    | MarkdownDefinition
    | MarkdownUnknown

interface DefinitionInfo {
  url: string
  title?: string
}

type DefinitionMap = Record<string, DefinitionInfo>

function isMarkdownRoot(value: unknown): value is MarkdownRoot {
  if (!value || typeof value !== 'object')
    return false
  const maybeRoot = value as MarkdownRoot
  return maybeRoot.type === 'root' && Array.isArray(maybeRoot.children)
}

function isMarkdownParent(node: MarkdownNode): node is MarkdownParent {
  return Array.isArray((node as MarkdownParent).children)
}

function slugifyHeadingId(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u00A0-\uFFFF]/g, '')
}

function sanitizeLinkHref(href: string | null | undefined): string | undefined {
  if (!href)
    return undefined
  const normalized = href.trim()
  const lower = normalized.toLowerCase()
  if (
    lower.startsWith('javascript:')
    || lower.startsWith('vbscript:')
    || lower.startsWith('data:')
  ) {
    return undefined
  }
  return normalized
}

function sanitizeImageSrc(src: string | null | undefined): string | undefined {
  if (!src)
    return undefined
  const normalized = src.trim()
  const lower = normalized.toLowerCase()
  if (lower.startsWith('javascript:') || lower.startsWith('vbscript:')) {
    return undefined
  }
  return normalized
}

function getInlineChildrenFromText(text: string): VNodeChild[] {
  return text ? [text] : []
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}

function normalizeDefinitionId(id: string | undefined): string {
  return (id || '').trim().toLowerCase()
}

function collectDefinitions(root: MarkdownRoot | null): DefinitionMap {
  const definitions: DefinitionMap = {}
  if (!root)
    return definitions
  const stack: MarkdownNode[] = [root]
  while (stack.length) {
    const node = stack.pop() as MarkdownNode
    if (node.type === 'definition') {
      const definition = node as MarkdownDefinition
      const identifier = normalizeDefinitionId(definition.identifier)
      if (identifier && definition.url) {
        definitions[identifier] = {
          url: definition.url,
          title: definition.title
        }
      }
    }
    if (isMarkdownParent(node)) {
      stack.push(...node.children)
    }
  }
  return definitions
}

function resolveDefinition(
  definitions: DefinitionMap,
  identifier: string | undefined
): DefinitionInfo | undefined {
  const normalized = normalizeDefinitionId(identifier)
  return normalized ? definitions[normalized] : undefined
}

function extractTextFromNode(node: MarkdownNode | undefined): string {
  if (!node)
    return ''
  switch (node.type) {
    case 'text':
      return (node as MarkdownText).value || ''
    case 'inlineCode':
      return (node as MarkdownInlineCode).value || ''
    case 'image':
      return (node as MarkdownImage).alt || ''
    case 'imageReference':
      return (node as MarkdownImageReference).alt || ''
    case 'break':
      return ' '
    case 'html':
      return (node as MarkdownHtml).value || ''
    default:
      if (isMarkdownParent(node))
        return extractTextFromNodes(node.children)
      return (node as MarkdownUnknown).value || ''
  }
}

function extractTextFromNodes(nodes: MarkdownNode[] | undefined): string {
  if (!nodes?.length)
    return ''
  return nodes.map(node => extractTextFromNode(node)).join('')
}

interface RenderContext {
  hljs: Hljs | undefined
  sanitize: boolean
  sanitizeHtml: ((html: string) => string) | undefined
  definitions: DefinitionMap
}

function renderInlineNodes(
  nodes: MarkdownNode[] | undefined,
  ctx: RenderContext
): VNodeChild[] {
  if (!nodes?.length)
    return []

  const result: VNodeChild[] = []
  let rawHtmlBuffer: string | null = null
  const canUseRawHtml = !ctx.sanitize || !!ctx.sanitizeHtml
  const appendRawHtml = (value: string): void => {
    rawHtmlBuffer ??= ''
    rawHtmlBuffer += value
  }
  const flushRawHtmlBuffer = (): void => {
    if (rawHtmlBuffer === null)
      return
    if (rawHtmlBuffer) {
      const innerHTML
        = ctx.sanitize && ctx.sanitizeHtml
          ? ctx.sanitizeHtml(rawHtmlBuffer)
          : rawHtmlBuffer
      if (innerHTML) {
        result.push(h('span', { innerHTML }))
      }
    }
    rawHtmlBuffer = null
  }

  for (const node of nodes) {
    switch (node.type) {
      case 'text': {
        const textNode = node as MarkdownText
        if (rawHtmlBuffer !== null) {
          appendRawHtml(escapeHtml(textNode.value || ''))
        }
        else {
          result.push(...getInlineChildrenFromText(textNode.value || ''))
        }
        break
      }
      case 'strong': {
        flushRawHtmlBuffer()
        const strongNode = node as MarkdownStrong
        const strongChildren = renderInlineNodes(strongNode.children, ctx)
        result.push(
          h(NText, { strong: true }, { default: () => strongChildren })
        )
        break
      }
      case 'emphasis': {
        flushRawHtmlBuffer()
        const emNode = node as MarkdownEmphasis
        const emChildren = renderInlineNodes(emNode.children, ctx)
        result.push(h(NText, { italic: true }, { default: () => emChildren }))
        break
      }
      case 'delete': {
        flushRawHtmlBuffer()
        const delNode = node as MarkdownDelete
        const delChildren = renderInlineNodes(delNode.children, ctx)
        result.push(h(NText, { delete: true }, { default: () => delChildren }))
        break
      }
      case 'inlineCode': {
        flushRawHtmlBuffer()
        const codespanNode = node as MarkdownInlineCode
        result.push(
          h(NText, { code: true }, { default: () => codespanNode.value || '' })
        )
        break
      }
      case 'break':
        flushRawHtmlBuffer()
        result.push(h('br'))
        break
      case 'link': {
        flushRawHtmlBuffer()
        const linkNode = node as MarkdownLink
        const rawHref = linkNode.url || ''
        const href = ctx.sanitize ? sanitizeLinkHref(rawHref) : rawHref
        const linkChildren = renderInlineNodes(linkNode.children, ctx)
        if (!href) {
          result.push(...linkChildren)
          break
        }
        const isExternal = /^(https?:)?\/\//.test(href)
        result.push(
          h(
            NA,
            {
              href,
              target: isExternal ? '_blank' : undefined,
              rel: isExternal ? 'noopener noreferrer' : undefined,
              title: linkNode.title || undefined
            },
            { default: () => linkChildren }
          )
        )
        break
      }
      case 'linkReference': {
        flushRawHtmlBuffer()
        const linkNode = node as MarkdownLinkReference
        const definition = resolveDefinition(
          ctx.definitions,
          linkNode.identifier || linkNode.label
        )
        const rawHref = definition?.url || ''
        const href = ctx.sanitize ? sanitizeLinkHref(rawHref) : rawHref
        const linkChildren = renderInlineNodes(linkNode.children, ctx)
        if (!href) {
          result.push(...linkChildren)
          break
        }
        const isExternal = /^(https?:)?\/\//.test(href)
        result.push(
          h(
            NA,
            {
              href,
              target: isExternal ? '_blank' : undefined,
              rel: isExternal ? 'noopener noreferrer' : undefined,
              title: definition?.title || undefined
            },
            { default: () => linkChildren }
          )
        )
        break
      }
      case 'image': {
        flushRawHtmlBuffer()
        const imageNode = node as MarkdownImage
        const rawSrc = imageNode.url || ''
        const src = ctx.sanitize ? sanitizeImageSrc(rawSrc) : rawSrc
        if (!src) {
          result.push(imageNode.alt || '')
        }
        else {
          result.push(
            h('img', {
              src,
              alt: imageNode.alt || undefined,
              title: imageNode.title || undefined
            })
          )
        }
        break
      }
      case 'imageReference': {
        flushRawHtmlBuffer()
        const imageNode = node as MarkdownImageReference
        const definition = resolveDefinition(
          ctx.definitions,
          imageNode.identifier || imageNode.label
        )
        const rawSrc = definition?.url || ''
        const src = ctx.sanitize ? sanitizeImageSrc(rawSrc) : rawSrc
        if (!src) {
          result.push(imageNode.alt || '')
        }
        else {
          result.push(
            h('img', {
              src,
              alt: imageNode.alt || undefined,
              title: definition?.title || undefined
            })
          )
        }
        break
      }
      case 'html': {
        const htmlNode = node as MarkdownHtml
        const html = htmlNode.value || ''
        if (!html)
          break
        if (!canUseRawHtml) {
          flushRawHtmlBuffer()
          result.push(html)
          break
        }
        appendRawHtml(html)
        break
      }
      default: {
        flushRawHtmlBuffer()
        if (isMarkdownParent(node)) {
          result.push(...renderInlineNodes(node.children, ctx))
        }
        else {
          const value = (node as MarkdownUnknown).value || ''
          result.push(...getInlineChildrenFromText(value))
        }
        break
      }
    }
  }
  flushRawHtmlBuffer()
  return result
}

function highlightCode(
  code: string,
  language: string,
  ctx: RenderContext
): string | null {
  const { hljs } = ctx
  if (!hljs)
    return null
  if (!(language && hljs.getLanguage(language)))
    return null
  try {
    return hljs.highlight(code, { language }).value
  }
  catch {
    return null
  }
}

function hasHighlightableCode(tree: MarkdownRoot | null): boolean {
  if (!tree)
    return false
  const stack: MarkdownNode[] = [tree]
  while (stack.length) {
    const node = stack.pop() as MarkdownNode
    if (node.type === 'code') {
      const codeNode = node as MarkdownCode
      if (codeNode.lang)
        return true
    }
    if (isMarkdownParent(node)) {
      stack.push(...node.children)
    }
  }
  return false
}

function renderListItem(
  item: MarkdownListItem,
  ctx: RenderContext
): VNodeChild[] {
  const children = item.children || []
  if (!children.length)
    return []

  const result: VNodeChild[] = []
  for (const child of children) {
    if (child.type === 'paragraph') {
      const paragraphNode = child as MarkdownParagraph
      result.push(...renderInlineNodes(paragraphNode.children, ctx))
    }
    else {
      result.push(...renderBlockNode(child, ctx))
    }
  }
  return result
}

function renderBlockNode(node: MarkdownNode, ctx: RenderContext): VNodeChild[] {
  switch (node.type) {
    case 'heading': {
      const headingNode = node as MarkdownHeading
      const depth = headingNode.depth
      const children = renderInlineNodes(headingNode.children, ctx)
      const id = slugifyHeadingId(extractTextFromNodes(headingNode.children))
      const component = (() => {
        switch (depth) {
          case 1:
            return NH1
          case 2:
            return NH2
          case 3:
            return NH3
          case 4:
            return NH4
          case 5:
            return NH5
          default:
            return NH6
        }
      })()
      return [
        h(component, { id: id || undefined }, { default: () => children })
      ]
    }
    case 'paragraph': {
      const paragraphNode = node as MarkdownParagraph
      const children = renderInlineNodes(paragraphNode.children, ctx)
      return [h(NP, null, { default: () => children })]
    }
    case 'thematicBreak':
      return [h(NHr)]
    case 'blockquote': {
      const blockquoteNode = node as MarkdownBlockquote
      const children = renderBlockNodes(blockquoteNode.children, ctx)
      return [h(NBlockquote, null, { default: () => children })]
    }
    case 'list': {
      const listNode = node as MarkdownList
      const listComponent = listNode.ordered ? NOl : NUl
      return [
        h(listComponent, null, {
          default: () =>
            listNode.children.map((item, index) =>
              h(
                NLi,
                { key: index },
                {
                  default: () => renderListItem(item as MarkdownListItem, ctx)
                }
              )
            )
        })
      ]
    }
    case 'code': {
      const codeNode = node as MarkdownCode
      const rawLanguage = codeNode.lang || ''
      const language = rawLanguage.startsWith('__')
        ? rawLanguage.slice(2)
        : rawLanguage
      const code = codeNode.value || ''
      const highlighted = highlightCode(code, language, ctx)
      return [
        h(
          NCode,
          { internalNoHighlight: true },
          {
            default: () => [
              highlighted !== null
                ? h('pre', { innerHTML: highlighted })
                : h('pre', null, code)
            ]
          }
        )
      ]
    }
    case 'html': {
      const htmlNode = node as MarkdownHtml
      const html = htmlNode.value || ''
      if (!html)
        return []
      if (ctx.sanitize) {
        if (!ctx.sanitizeHtml) {
          return [h(NP, null, { default: () => html })]
        }
        const sanitizedHtml = ctx.sanitizeHtml(html)
        if (!sanitizedHtml)
          return []
        return [h('div', { innerHTML: sanitizedHtml })]
      }
      return [h('div', { innerHTML: html })]
    }
    case 'definition':
      return []
    default: {
      if (isMarkdownParent(node)) {
        const children = renderBlockNodes(node.children, ctx)
        if (children.length)
          return children
      }
      const value = (node as MarkdownUnknown).value || ''
      return value ? [h(NP, null, { default: () => value })] : []
    }
  }
}

function renderBlockNodes(
  nodes: MarkdownNode[] | undefined,
  ctx: RenderContext
): VNodeChild[] {
  if (!nodes?.length)
    return []
  return nodes.flatMap(node => renderBlockNode(node, ctx))
}

export default defineComponent({
  name: 'Markdown',
  props: markdownProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig()
    const configProviderContext = inject(configProviderInjectionKey, null)
    const markdownProcessorRef = computed(() => {
      return props.markdown || configProviderContext?.mergedMarkdownRef.value
    })

    if (__DEV__) {
      watchEffect(() => {
        if (!markdownProcessorRef.value && props.source) {
          warnOnce('markdown', 'markdown processor is not set.')
        }
      })
    }

    const treeRef = computed(() => {
      const processor = markdownProcessorRef.value
      if (!processor)
        return null
      try {
        const parsed = processor.parse(props.source)
        const processed = processor.runSync ? processor.runSync(parsed) : parsed
        const root = processed ?? parsed
        return isMarkdownRoot(root) ? root : null
      }
      catch {
        if (__DEV__)
          warnOnce('markdown', 'failed to parse markdown source.')
        return null
      }
    })

    const definitionsRef = computed(() => collectDefinitions(treeRef.value))
    const shouldHighlightRef = computed(() =>
      hasHighlightableCode(treeRef.value)
    )
    const hljsRef = useHljs(props, shouldHighlightRef)
    const childrenRef = computed(() => {
      const tree = treeRef.value
      if (!tree) {
        return props.source
          ? [h(NP, null, { default: () => props.source })]
          : []
      }
      return renderBlockNodes(tree.children, {
        hljs: hljsRef.value,
        sanitize: props.sanitize,
        sanitizeHtml: props.sanitizeHtml,
        definitions: definitionsRef.value
      })
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      children: childrenRef
    }
  },
  render() {
    return h(
      'div',
      { class: `${this.mergedClsPrefix}-markdown` },
      this.children
    )
  }
})
