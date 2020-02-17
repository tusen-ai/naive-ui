<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'
import styleScheme from '../../_utils/naive/styleScheme'

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
    syntheticTheme: function (value, oldValue) {
      this.$emit('theme-change', value, oldValue)
    }
  },
  render (h) {
    return h(this.as, {
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      }
    }, this.$slots.default || (this.$scopedSlots.default && this.$scopedSlots.default({
      theme: this.syntheticTheme,
      namespace: this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null,
      themeEnvironment: this.syntheticThemeEnvironment,
      styleScheme: this.syntheticTheme ? styleScheme[this.syntheticTheme] : null
    })) || null)
  }
}
</script>
