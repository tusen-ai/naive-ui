import type { Code, RootContent } from 'mdast'
import { parse } from '@vue/compiler-sfc'
import { createBaseProcessor } from '../parser'

const mdParser = createBaseProcessor()

export interface DemoVueParts {
  /** Markdown documentation extracted from <markdown> block. */
  markdown: string
  /** Vue SFC code (<script> + <template> + <style>). */
  vueCode: string
}

/**
 * Split a .demo.vue file into its markdown documentation and Vue demo code.
 * If there is no <markdown> block, the entire file is treated as Vue code.
 */
export function splitDemoVue(source: string): DemoVueParts {
  const { descriptor } = parse(source)
  const markdownBlock = descriptor.customBlocks.find(
    block => block.type === 'markdown'
  )

  if (!markdownBlock) {
    return { markdown: '', vueCode: source.trim() }
  }

  // block.loc covers only the block content; cut the whole
  // <markdown>...</markdown> span out of the source.
  const openStart = source.lastIndexOf(
    '<markdown',
    markdownBlock.loc.start.offset
  )
  const closeEnd = markdownBlock.loc.end.offset + '</markdown>'.length

  return {
    markdown: markdownBlock.content.trim(),
    vueCode: (source.slice(0, openStart) + source.slice(closeEnd)).trim()
  }
}

/**
 * Convert a .demo.vue source string into mdast nodes:
 * - <markdown> content becomes parsed markdown nodes
 * - <script>/<template>/<style> become a single ```vue code block
 */
export function parseDemoVue(source: string): RootContent[] {
  const { markdown, vueCode } = splitDemoVue(source)
  const result: RootContent[] = []

  if (markdown) {
    result.push(...mdParser.parse(markdown).children)
  }

  if (vueCode) {
    const code: Code = { type: 'code', lang: 'vue', meta: null, value: vueCode }
    result.push(code)
  }

  return result
}
