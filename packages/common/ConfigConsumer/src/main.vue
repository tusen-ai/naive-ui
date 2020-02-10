<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import styleScheme from '../../../utils/colors'

export default {
  name: 'NConfigConsumer',
  mixins: [ withapp, themeable ],
  watch: {
    synthesizedTheme: function (value, oldValue) {
      this.$emit('theme-change', value, oldValue)
    },
    'NConfigProvider.inheritedNamespace': function (value, oldValue) {
      this.$emit('namespace-change', value, oldValue)
    },
    synthesizedThemeEnvironment: function (value, oldValue) {
      this.$emit('theme-environment-change', value, oldValue)
    },
    'NConfigProvider.inheritedLanguage': function (value, oldValue) {
      this.$emit('language-change', value, oldValue)
    }
  },
  render (h) {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default({
      theme: this.synthesizedTheme,
      language: this.NConfigProvider ? this.NConfigProvider.inheritedLanguage : null,
      namespace: this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null,
      themeEnvironment: this.synthesizedThemeEnvironment,
      styleScheme: this.synthesizedTheme ? styleScheme[this.synthesizedTheme] : null
    }) : []
    if (defaultSlot.length > 1) {
      console.error(
        '[naive-ui/config-consumer]: `n-config-consumer` only takes single child node. If multiple child nodes are set, only the first one will be rendered.'
      )
    }
    return [defaultSlot[0]]
  }
}
</script>
