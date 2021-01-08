// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { NPopover } from '../../popover'
import { useTheme } from '../../_mixins'
import { tooltipLight } from '../styles'

export default defineComponent({
  name: 'Tooltip',
  props: {
    ...useTheme.props,
    ...NPopover.props,
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('Tooltip', 'Tooltip', null, tooltipLight, props)
    const popoverRef = ref(null)
    return {
      popoverRef,
      syncPosition () {
        popoverRef.value.syncPosition()
      },
      popoverThemeOverrides: computed(() => {
        return themeRef.value.self
      })
    }
  },
  render () {
    return h(
      NPopover,
      {
        ...this.$props,
        builtinThemeOverrides: this.popoverThemeOverrides,
        class: 'n-tooltip n-popover--tooltip',
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
