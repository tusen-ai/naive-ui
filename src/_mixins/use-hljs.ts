import { inject, computed, ComputedRef } from 'vue'
import type { highlight, getLanguage } from 'highlight.js'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'
import { warn } from '../_utils'

interface UseHljsProps {
  hljs?: unknown
  [key: string]: unknown
}

export interface Hljs {
  highlight: typeof highlight
  getLanguage: typeof getLanguage
}
export default function useHljs (
  props: UseHljsProps
): ComputedRef<Hljs | undefined> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  if (__DEV__ && !props.hljs && !NConfigProvider?.mergedHljsRef.value) {
    warn('code', 'hljs is not set.')
  }
  return computed(() => {
    return (props.hljs as any) || NConfigProvider?.mergedHljsRef.value
  })
}
