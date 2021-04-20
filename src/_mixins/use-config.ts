import { inject, computed, ComputedRef } from 'vue'
import type { ConfigProviderInjection } from '../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'

type UseConfigProps = Readonly<{
  bordered?: boolean
  [key: string]: unknown
}>

export const defaultClsPrefix = 'n'

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
    mergedClsPrefix: ComputedRef<string>
    namespace: ComputedRef<string | undefined>
  } {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return {
    NConfigProvider,
    mergedBordered: computed(() => {
      const { bordered } = props
      if (bordered !== undefined) return bordered
      return (
        NConfigProvider?.mergedBorderedRef.value ??
        options.defaultBordered ??
        true
      )
    }),
    mergedClsPrefix: computed(() => {
      const clsPrefix = NConfigProvider?.mergedClsPrefixRef.value
      return clsPrefix || defaultClsPrefix
    }),
    namespace: computed(() => NConfigProvider?.mergedNamespaceRef.value)
  }
}
