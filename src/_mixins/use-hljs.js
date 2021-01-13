import { inject, getCurrentInstance, computed } from 'vue'
import { warn } from '../_utils'

export default function useHljs (props) {
  const NConfigProvider = inject('NConfigProvider', {})
  const vm = getCurrentInstance().proxy
  if (
    __DEV__ &&
    !props.hljs &&
    !NConfigProvider.mergedHljs &&
    !vm.$naive.hljs
  ) {
    warn('code', 'hljs is not set.')
  }
  return computed(() => {
    return props.hljs || NConfigProvider.mergedHljs || vm.$naive.hljs
  })
}
