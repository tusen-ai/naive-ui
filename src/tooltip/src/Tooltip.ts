import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { PopoverInst } from '../../popover'
import type { TooltipTheme } from '../styles'
// Tooltip: popover wearing waistcoat
import { computed, defineComponent, h, ref } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { NPopover } from '../../popover'
import { popoverBaseProps } from '../../popover/src/Popover'
import { tooltipLight } from '../styles'

export type TooltipInst = PopoverInst

export const tooltipProps = {
  ...popoverBaseProps,
  ...(useTheme.props as ThemeProps<TooltipTheme>)
}

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

export default defineComponent({
  name: 'Tooltip',
  props: tooltipProps,
  __popover__: true,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Tooltip',
      '-tooltip',
      undefined,
      tooltipLight,
      props,
      mergedClsPrefixRef
    )
    const popoverRef = ref<PopoverInst | null>(null)
    const tooltipExposedMethod: TooltipInst = {
      syncPosition() {
        popoverRef.value!.syncPosition()
      },
      setShow(show: boolean) {
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
  render() {
    const { mergedTheme, internalExtraClass } = this
    return h(
      NPopover,
      {
        ...this.$props,
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover,
        builtinThemeOverrides: this.popoverThemeOverrides,
        internalExtraClass: internalExtraClass.concat('tooltip'),
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
