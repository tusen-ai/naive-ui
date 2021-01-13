import { inject, getCurrentInstance, computed } from 'vue'
import { ConfigProviderInjection } from '../config-provider'
import { warn } from '../_utils'

interface UseHljsProps {
  hljs?: any
}

export default function useHljs (props: UseHljsProps) {
  const NConfigProvider = inject<ConfigProviderInjection | null>('NConfigProvider', null)
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
