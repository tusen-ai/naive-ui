import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'

import type { HeatmapTheme } from '../styles/light'
import type { DayRect, RectData, WeekStartDay } from './interface'
import { format, startOfWeek } from 'date-fns'
import { groupBy, mapValues, maxBy } from 'lodash-es'
import { computed, defineComponent, h, type PropType } from 'vue'
import { useConfig, useRtl, useTheme, useThemeClass } from '../../_mixins'
import heatmapLight from '../styles/light'
import ColorIndicator from './ColorIndicator'
import Rect from './Rect'
import style from './styles/index.cssr'
import { completeDataGaps, createDayRect, createSparseMatrix } from './utils'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export const HeatmapThemes = {
  github: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  green: ['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  blue: ['#ebedf0', '#c0e7ff', '#73b3ff', '#0969da', '#0550ae'],
  orange: ['#ebedf0', '#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
  purple: ['#ebedf0', '#e9d5ff', '#c084fc', '#9333ea', '#7c3aed'],
  red: ['#ebedf0', '#fecaca', '#f87171', '#dc2626', '#b91c1c']
}

export type HeatmapThemeType = keyof typeof HeatmapThemes

export const heatmapProps = {
  ...(useTheme.props as ThemeProps<HeatmapTheme>),
  data: Array as PropType<RectData[]>,
  weekStartOn: {
    type: Number as PropType<WeekStartDay>,
    default: 0
  },
  type: {
    type: String as PropType<'month' | 'year'>,
    default: 'year'
  },
  showColorIndicator: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  unit: {
    type: String,
    require: true
  },
  colors: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  colorTheme: {
    type: String as PropType<HeatmapThemeType>,
    default: 'github'
  }
} as const

export type HeatmapProps = ExtractPublicPropTypes<typeof heatmapProps>

export default defineComponent({
  name: 'Heatmap',
  props: heatmapProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)
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
      const {
        // eslint-disable-next-line no-empty-pattern
        self: {},
        // eslint-disable-next-line no-empty-pattern
        common: {}
      } = themeRef.value
      return {}
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('heatmap', undefined, cssVarsRef, props)
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
      return Array.from({ length: 7 }, (_, i) => {
        const actualDayOfWeek = (weekStartOn + i) % 7
        return {
          label: weekDays[actualDayOfWeek],
          visible: i % 2 !== 0
        }
      })
    })

    const monthLabelsRef = computed(() => {
      const matrix = heatmapMatrixRef.value
      const cols = matrix[0].length

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
        .map(([monthKey, stats]) => ({
          name: format(new Date(`${monthKey}-01`), 'MMM'),
          colSpan: stats.end - stats.start + 1
        }))
    })

    return {
      weekLabels: weekLabelsRef,
      monthLabels: monthLabelsRef,
      mergedColors: mergedColorsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      heatmapMatrix: heatmapMatrixRef
    }
  },
  render() {
    const {
      showLabels,
      showColorIndicator,
      mergedClsPrefix,
      themeClass,
      weekLabels,
      monthLabels,
      mergedColors,
      $slots,
      unit,
      heatmapMatrix
    } = this

    return (
      <div class={[`${mergedClsPrefix}-heatmap`, themeClass]}>
        <div class={`${mergedClsPrefix}-heatmap__content`}>
          <table class={`${mergedClsPrefix}-heatmap__table`}>
            {showLabels && (
              <thead>
                <tr>
                  <th class={`${mergedClsPrefix}-heatmap__week-header`}></th>
                  {monthLabels.map((monthLabel, index) => (
                    <th
                      key={`month-${index}`}
                      colspan={monthLabel.colSpan}
                      class={`${mergedClsPrefix}-heatmap__month-label`}
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
                  <tr
                    key={`row-${rowIdx}`}
                    class={`${mergedClsPrefix}-heatmap__day-row`}
                  >
                    {showLabels && (
                      <td class={`${mergedClsPrefix}-heatmap__week-label`}>
                        {weekLabel.visible ? weekLabel.label : null}
                      </td>
                    )}
                    {heatmapMatrix[rowIdx].map(
                      (day: DayRect, weekIdx: number) => {
                        return day.value !== null ? (
                          <td
                            key={`day-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__cell`}
                          >
                            <Rect
                              mergedClsPrefix={mergedClsPrefix}
                              data={day}
                              color={day.color}
                              unit={unit}
                            />
                          </td>
                        ) : (
                          <td
                            key={`empty-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__cell`}
                          >
                            <div
                              class={`${mergedClsPrefix}-heatmap__placeholder`}
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
          {$slots.footer?.()}
          {showColorIndicator && (
            <ColorIndicator
              colors={mergedColors}
              mergedClsPrefix={mergedClsPrefix}
            />
          )}
        </div>
      </div>
    )
  }
})
