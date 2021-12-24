import {
  computed,
  defineComponent,
  h,
  Transition,
  PropType,
  CSSProperties,
  watchEffect
} from 'vue'
import { useCompitable } from 'vooks'
import { pxfy } from 'seemly'
import { NBaseLoading } from '../../_internal'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes, warnOnce } from '../../_utils'
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
  description: String,
  stroke: String,
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    default: 'medium'
  },
  show: {
    type: Boolean,
    default: true
  },
  strokeWidth: Number,
  rotate: {
    type: Boolean,
    default: true
  },
  spinning: {
    type: Boolean,
    validator: () => {
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
    if (__DEV__) {
      watchEffect(() => {
        if (props.spinning !== undefined) {
          warnOnce(
            'spin',
            '`spinning` is deprecated, please use `show` instead.'
          )
        }
      })
    }
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
        const { opacitySpinning, color, textColor } = self
        const size =
          typeof spinSize === 'number'
            ? pxfy(spinSize)
            : self[createKey('size', spinSize)]
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-opacity-spinning': opacitySpinning,
          '--n-size': size,
          '--n-color': color,
          '--n-text-color': textColor
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix, description } = this
    const rotate = $slots.icon && this.rotate
    const descriptionNode = (description || $slots.description) && (
      <div class={`${mergedClsPrefix}-spin-description`}>
        {description || $slots.description?.()}
      </div>
    )
    const icon = $slots.icon ? (
      <div class={`${mergedClsPrefix}-spin-body`}>
        <div
          class={[
            `${mergedClsPrefix}-spin`,
            rotate && `${mergedClsPrefix}-spin--rotate`
          ]}
          style={$slots.default ? '' : (this.cssVars as CSSProperties)}
        >
          {$slots.icon()}
        </div>
        {descriptionNode}
      </div>
    ) : (
      <div class={`${mergedClsPrefix}-spin-body`}>
        <NBaseLoading
          clsPrefix={mergedClsPrefix}
          style={$slots.default ? '' : (this.cssVars as CSSProperties)}
          stroke={this.stroke}
          stroke-width={this.mergedStrokeWidth}
          class={`${mergedClsPrefix}-spin`}
        />
        {descriptionNode}
      </div>
    )
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
            default: () => (this.compitableShow ? icon : null)
          }}
        </Transition>
      </div>
    ) : (
      icon
    )
  }
})
