import { Teleport, h, toRef, computed, inject } from 'vue'
import { useFalseUntilTruthy } from '../../_utils/composition'

export default {
  name: 'LazyTeleport',
  props: {
    to: {
      type: [String, Object, Function],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      required: true
    },
    adjustTo: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const modal = inject('NModalBody', null)
    const drawer = inject('NDrawerBody', null)
    return {
      showTeleport: useFalseUntilTruthy(toRef(props, 'show')),
      mergedTo: computed(() => {
        const { to, adjustTo } = props
        if (adjustTo) {
          if (modal) return modal.bodyRef
          if (drawer) return drawer.bodyRef
        }
        return to ?? 'body'
      })
    }
  },
  render () {
    return this.showTeleport
      ? (
        this.disabled
          ? this.$slots.default()
          : h(Teleport, {
            ...this.$props,
            to: this.mergedTo
          }, {
            default: this.$slots.default
          }))
      : null
  }
}
