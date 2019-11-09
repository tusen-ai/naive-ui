<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'ThemeConsumer',
  mixins: [ withapp, themeable ],
  render (h) {
    return this.$scopedSlots.default ? this.$scopedSlots.default({
      theme: this.synthesizedTheme
    }) : []
  }
}
</script>
