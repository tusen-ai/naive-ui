<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import styleScheme from '../../../utils/colors'

export default {
  name: 'NElement',
  mixins: [withapp, themeable, asthemecontext],
  props: {
    as: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    synthesizedTheme: function (value, oldValue) {
      this.$emit('theme-change', value, oldValue)
    }
  },
  render (h) {
    return h(this.as, {
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    }, this.$slots.default || (this.$scopedSlots.default && this.$scopedSlots.default({
      theme: this.synthesizedTheme,
      namespace: this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null,
      themeEnvironment: this.synthesizedThemeEnvironment,
      styleScheme: this.synthesizedTheme ? styleScheme[this.synthesizedTheme] : null
    })) || null)
  }
}
</script>
