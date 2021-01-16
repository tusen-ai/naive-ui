import {
  h,
  ref,
  computed,
  onUpdated,
  onMounted,
  defineComponent,
  PropType
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { avatarLight } from '../styles'
import type { AvatarTheme } from '../styles'
import { createKey } from '../../_utils'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Avatar',
  props: {
    ...(useTheme.props as ThemeProps<AvatarTheme>),
    size: {
      type: [String, Number] as PropType<
      number | 'tiny' | 'small' | 'medium' | 'large' | 'huge'
      >,
      default: 'medium'
    },
    src: {
      type: String,
      default: undefined
    },
    circle: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
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
      console.log('updated')
      adjustText()
    })
    const themeRef = useTheme('Avatar', 'Avatar', style, avatarLight, props)
    return {
      textRef,
      selfRef,
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
    const { $slots, src } = this
    return (
      <span ref="selfRef" class="n-avatar" style={this.cssVars as any}>
        {!$slots.default && src ? (
          <img src={src} />
        ) : (
          <span
            ref="textRef"
            class="n-avatar__text"
            style={{ background: this.color }}
          >
            {$slots}
          </span>
        )}
      </span>
    )
  }
})
