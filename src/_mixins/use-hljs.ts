import { inject, computed, type ComputedRef, type Ref, watchEffect } from 'vue'
import type { HLJSApi } from 'highlight.js'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { warn } from '../_utils'

interface UseHljsProps {
  hljs?: unknown
  [key: string]: unknown
}

export interface Hljs {
  highlight: HLJSApi['highlight']
  getLanguage: HLJSApi['getLanguage']
}
export default function useHljs (
  props: UseHljsProps,
  shouldHighlightRef?: Ref<boolean>
): ComputedRef<Hljs | undefined> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  if (__DEV__) {
    const warnHljs = (): void => {
      if (!props.hljs && !NConfigProvider?.mergedHljsRef.value) {
        warn('code', 'hljs is not set.')
      }
    }
    if (!shouldHighlightRef) {
      warnHljs()
    } else {
      watchEffect(() => {
        if (shouldHighlightRef.value) {
          warnHljs()
        }
      })
    }
  }
  return computed(() => {
    return (props.hljs as any) || NConfigProvider?.mergedHljsRef.value
  })
}
