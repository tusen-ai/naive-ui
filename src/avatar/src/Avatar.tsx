import {
  h,
  ref,
  computed,
  defineComponent,
  PropType,
  inject,
  watch,
  VNode
} from 'vue'
import { VResizeObserver } from 'vueuc'
import { tagInjectionKey } from '../../tag/src/Tag'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { avatarLight } from '../styles'
import type { AvatarTheme } from '../styles'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'

const avatarProps = {
  ...(useTheme.props as ThemeProps<AvatarTheme>),
  size: {
    type: [String, Number] as PropType<number | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  src: String,
  circle: Boolean,
  objectFit: {
    type: String as PropType<
    'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    >,
    default: 'fill'
  },
  round: Boolean,
  onError: Function as PropType<(e: Event) => void>,
  fallbackSrc: String,
  /** @deprecated */
  color: String
} as const

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

export default defineComponent({
  name: 'Avatar',
  props: avatarProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
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
    const themeRef = useTheme(
      'Avatar',
      'Avatar',
      style,
      avatarLight,
      props,
      mergedClsPrefixRef
    )
    const TagInjection = inject(tagInjectionKey, null)
    const mergedRoundRef = computed(() => {
      if (props.round || props.circle) return true
      if (TagInjection) {
        return TagInjection.roundRef.value
      }
      return false
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
    return {
      textRef,
      selfRef,
      mergedRoundRef,
      mergedClsPrefix: mergedClsPrefixRef,
      fitTextTransform,
      cssVars: computed(() => {
        const { size, color: propColor } = props
        const {
          self: { borderRadius, fontSize, color },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        let height: string
        if (typeof size === 'number') {
          height = `${size}px`
        } else {
          height = themeRef.value.self[createKey('height', size)]
        }
        return {
          '--font-size': fontSize,
          '--border-radius': mergedRoundRef.value ? '50%' : borderRadius,
          '--color': propColor || color,
          '--bezier': cubicBezierEaseInOut,
          '--merged-size': `var(--avatar-size-override, ${height})`
        }
      }),
      hasLoadError: hasLoadErrorRef,
      handleError
    }
  },
  render () {
    const { $slots, src, mergedClsPrefix } = this
    let img: VNode
    if (this.hasLoadError) {
      img = <img src={this.fallbackSrc} style={{ objectFit: this.objectFit }} />
    } else if (!(!$slots.default && src)) {
      img = (
        <VResizeObserver onResize={this.fitTextTransform}>
          {{
            default: () => (
              <span ref="textRef" class={`${mergedClsPrefix}-avatar__text`}>
                {$slots}
              </span>
            )
          }}
        </VResizeObserver>
      )
    } else {
      img = (
        <img
          src={src}
          onError={this.handleError}
          style={{ objectFit: this.objectFit }}
        />
      )
    }

    return (
      <span
        ref="selfRef"
        class={`${mergedClsPrefix}-avatar`}
        style={this.cssVars as any}
      >
        {img}
      </span>
    )
  }
})
