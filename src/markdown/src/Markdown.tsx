import type { Token, Tokens } from 'marked'
import type { PropType, VNodeChild } from 'vue'
import type { Hljs } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { marked } from 'marked'
import { computed, defineComponent, h } from 'vue'
import { useConfig, useHljs } from '../../_mixins'
import { NCode } from '../../code'
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
  hljs: Object as PropType<Hljs>
} as const

export type MarkdownProps = ExtractPublicPropTypes<typeof markdownProps>

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

interface RenderContext {
  hljs: Hljs | undefined
  sanitize: boolean
  sanitizeHtml: ((html: string) => string) | undefined
}

function renderInlineTokens(
  tokens: Token[] | undefined,
  ctx: RenderContext
): VNodeChild[] {
  if (!tokens?.length)
    return []

  const result: VNodeChild[] = []

  let rawHtmlBuffer: string | null = null
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

  for (const token of tokens) {
    switch ((token as any).type) {
      case 'text': {
        if (rawHtmlBuffer !== null) {
          const raw = (token as any).raw ?? (token as any).text ?? ''
          const hasNestedTokens = !!(token as any).tokens?.length
          if (hasNestedTokens) {
            flushRawHtmlBuffer()
          }
          else {
            rawHtmlBuffer += raw
            break
          }
        }
        const textToken = token as Tokens.Text
        if ((textToken as any).tokens?.length) {
          result.push(...renderInlineTokens((textToken as any).tokens, ctx))
          break
        }
        result.push(...getInlineChildrenFromText(textToken.text))
        break
      }
      case 'strong': {
        flushRawHtmlBuffer()
        const strongToken = token as Tokens.Strong
        const strongChildren = (strongToken as any).tokens?.length
          ? renderInlineTokens((strongToken as any).tokens, ctx)
          : getInlineChildrenFromText((strongToken as any).text || '')
        result.push(
          h(NText, { strong: true }, { default: () => strongChildren })
        )
        break
      }
      case 'em': {
        flushRawHtmlBuffer()
        const emToken = token as Tokens.Em
        const emChildren = (emToken as any).tokens?.length
          ? renderInlineTokens((emToken as any).tokens, ctx)
          : getInlineChildrenFromText((emToken as any).text || '')
        result.push(h(NText, { italic: true }, { default: () => emChildren }))
        break
      }
      case 'del': {
        flushRawHtmlBuffer()
        const delToken = token as Tokens.Del
        const delChildren = (delToken as any).tokens?.length
          ? renderInlineTokens((delToken as any).tokens, ctx)
          : getInlineChildrenFromText((delToken as any).text || '')
        result.push(h(NText, { delete: true }, { default: () => delChildren }))
        break
      }
      case 'codespan': {
        flushRawHtmlBuffer()
        const codespanToken = token as Tokens.Codespan
        result.push(
          h(NText, { code: true }, { default: () => codespanToken.text })
        )
        break
      }
      case 'br':
        flushRawHtmlBuffer()
        result.push(h('br'))
        break
      case 'link': {
        flushRawHtmlBuffer()
        const linkToken = token as Tokens.Link
        const href = ctx.sanitize
          ? sanitizeLinkHref(linkToken.href)
          : linkToken.href
        const linkChildren = (linkToken as any).tokens?.length
          ? renderInlineTokens((linkToken as any).tokens, ctx)
          : getInlineChildrenFromText(linkToken.text)
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
              title: linkToken.title || undefined
            },
            { default: () => linkChildren }
          )
        )
        break
      }
      case 'image': {
        flushRawHtmlBuffer()
        const imageToken = token as Tokens.Image
        const src = ctx.sanitize
          ? sanitizeImageSrc(imageToken.href)
          : imageToken.href
        if (!src) {
          result.push(imageToken.text || '')
        }
        else {
          result.push(
            h('img', {
              src,
              alt: imageToken.text || undefined,
              title: imageToken.title || undefined
            })
          )
        }
        break
      }
      case 'html': {
        const htmlToken = token as Tokens.HTML
        const html = htmlToken.raw || htmlToken.text || ''
        if (ctx.sanitize && !ctx.sanitizeHtml) {
          result.push(html)
        }
        else {
          rawHtmlBuffer ??= ''
          rawHtmlBuffer += html
        }
        break
      }
      default: {
        flushRawHtmlBuffer()
        result.push((token as any).raw || (token as any).text || '')
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

function hasHighlightableCode(tokens: Token[] | undefined): boolean {
  if (!tokens?.length)
    return false
  for (const token of tokens) {
    switch ((token as any).type) {
      case 'code': {
        const codeToken = token as Tokens.Code
        if (codeToken.lang)
          return true
        break
      }
      case 'blockquote': {
        if (hasHighlightableCode((token as any).tokens))
          return true
        break
      }
      case 'list': {
        const listToken = token as Tokens.List
        for (const item of listToken.items) {
          if (hasHighlightableCode((item as any).tokens))
            return true
        }
        break
      }
    }
  }
  return false
}

function renderListItem(
  item: Tokens.ListItem,
  ctx: RenderContext
): VNodeChild[] {
  const tokens = (item as any).tokens as Token[] | undefined
  if (!tokens?.length)
    return getInlineChildrenFromText((item as any).text || '')

  const children: VNodeChild[] = []
  for (const token of tokens) {
    if ((token as any).type === 'text') {
      const textToken = token as Tokens.Text
      if ((textToken as any).tokens?.length) {
        children.push(...renderInlineTokens((textToken as any).tokens, ctx))
      }
      else {
        children.push(...getInlineChildrenFromText(textToken.text))
      }
    }
    else {
      children.push(...renderBlockToken(token, ctx))
    }
  }
  return children
}

function renderBlockToken(token: Token, ctx: RenderContext): VNodeChild[] {
  switch ((token as any).type) {
    case 'space':
      return []
    case 'heading': {
      const headingToken = token as Tokens.Heading
      const depth = headingToken.depth
      const children = (headingToken as any).tokens?.length
        ? renderInlineTokens((headingToken as any).tokens, ctx)
        : getInlineChildrenFromText(headingToken.text)
      const id = slugifyHeadingId(headingToken.text)
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
      const paragraphToken = token as Tokens.Paragraph
      const children = (paragraphToken as any).tokens?.length
        ? renderInlineTokens((paragraphToken as any).tokens, ctx)
        : getInlineChildrenFromText(paragraphToken.text)
      return [h(NP, null, { default: () => children })]
    }
    case 'text': {
      const textToken = token as Tokens.Text
      const children = (textToken as any).tokens?.length
        ? renderInlineTokens((textToken as any).tokens, ctx)
        : getInlineChildrenFromText(textToken.text)
      return [h(NP, null, { default: () => children })]
    }
    case 'hr':
      return [h(NHr)]
    case 'blockquote': {
      const blockquoteToken = token as Tokens.Blockquote
      const children = (blockquoteToken as any).tokens?.length
        ? renderBlockTokens((blockquoteToken as any).tokens, ctx)
        : getInlineChildrenFromText((blockquoteToken as any).text || '')
      return [h(NBlockquote, null, { default: () => children })]
    }
    case 'list': {
      const listToken = token as Tokens.List
      const listComponent = listToken.ordered ? NOl : NUl
      return [
        h(listComponent, null, {
          default: () =>
            listToken.items.map((item, index) =>
              h(
                NLi,
                { key: index },
                { default: () => renderListItem(item, ctx) }
              )
            )
        })
      ]
    }
    case 'code': {
      const codeToken = token as Tokens.Code
      const rawLanguage = codeToken.lang || ''
      const language = rawLanguage.startsWith('__')
        ? rawLanguage.slice(2)
        : rawLanguage
      const highlighted = highlightCode(codeToken.text, language, ctx)
      return [
        h(
          NCode,
          { internalNoHighlight: true },
          {
            default: () => [
              highlighted !== null
                ? h('pre', { innerHTML: highlighted })
                : h('pre', null, codeToken.text)
            ]
          }
        )
      ]
    }
    case 'html': {
      const htmlToken = token as Tokens.HTML
      const html = htmlToken.raw || htmlToken.text || ''
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
    default:
      return (token as any).raw
        ? [h(NP, null, { default: () => (token as any).raw })]
        : []
  }
}

function renderBlockTokens(
  tokens: Token[] | undefined,
  ctx: RenderContext
): VNodeChild[] {
  if (!tokens?.length)
    return []
  return tokens.flatMap(token => renderBlockToken(token, ctx))
}

export default defineComponent({
  name: 'Markdown',
  props: markdownProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig()
    const tokensRef = computed(() => marked.lexer(props.source))
    const shouldHighlightRef = computed(() =>
      hasHighlightableCode(tokensRef.value)
    )
    const hljsRef = useHljs(props, shouldHighlightRef)
    const childrenRef = computed(() =>
      renderBlockTokens(tokensRef.value, {
        hljs: hljsRef.value,
        sanitize: props.sanitize,
        sanitizeHtml: props.sanitizeHtml
      })
    )
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
