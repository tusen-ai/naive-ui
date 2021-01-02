import { defineComponent, inject, toRef, watch } from 'vue'
import useLegacy from './use-legacy'

export default defineComponent({
  name: 'ConfigConsumer',
  props: {
    onNamespaceChange: {
      type: Function,
      default: undefined
    },
    /**
     * @deprecated
     */
    onThemeChange: {
      type: Function,
      default: undefined
    },
    /**
     * @deprecated
     */
    onLanguageChange: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const NConfigProvider = inject('NConfigProvider', null)
    if (NConfigProvider) {
      watch(toRef(NConfigProvider, 'mergedNamespace'), (value, oldValue) => {
        const { onNamespaceChange } = props
        if (onNamespaceChange) onNamespaceChange(value, oldValue)
      })
    }
    return {
      NConfigProvider,
      ...useLegacy(NConfigProvider, props)
    }
  },
  render () {
    const defaultSlot = this.$slots.default
    const { NConfigProvider } = this
    return defaultSlot
      ? defaultSlot({
        namespace: NConfigProvider ? NConfigProvider.mergedNamespace : null,
        // deprecated
        theme: this.legacyTheme,
        language: this.legacyLanguage,
        themeEnvironment: this.legacyThemeEnvironment,
        styleScheme: this.legacyStyleScheme
      })
      : []
  }
})
