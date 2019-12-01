<script>
import NBaseSelectOption from '../../../base/SelectMenu/src/SelectOption'

export default {
  props: {
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      required: true
    }
  },
  render (h) {
    return h(NBaseSelectOption, {
      props: {
        label: this.label,
        value: this.value
      },
      scopedSlots: this.$scopedSlots,
      on: this.$listeners
    })
  }
}
</script>
