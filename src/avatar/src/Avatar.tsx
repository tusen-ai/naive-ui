import {
  h,
  ref,
  computed,
  defineComponent,
  PropType,
  inject,
  watch,
  VNodeChild,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  ImgHTMLAttributes
} from 'vue'
import { VResizeObserver } from 'vueuc'
import { isImageSupportNativeLazy } from '../../_utils/env/is-native-lazy-load'
import {
  IntersectionObserverOptions,
  observeIntersection
} from '../../image/src/utils'
import { tagInjectionKey } from '../../tag/src/Tag'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createKey,
  color2Class,
  resolveWrappedSlot,
  resolveSlot
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { avatarLight } from '../styles'
import type { AvatarTheme } from '../styles'
import { avatarGroupInjectionKey } from './context'
import type { Size, ObjectFit } from './interface'
import style from './styles/index.cssr'

export const avatarProps = {
  ...(useTheme.props as ThemeProps<AvatarTheme>),
  size: [String, Number] as PropType<Size>,
  src: String,
  circle: {
    type: Boolean,
    default: undefined
  },
  objectFit: String as PropType<ObjectFit>,
  round: {
    type: Boolean,
    default: undefined
  },
  bordered: {
    type: Boolean,
    default: undefined
  },
  onError: Function as PropType<(e: Event) => void>,
  fallbackSrc: String,
  intersectionObserverOptions: Object as PropType<IntersectionObserverOptions>,
  lazy: Boolean,
  onLoad: Function as PropType<(e: Event) => void>,
  renderPlaceholder: Function as PropType<() => VNodeChild>,
  renderFallback: Function as PropType<() => VNodeChild>,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  /** @deprecated */
  color: String
} as const

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

