import { h, computed, defineComponent, PropType, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes } from '../../_utils'
import { progressLight } from '../styles'
import type { ProgressTheme } from '../styles'
import style from './styles/index.cssr'
import { Status } from './interface'
import Line from './Line'
import Circle from './Circle'
import MultipleCircle from './MultipleCircle'

const progressProps = {
  ...(useTheme.props as ThemeProps<ProgressTheme>),
  processing: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'line' | 'circle' | 'multiple-circle'>,
    default: 'line'
  },
  status: {
    type: String as PropType<Status>,
    default: 'default'
  },
  railColor: [String, Array] as PropType<string | string[]>,
  railStyle: [String, Array] as PropType<
  string | CSSProperties | Array<string | CSSProperties>
  >,
  color: [String, Array] as PropType<string | string[]>,
  viewBoxWidth: {
    type: Number,
    default: 100
  },
  strokeWidth: {
    type: Number,
    default: 7
  },
  percentage: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  unit: {
    type: String,
    default: '%'
  },
  showIndicator: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String as PropType<'inside' | 'outside'>,
    default: 'outside'
  },
  indicatorPlacement: {
    type: String as PropType<'inside' | 'outside'>,
    default: 'outside'
  },
  indicatorTextColor: {
    type: String,
    default: undefined
  },
  circleGap: {
    type: Number,
    default: 1
  },
  height: {
    type: Number,
    default: undefined
  },
  borderRadius: {
    type: [String, Number] as PropType<string | number | undefined>,
    default: undefined
  },
  fillBorderRadius: {
    type: [String, Number] as PropType<string | number | undefined>,
    default: undefined
  }
} as const

export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>

export default defineComponent({
  name: 'Progress',
  props: progressProps,
  setup (props) {
    const mergedIndicatorPlacementRef = computed(() => {
      return props.indicatorPlacement || props.indicatorPosition
    })
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Progress',
      'Progress',
      style,
      progressLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      mergedIndicatorPlacement: mergedIndicatorPlacementRef,
      cssVars: computed(() => {
        const { status } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            fontSizeCircle,
            railColor,
            railHeight,
            iconSizeCircle,
            iconSizeLine,
            textColorCircle,
            textColorLineInner,
            textColorLineOuter,
            lineBgProcessing,
            fontWeightCircle,
            [createKey('iconColor', status)]: iconColor,
            [createKey('fillColor', status)]: fillColor
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--fill-color': fillColor,
          '--font-size': fontSize,
          '--font-size-circle': fontSizeCircle,
          '--font-weight-circle': fontWeightCircle,
          '--icon-color': iconColor,
          '--icon-size-circle': iconSizeCircle,
          '--icon-size-line': iconSizeLine,
          '--line-bg-processing': lineBgProcessing,
          '--rail-color': railColor,
          '--rail-height': railHeight,
          '--text-color-circle': textColorCircle,
          '--text-color-line-inner': textColorLineInner,
          '--text-color-line-outer': textColorLineOuter
        }
      })
    }
  },
  render () {
    // it's ok to expand all prop here since no slots' deps
    const {
      type,
      cssVars,
      indicatorTextColor,
      showIndicator,
      status,
      railColor,
      railStyle,
      color,
      percentage,
      viewBoxWidth,
      strokeWidth,
      mergedIndicatorPlacement,
      unit,
      borderRadius,
      fillBorderRadius,
      height,
      processing,
      circleGap,
      cPrefix,
      $slots
    } = this
    return (
      <div
        class={[
          `${cPrefix}-progress`,
          `${cPrefix}-progress--${type}`,
          `${cPrefix}-progress--${status}`
        ]}
        style={cssVars as CSSProperties}
      >
        {type === 'circle' ? (
          <Circle
            clsPrefix={cPrefix}
            status={status}
            showIndicator={showIndicator}
            indicatorTextColor={indicatorTextColor}
            railColor={railColor as any}
            fillColor={color as any}
            railStyle={railStyle as any}
            percentage={percentage as number}
            viewBoxWidth={viewBoxWidth}
            strokeWidth={strokeWidth}
            unit={unit}
          >
            {$slots}
          </Circle>
        ) : type === 'line' ? (
          <Line
            clsPrefix={cPrefix}
            status={status}
            showIndicator={showIndicator}
            indicatorTextColor={indicatorTextColor}
            railColor={railColor as any}
            fillColor={color as any}
            railStyle={railStyle as any}
            percentage={percentage as number}
            processing={processing}
            indicatorPlacement={mergedIndicatorPlacement}
            unit={unit}
            fillBorderRadius={fillBorderRadius}
            railBorderRadius={borderRadius}
            height={height}
          >
            {$slots}
          </Line>
        ) : type === 'multiple-circle' ? (
          <MultipleCircle
            clsPrefix={cPrefix}
            strokeWidth={strokeWidth}
            railColor={railColor as any}
            fillColor={color as any}
            railStyle={railStyle as any}
            viewBoxWidth={viewBoxWidth}
            percentage={percentage as number[]}
            showIndicator={showIndicator}
            circleGap={circleGap}
          >
            {$slots}
          </MultipleCircle>
        ) : null}
      </div>
    )
  }
})
