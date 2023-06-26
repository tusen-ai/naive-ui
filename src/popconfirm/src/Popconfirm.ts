import {
  h,
  ref,
  defineComponent,
  provide,
  type PropType,
  type ExtractPropTypes
} from 'vue'
import type { InternalPopoverInst } from '../../popover/src/interface'
import { NPopover } from '../../popover'
import type { PopoverTrigger } from '../../popover'
import type { ButtonProps } from '../../button'
import { popoverBaseProps } from '../../popover/src/Popover'
import { omit, keep, call } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { popconfirmLight } from '../styles'
import type { PopconfirmTheme } from '../styles'
import PopconfirmPanel, { panelPropKeys } from './PopconfirmPanel'
import { popconfirmInjectionKey } from './interface'
import type { PopconfirmInst } from './interface'
import style from './styles/index.cssr'

export const popconfirmProps = {
  ...(useTheme.props as ThemeProps<PopconfirmTheme>),
  ...popoverBaseProps,
  positiveText: String as PropType<string | null>,
  negativeText: String as PropType<string | null>,
  showIcon: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click'
  },
  positiveButtonProps: Object as PropType<ButtonProps>,
  negativeButtonProps: Object as PropType<ButtonProps>,
  onPositiveClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | any
  >,
  onNegativeClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | any
  >
}

export type PopconfirmProps = ExtractPublicPropTypes<typeof popconfirmProps>

export type PopconfirmSetupProps = ExtractPropTypes<typeof popconfirmProps>

export default defineComponent({
  name: 'Popconfirm',
  props: popconfirmProps,
  __popover__: true,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig()
    const themeRef = useTheme(
      'Popconfirm',
      '-popconfirm',
      style,
      popconfirmLight,
      props,
      mergedClsPrefixRef
    )
    const popoverInstRef = ref<InternalPopoverInst | null>(null)
    function handlePositiveClick (e: MouseEvent): void {
      if (!popoverInstRef.value?.getMergedShow()) return
      const { onPositiveClick, 'onUpdate:show': onUpdateShow } = props
      void Promise.resolve(onPositiveClick ? onPositiveClick(e) : true).then(
        (value) => {
          if (value === false) return
          popoverInstRef.value?.setShow(false)
          if (onUpdateShow) call(onUpdateShow, false)
        }
      )
    }
    function handleNegativeClick (e: MouseEvent): void {
      if (!popoverInstRef.value?.getMergedShow()) return
      const { onNegativeClick, 'onUpdate:show': onUpdateShow } = props
      void Promise.resolve(onNegativeClick ? onNegativeClick(e) : true).then(
        (value) => {
          if (value === false) return
          popoverInstRef.value?.setShow(false)
          if (onUpdateShow) call(onUpdateShow, false)
        }
      )
    }
    provide(popconfirmInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      props
    })
    const returned = {
      setShow (value: boolean) {
        popoverInstRef.value?.setShow(value)
      },
      syncPosition () {
        popoverInstRef.value?.syncPosition()
      },
      mergedTheme: themeRef,
      popoverInstRef,
      handlePositiveClick,
      handleNegativeClick
    }
    return returned satisfies PopconfirmInst
  },
  render () {
    const { $slots: slots, $props: props, mergedTheme } = this
    return h(
      NPopover,
      omit(props, panelPropKeys, {
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover,
        internalExtraClass: ['popconfirm'],
        ref: 'popoverInstRef'
      }),
      {
        trigger: slots.activator || slots.trigger,
        default: () => {
          const panelProps = keep(props, panelPropKeys)
          return h(
            PopconfirmPanel,
            {
              ...panelProps,
              onPositiveClick: this.handlePositiveClick,
              onNegativeClick: this.handleNegativeClick
            },
            slots
          )
        }
      }
    )
  }
})