export default defineComponent({
  name: 'Avatar',
  props: avatarProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const hasLoadErrorRef = ref(false)
    let memoedTextHtml: string | null = null
    const textRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const fitTextTransform = (): void => {
      const { value: textEl } = textRef
      if (textEl) {
        if (memoedTextHtml === null || memoedTextHtml !== textEl.innerHTML) {
          memoedTextHtml = textEl.innerHTML
          const { value: selfEl } = selfRef
          if (selfEl) {
            const { offsetWidth: elWidth, offsetHeight: elHeight } = selfEl
            const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl
            const radix = 0.9
            const ratio = Math.min(
              (elWidth / textWidth) * radix,
              (elHeight / textHeight) * radix,
              1
            )
            textEl.style.transform = `translateX(-50%) translateY(-50%) scale(${ratio})`
          }
        }
      }
    }
    const NAvatarGroup = inject(avatarGroupInjectionKey, null)
    const mergedSizeRef = computed(() => {
      const { size } = props
      if (size) return size
      const { size: avatarGroupSize } = NAvatarGroup || {}
      if (avatarGroupSize) return avatarGroupSize
      return 'medium'
    })
    const themeRef = useTheme(
      'Avatar',
      '-avatar',
      style,
      avatarLight,
      props,
      mergedClsPrefixRef
    )
    const TagInjection = inject(tagInjectionKey, null)
    const mergedRoundRef = computed(() => {
      if (NAvatarGroup) return true
      const { round, circle } = props
      if (round !== undefined || circle !== undefined) return round || circle
      if (TagInjection) {
        return TagInjection.roundRef.value
      }
      return false
    })
    const mergedBorderedRef = computed(() => {
      if (NAvatarGroup) return true
      return props.bordered || false
    })
    const handleError = (e: Event): void => {
      if (!shouldStartLoadingRef.value) return
      hasLoadErrorRef.value = true
      const { onError, imgProps } = props
      imgProps?.onError?.(e)
      if (onError) {
        onError(e)
      }
    }
    watch(
      () => props.src,
      () => (hasLoadErrorRef.value = false)
    )
    const cssVarsRef = computed(() => {
      const size = mergedSizeRef.value
      const round = mergedRoundRef.value
      const bordered = mergedBorderedRef.value
      const { color: propColor } = props
      const {
        self: {
          borderRadius,
          fontSize,
          color,
          border,
          colorModal,
          colorPopover
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      let height: string
      if (typeof size === 'number') {
        height = `${size}px`
      } else {
        height = themeRef.value.self[createKey('height', size)]
      }
      return {
        '--n-font-size': fontSize,
        '--n-border': bordered ? border : 'none',
        '--n-border-radius': round ? '50%' : borderRadius,
        '--n-color': propColor || color,
        '--n-color-modal': propColor || colorModal,
        '--n-color-popover': propColor || colorPopover,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-merged-size': `var(--n-avatar-size-override, ${height})`
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'avatar',
        computed(() => {
          const size = mergedSizeRef.value
          const round = mergedRoundRef.value
          const bordered = mergedBorderedRef.value
          const { color } = props
          let hash = ''
          if (size) {
            if (typeof size === 'number') {
              hash += `a${size}`
            } else {
              hash += size[0]
            }
          }
          if (round) {
            hash += 'b'
          }
          if (bordered) {
            hash += 'c'
          }
          if (color) {
            hash += color2Class(color)
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    const shouldStartLoadingRef = ref(!props.lazy)

    onMounted(() => {
      if (isImageSupportNativeLazy) {
        return
      }
      let unobserve: (() => void) | undefined
      const stopWatchHandle = watchEffect(() => {
        unobserve?.()
        unobserve = undefined
        if (props.lazy) {
          unobserve = observeIntersection(
            selfRef.value,
            props.intersectionObserverOptions,
            shouldStartLoadingRef
          )
        }
      })
      onBeforeUnmount(() => {
        stopWatchHandle()
        unobserve?.()
      })
    })
    const loadedRef = ref(!props.lazy)

    return {
      textRef,
      selfRef,
      mergedRoundRef,
      mergedClsPrefix: mergedClsPrefixRef,
      fitTextTransform,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      hasLoadError: hasLoadErrorRef,
      handleError,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnLoad: (e: Event) => {
        const { onLoad, imgProps } = props
        onLoad?.(e)
        imgProps?.onLoad?.(e)
        loadedRef.value = true
      }
    }
  },
  render () {
    const {
      $slots,
      src,
      mergedClsPrefix,
      lazy,
      onRender,
      mergedOnLoad,
      shouldStartLoading,
      loaded,
      hasLoadError
    } = this
    onRender?.()
    let img: VNodeChild
    const placeholderNode =
      !loaded &&
      !hasLoadError &&
      (this.renderPlaceholder
        ? this.renderPlaceholder()
        : this.$slots.placeholder?.())
    if (this.hasLoadError) {
      img = this.renderFallback
        ? this.renderFallback()
        : resolveSlot($slots.fallback, () => [
            <img src={this.fallbackSrc} style={{ objectFit: this.objectFit }} />
        ])
    } else {
      img = resolveWrappedSlot($slots.default, (children) => {
        if (children) {
          return (
            <VResizeObserver onResize={this.fitTextTransform}>
              {{
                default: () => (
                  <span ref="textRef" class={`${mergedClsPrefix}-avatar__text`}>
                    {children}
                  </span>
                )
              }}
            </VResizeObserver>
          )
        } else if (src) {
          const { imgProps } = this
          return h('img', {
            ...imgProps,
            loading: isImageSupportNativeLazy && lazy ? 'lazy' : 'eager',
            src: isImageSupportNativeLazy
              ? src
              : shouldStartLoading || loaded
                ? src
                : undefined,
            onLoad: mergedOnLoad,
            'data-image-src': src,
            onError: this.handleError,
            style: [
              imgProps?.style,
              { objectFit: this.objectFit },
              placeholderNode
                ? {
                    height: '0',
                    width: '0',
                    visibility: 'hidden',
                    position: 'absolute'
                  }
                : ''
            ]
          })
        }
      })
    }
    return (
      <span
        ref="selfRef"
        class={[`${mergedClsPrefix}-avatar`, this.themeClass]}
        style={this.cssVars as any}
      >
        {img}
        {lazy && placeholderNode}
      </span>
    )
  }
})
