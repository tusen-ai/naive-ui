import {
  defineComponent,
  computed,
  onBeforeMount,
  renderSlot,
  h,
  PropType
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, formatLength } from '../../_utils'
import { gradientTextLight } from '../styles'
import type { GradientTextTheme } from '../styles'
import style from './styles/index.cssr'

let houdiniRegistered = false

type Gradient =
  | string
  | {
    deg?: string | number
    from: string
    to: string
  }

export default defineComponent({
  name: 'GradientText',
  props: {
    ...(useTheme.props as ThemeProps<GradientTextTheme>),
    size: {
      type: [String, Number],
      default: undefined
    },
    fontSize: {
      type: [String, Number],
      default: undefined
    },
    type: {
      type: String as PropType<
      'info' | 'success' | 'warning' | 'error' | 'primary' | 'danger'
      >,
      default: 'primary'
    },
    color: {
      type: [Object, String] as PropType<Gradient | undefined>,
      default: undefined
    },
    gradient: {
      type: [Object, String] as PropType<Gradient | undefined>,
      default: undefined
    }
  },
  setup (props) {
    onBeforeMount(() => {
      if (!houdiniRegistered) {
        houdiniRegistered = true
        if ((window?.CSS as any)?.registerProperty) {
          ;(CSS as any).registerProperty({
            name: '--color-start',
            syntax: '<color>',
            inherits: false,
            initialValue: 'transparent'
          })
          ;(CSS as any).registerProperty({
            name: '--color-end',
            syntax: '<color>',
            inherits: false,
            initialValue: 'transparent'
          })
        }
      }
    })
    const compatibleTypeRef = computed<
    'info' | 'success' | 'warning' | 'error' | 'primary'
    >(() => {
      const { type } = props
      if (type === 'danger') return 'error'
      return type
    })
    const styleFontSizeRef = computed(() => {
      let fontSize = props.size || props.fontSize
      if (fontSize) fontSize = formatLength(fontSize)
      return fontSize || undefined
    })
    const styleBgImageRef = computed(() => {
      const gradient = props.color || props.gradient
      if (typeof gradient === 'string') {
        return gradient
      } else if (gradient) {
        const deg = gradient.deg || 0
        const from = gradient.from
        const to = gradient.to
        return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`
      }
      return undefined
    })
    const themeRef = useTheme(
      'GradientText',
      'GradientText',
      style,
      gradientTextLight,
      props
    )
    return {
      compatibleType: compatibleTypeRef,
      styleFontSize: styleFontSizeRef,
      styleBgImage: styleBgImageRef,
      cssVars: computed(() => {
        const { value: type } = compatibleTypeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            rotate,
            [createKey('colorStart', type)]: colorStart,
            [createKey('colorEnd', type)]: colorEnd,
            fontWeight
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--rotate': rotate,
          '--color-start': colorStart,
          '--color-end': colorEnd,
          '--font-weight': fontWeight
        }
      })
    }
  },
  render () {
    return (
      <span
        class={[
          'n-gradient-text',
          `n-gradient-text--${this.compatibleType}-type`
        ]}
        style={{
          fontSize: this.styleFontSize,
          backgroundImage: this.styleBgImage,
          ...this.cssVars
        }}
      >
        {renderSlot(this.$slots, 'default')}
      </span>
    )
  }
})
