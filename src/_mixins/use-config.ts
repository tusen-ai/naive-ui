import { inject, computed, ComputedRef } from 'vue'
import type { ConfigProviderInjection } from '../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'

type UseConfigProps = Readonly<{
  bordered?: boolean
  [key: string]: unknown
}>

export default function useConfig (
  props: UseConfigProps = {},
  options: {
    defaultBordered?: boolean
  } = {
    defaultBordered: true
  }
): {
    NConfigProvider: ConfigProviderInjection | null
    mergedBordered: ComputedRef<boolean>
    namespace: ComputedRef<string | undefined>
  } {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return {
    NConfigProvider,
    mergedBordered: computed(() => {
      const { bordered } = props
      if (bordered !== undefined) return bordered
      return NConfigProvider?.mergedBordered ?? options.defaultBordered ?? true
    }),
    namespace: computed(() => NConfigProvider?.mergedNamespace)
  }
}
