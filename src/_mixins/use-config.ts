import { inject, computed, type ComputedRef, type Ref, shallowRef } from 'vue'
import type {
  RtlEnabledState,
  GlobalComponentConfig,
  Breakpoints
} from '../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../config-provider/src/context'

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
    inlineThemeDisabled: boolean | undefined
    mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined
    mergedBorderedRef: ComputedRef<boolean>
    mergedClsPrefixRef: Ref<string>
    mergedBreakpointsRef: Ref<Breakpoints> | undefined
    mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined> | undefined
    namespaceRef: ComputedRef<string | undefined>
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
      if (bordered !== undefined) return bordered
      return (
        NConfigProvider?.mergedBorderedRef.value ??
        options.defaultBordered ??
        true
      )
    }),
    mergedClsPrefixRef: NConfigProvider
      ? NConfigProvider.mergedClsPrefixRef
      : shallowRef(defaultClsPrefix),
    namespaceRef: computed(() => NConfigProvider?.mergedNamespaceRef.value)
  }
}

export function useMergedClsPrefix (): Ref<string> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return NConfigProvider
    ? NConfigProvider.mergedClsPrefixRef
    : shallowRef(defaultClsPrefix)
}
