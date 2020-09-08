<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import styleScheme from '../../_utils/naive/styleScheme'

export default {
  name: 'Element',
  mixins: [
    withapp,
    themeable
  ],
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
    const scopedSlots = this.$slots
    return h(this.as, {
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      }
    }, (scopedSlots.default && scopedSlots.default({
      theme: this.syntheticTheme,
      namespace: this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null,
      themeEnvironment: this.syntheticThemeEnvironment,
      styleScheme: this.syntheticTheme ? styleScheme[this.syntheticTheme] : null
    })) || null)
  }
}
</script>
