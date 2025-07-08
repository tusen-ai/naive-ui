import type mermaid from 'mermaid'
import type { Ref } from 'vue'
import { computed, inject, watchEffect } from 'vue'
import { warn } from '../_utils'
import { configProviderInjectionKey } from '../config-provider/src/context'

export type { MermaidConfig } from 'mermaid/dist/config.type'

interface UseMermaidProps {
  mermaid?: unknown
  [key: string]: unknown
}

export type Mermaid = typeof mermaid

export default function useMermaid(
  props: UseMermaidProps,
  shouldMermaidRef?: Ref<boolean>
) {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  if (__DEV__) {
    const warnMermaid = (): void => {
      if (!props.mermaid && !NConfigProvider?.mergedMermaidRef.value) {
        warn('mermaid', 'mermaid is not set.')
      }
    }
    if (!shouldMermaidRef) {
      warnMermaid()
    }
    else {
      watchEffect(() => {
        if (shouldMermaidRef.value) {
          warnMermaid()
        }
      })
    }
  }
  return computed(() => {
    return (props.mermaid as any) || NConfigProvider?.mergedMermaidRef.value
  })
}
