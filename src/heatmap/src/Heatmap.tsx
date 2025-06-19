import type { PropType, SlotsType, VNode } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { PopoverProps } from '../../popover/src/Popover'
import type { HeatmapTheme } from '../styles/light'
import type { DayRect, RectData, WeekStartDay } from './interface'
import { format, startOfWeek } from 'date-fns'
import { groupBy, mapValues, maxBy } from 'lodash-es'
import { pxfy } from 'seemly'
import { computed, defineComponent, h } from 'vue'
import {
  useConfig,
  useLocale,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { createKey, resolveSlot, resolveWrappedSlot } from '../../_utils'
import heatmapLight from '../styles/light'
import ColorIndicator from './ColorIndicator'
import Rect from './Rect'
import style from './styles/index.cssr'
import {
  completeDataGaps,
  createDayRect,
  createLoadingMatrix,
  createSparseMatrix
} from './utils'

export const HeatmapThemes = {
  github: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  green: ['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  blue: ['#ebedf0', '#c0e7ff', '#73b3ff', '#0969da', '#0550ae'],
  orange: ['#ebedf0', '#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
  purple: ['#ebedf0', '#e9d5ff', '#c084fc', '#9333ea', '#7c3aed'],
  red: ['#ebedf0', '#fecaca', '#f87171', '#dc2626', '#b91c1c']
}

export type HeatmapThemeType = keyof typeof HeatmapThemes

export interface HeatmapSlots {
  info?: () => VNode[]
  indicator?: () => VNode[]
  tooltip?: (data: {
    date: Date
    value: number | null
    unit: string
  }) => VNode[]
}

export const heatmapProps = {
  ...(useTheme.props as ThemeProps<HeatmapTheme>),
  colors: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  colorTheme: {
    type: String as PropType<HeatmapThemeType>,
    default: 'github'
  },
  data: Array as PropType<RectData[]>,
  loading: Boolean,
  weekStartOn: {
    type: Number as PropType<WeekStartDay>,
    default: 0
  },
  showColorIndicator: {
    type: Boolean,
    default: true
  },
  showWeekLabels: {
    type: Boolean,
    default: true
  },
  showMonthLabels: {
    type: Boolean,
    default: true
  },
  unit: {
    type: String,
    required: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  xGap: [Number, String] as PropType<number | string>,
  yGap: [Number, String] as PropType<number | string>,
  tooltip: {
    type: [Boolean, Object] as PropType<PopoverProps | boolean>,
    default: true
  }
} as const

export type HeatmapProps = ExtractPublicPropTypes<typeof heatmapProps>

export default defineComponent({
  name: 'Heatmap',
  slots: Object as SlotsType<HeatmapSlots>,
  props: heatmapProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('Heatmap')
    const themeRef = useTheme(
      'Heatmap',
      '-heatmap',
      style,
      heatmapLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Heatmap', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { xGap, yGap, size } = props
      const {
        self: {
          fontSize,
          fontWeight,
          textColor,
          borderRadius,
          borderColor,
          loadingColorStart,
          loadingColorEnd,
          [createKey('rectSize', size)]: rectSize,
          [createKey('xGap', size)]: defaultXGap,
          [createKey('yGap', size)]: defaultYGap,
          [createKey('fontSize', size)]: sizeFontSize
        }
      } = themeRef.value

      const cssVars = {
        '--n-font-size': sizeFontSize || fontSize,
        '--n-font-weight': fontWeight,
        '--n-text-color': textColor,
        '--n-border-radius': borderRadius,
        '--n-border-color': borderColor,
        '--n-loading-color-start': loadingColorStart,
        '--n-loading-color-end': loadingColorEnd,
        '--n-rect-size': rectSize || '10px',
        '--n-x-gap':
          xGap !== undefined
            ? typeof xGap === 'number'
              ? pxfy(xGap)
              : xGap
            : defaultXGap || '3px',
        '--n-y-gap':
          yGap !== undefined
            ? typeof yGap === 'number'
              ? pxfy(yGap)
              : yGap
            : defaultYGap || '3px'
      }

      return cssVars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'heatmap',
          computed(() => {
            const { size } = props
            return size[0] // 使用 size 的首字母作为 hash
          }),
          cssVarsRef,
          props
        )
      : undefined

    const mergedColorsRef = computed(() => {
      if (props.colors && props.colors.length > 0) {
        return props.colors
      }
      return HeatmapThemes[props.colorTheme]
    })

    const normalizedDataRef = computed(() => {
      return props.data ? completeDataGaps(props.data, props.weekStartOn) : []
    })

    const maxValueRef = computed(() => {
      const validData = normalizedDataRef.value.filter(d => d.value !== null)
      return maxBy(validData, d => d.value!)?.value ?? 0
    })

    const heatmapMatrixRef = computed(() => {
      if (props.loading) {
        return createLoadingMatrix(props.weekStartOn)
      }

      const data = normalizedDataRef.value

      const { weekStartOn } = props
      const maxValue = maxValueRef.value
      const colors = mergedColorsRef.value
      const calendarStartDate = startOfWeek(data[0].date, {
        weekStartsOn: weekStartOn
      })

      const dayRects = data.map(item =>
        createDayRect(item, calendarStartDate, weekStartOn, colors, maxValue)
      )

      return createSparseMatrix(
        7,
        dayRects,
        dayRect => dayRect.rowIndex,
        dayRect => dayRect.colIndex
      )
    })

    const weekLabelsRef = computed(() => {
      const { weekStartOn } = props
      const { weekdayFormat } = localeRef.value
      const { locale } = dateLocaleRef.value

      return Array.from({ length: 7 }, (_, i) => {
        const actualDayOfWeek = (weekStartOn + i) % 7
        const sampleDate = new Date(2023, 0, 1 + actualDayOfWeek)
        return {
          label: format(sampleDate, weekdayFormat, { locale }),
          visible: i % 2 !== 0
        }
      })
    })

    const monthLabelsRef = computed(() => {
      if (props.loading) {
        const { monthFormat } = localeRef.value
        const { locale } = dateLocaleRef.value
        const currentYear = new Date().getFullYear()
        return Array.from({ length: 12 }, (_, i) => {
          const monthDate = new Date(currentYear, i, 1)
          return {
            name: format(monthDate, monthFormat, { locale }),
            colSpan: Math.floor(53 / 12)
          }
        })
      }

      const matrix = heatmapMatrixRef.value
      const cols = matrix[0].length
      const { monthFormat } = localeRef.value
      const { locale } = dateLocaleRef.value

      const monthColumns = Array.from({ length: cols }, (_, col) => {
        const cell = matrix.find(row => row[col]?.value !== null)?.[col]
        return cell ? { col, monthKey: format(cell.date, 'yyyy-MM') } : null
      }).filter(Boolean) as Array<{ col: number, monthKey: string }>

      const monthStats = mapValues(
        groupBy(monthColumns, 'monthKey'),
        (columns) => {
          const colNumbers = columns.map(c => c.col)
          return {
            count: columns.length,
            start: Math.min(...colNumbers),
            end: Math.max(...colNumbers)
          }
        }
      )

      return Object.entries(monthStats)
        .filter(([, stats]) => stats.count >= 3)
        .map(([monthKey, stats]) => {
          const monthDate = new Date(`${monthKey}-01`)
          return {
            name: format(monthDate, monthFormat, { locale }),
            colSpan: stats.end - stats.start + 1
          }
        })
    })

    return {
      weekLabels: weekLabelsRef,
      monthLabels: monthLabelsRef,
      mergedColors: mergedColorsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      locale: localeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      heatmapMatrix: heatmapMatrixRef
    }
  },
  render() {
    const {
      loading,
      showWeekLabels,
      showMonthLabels,
      showColorIndicator,
      mergedClsPrefix,
      themeClass,
      cssVars,
      locale,
      weekLabels,
      monthLabels,
      mergedColors,
      $slots,
      unit,
      heatmapMatrix,
      onRender
    } = this
    onRender?.()
    return (
      <div class={[themeClass, `${mergedClsPrefix}-heatmap`]} style={cssVars}>
        <div class={`${mergedClsPrefix}-heatmap__content`}>
          <table class={`${mergedClsPrefix}-heatmap__calendar-table`}>
            {showMonthLabels && (
              <thead>
                <tr>
                  {showWeekLabels && (
                    <th
                      class={`${mergedClsPrefix}-heatmap__week-header-cell`}
                    >
                    </th>
                  )}
                  {monthLabels.map((monthLabel, index) => (
                    <th
                      key={`month-${index}`}
                      colspan={monthLabel.colSpan}
                      class={`${mergedClsPrefix}-heatmap__month-label-cell`}
                    >
                      {monthLabel.name}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {weekLabels.map((weekLabel, rowIdx) => {
                return (
                  <tr key={`row-${rowIdx}`}>
                    {showWeekLabels && (
                      <td class={`${mergedClsPrefix}-heatmap__week-label-cell`}>
                        {weekLabel.visible ? weekLabel.label : null}
                      </td>
                    )}
                    {heatmapMatrix[rowIdx].map(
                      (day: DayRect, weekIdx: number) => {
                        return day.value !== null ? (
                          <td
                            key={`day-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__day-cell`}
                          >
                            <Rect
                              mergedClsPrefix={mergedClsPrefix}
                              data={day}
                              color={day.color}
                              unit={unit}
                              tooltip={this.tooltip}
                              tooltipSlot={$slots.tooltip}
                              loading={loading}
                            />
                          </td>
                        ) : (
                          <td
                            key={`empty-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__day-cell`}
                          >
                            <div
                              class={`${mergedClsPrefix}-heatmap__empty-cell`}
                            />
                          </td>
                        )
                      }
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div class={`${mergedClsPrefix}-heatmap__footer`}>
          {resolveWrappedSlot(
            $slots.info,
            children =>
              children && (
                <div class={`${mergedClsPrefix}-heatmap__footer__info`}>
                  {children}
                </div>
              )
          )}
          <div class={`${mergedClsPrefix}-heatmap__footer__indicator`}>
            {resolveSlot($slots.indicator, () => [
              !loading && showColorIndicator && (
                <ColorIndicator
                  colors={mergedColors}
                  mergedClsPrefix={mergedClsPrefix}
                  indicatorText={[locale.less, locale.more]}
                />
              )
            ])}
          </div>
        </div>
      </div>
    )
  }
})
