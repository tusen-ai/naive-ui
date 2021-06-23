import { computed, ComputedRef, inject } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'
import { commonLight } from '../_styles/common'
import type { ThemeCommonVars } from '../_styles/common'

export function useThemeVars (): ComputedRef<ThemeCommonVars> {
  return computed(() => {
    const configProviderInjection = inject(configProviderInjectionKey, null)
    if (configProviderInjection === null) return commonLight
    const {
      mergedThemeRef: { value: mergedTheme }
    } = configProviderInjection
    if (mergedTheme) {
      const { common } = mergedTheme
      return common || commonLight
    } else {
      return commonLight
    }
  })
}
