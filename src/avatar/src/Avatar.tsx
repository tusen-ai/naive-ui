import {
  h,
  ref,
  computed,
  onUpdated,
  onMounted,
  defineComponent,
  PropType
} from 'vue'
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
    type: [String, Number] as PropType<
    number | 'tiny' | 'small' | 'medium' | 'large' | 'huge'
    >,
    default: 'medium'
  },
  src: String,
  circle: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  color: String
} as const

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

export default defineComponent({
  name: 'Avatar',
  props: avatarProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)

    let memoedTextHtml: string | null = null
    const textRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const adjustText = (): void => {
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
    // Not Good Impl
    onMounted(() => adjustText())
    onUpdated(() => {
      adjustText()
    })
    const themeRef = useTheme(
      'Avatar',
      'Avatar',
      style,
      avatarLight,
      props,
      mergedClsPrefix
    )
    return {
      textRef,
      selfRef,
      mergedClsPrefix,
      cssVars: computed(() => {
        const { size, round, circle } = props
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
          '--border-radius': round || circle ? '50%' : borderRadius,
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
          <img src={src} />
        ) : (
          <span
            ref="textRef"
            class={`${mergedClsPrefix}-avatar__text`}
            style={{ background: this.color }}
          >
            {$slots}
          </span>
        )}
      </span>
    )
  }
})
