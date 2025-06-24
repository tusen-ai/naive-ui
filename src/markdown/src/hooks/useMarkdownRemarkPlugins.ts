import type { Pluggable } from 'unified'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { computed } from 'vue'

export function useMarkdownRemarkPlugins(options) {
  const { remarkPlugins, isBreaks, enableLatex } = options
  const plugins = computed(() => [
    remarkGfm,
    isBreaks && remarkBreaks,
    enableLatex && remarkMath,
  ].filter(Boolean) as Pluggable[])

  return computed(() => [
    ...plugins.value,
    ...remarkPlugins || []
  ])
}
