import {
  computed,
  defineComponent,
  h,
  Transition,
  PropType,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { NBaseLoading } from '../../_base'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, warn } from '../../_utils'
import { spinLight } from '../styles'
import type { SpinTheme } from '../styles'
import style from './styles/index.cssr'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18
}

export default defineComponent({
  name: 'Spin',
  props: {
    ...(useTheme.props as ThemeProps<SpinTheme>),
    stroke: {
      type: String,
      default: undefined
    },
    size: {
      type: [String, Number] as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    show: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: undefined
    },
    spinning: {
      type: Boolean,
      validator: () => {
        warn('spin', '`spinning` is deprecated, please use `show` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Spin', 'Spin', style, spinLight, props)
    return {
      compitableShow: useCompitable(props, ['spinning', 'show']),
      mergedStrokeWidth: computed(() => {
        const { strokeWidth } = props
        if (strokeWidth !== undefined) return strokeWidth
        const { size } = props
        return STROKE_WIDTH[size]
      }),
      cssVars: computed(() => {
        const { size: spinSize } = props
        const {
          common: { cubicBezierEaseInOut },
          self: { opacitySpinning, color, [createKey('size', spinSize)]: size }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--opacity-spinning': opacitySpinning,
          '--size': size,
          '--color': color
        }
      })
    }
  },
  render () {
    const { $slots } = this
    return $slots.default ? (
      <div class="n-spin-container" style={this.cssVars as CSSProperties}>
        <div
          class={[
            'n-spin-content',
            {
              'n-spin-content--spinning': this.compitableShow
            }
          ]}
        >
          {$slots}
        </div>
        <Transition name="n-fade-in-transition">
          {{
            default: () =>
              this.compitableShow ? (
                <NBaseLoading
                  stroke={this.stroke}
                  strokeWidth={this.mergedStrokeWidth}
                  class="n-spin"
                />
              ) : null
          }}
        </Transition>
      </div>
    ) : (
      <NBaseLoading
        style={this.cssVars as CSSProperties}
        stroke={this.stroke}
        stroke-width={this.mergedStrokeWidth}
        class="n-spin"
      />
    )
  }
})
