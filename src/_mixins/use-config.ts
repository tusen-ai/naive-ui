import { inject, computed } from 'vue'
import { ConfigProviderInjection } from '../config-provider'

interface UseConfigProps {
  bordered?: boolean
}

export default function useConfig (props: UseConfigProps) {
  const NConfigProvider = inject<ConfigProviderInjection | null>('NConfigProvider', null)
  return {
    NConfigProvider,
    mergedBordered: computed(() => {
      const { bordered } = props
      if (bordered !== undefined) return bordered
      return NConfigProvider?.mergedBordered || true
    }),
    namespace: computed(() => NConfigProvider?.mergedNamespace)
  }
}
