import {
  h,
  ref,
  defineComponent,
  provide,
  PropType,
  ExtractPropTypes
} from 'vue'
import { NPopover } from '../../popover'
import type { PopoverInst, PopoverTrigger } from '../../popover'
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

const popconfirmProps = {
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

const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
const isFunction = (val: unknown): val is Function => typeof val === 'function'
const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

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
    const popoverInstRef = ref<PopoverInst | null>(null)
    const positiveLoadingRef = ref(false)
    const negativeLoadingRef = ref(false)
    function handlePositiveClick (e: MouseEvent): void {
      const { onPositiveClick, 'onUpdate:show': onUpdateShow } = props
      void Promise.resolve(
        onPositiveClick
          ? (() => {
              const res = onPositiveClick(e)
              if (isPromise(res)) {
                positiveLoadingRef.value = true
              }
              return res
            })()
          : true
      )
        .then((value) => {
          if (value === false) return
          popoverInstRef.value?.setShow(false)
          if (onUpdateShow) call(onUpdateShow, false)
        })
        .finally(() => {
          positiveLoadingRef.value = false
        })
    }
    function handleNegativeClick (e: MouseEvent): void {
      const { onNegativeClick, 'onUpdate:show': onUpdateShow } = props
      void Promise.resolve(
        onNegativeClick
          ? (() => {
              const res = onNegativeClick(e)
              if (isPromise(res)) {
                negativeLoadingRef.value = true
              }
              return res
            })()
          : true
      )
        .then((value) => {
          if (value === false) return
          popoverInstRef.value?.setShow(false)
          if (onUpdateShow) call(onUpdateShow, false)
        })
        .finally(() => {
          negativeLoadingRef.value = false
        })
    }
    provide(popconfirmInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      props,
      positiveLoadingRef,
      negativeLoadingRef
    })
    const exposedMethods: PopconfirmInst = {
      setShow (value) {
        popoverInstRef.value?.setShow(value)
      },
      syncPosition () {
        popoverInstRef.value?.syncPosition()
      }
    }
    return {
      ...exposedMethods,
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
