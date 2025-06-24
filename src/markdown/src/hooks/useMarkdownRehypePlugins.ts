import type { Pluggable } from 'unified'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { computed } from 'vue'

export function useMarkdownRehypePlugins(options) {
  const { allowHtml, rehypePlugins, enableLatex } = options

  // enableLatex && rehypeKatexDir,
  // enableCustomFootnotes && rehypeFootnoteLinks,
  // animated && animatedPlugin,
  //   ].filter(Boolean) as Pluggable[],
  const plugins = computed(() =>
    [
      rehypeGithubAlerts,
      allowHtml && rehypeRaw,
      enableLatex && rehypeKatex
    ].filter(Boolean) as Pluggable[]
  )
  return computed(() => [
    ...plugins.value,
    ...rehypePlugins || []
  ])
}
