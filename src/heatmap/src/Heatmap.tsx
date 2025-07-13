import type { PropType, SlotsType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { TooltipProps } from '../../tooltip'
import type { HeatmapTheme } from '../styles/light'
import type { DayRect } from './interface'
import type {
  HeatmapData,
  HeatmapFirstDayOfWeek,
  HeatmapSlots
} from './public-types'
import { addDays, format, parseISO, startOfWeek } from 'date-fns'
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
import { transformNaiveFirstDayOfWeekToDateFns } from '../../date-picker/src/utils'
import heatmapLight from '../styles/light'
import HeatmapColorIndicator from './ColorIndicator'
import Rect from './Rect'
import style from './styles/index.cssr'
import { type HeatmapColorTheme, heatmapColorThemes } from './theme'
import {
  completeDataGaps,
  createDayRect,
  createLoadingMatrix,
  createSparseMatrix
} from './utils'

interface Col {
  week: number
  month: string
}

export const heatmapProps = {
  ...(useTheme.props as ThemeProps<HeatmapTheme>),
  colors: Array as PropType<string[]>,
  colorTheme: {
    type: String as PropType<HeatmapColorTheme>,
    default: 'github'
  },
  data: Array as PropType<HeatmapData>,
  loading: Boolean,
  firstDayOfWeek: {
    type: Number as PropType<HeatmapFirstDayOfWeek>,
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
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  xGap: [Number, String] as PropType<number | string>,
  yGap: [Number, String] as PropType<number | string>,
  tooltip: {
    type: [Boolean, Object] as PropType<TooltipProps | false>,
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
        common: { cubicBezierEaseInOut },
        self: {
          fontWeight,
          textColor,
          borderRadius,
          borderColor,
          loadingColorStart,
          loadingColorEnd,
          [createKey('rectSize', size)]: rectSize,
          [createKey('xGap', size)]: defaultXGap,
          [createKey('yGap', size)]: defaultYGap,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value

      const cssVars = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-font-weight': fontWeight,
        '--n-text-color': textColor,
        '--n-border-radius': borderRadius,
        '--n-border-color': borderColor,
        '--n-loading-color-start': loadingColorStart,
        '--n-loading-color-end': loadingColorEnd,
        '--n-rect-size': rectSize,
        '--n-x-gap':
          xGap !== undefined
            ? typeof xGap === 'number'
              ? pxfy(xGap)
              : xGap
            : defaultXGap,
        '--n-y-gap':
          yGap !== undefined
            ? typeof yGap === 'number'
              ? pxfy(yGap)
              : yGap
            : defaultYGap
      }

      return cssVars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'heatmap',
          computed(() => {
            const { size } = props
            return size[0]
          }),
          cssVarsRef,
          props
        )
      : undefined

    const mergedColorsRef = computed(() => {
      if (props.colors && props.colors.length > 0) {
        return props.colors
      }
      return heatmapColorThemes[props.colorTheme]
    })

    const normalizedDataRef = computed(() => {
      if (!props.data || props.data.length === 0) {
        return []
      }
      return completeDataGaps(
        props.data,
        transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek)
      )
    })

    const maxValueRef = computed(() => {
      const validData = normalizedDataRef.value.filter(d => d.value !== null)
      return maxBy(validData, d => d.value!)?.value ?? 0
    })

    const heatmapMatrixRef = computed(() => {
      const data = normalizedDataRef.value

      if (props.loading || data.length === 0) {
        return createLoadingMatrix(
          transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek)
        )
      }
      const maxValue = maxValueRef.value
      const colors = mergedColorsRef.value
      const calendarStartDate = data[0].timestamp

      const dayRects = data.map(item =>
        createDayRect(
          item,
          calendarStartDate,
          transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek),
          colors,
          maxValue
        )
      )

      return createSparseMatrix(
        7,
        dayRects,
        dayRect => dayRect.rowIndex,
        dayRect => dayRect.colIndex
      )
    })

    const weekLabelsRef = computed(() => {
      const { weekdayFormat } = localeRef.value
      const { locale } = dateLocaleRef.value

      const baseDate = startOfWeek(new Date(), {
        weekStartsOn: transformNaiveFirstDayOfWeekToDateFns(
          props.firstDayOfWeek
        )
      })

      return Array.from({ length: 7 }, (_, i) => {
        return {
          label: format(addDays(baseDate, i), weekdayFormat, { locale }),
          visible: i % 2 !== 0
        }
      })
    })

    const loadingMonthLabelsRef = computed(() => {
      const { monthFormat } = localeRef.value
      const { locale } = dateLocaleRef.value
      const currentYear = new Date().getFullYear()
      // for more consistent month label widths
      const colSpans = [5, 4, 5, 4, 5, 4, 5, 4, 4, 5, 4, 4]
      return Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(currentYear, i, 1)
        return {
          name: format(monthDate, monthFormat, { locale }),
          colSpan: colSpans[i]
        }
      })
    })

    function getColsMonth(matrix: DayRect[][]): Col[] {
      const cols = matrix[0].length
      const res: Col[] = []
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < matrix.length; row++) {
          const cell = matrix[row][col]
          if (cell?.value !== null) {
            res.push({
              week: col,
              month: format(cell.timestamp, 'yyyy-MM')
            })
            break
          }
        }
      }
      return res
    }

    const dataMonthLabelsRef = computed(() => {
      const { monthFormat } = localeRef.value
      const { locale } = dateLocaleRef.value
      const matrix = heatmapMatrixRef.value
      if (!matrix || matrix.length === 0 || !matrix[0]) {
        return []
      }
      const colsWithMonth = getColsMonth(matrix)
      const monthStats = mapValues(
        groupBy(colsWithMonth, 'month'),
        (entries) => {
          const weekNumbers = entries.map(e => e.week)
          return {
            weekCount: entries.length,
            start: Math.min(...weekNumbers),
            end: Math.max(...weekNumbers)
          }
        }
      )

      return Object.entries(monthStats)
        .filter(([, stats]) => stats.weekCount >= 3) // ensure have enough space
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, stats]) => {
          const monthDate = new Date(parseISO(`${month}-01`))
          return {
            name: format(monthDate, monthFormat, { locale }),
            colSpan: stats.end - stats.start + 1
          }
        })
    })

    const monthLabelsRef = computed(() => {
      return props.loading
        ? loadingMonthLabelsRef.value
        : dataMonthLabelsRef.value
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
      rtlEnabled,
      locale,
      weekLabels,
      monthLabels,
      mergedColors,
      $slots,
      heatmapMatrix,
      onRender
    } = this
    onRender?.()
    return (
      <div
        class={[
          themeClass,
          `${mergedClsPrefix}-heatmap`,
          rtlEnabled && `${mergedClsPrefix}-heatmap--rtl`
        ]}
        style={cssVars}
      >
        <div class={`${mergedClsPrefix}-heatmap__content`}>
          <table class={`${mergedClsPrefix}-heatmap__calendar-table`}>
            {showMonthLabels && (
              <thead>
                <tr>
                  {showWeekLabels && (
                    <th
                      class={`${mergedClsPrefix}-heatmap__week-header-cell`}
                    />
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
                <HeatmapColorIndicator
                  colors={mergedColors}
                  clsPrefix={mergedClsPrefix}
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
