import { computed, type ComputedRef, inject } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { commonLight } from '../_styles/common'
import type { ThemeCommonVars } from '../_styles/common'
import type { CustomThemeCommonVars } from '../config-provider'

export function useThemeVars (): ComputedRef<
ThemeCommonVars & CustomThemeCommonVars
> {
  const configProviderInjection = inject(configProviderInjectionKey, null)
  return computed(() => {
    if (configProviderInjection === null) return commonLight
    const {
      mergedThemeRef: { value: mergedTheme },
      mergedThemeOverridesRef: { value: mergedThemeOverrides }
    } = configProviderInjection
    const currentThemeVars = mergedTheme?.common || commonLight
    if (mergedThemeOverrides?.common) {
      return Object.assign({}, currentThemeVars, mergedThemeOverrides.common)
    } else {
      return currentThemeVars
    }
  })
}
