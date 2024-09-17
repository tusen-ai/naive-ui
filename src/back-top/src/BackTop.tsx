import {
  type PropType,
  Transition,
  computed,
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue'
import { VLazyTeleport } from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { getScrollParent, unwrapElement } from 'seemly'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NBaseIcon } from '../../_internal'
import {
  formatLength,
  isDocument,
  lockHtmlScrollRightCompensationRef,
  resolveSlot,
  warn,
  warnOnce
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { backTopLight } from '../styles'
import type { BackTopTheme } from '../styles'
import BackTopIcon from './BackTopIcon'
import style from './styles/index.cssr'

export const backTopProps = {
  ...(useTheme.props as ThemeProps<BackTopTheme>),
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  right: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  },
  bottom: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  },
  to: {
    type: [String, Object] as PropType<HTMLElement | string>,
    default: 'body'
  },
  visibilityHeight: {
    type: Number,
    default: 180
  },
  listenTo: [String, Object, Function] as PropType<
    string | HTMLElement | Document | (() => HTMLElement | Document)
  >,
  'onUpdate:show': {
    type: Function,
    default: () => {}
  },
  // deprecated
  target: Function as PropType<() => HTMLElement>,
  onShow: Function as unknown as PropType<() => void>,
  onHide: Function as unknown as PropType<() => void>
} as const

export type BackTopProps = ExtractPublicPropTypes<typeof backTopProps>

export default defineComponent({
  name: 'BackTop',
  // make style applied to back-top button
  inheritAttrs: false,
  props: backTopProps,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.target !== undefined) {
          warnOnce(
            'back-top',
            '`target` is deprecated, please use `listen-to` instead.'
          )
        }
        if (props.onShow !== undefined) {
          warnOnce(
            'back-top',
            '`on-show` is deprecated, please use `on-update:show` instead.'
          )
        }
        if (props.onHide !== undefined) {
          warnOnce(
            'back-top',
            '`on-hide` is deprecated, please use `on-update:show` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const scrollTopRef = ref<number | null>(null)
    const uncontrolledShowRef = ref(false)
    watchEffect(() => {
      const { value: scrollTop } = scrollTopRef
      if (scrollTop === null) {
        uncontrolledShowRef.value = false
        return
      }
      uncontrolledShowRef.value = scrollTop >= props.visibilityHeight
    })
    const DomInfoReadyRef = ref(false)
    watch(uncontrolledShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        props['onUpdate:show']?.(value)
      }
    })
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const transitionDisabledRef = ref(true)
    const placeholderRef = ref<HTMLElement | null>(null)
    const styleRef = computed(
      (): {
        right: string
        bottom: string
      } => {
        return {
          right: `calc(${formatLength(props.right)} + ${
            lockHtmlScrollRightCompensationRef.value
          })`,
          bottom: formatLength(props.bottom)
        }
      }
    )
    let scrollElement: HTMLElement | Document
    let scrollListenerRegistered: boolean
    // deprecated
    watch(mergedShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        if (value) {
          props.onShow?.()
        }
        props.onHide?.()
      }
    })
    const themeRef = useTheme(
      'BackTop',
      '-back-top',
      style,
      backTopLight,
      props,
      mergedClsPrefixRef
    )
    function init(): void {
      if (scrollListenerRegistered)
        return
      scrollListenerRegistered = true
      const scrollEl
        = props.target?.()
        || unwrapElement(props.listenTo)
        || getScrollParent(placeholderRef.value)
      if (!scrollEl) {
        if (__DEV__) {
          warn(
            'back-top',
            'Container of back-top element is not found. This could be a bug of naive-ui.'
          )
        }
        return
      }
      scrollElement
        = scrollEl === document.documentElement ? document : scrollEl
      const { to } = props
      const target = typeof to === 'string' ? document.querySelector(to) : to
      if (__DEV__ && !target) {
        warn('back-top', 'Target is not found.')
      }
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll()
    }
    function handleClick(): void {
      ;(isDocument(scrollElement)
        ? document.documentElement
        : scrollElement
      ).scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    function handleScroll(): void {
      scrollTopRef.value = (
        isDocument(scrollElement) ? document.documentElement : scrollElement
      ).scrollTop
      if (!DomInfoReadyRef.value) {
        void nextTick(() => {
          DomInfoReadyRef.value = true
        })
      }
    }
    function handleAfterEnter(): void {
      transitionDisabledRef.value = false
    }
    onMounted(() => {
      init()
      transitionDisabledRef.value = mergedShowRef.value
    })
    onBeforeUnmount(() => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    })

    const cssVarsRef = computed(() => {
      const {
        self: {
          color,
          boxShadow,
          boxShadowHover,
          boxShadowPressed,
          iconColor,
          iconColorHover,
          iconColorPressed,
          width,
          height,
          iconSize,
          borderRadius,
          textColor
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-height': height,
        '--n-width': width,
        '--n-box-shadow': boxShadow,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-box-shadow-pressed': boxShadowPressed,
        '--n-color': color,
        '--n-icon-size': iconSize,
        '--n-icon-color': iconColor,
        '--n-icon-color-hover': iconColorHover,
        '--n-icon-color-pressed': iconColorPressed,
        '--n-text-color': textColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('back-top', undefined, cssVarsRef, props)
      : undefined
    return {
      placeholderRef,
      style: styleRef,
      mergedShow: mergedShowRef,
      isMounted: useIsMounted(),
      scrollElement: ref(null),
      scrollTop: scrollTopRef,
      DomInfoReady: DomInfoReadyRef,
      transitionDisabled: transitionDisabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      handleAfterEnter,
      handleScroll,
      handleClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="placeholderRef"
        class={`${mergedClsPrefix}-back-top-placeholder`}
        style="display: none"
        aria-hidden
      >
        <VLazyTeleport to={this.to} show={this.mergedShow}>
          {{
            default: () => (
              <Transition
                name="fade-in-scale-up-transition"
                appear={this.isMounted}
                onAfterEnter={this.handleAfterEnter}
              >
                {{
                  default: () => {
                    this.onRender?.()
                    return this.mergedShow
                      ? h(
                        'div',
                        mergeProps(this.$attrs, {
                          class: [
                            `${mergedClsPrefix}-back-top`,
                            this.themeClass,
                            this.transitionDisabled
                            && `${mergedClsPrefix}-back-top--transition-disabled`
                          ],
                          style: [this.style, this.cssVars],
                          onClick: this.handleClick
                        }),
                        resolveSlot(this.$slots.default, () => [
                          <NBaseIcon clsPrefix={mergedClsPrefix}>
                            {{ default: () => BackTopIcon }}
                          </NBaseIcon>
                        ])
                      )
                      : null
                  }
                }}
              </Transition>
            )
          }}
        </VLazyTeleport>
      </div>
    )
  }
})
