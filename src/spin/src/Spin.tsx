import {
  computed,
  defineComponent,
  h,
  Transition,
  PropType,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { NBaseLoading } from '../../_internal'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes, warn } from '../../_utils'
import { spinLight } from '../styles'
import type { SpinTheme } from '../styles'
import style from './styles/index.cssr'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18
}

const spinProps = {
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
}

export type SpinProps = ExtractPublicPropTypes<typeof spinProps>

export default defineComponent({
  name: 'Spin',
  props: spinProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Spin',
      'Spin',
      style,
      spinLight,
      props,
      mergedClsPrefix
    )
    return {
      mergedClsPrefix,
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
    const { $slots, mergedClsPrefix } = this
    return $slots.default ? (
      <div
        class={`${mergedClsPrefix}-spin-container`}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            `${mergedClsPrefix}-spin-content`,
            this.compitableShow && `${mergedClsPrefix}-spin-content--spinning`
          ]}
        >
          {$slots}
        </div>
        <Transition name="fade-in-transition">
          {{
            default: () =>
              this.compitableShow ? (
                <NBaseLoading
                  clsPrefix={mergedClsPrefix}
                  stroke={this.stroke}
                  strokeWidth={this.mergedStrokeWidth}
                  class={`${mergedClsPrefix}-spin`}
                />
              ) : null
          }}
        </Transition>
      </div>
    ) : (
      <NBaseLoading
        clsPrefix={mergedClsPrefix}
        style={this.cssVars as CSSProperties}
        stroke={this.stroke}
        stroke-width={this.mergedStrokeWidth}
        class={`${mergedClsPrefix}-spin`}
      />
    )
  }
})
