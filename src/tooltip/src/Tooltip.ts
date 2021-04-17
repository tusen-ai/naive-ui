// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { NPopover } from '../../popover'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInst } from '../../popover'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { tooltipLight } from '../styles'
import type { TooltipTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'

export type TooltipInst = PopoverInst

const tooltipProps = {
  ...popoverBaseProps,
  ...(useTheme.props as ThemeProps<TooltipTheme>)
}

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

export default defineComponent({
  name: 'Tooltip',
  props: tooltipProps,
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
        internalExtraClass: 'tooltip',
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
