// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { NPopover } from '../../popover'
import { useTheme } from '../../_mixins'
import { tooltipLight } from '../styles'

export default defineComponent({
  name: 'Tooltip',
  props: {
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
      mergedTheme: themeRef,
      popoverThemeOverrides: computed(() => {
        return themeRef.value.self
      })
    }
  },
  render () {
    const { mergedTheme } = this
    return h(
      NPopover,
      {
        ...this.$props,
        unstableTheme: mergedTheme.peers.Popover,
        unstableThemeOverrides: mergedTheme.overrides.Popover,
        builtinThemeOverrides: this.popoverThemeOverrides,
        class: 'n-tooltip n-popover--tooltip',
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
