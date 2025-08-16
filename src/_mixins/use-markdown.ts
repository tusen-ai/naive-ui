import type { ComputedRef, Ref } from 'vue'
import type { Markdown } from 'vue-markdown-unified'
import { computed, inject, warn, watchEffect } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'

export type {
  Components,
  Markdown,
  PluggableList,
  Plugin
} from 'vue-markdown-unified'

interface UseMarkdownProps {
  markdown?: typeof Markdown
  [key: string]: unknown
}

export default function useMarkdown(
  props: UseMarkdownProps,
  shouldMarkdownRef?: Ref<boolean>
): ComputedRef<typeof Markdown | undefined> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  if (__DEV__) {
    const warnMarkdown = (): void => {
      if (!props.markdown && !NConfigProvider?.mergedMarkdownRef.value) {
        warn('markdown', 'vue-markdown-unified is not set.')
      }
    }
    if (!shouldMarkdownRef) {
      warnMarkdown()
    }
    else {
      watchEffect(() => {
        if (shouldMarkdownRef.value) {
          warnMarkdown()
        }
      })
    }
  }
  return computed(() => {
    return props.markdown || NConfigProvider?.mergedMarkdownRef.value
  })
}
