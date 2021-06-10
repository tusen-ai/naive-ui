import {
  computed,
  defineComponent,
  h,
  Transition,
  PropType,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { pxfy } from 'seemly'
import { NBaseLoading } from '../../_internal'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes, warn } from '../../_utils'
import { spinLight } from '../styles'
import type { SpinTheme } from '../styles'
import style from './styles/index.cssr'

const STROKE_WIDTH = {
  small: 20,
  medium: 18,
  large: 16
}

const spinProps = {
  ...(useTheme.props as ThemeProps<SpinTheme>),
  stroke: {
    type: String,
    default: undefined
  },
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Spin',
      'Spin',
      style,
      spinLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compitableShow: useCompitable(props, ['spinning', 'show']),
      mergedStrokeWidth: computed(() => {
        const { strokeWidth } = props
        if (strokeWidth !== undefined) return strokeWidth
        const { size } = props
        return STROKE_WIDTH[typeof size === 'number' ? 'medium' : size]
      }),
      cssVars: computed(() => {
        const { size: spinSize } = props
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        const { opacitySpinning, color } = self
        const size =
          typeof spinSize === 'number'
            ? pxfy(spinSize)
            : self[createKey('size', spinSize)]
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
