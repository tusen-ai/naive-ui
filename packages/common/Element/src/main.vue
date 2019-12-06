<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NElement',
  mixins: [withapp, themeable, asthemecontext],
  props: {
    as: {
      type: String,
      default: 'div'
    }
  },
  render (h) {
    return h(this.as, {
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    }, this.$slots.default || (this.$scopedSlots.default && this.$scopedSlots.default()) || null)
  }
}
</script>
