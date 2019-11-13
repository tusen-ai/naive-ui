<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NConfigConsumer',
  mixins: [ withapp, themeable ],
  watch: {
    'NApp.theme': function (value, oldValue) {
      this.$emit('theme-change', value, oldValue)
    },
    'NApp.namespace': function (value, oldValue) {
      this.$emit('namespace-change', value, oldValue)
    }
  },
  render (h) {
    return this.$scopedSlots.default ? this.$scopedSlots.default({
      theme: this.synthesizedTheme,
      namespace: this.NApp ? this.NApp.namespace : null
    }) : []
  }
}
</script>
