<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NConfigConsumer',
  mixins: [ withapp, themeable ],
  watch: {
    'NConfigProvider.theme': function (value, oldValue) {
      this.$emit('theme-change', value, oldValue)
    },
    'NConfigProvider.namespace': function (value, oldValue) {
      this.$emit('namespace-change', value, oldValue)
    },
    'NConfigProvider.themeEnvironment': function (value, oldValue) {
      this.$emit('theme-environment-change', value, oldValue)
    }
  },
  render (h) {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default({
      theme: this.synthesizedTheme,
      namespace: this.NConfigProvider ? this.NConfigProvider.namespace : null,
      themeEnvironment: this.synthesizedThemeEnvironment
    }) : []
    if (defaultSlot.length > 1) {
      console.warn('[naive-ui/config-consumer]: Config consumer only takes single child node')
    }
    return [defaultSlot[0]]
  }
}
</script>
