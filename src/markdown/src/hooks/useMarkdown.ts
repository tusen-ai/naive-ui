// import type { Props } from 'hast-util-to-jsx-runtime'
import type { PluggableList } from 'unified'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
// import { NImage } from 'naive-ui'
// import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Fragment, h, withCtx } from 'vue'

const emptyPlugins: PluggableList[] = []
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
  const rehypePlugins = options.rehypePlugins || emptyPlugins
  const remarkPlugins = options.remarkPlugins || emptyPlugins
  const remarkRehypeOptions = options.remarkRehypeOptions
    ? { ...options.remarkRehypeOptions, ...emptyRemarkRehypeOptions }
    : emptyRemarkRehypeOptions

  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePlugins)

  return processor
}

export function useMarkdownComponents() {
  function Markdown(options: any, content: string) {
    const processor = createProcessor(options)

    // hast
    const hast = processor.runSync(processor.parse(content))
 
    function jsx(type, props, key) {
      const { children } = props
      delete props.children

      if (arguments.length > 2) {
        props.key = key
      }
      if (type === Fragment) {
        return h(type, props, children as any) as any as JSX.Element
      }

      return h(type ?? 'div', props, {
        default: withCtx(() => children),
      }) as JSX.Element
    }

    const vnode = toJsxRuntime(hast, {
      Fragment,
      jsx,
      jsxs: jsx,
      elementAttributeNameCase: 'html',
      ignoreInvalidStyle: true,
      passKeys: true,
      passNode: true
    })

    console.log(hast, vnode, 'vnode')
    return vnode
  }

  return {
    Markdown
  }
}
