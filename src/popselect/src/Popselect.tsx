import {
  h,
  ref,
  provide,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInternalProps } from '../../popover/src/Popover'
import { NPopover } from '../../popover'
import type { PopoverInst, PopoverTrigger } from '../../popover'
import NPopselectPanel, { panelPropKeys, panelProps } from './PopselectPanel'
import { omit, keep, createRefSetter, mergeEventHandlers } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { popselectLight } from '../styles'
import type { PopselectTheme } from '../styles'
import { popselectInjectionKey, type PopselectInst } from './interface'

export const popselectProps = {
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

export type PopselectSetupProps = ExtractPropTypes<typeof popselectProps>
export type PopselectProps = ExtractPublicPropTypes<typeof popselectProps>

export default defineComponent({
  name: 'Popselect',
  props: popselectProps,
  inheritAttrs: false,
  __popover__: true,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Popselect',
      '-popselect',
      undefined,
      popselectLight,
      props,
      mergedClsPrefixRef
    )
    const popoverInstRef = ref<PopoverInst | null>(null)
    function syncPosition (): void {
      popoverInstRef.value?.syncPosition()
    }
    function setShow (value: boolean): void {
      popoverInstRef.value?.setShow(value)
    }
    provide(popselectInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      syncPosition,
      setShow
    })
    const exposedMethods: PopselectInst = {
      syncPosition,
      setShow
    }
    return {
      ...exposedMethods,
      popoverInstRef,
      mergedTheme: themeRef
    }
  },
  render () {
    const { mergedTheme } = this
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
        const { $attrs } = this
        return (
          <NPopselectPanel
            {...$attrs}
            class={[$attrs.class, className]}
            style={[$attrs.style, style]}
            {...keep(this.$props, panelPropKeys)}
            ref={createRefSetter(ref)}
            onMouseenter={mergeEventHandlers([
              onMouseenter,
              $attrs.onMouseenter as any
            ])}
            onMouseleave={mergeEventHandlers([
              onMouseleave,
              $attrs.onMouseleave as any
            ])}
          >
            {{
              action: () => this.$slots.action?.(),
              empty: () => this.$slots.empty?.()
            }}
          </NPopselectPanel>
        )
      }
    }
    return (
      <NPopover
        {...omit(this.$props, panelPropKeys)}
        {...popoverProps}
        internalDeactivateImmediately
      >
        {{
          trigger: () => this.$slots.default?.()
        }}
      </NPopover>
    )
  }
})
