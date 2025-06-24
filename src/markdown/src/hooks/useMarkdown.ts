import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Fragment } from 'vue'
import { jsx } from 'vue/jsx-runtime'
import { useMarkdownComponents } from './useComponents'
import { useMarkdownRehypePlugins } from './useMarkdownRehypePlugins'
import { useMarkdownRemarkPlugins } from './useMarkdownRemarkPlugins'
import { useMarkdownContent } from './useMarkdownContent'
// import { useMarkdownContent } from './useMarkdownContent'

const emptyRemarkRehypeOptions = { allowDangerousHtml: true }

export interface TagReplacement {
  tagName: string
  component: any
  propsMapper?: (node: any) => Record<string, any>
}

export interface MarkdownOptions {
  tagReplacements?: TagReplacement[]
}

function createProcessor(options: any) {
  const remarkRehypeOptions = options.remarkRehypeOptions
    ? { ...options.remarkRehypeOptions, ...emptyRemarkRehypeOptions }
    : emptyRemarkRehypeOptions

  const rehypePluginsList = useMarkdownRehypePlugins(options)
  const remarkPluginsList = useMarkdownRemarkPlugins(options)

  const processor = unified()
    .use(remarkParse)
    .use(remarkPluginsList.value)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePluginsList.value)

  return processor
}

const Components = useMarkdownComponents()

export function useMarkdown() {
  function Markdown(options: any, content: string) {
    const processor = createProcessor(options)

    const escapedContent = useMarkdownContent(content || '', options)

    // hast
    const hast = processor.runSync(processor.parse(escapedContent))

    // vnode
    const vnode = toJsxRuntime(hast, {
      Fragment,
      components: Components,
      jsx,
      jsxs: jsx,
      elementAttributeNameCase: 'html',
      ignoreInvalidStyle: true,
      passKeys: true,
      passNode: true
    })

    return vnode
  }

  return {
    Markdown
  }
}
