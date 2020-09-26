import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import styleScheme from '../../_utils/naive/styleScheme'

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
  mixins: [
    withapp,
    themeable
  ],
  watch: {
    syntheticTheme (value, oldValue) {
      const { onThemeChange } = this
      if (onThemeChange) onThemeChange(value, oldValue)
    },
    'NConfigProvider.inheritedNamespace' (value, oldValue) {
      const { onNamespaceChange } = this
      if (onNamespaceChange) onNamespaceChange(value, oldValue)
    },
    'NConfigProvider.inheritedLanguage' (value, oldValue) {
      const { onLanguageChange } = this
      if (onLanguageChange) onLanguageChange(value, oldValue)
    }
  },
  render () {
    const defaultSlot = this.$slots.default
    return defaultSlot ? defaultSlot({
      theme: this.syntheticTheme,
      language: this.NConfigProvider ? this.NConfigProvider.inheritedLanguage : null,
      namespace: this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null,
      themeEnvironment: this.syntheticThemeEnvironment,
      styleScheme: styleScheme[this.syntheticTheme || this.$naive.fallbackTheme]
    }) : []
  }
}
