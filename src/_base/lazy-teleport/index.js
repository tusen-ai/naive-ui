import { Teleport, h, toRef } from 'vue'
import { useFalseUntilTruthy } from '../../_utils/composition'

export default {
  name: 'LazyTeleport',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    return {
      showTeleport: useFalseUntilTruthy(toRef(props, 'show'))
    }
  },
  render () {
    return this.showTeleport ? h(Teleport, {
      ...this.$props,
      to: this.$props.to ?? 'body'
    }, {
      default: this.$slots.default
    }) : null
  }
}
