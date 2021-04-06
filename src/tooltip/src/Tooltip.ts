// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { NPopover, popoverProps } from '../../popover'
import type { PopoverInst } from '../../popover'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { tooltipLight } from '../styles'
import type { TooltipTheme } from '../styles'

export type TooltipInst = PopoverInst

export default defineComponent({
  name: 'Tooltip',
  props: {
    ...popoverProps,
    ...(useTheme.props as ThemeProps<TooltipTheme>)
  },
  setup (props) {
    const themeRef = useTheme(
      'Tooltip',
      'Tooltip',
      undefined,
      tooltipLight,
      props
    )
    const popoverRef = ref<PopoverInst | null>(null)
    const tooltipExposedMethod: TooltipInst = {
      syncPosition () {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        popoverRef.value!.syncPosition()
      },
      setShow (show: boolean) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        popoverRef.value!.setShow(show)
      }
    }
    return {
      ...tooltipExposedMethod,
      popoverRef,
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
