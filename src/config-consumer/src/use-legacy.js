import { computed, watch, toRef } from 'vue'
import styleScheme from '../../_deprecated/style-scheme'

export default function useLegacy (NConfigProvider, props) {
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
      return styleScheme[NConfigProvider.mergedTheme || 'light']
    })
  }
}
