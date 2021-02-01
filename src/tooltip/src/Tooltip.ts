// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { NPopover, popoverProps } from '../../popover'
import type { PopoverRef } from '../../popover'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { tooltipLight } from '../styles'
import type { TooltipTheme } from '../styles'

export default defineComponent({
  name: 'Tooltip',
  props: {
    ...popoverProps,
    ...(useTheme.props as ThemeProps<TooltipTheme>),
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Tooltip',
      'Tooltip',
      undefined,
      tooltipLight,
      props
    )
    const popoverRef = ref<PopoverRef | null>(null)
    return {
      popoverRef,
      syncPosition () {
        ;(popoverRef.value as PopoverRef).syncPosition()
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
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover,
        builtinThemeOverrides: this.popoverThemeOverrides,
        class: 'n-tooltip n-popover--tooltip',
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
