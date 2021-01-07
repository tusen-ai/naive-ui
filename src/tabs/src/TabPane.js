import { h, withDirectives, vShow, defineComponent } from 'vue'
import { getSlot } from '../../_utils'

export default defineComponent({
  name: 'TabPane',
  alias: ['TabPanel'],
  inject: ['NTab'],
  props: {
    label: {
      type: [String, Number],
      default: undefined
    },
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      type: String,
      default: 'if'
    }
  },
  computed: {
    type () {
      return this.NTab.type
    }
  },
  created () {
    if (this.NTab) {
      this.NTab.addPanel(this)
    }
  },
  beforeUnmount () {
    if (this.NTab) {
      this.NTab.removePanel(this)
    }
  },
  render () {
    const show = this.name === this.NTab.value
    const useVShow = this.displayDirective === 'show'
    return useVShow || show
      ? withDirectives(
        h(
          'div',
          {
            class: 'n-tab-panel',
            key: this.name
          },
          getSlot(this)
        ),
        [[vShow, !useVShow || show]]
      )
      : null
  }
})
