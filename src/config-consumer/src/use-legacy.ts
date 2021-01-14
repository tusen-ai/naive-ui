import { computed, watch, toRef } from 'vue'
import { ConfigProviderInjection } from '../../config-provider'
import styleScheme from '../../_deprecated/style-scheme'

interface UseLegacyProps {
  onLanguageChange: (
    lang: string | undefined,
    oldLang: string | undefined
  ) => void
}

export default function useLegacy (
  NConfigProvider: ConfigProviderInjection | null,
  props: UseLegacyProps
) {
  if (NConfigProvider) {
    watch(toRef(NConfigProvider, 'mergedLanguage'), (value, oldValue) => {
      const { onLanguageChange } = props
      if (onLanguageChange) onLanguageChange(value, oldValue)
    })
  }
  return {
    legacyTheme: computed(() => {
      return (NConfigProvider && NConfigProvider.mergedTheme) || 'light'
    }),
    legacyLanguage: computed(() => {
      return NConfigProvider ? NConfigProvider.mergedLanguage : null
    }),
    legacyThemeEnvironment: computed(() => {
      const { mergedThemeEnvironments, mergedTheme } = NConfigProvider || {}
      return mergedThemeEnvironments
        ? mergedThemeEnvironments[mergedTheme || 'light']
        : null
    }),
    legacyStyleScheme: computed(() => {
      return (styleScheme as any)[NConfigProvider?.mergedTheme || 'light']
    })
  }
}
