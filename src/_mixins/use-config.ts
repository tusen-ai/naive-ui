import { type ComputedRef, type Ref, computed, inject, shallowRef } from 'vue'
import type { GlobalSize } from 'naive-ui'
import type {
  Breakpoints,
  GlobalComponentConfig,
  RtlEnabledState
} from '../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../config-provider/src/context'

export type UseConfigProps = Readonly<{
  bordered?: boolean
  [key: string]: unknown
}>

export const defaultClsPrefix = 'n'

export default function useConfig(
  props: UseConfigProps = {},
  options: {
    defaultBordered?: boolean
    defaultSize?: GlobalSize
  } = {
    defaultBordered: true,
    defaultSize: 'medium'
  }
): {
    inlineThemeDisabled: boolean | undefined
    mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined
    mergedBorderedRef: ComputedRef<boolean>
    mergedClsPrefixRef: Ref<string>
    mergedBreakpointsRef: Ref<Breakpoints> | undefined
    mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined> | undefined
    namespaceRef: ComputedRef<string | undefined>
    globalSize: Ref<GlobalSize>
  } {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return {
    // NConfigProvider,
    inlineThemeDisabled: NConfigProvider?.inlineThemeDisabled,
    mergedRtlRef: NConfigProvider?.mergedRtlRef,
    mergedComponentPropsRef: NConfigProvider?.mergedComponentPropsRef,
    mergedBreakpointsRef: NConfigProvider?.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      const { bordered } = props
      if (bordered !== undefined)
        return bordered
      return (
        NConfigProvider?.mergedBorderedRef.value
        ?? options.defaultBordered
        ?? true
      )
    }),
    mergedClsPrefixRef: NConfigProvider
      ? NConfigProvider.mergedClsPrefixRef
      : shallowRef(defaultClsPrefix),
    namespaceRef: computed(() => NConfigProvider?.mergedNamespaceRef.value),
    globalSize: computed(() => {
      if (props && props.size) {
        return props.size as GlobalSize
      }
      if (NConfigProvider?.globalSize.value) {
        return NConfigProvider?.globalSize.value
      }
      return options.defaultSize!
    })
  }
}

export function useMergedClsPrefix(): Ref<string> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return NConfigProvider
    ? NConfigProvider.mergedClsPrefixRef
    : shallowRef(defaultClsPrefix)
}
