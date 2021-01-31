import { defineComponent, inject, toRef, watch, PropType } from 'vue'
import { ConfigProviderInjection } from '../../config-provider'
import useLegacy, { OnLanguageChange } from './use-legacy'

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
    onLanguageChange: Function as PropType<OnLanguageChange>
  },
  setup (props) {
    const NConfigProvider = inject<ConfigProviderInjection | null>(
      'NConfigProvider',
      null
    )
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
