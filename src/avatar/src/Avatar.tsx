import { h, ref, computed, defineComponent, PropType, inject } from 'vue'
import { VResizeObserver } from 'vueuc'
import { avatarGroupInjectionKey } from './AvatarGroup'
import type { Size, ObjectFit } from './interface'
import { useConfig, useTheme, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { avatarLight } from '../styles'
import type { AvatarTheme } from '../styles'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'

export const avatarProps = {
  ...(useTheme.props as ThemeProps<AvatarTheme>),
  size: [String, Number] as PropType<Size>,
  src: String,
  circle: Boolean,
  color: String,
  objectFit: {
    type: String as PropType<ObjectFit>,
    default: 'fill'
  },
  round: Boolean,
  onError: Function as PropType<(e: Event) => void>
} as const

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

export default defineComponent({
  name: 'Avatar',
  props: avatarProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)

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
    const NAvatarGroup = inject(avatarGroupInjectionKey, {})
    const { mergedSizeRef } = useFormItem(
      {},
      {
        defaultSize: 'medium',
        mergedSize: (NFormItem) => {
          const { size } = props
          if (size) return size
          const { size: avatarGroupSize } = NAvatarGroup
          if (avatarGroupSize) return avatarGroupSize
          const { mergedSize: formItemSize } = NFormItem || {}
          if (formItemSize) {
            return formItemSize.value
          }
          return 'medium'
        }
      }
    )
    const mergedRoundRef = computed(() => {
      const { round, circle } = props
      if (round || circle) return true
      const { round: avatarGroupRound, circle: avatarGroupCircle } =
        NAvatarGroup
      if (avatarGroupRound || avatarGroupCircle) return true
      return false
    })
    const themeRef = useTheme(
      'Avatar',
      'Avatar',
      style,
      avatarLight,
      props,
      mergedClsPrefixRef
    )
    return {
      textRef,
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      fitTextTransform,
      cssVars: computed(() => {
        const size = mergedSizeRef.value
        const round = mergedRoundRef.value
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
          '--border-radius': round ? '50%' : borderRadius,
          '--color': color,
          '--bezier': cubicBezierEaseInOut,
          '--size': height
        }
      })
    }
  },
  render () {
    const { $slots, src, mergedClsPrefix } = this
    return (
      <span
        ref="selfRef"
        class={`${mergedClsPrefix}-avatar`}
        style={this.cssVars as any}
      >
        {!$slots.default && src ? (
          <img
            src={src}
            onError={this.onError}
            style={{ objectFit: this.objectFit }}
          />
        ) : (
          <VResizeObserver onResize={this.fitTextTransform}>
            {{
              default: () => (
                <span
                  ref="textRef"
                  class={`${mergedClsPrefix}-avatar__text`}
                  style={{ background: this.color }}
                >
                  {$slots}
                </span>
              )
            }}
          </VResizeObserver>
        )}
      </span>
    )
  }
})
