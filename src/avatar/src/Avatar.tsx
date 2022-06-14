import {
  h,
  ref,
  computed,
  defineComponent,
  PropType,
  inject,
  watch,
  VNodeChild,
  Fragment
} from 'vue'
import { VResizeObserver } from 'vueuc'
import { avatarGroupInjectionKey } from './context'
import type { Size, ObjectFit } from './interface'
import { tagInjectionKey } from '../../tag/src/Tag'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { avatarLight } from '../styles'
import type { AvatarTheme } from '../styles'
import { createKey, color2Class, resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { useInView } from '../../_utils/composable/use-in-view'

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
  lazyload: Boolean,
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
      hasLoadErrorRef.value = true
      const { onError } = props
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

    const lazyloadRef = ref<HTMLElement>()
    const isInView = useInView(lazyloadRef, () => {}, {
      triggerOnce: true
    })
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
      isInView,
      lazyloadRef
    }
  },
  render () {
    const { $slots, src, mergedClsPrefix, onRender, lazyload, isInView } = this
    onRender?.()
    let img: VNodeChild
    if (this.hasLoadError) {
      img = <img src={this.fallbackSrc} style={{ objectFit: this.objectFit }} />
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
          return (
            <Fragment>
              {!isInView ? (
                <div ref="lazyloadRef" />
              ) : (
                <img
                  src={src}
                  onError={this.handleError}
                  style={{ objectFit: this.objectFit }}
                  // @ts-expect-error
                  loading={lazyload ? 'lazy' : 'eager'}
                />
              )}
            </Fragment>
          )
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
      </span>
    )
  }
})
