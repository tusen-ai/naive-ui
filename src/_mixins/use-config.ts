import { inject, computed, ComputedRef } from 'vue'
import { ConfigProviderInjection } from '../config-provider'

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
  const NConfigProvider = inject<ConfigProviderInjection | null>(
    'NConfigProvider',
    null
  )
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
