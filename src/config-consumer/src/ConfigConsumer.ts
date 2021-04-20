import { defineComponent, inject, watch, PropType } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/ConfigProvider'
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
    const NConfigProvider = inject(configProviderInjectionKey, null)
    if (NConfigProvider) {
      watch(NConfigProvider.mergedNamespaceRef, (value, oldValue) => {
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
        namespace: NConfigProvider
          ? NConfigProvider.mergedNamespaceRef.value
          : null,
        // deprecated
        theme: this.legacyTheme,
        language: this.legacyLanguage,
        themeEnvironment: this.legacyThemeEnvironment,
        styleScheme: this.legacyStyleScheme
      })
      : []
  }
})
