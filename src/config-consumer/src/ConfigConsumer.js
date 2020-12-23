import { configurable, themeable } from '../../_mixins'
import styleScheme from '../../_deprecated/style-scheme'

export default {
  name: 'ConfigConsumer',
  props: {
    onThemeChange: {
      type: Function,
      default: undefined
    },
    onNamespaceChange: {
      type: Function,
      default: undefined
    },
    onLanguageChange: {
      type: Function,
      default: undefined
    }
  },
  mixins: [configurable, themeable],
  watch: {
    mergedTheme (value, oldValue) {
      const { onThemeChange } = this
      if (onThemeChange) onThemeChange(value, oldValue)
    },
    'NConfigProvider.mergedNamespace' (value, oldValue) {
      const { onNamespaceChange } = this
      if (onNamespaceChange) onNamespaceChange(value, oldValue)
    },
    'NConfigProvider.mergedLanguage' (value, oldValue) {
      const { onLanguageChange } = this
      if (onLanguageChange) onLanguageChange(value, oldValue)
    }
  },
  render () {
    const defaultSlot = this.$slots.default
    const { NConfigProvider } = this
    return defaultSlot
      ? defaultSlot({
        theme: this.mergedTheme,
        language: NConfigProvider ? NConfigProvider.mergedLanguage : null,
        namespace: NConfigProvider ? NConfigProvider.mergedNamespace : null,
        themeEnvironment: this.mergedThemeEnvironment,
        styleScheme: styleScheme[this.mergedTheme]
      })
      : []
  }
}
