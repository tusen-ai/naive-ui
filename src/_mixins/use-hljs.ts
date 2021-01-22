import { inject, getCurrentInstance, computed, ComputedRef } from 'vue'
import { ConfigProviderInjection } from '../config-provider'
import { warn } from '../_utils'

interface UseHljsProps {
  hljs?: unknown
  [key: string]: unknown
}

export interface Hljs {
  getLanguage: (lang: string) => string | undefined
  highlight: (language: string, code: string) => { value: string }
}

export default function useHljs (
  props: UseHljsProps
): ComputedRef<Hljs | undefined> {
  const NConfigProvider = inject<ConfigProviderInjection | null>(
    'NConfigProvider',
    null
  )
  const vm = getCurrentInstance()?.proxy as any
  if (
    __DEV__ &&
    !props.hljs &&
    !NConfigProvider?.mergedHljs &&
    !vm.$naive.hljs
  ) {
    warn('code', 'hljs is not set.')
  }
  return computed(() => {
    return props.hljs || NConfigProvider?.mergedHljs || vm.$naive.hljs
  })
}
