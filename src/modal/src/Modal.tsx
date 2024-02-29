import {
  h,
  withDirectives,
  Transition,
  ref,
  computed,
  defineComponent,
  provide,
  type PropType,
  type CSSProperties,
  toRef,
  inject
} from 'vue'
import { zindexable } from 'vdirs'
import { useIsMounted, useClicked, useClickPosition } from 'vooks'
import { VLazyTeleport } from 'vueuc'
import { getPreciseEventTarget } from 'seemly'
import { dialogProviderInjectionKey } from '../../dialog/src/context'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  keep,
  call,
  warnOnce,
  useIsComposing,
  eventEffectNotPerformed
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { modalLight } from '../styles'
import type { ModalTheme } from '../styles'
import { presetProps, presetPropsKeys } from './presetProps'
import NModalBodyWrapper from './BodyWrapper'
import { modalInjectionKey, modalProviderInjectionKey } from './interface'
import style from './styles/index.cssr'

export const modalProps = {
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
  zIndex: Number,
  autoFocus: {
    type: Boolean,
    default: true
  },
  trapFocus: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: { type: Boolean, default: true },
  ...presetProps,
  // events
  onEsc: Function as PropType<() => void>,
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
  internalDialog: Boolean,
  internalModal: Boolean,
  internalAppear: {
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
    const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } =
      useConfig(props)
    const themeRef = useTheme(
      'Modal',
      '-modal',
      style,
      modalLight,
      props,
      mergedClsPrefixRef
    )
    const clickedRef = useClicked(64)
    const clickedPositionRef = useClickPosition()
    const isMountedRef = useIsMounted()
    const NDialogProvider = props.internalDialog
      ? inject(dialogProviderInjectionKey, null)
      : null
    const NModalProvider = props.internalModal
      ? inject(modalProviderInjectionKey, null)
      : null

    const isComposingRef = useIsComposing()

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
        if (
          containerRef.value?.contains(getPreciseEventTarget(e) as Node | null)
        ) {
          doUpdateShow(false)
        }
      }
    }
    function handleEsc (e: KeyboardEvent): void {
      props.onEsc?.()
      if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
        !isComposingRef.value && doUpdateShow(false)
      }
    }
    provide(modalInjectionKey, {
      getMousePosition: () => {
        const mergedProvider = NDialogProvider || NModalProvider
        if (mergedProvider) {
          const { clickedRef, clickedPositionRef } = mergedProvider
          if (clickedRef.value && clickedPositionRef.value) {
            return clickedPositionRef.value
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
      appearRef: toRef(props, 'internalAppear'),
      transformOriginRef: toRef(props, 'transformOrigin')
    })
    const cssVarsRef = computed(() => {
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('theme-class', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      isMounted: isMountedRef,
      containerRef,
      presetProps: computed(() => {
        const pickedProps = keep(props, presetPropsKeys)
        // TODO: remove as any after vue fix the issue introduced in 3.2.27
        return pickedProps as any
      }),
      handleEsc,
      handleAfterLeave,
      handleClickoutside,
      handleBeforeLeave,
      doUpdateShow,
      handleNegativeClick,
      handlePositiveClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <VLazyTeleport to={this.to} show={this.show}>
        {{
          default: () => {
            this.onRender?.()
            const { unstableShowMask } = this
            return withDirectives(
              <div
                role="none"
                ref="containerRef"
                class={[
                  `${mergedClsPrefix}-modal-container`,
                  this.themeClass,
                  this.namespace
                ]}
                style={this.cssVars as CSSProperties}
              >
                <NModalBodyWrapper
                  style={this.overlayStyle}
                  {...this.$attrs}
                  ref="bodyWrapper"
                  displayDirective={this.displayDirective}
                  show={this.show}
                  preset={this.preset}
                  autoFocus={this.autoFocus}
                  trapFocus={this.trapFocus}
                  blockScroll={this.blockScroll}
                  {...this.presetProps}
                  onEsc={this.handleEsc}
                  onClose={this.handleCloseClick}
                  onNegativeClick={this.handleNegativeClick}
                  onPositiveClick={this.handlePositiveClick}
                  onBeforeLeave={this.handleBeforeLeave}
                  onAfterEnter={this.onAfterEnter}
                  onAfterLeave={this.handleAfterLeave}
                  onClickoutside={
                    unstableShowMask ? undefined : this.handleClickoutside
                  }
                  renderMask={
                    unstableShowMask
                      ? () => (
                          <Transition
                            name="fade-in-transition"
                            key="mask"
                            appear={this.internalAppear ?? this.isMounted}
                          >
                            {{
                              default: () => {
                                return this.show ? (
                                  <div
                                    aria-hidden
                                    ref="containerRef"
                                    class={`${mergedClsPrefix}-modal-mask`}
                                    onClick={this.handleClickoutside}
                                  />
                                ) : null
                              }
                            }}
                          </Transition>
                        )
                      : undefined
                  }
                >
                  {this.$slots}
                </NModalBodyWrapper>
              </div>,
              [
                [
                  zindexable,
                  {
                    zIndex: this.zIndex,
                    enabled: this.show
                  }
                ]
              ]
            )
          }
        }}
      </VLazyTeleport>
    )
  }
})
