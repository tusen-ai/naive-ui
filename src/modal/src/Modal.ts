import {
  h,
  withDirectives,
  Transition,
  ref,
  computed,
  defineComponent,
  provide,
  PropType,
  CSSProperties,
  toRef,
  inject
} from 'vue'
import { zindexable } from 'vdirs'
import { useIsMounted, useClicked, useClickPosition } from 'vooks'
import { VLazyTeleport } from 'vueuc'
import { dialogProviderInjectionKey } from '../../dialog/src/DialogProvider'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, keep, call, ExtractPublicPropTypes } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { modalLight } from '../styles'
import type { ModalTheme } from '../styles'
import { presetProps, presetPropsKeys } from './presetProps'
import NModalBodyWrapper from './BodyWrapper'
import { modalInjectionKey } from './interface'
import style from './styles/index.cssr'

const modalProps = {
  ...(useTheme.props as ThemeProps<ModalTheme>),
  show: {
    type: Boolean,
    default: false
  },
  unstableShowMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  preset: String as PropType<'confirm' | 'dialog' | 'card'>,
  to: [String, Object] as PropType<string | HTMLElement>,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  ...presetProps,
  // events
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  // private
  dialog: Boolean,
  appear: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  onBeforeLeave: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>,
  onClose: Function as PropType<() => Promise<boolean> | boolean | any>,
  onPositiveClick: Function as PropType<() => Promise<boolean> | boolean | any>,
  onNegativeClick: Function as PropType<() => Promise<boolean> | boolean | any>,
  // deprecated
  overlayStyle: {
    type: [String, Object] as PropType<string | CSSProperties | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'modal',
          '`overlay-style` is deprecated, please use `style` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onBeforeHide: {
    type: (Function as unknown) as PropType<(() => void) | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'modal',
          '`on-before-hide` is deprecated, please use `on-before-leave` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onAfterHide: {
    type: (Function as unknown) as PropType<(() => void) | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'modal',
          '`on-after-hide` is deprecated, please use `on-after-leave` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onHide: {
    type: (Function as unknown) as PropType<
    ((value: false) => void) | undefined
    >,
    validator: () => {
      if (__DEV__) warn('modal', '`on-hide` is deprecated.')
      return true
    },
    default: undefined
  }
}

export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: modalProps,
  setup (props) {
    const containerRef = ref<HTMLElement | null>(null)
    const { mergedClsPrefix, namespace } = useConfig(props)
    const themeRef = useTheme(
      'Modal',
      'Modal',
      style,
      modalLight,
      props,
      mergedClsPrefix
    )
    const clickedRef = useClicked(64)
    const clickedPositionRef = useClickPosition()
    const isMountedRef = useIsMounted()
    const NDialogProvider = props.dialog
      ? inject(dialogProviderInjectionKey, null)
      : null
    function doUpdateShow (show: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow, onHide } = props
      if (onUpdateShow) call(onUpdateShow, show)
      if (_onUpdateShow) call(_onUpdateShow, show)
      // deprecated
      if (onHide && !show) onHide(show)
    }
    function handleCloseClick (): void {
      const { onClose } = props
      if (onClose) {
        void Promise.resolve(onClose()).then((value) => {
          if (value === false) return
          doUpdateShow(false)
        })
      } else {
        doUpdateShow(false)
      }
    }
    function handlePositiveClick (): void {
      const { onPositiveClick } = props
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then((value) => {
          if (value === false) return
          doUpdateShow(false)
        })
      } else {
        doUpdateShow(false)
      }
    }
    function handleNegativeClick (): void {
      const { onNegativeClick } = props
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then((value) => {
          if (value === false) return
          doUpdateShow(false)
        })
      }
      doUpdateShow(false)
    }
    function handleBeforeLeave (): void {
      const { onBeforeLeave, onBeforeHide } = props
      if (onBeforeLeave) call(onBeforeLeave)
      // deprecated
      if (onBeforeHide) onBeforeHide()
    }
    function handleAfterLeave (): void {
      const { onAfterLeave, onAfterHide } = props
      if (onAfterLeave) call(onAfterLeave)
      // deprecated
      if (onAfterHide) onAfterHide()
    }
    function handleClickoutside (e: MouseEvent): void {
      if (props.maskClosable) {
        if (containerRef.value?.contains(e.target as Node)) {
          doUpdateShow(false)
        }
      }
    }
    provide(modalInjectionKey, {
      getMousePosition: () => {
        if (NDialogProvider) {
          if (NDialogProvider.clicked && NDialogProvider.clickPosition) {
            return NDialogProvider.clickPosition
          }
        }
        if (clickedRef.value) {
          return clickedPositionRef.value
        }
        return null
      },
      cPrefixRef: mergedClsPrefix,
      mergedThemeRef: themeRef,
      isMountedRef: isMountedRef,
      appearRef: toRef(props, 'appear')
    })
    return {
      cPrefix: mergedClsPrefix,
      namespace,
      isMounted: isMountedRef,
      containerRef,
      presetProps: computed(() => {
        const pickedProps = keep(props, presetPropsKeys)
        return pickedProps
      }),
      handleAfterLeave,
      handleClickoutside,
      handleBeforeLeave,
      doUpdateShow,
      handleNegativeClick,
      handlePositiveClick,
      handleCloseClick,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseOut },
          self: { boxShadow, color, textColor }
        } = themeRef.value
        return {
          '--bezier-ease-out': cubicBezierEaseOut,
          '--box-shadow': boxShadow,
          '--color': color,
          '--text-color': textColor
        }
      })
    }
  },
  render () {
    return h(
      VLazyTeleport,
      {
        to: this.to,
        show: this.show
      },
      {
        default: () => [
          withDirectives(
            h(
              'div',
              {
                ref: 'containerRef',
                class: [`${this.cPrefix}-modal-container`, this.namespace],
                style: this.cssVars as CSSProperties
              },
              [
                this.unstableShowMask
                  ? h(
                    Transition,
                    {
                      name: 'n-fade-in-transition',
                      key: 'mask',
                      appear: this.appear ?? this.isMounted
                    },
                    {
                      default: () => {
                        return this.show
                          ? h('div', {
                            ref: 'containerRef',
                            class: `${this.cPrefix}-modal-mask`
                          })
                          : null
                      }
                    }
                  )
                  : null,
                h(
                  NModalBodyWrapper,
                  {
                    style: this.overlayStyle,
                    ...this.$attrs,
                    ref: 'bodyWrapper',
                    displayDirective: this.displayDirective,
                    show: this.show,
                    preset: this.preset,
                    ...this.presetProps,
                    onClose: this.handleCloseClick,
                    onNegativeClick: this.handleNegativeClick,
                    onPositiveClick: this.handlePositiveClick,
                    onBeforeLeave: this.handleBeforeLeave,
                    onAfterLeave: this.handleAfterLeave,
                    onClickoutside: this.handleClickoutside
                  },
                  this.$slots
                )
              ]
            ),
            [
              [
                zindexable,
                {
                  enabled: this.show
                }
              ]
            ]
          )
        ]
      }
    )
  }
})
