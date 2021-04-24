import { h, ref, defineComponent, provide, PropType } from 'vue'
import { NPopover, PopoverInst, PopoverTrigger } from '../../popover'
import { popoverBaseProps } from '../../popover/src/Popover'
import { omit, keep, call } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { popconfirmLight } from '../styles'
import type { PopconfirmTheme } from '../styles'
import PopconfirmPanel, { panelPropKeys } from './PopconfirmPanel'
import style from './styles/index.cssr'
import { popconfirmInjectionKey } from './interface'

const popconfirmProps = {
  ...(useTheme.props as ThemeProps<PopconfirmTheme>),
  ...popoverBaseProps,
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click'
  },
  onPositiveClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | any
  >,
  onNegativeClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | any
  >
}

export type PopconfirmProps = ExtractPublicPropTypes<typeof popconfirmProps>

export default defineComponent({
  name: 'Popconfirm',
  props: popconfirmProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig()
    const themeRef = useTheme(
      'Popconfirm',
      'Popconfirm',
      style,
      popconfirmLight,
      props,
      mergedClsPrefixRef
    )
    const popoverInstRef = ref<PopoverInst | null>(null)
    function handlePositiveClick (e: MouseEvent): void {
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
      mergedClsPrefixRef
    })
    return {
      mergedTheme: themeRef,
      popoverInstRef,
      handlePositiveClick,
      handleNegativeClick
    }
  },
  render () {
    const { $slots: slots, $props: props, mergedTheme } = this
    return h(
      NPopover,
      omit(props, panelPropKeys, {
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover,
        internalExtraClass: 'popconfirm',
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
