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
import { keep, call, warnOnce } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { modalLight } from '../styles'
import type { ModalTheme } from '../styles'
import { presetProps, presetPropsKeys } from './presetProps'
import NModalBodyWrapper from './BodyWrapper'
import { modalInjectionKey } from './interface'
import style from './styles/index.cssr'

const modalProps = {
  ...(useTheme.props as ThemeProps<ModalTheme>),
  show: Boolean,
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
  transformOrigin: {
    type: String as PropType<'center' | 'mouse'>,
    default: 'mouse'
  },
  ...presetProps,
  // events
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onAfterEnter: Function as PropType<() => void>,
  onBeforeLeave: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>,
  onClose: Function as PropType<() => Promise<boolean> | boolean | any>,
  onPositiveClick: Function as PropType<() => Promise<boolean> | boolean | any>,
  onNegativeClick: Function as PropType<() => Promise<boolean> | boolean | any>,
  onMaskClick: Function as PropType<(e: MouseEvent) => void>,
  // private
  dialog: Boolean,
  appear: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  // deprecated
  overlayStyle: [String, Object] as PropType<string | CSSProperties>,
  onBeforeHide: Function as PropType<() => void>,
  onAfterHide: Function as PropType<() => void>,
  onHide: Function as PropType<(value: false) => void>
}

export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: modalProps,
  setup (props) {
    if (__DEV__) {
      if (props.onHide) {
        warnOnce('modal', '`on-hide` is deprecated.')
      }
      if (props.onAfterHide) {
        warnOnce(
          'modal',
          '`on-after-hide` is deprecated, please use `on-after-leave` instead.'
        )
      }
      if (props.onBeforeHide) {
        warnOnce(
          'modal',
          '`on-before-hide` is deprecated, please use `on-before-leave` instead.'
        )
      }
      if (props.overlayStyle) {
        warnOnce(
          'modal',
          '`overlay-style` is deprecated, please use `style` instead.'
        )
      }
    }
    const containerRef = ref<HTMLElement | null>(null)
    const { mergedClsPrefixRef, namespaceRef } = useConfig(props)
    const themeRef = useTheme(
      'Modal',
      'Modal',
      style,
      modalLight,
      props,
      mergedClsPrefixRef
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
      } else {
        doUpdateShow(false)
      }
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
      const { onMaskClick } = props
      if (onMaskClick) {
        onMaskClick(e)
      }
      if (props.maskClosable) {
        if (containerRef.value?.contains(e.target as Node)) {
          doUpdateShow(false)
        }
      }
    }
    function handleKeyup (e: KeyboardEvent): void {
      if (e.code === 'Escape') {
        doUpdateShow(false)
      }
    }
    provide(modalInjectionKey, {
      getMousePosition: () => {
        if (NDialogProvider) {
          const { clickedRef, clickPositionRef } = NDialogProvider
          if (clickedRef.value && clickPositionRef.value) {
            return clickPositionRef.value
          }
        }
        if (clickedRef.value) {
          return clickedPositionRef.value
        }
        return null
      },
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      isMountedRef,
      appearRef: toRef(props, 'appear'),
      transformOriginRef: toRef(props, 'transformOrigin')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      isMounted: isMountedRef,
      containerRef,
      presetProps: computed(() => {
        const pickedProps = keep(props, presetPropsKeys)
        return pickedProps
      }),
      handleKeyup,
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
          '--n-bezier-ease-out': cubicBezierEaseOut,
          '--n-box-shadow': boxShadow,
          '--n-color': color,
          '--n-text-color': textColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <VLazyTeleport to={this.to} show={this.show}>
        {{
          default: () => [
            withDirectives(
              <div
                role="none"
                ref="containerRef"
                class={[`${mergedClsPrefix}-modal-container`, this.namespace]}
                style={this.cssVars as CSSProperties}
              >
                {this.unstableShowMask ? (
                  <Transition
                    name="fade-in-transition"
                    key="mask"
                    appear={this.appear ?? this.isMounted}
                  >
                    {{
                      default: () => {
                        return this.show ? (
                          <div
                            aria-hidden
                            ref="containerRef"
                            class={`${mergedClsPrefix}-modal-mask`}
                          />
                        ) : null
                      }
                    }}
                  </Transition>
                ) : null}
                <NModalBodyWrapper
                  style={this.overlayStyle}
                  {...this.$attrs}
                  ref={'bodyWrapper'}
                  displayDirective={this.displayDirective}
                  show={this.show}
                  preset={this.preset}
                  {...this.presetProps}
                  onClose={this.handleCloseClick}
                  onNegativeClick={this.handleNegativeClick}
                  onPositiveClick={this.handlePositiveClick}
                  onBeforeLeave={this.handleBeforeLeave}
                  onAfterEnter={this.onAfterEnter}
                  onAfterLeave={this.handleAfterLeave}
                  onClickoutside={this.handleClickoutside}
                  onKeyup={this.handleKeyup}
                >
                  {this.$slots}
                </NModalBodyWrapper>
              </div>,
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
        }}
      </VLazyTeleport>
    )
  }
})
