import {
  h,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, type ExtractPublicPropTypes } from '../../_utils'
import { progressLight } from '../styles'
import type { ProgressTheme } from '../styles'
import style from './styles/index.cssr'
import { type Status } from './interface'
import Line from './Line'
import Circle from './Circle'
import MultipleCircle from './MultipleCircle'

export const progressProps = {
  ...(useTheme.props as ThemeProps<ProgressTheme>),
  processing: Boolean,
  type: {
    type: String as PropType<
    'line' | 'circle' | 'multiple-circle' | 'dashboard'
    >,
    default: 'line'
  },
  gapDegree: Number,
  gapOffsetDegree: Number,
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
  percentage: [Number, Array] as PropType<number | number[]>,
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
  indicatorTextColor: String,
  circleGap: {
    type: Number,
    default: 1
  },
  height: Number,
  borderRadius: [String, Number] as PropType<string | number>,
  fillBorderRadius: [String, Number] as PropType<string | number>,
  offsetDegree: Number
} as const

export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>

export default defineComponent({
  name: 'Progress',
  props: progressProps,
  setup (props) {
    const mergedIndicatorPlacementRef = computed(() => {
      return props.indicatorPlacement || props.indicatorPosition
    })
    const gapDeg = computed(() => {
      if (props.gapDegree || props.gapDegree === 0) {
        return props.gapDegree
      }
      if (props.type === 'dashboard') {
        return 75
      }
      return undefined
    })
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Progress',
      '-progress',
      style,
      progressLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
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
        '--n-bezier': cubicBezierEaseInOut,
        '--n-fill-color': fillColor,
        '--n-font-size': fontSize,
        '--n-font-size-circle': fontSizeCircle,
        '--n-font-weight-circle': fontWeightCircle,
        '--n-icon-color': iconColor,
        '--n-icon-size-circle': iconSizeCircle,
        '--n-icon-size-line': iconSizeLine,
        '--n-line-bg-processing': lineBgProcessing,
        '--n-rail-color': railColor,
        '--n-rail-height': railHeight,
        '--n-text-color-circle': textColorCircle,
        '--n-text-color-line-inner': textColorLineInner,
        '--n-text-color-line-outer': textColorLineOuter
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'progress',
        computed(() => props.status[0]),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedIndicatorPlacement: mergedIndicatorPlacementRef,
      gapDeg,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
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
      mergedClsPrefix,
      gapDeg,
      gapOffsetDegree,
      themeClass,
      $slots,
      onRender
    } = this
    onRender?.()
    return (
      <div
        class={[
          themeClass,
          `${mergedClsPrefix}-progress`,
          `${mergedClsPrefix}-progress--${type}`,
          `${mergedClsPrefix}-progress--${status}`
        ]}
        style={cssVars as CSSProperties}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percentage as number}
        role={
          type === 'circle' || type === 'line' || type === 'dashboard'
            ? 'progressbar'
            : 'none'
        }
      >
        {type === 'circle' || type === 'dashboard' ? (
          <Circle
            clsPrefix={mergedClsPrefix}
            status={status}
            showIndicator={showIndicator}
            indicatorTextColor={indicatorTextColor}
            railColor={railColor as any}
            fillColor={color as any}
            railStyle={railStyle as any}
            offsetDegree={this.offsetDegree}
            percentage={percentage as number}
            viewBoxWidth={viewBoxWidth}
            strokeWidth={strokeWidth}
            gapDegree={
              gapDeg === undefined ? (type === 'dashboard' ? 75 : 0) : gapDeg
            }
            gapOffsetDegree={gapOffsetDegree}
            unit={unit}
          >
            {$slots}
          </Circle>
        ) : type === 'line' ? (
          <Line
            clsPrefix={mergedClsPrefix}
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
            clsPrefix={mergedClsPrefix}
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
