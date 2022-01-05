import { h, ref, provide, defineComponent, PropType, mergeProps } from 'vue'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInternalProps } from '../../popover/src/Popover'
import { NPopover } from '../../popover'
import type { PopoverInst, PopoverTrigger } from '../../popover'
import NPopselectPanel, { panelPropKeys, panelProps } from './PopselectPanel'
import { omit, keep, createRefSetter } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { popselectLight } from '../styles'
import type { PopselectTheme } from '../styles'
import { popselectInjectionKey } from './interface'

const popselectProps = {
  ...(useTheme.props as ThemeProps<PopselectTheme>),
  ...omit(popoverBaseProps, ['showArrow', 'arrow']),
  placement: {
    ...popoverBaseProps.placement,
    default: 'bottom'
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover'
  },
  ...panelProps
}

export type PopselectProps = ExtractPublicPropTypes<typeof popselectProps>

export default defineComponent({
  name: 'Popselect',
  props: popselectProps,
  __popover__: true,
  setup (props) {
    const themeRef = useTheme(
      'Popselect',
      'Popselect',
      undefined,
      popselectLight,
      props
    )
    const popoverInstRef = ref<PopoverInst | null>(null)
    function syncPosition (): void {
      popoverInstRef.value?.syncPosition()
    }
    function setShow (value: boolean): void {
      popoverInstRef.value?.setShow(value)
    }
    provide(popselectInjectionKey, {
      mergedThemeRef: themeRef,
      syncPosition,
      setShow
    })
    return {
      popoverInstRef,
      mergedTheme: themeRef
    }
  },
  render () {
    const { mergedTheme, $attrs, $slots } = this
    const popoverProps: PopoverInternalProps & { ref: string } = {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: {
        padding: '0'
      },
      ref: 'popoverInstRef',
      internalRenderBody: (
        className,
        ref,
        style,
        onMouseenter,
        onMouseleave
      ) => {
        return (
          <NPopselectPanel
            {...mergeProps($attrs, {
              class: className,
              style
            })}
            {...keep(this.$props, panelPropKeys)}
            ref={createRefSetter(ref)}
            onMouseenter={onMouseenter}
            onMouseleave={onMouseleave}
          >
            {$slots}
          </NPopselectPanel>
        )
      }
    }
    return (
      <NPopover {...omit(this.$props, panelPropKeys)} {...popoverProps}>
        {{
          trigger: this.$slots.default,
          _: 1
        }}
      </NPopover>
    )
  }
})
